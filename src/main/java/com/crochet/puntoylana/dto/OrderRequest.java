package com.crochet.puntoylana.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {
    // Lista de items que quiere comprar
    private List<OrderItemDto> items;

    // Datos de envío
    private String shippingAddress;
    private String shippingPhone;
    private String notes;
    private String paymentMethod;
}