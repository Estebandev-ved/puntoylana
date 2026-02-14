package com.crochet.puntoylana.service;

import com.crochet.puntoylana.dto.OrderItemDto;
import com.crochet.puntoylana.dto.OrderRequest;
import com.crochet.puntoylana.entity.Order;
import com.crochet.puntoylana.entity.OrderItem;
import com.crochet.puntoylana.entity.Product;
import com.crochet.puntoylana.entity.User;
import com.crochet.puntoylana.repository.OrderRepository;
import com.crochet.puntoylana.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final EmailService emailService;

    @Transactional
    public Order createOrder(User user, OrderRequest request) {
        log.info("🛒 Creando orden para usuario: {}", user.getEmail());

        // ============ FASE 1: Validar stock de todos los productos ============
        List<Product> productsToUpdate = new ArrayList<>();

        for (OrderItemDto itemDto : request.getItems()) {
            Product product = productRepository.findById(itemDto.getProductId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado: " + itemDto.getProductId()));

            // Validar stock (solo si el producto tiene stock definido, no aplica para
            // digitales)
            if (product.getStock() != null && product.getStock() >= 0) {
                if (product.getStock() < itemDto.getQuantity()) {
                    throw new RuntimeException(
                            String.format("Stock insuficiente para '%s'. Disponible: %d, Solicitado: %d",
                                    product.getName(), product.getStock(), itemDto.getQuantity()));
                }
            }
            productsToUpdate.add(product);
        }

        log.info("✅ Stock validado correctamente para {} productos", productsToUpdate.size());

        // ============ FASE 2: Crear la orden ============
        Order order = new Order();
        order.setUser(user);
        order.setDate(LocalDateTime.now());
        order.setStatus("PENDING"); // Pendiente de pago

        // Datos de envío
        order.setShippingAddress(request.getShippingAddress());
        order.setShippingPhone(request.getShippingPhone());
        order.setNotes(request.getNotes());
        order.setPaymentMethod(request.getPaymentMethod());

        List<OrderItem> items = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        // Crear items de la orden
        int productIndex = 0;
        for (OrderItemDto itemDto : request.getItems()) {
            Product product = productsToUpdate.get(productIndex++);

            OrderItem item = OrderItem.builder()
                    .product(product)
                    .quantity(itemDto.getQuantity())
                    .price(product.getPrice()) // Precio actual de la BD
                    .order(order)
                    .build();

            items.add(item);

            // Calcular subtotal
            BigDecimal subtotal = product.getPrice().multiply(BigDecimal.valueOf(itemDto.getQuantity()));
            total = total.add(subtotal);
        }

        order.setItems(items);
        order.setTotalAmount(total);

        // ============ FASE 3: Descontar stock ============
        productIndex = 0;
        for (OrderItemDto itemDto : request.getItems()) {
            Product product = productsToUpdate.get(productIndex++);

            // Solo descontar si tiene stock definido (productos físicos)
            if (product.getStock() != null) {
                int newStock = product.getStock() - itemDto.getQuantity();
                product.setStock(newStock);
                productRepository.save(product);
                log.info("📦 Stock de '{}' actualizado: {} → {}",
                        product.getName(), product.getStock() + itemDto.getQuantity(), newStock);
            }
        }

        // ============ FASE 4: Guardar orden ============
        Order savedOrder = orderRepository.save(order);
        log.info("🎉 Orden #{} creada exitosamente. Total: ${}", savedOrder.getId(), total);

        // ============ FASE 5: Enviar email de confirmación ============
        try {
            String productNames = items.stream()
                    .map(i -> i.getProduct().getName())
                    .reduce((a, b) -> a + ", " + b)
                    .orElse("Productos");

            emailService.sendPurchaseConfirmation(
                    user.getEmail(),
                    user.getFirstName() != null ? user.getFirstName() : user.getEmail().split("@")[0],
                    savedOrder.getId().toString(),
                    total,
                    productNames);
        } catch (Exception e) {
            log.warn("⚠️ No se pudo enviar email de confirmación: {}", e.getMessage());
            // No fallar la orden por problemas de email
        }

        return savedOrder;
    }

    public List<Order> getMyOrders(User user) {
        return orderRepository.findByUserId(user.getId());
    }

    /**
     * Actualizar tracking de envío (desde Admin)
     */
    @Transactional
    public Order updateTracking(Long orderId, String shippingCompany, String trackingNumber) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada: " + orderId));

        order.setShippingCompany(shippingCompany);
        order.setTrackingNumber(trackingNumber);
        order.setStatus("SHIPPED");
        order.setShippedAt(LocalDateTime.now());

        // Generar URL de tracking según la empresa
        if ("interrapidisimo".equalsIgnoreCase(shippingCompany)) {
            order.setTrackingUrl("https://www.interrapidisimo.com/rastreo/?guia=" + trackingNumber);
        } else if ("servientrega".equalsIgnoreCase(shippingCompany)) {
            order.setTrackingUrl("https://www.servientrega.com/wps/portal/rastreo-envio?guia=" + trackingNumber);
        } else {
            // URL genérica o manual
            order.setTrackingUrl(null);
        }

        log.info("📦 Tracking actualizado para orden #{}: {} - {}", orderId, shippingCompany, trackingNumber);

        return orderRepository.save(order);
    }

    /**
     * Marcar orden como entregada
     */
    @Transactional
    public Order markAsDelivered(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada: " + orderId));

        order.setStatus("DELIVERED");
        order.setDeliveredAt(LocalDateTime.now());

        log.info("✅ Orden #{} marcada como entregada", orderId);

        return orderRepository.save(order);
    }
}