package com.crochet.puntoylana.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.math.BigDecimal;

/**
 * Servicio para envío de emails transaccionales.
 * Si no hay configuración SMTP, los emails se loguean pero no se envían.
 */
@Slf4j
@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final boolean emailEnabled;

    @Value("${app.mail.from:noreply@puntoylana.com}")
    private String fromEmail;

    @Value("${app.mail.name:Punto y Lana}")
    private String fromName;

    // Constructor con inyección OPCIONAL de JavaMailSender
    @Autowired
    public EmailService(@Autowired(required = false) JavaMailSender mailSender) {
        this.mailSender = mailSender;
        this.emailEnabled = mailSender != null;

        if (!emailEnabled) {
            log.warn("⚠️ EmailService: JavaMailSender no configurado. Los emails se simularán en desarrollo.");
        } else {
            log.info("✅ EmailService: Servicio de email configurado correctamente.");
        }
    }

    /**
     * Envía email de bienvenida al registrarse.
     */
    @Async
    public void sendWelcomeEmail(String toEmail, String userName) {
        String subject = "¡Bienvenido/a a Punto y Lana! 🧶";
        String html = buildWelcomeEmail(userName);
        sendHtmlEmail(toEmail, subject, html);
    }

    /**
     * Envía confirmación de compra.
     */
    @Async
    public void sendPurchaseConfirmation(String toEmail, String userName,
            String orderNumber, BigDecimal total, String productName) {
        String subject = "✨ ¡Compra confirmada! - Orden #" + orderNumber;
        String html = buildPurchaseEmail(userName, orderNumber, total, productName);
        sendHtmlEmail(toEmail, subject, html);
    }

    /**
     * Envía link de recuperación de contraseña.
     */
    @Async
    public void sendPasswordResetEmail(String toEmail, String userName, String resetToken) {
        String subject = "🔐 Recupera tu contraseña - Punto y Lana";
        String html = buildPasswordResetEmail(userName, resetToken);
        sendHtmlEmail(toEmail, subject, html);
    }

    private void sendHtmlEmail(String to, String subject, String htmlContent) {
        // Si no hay mailSender configurado, simular el envío
        if (!emailEnabled || mailSender == null) {
            log.info("📧 [SIMULADO] Email a: {} | Asunto: {}", to, subject);
            return;
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail, fromName);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);

            mailSender.send(message);
            log.info("📧 Email enviado a: {}", to);
        } catch (MessagingException | java.io.UnsupportedEncodingException e) {
            log.error("❌ Error enviando email a {}: {}", to, e.getMessage());
        }
    }

    private String buildWelcomeEmail(String userName) {
        return """
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <style>
                        body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #FFF8F5; margin: 0; padding: 20px; }
                        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
                        .header { background: linear-gradient(135deg, #E91E63, #F48FB1); padding: 40px 20px; text-align: center; }
                        .header h1 { color: white; margin: 0; font-size: 28px; }
                        .header .emoji { font-size: 60px; display: block; margin-bottom: 10px; }
                        .content { padding: 40px 30px; }
                        .content h2 { color: #5D4037; margin-top: 0; }
                        .content p { color: #795548; line-height: 1.6; }
                        .button { display: inline-block; background: linear-gradient(135deg, #E91E63, #F48FB1); color: white; padding: 14px 30px; text-decoration: none; border-radius: 30px; font-weight: bold; margin-top: 20px; }
                        .footer { background: #FFF8F5; padding: 20px; text-align: center; font-size: 12px; color: #A1887F; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <span class="emoji">🧶</span>
                            <h1>¡Bienvenido/a!</h1>
                        </div>
                        <div class="content">
                            <h2>Hola %s,</h2>
                            <p>¡Qué emoción tenerte en nuestra comunidad de tejedores! 💖</p>
                            <p>En <strong>Punto y Lana</strong> encontrarás todo lo que necesitas para tus proyectos de crochet: lanas de alta calidad, patrones exclusivos y cursos para todos los niveles.</p>
                            <p>¿Listo/a para comenzar tu próxima creación?</p>
                            <a href="https://puntoylana.com/catalogo" class="button">Explorar Catálogo</a>
                        </div>
                        <div class="footer">
                            <p>Hecho con ❤️ en Colombia</p>
                            <p>© 2026 Punto y Lana. Todos los derechos reservados.</p>
                        </div>
                    </div>
                </body>
                </html>
                """
                .formatted(userName);
    }

    private String buildPurchaseEmail(String userName, String orderNumber,
            BigDecimal total, String productName) {
        return """
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <style>
                        body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #FFF8F5; margin: 0; padding: 20px; }
                        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
                        .header { background: linear-gradient(135deg, #4CAF50, #81C784); padding: 40px 20px; text-align: center; }
                        .header h1 { color: white; margin: 0; font-size: 28px; }
                        .header .emoji { font-size: 60px; display: block; margin-bottom: 10px; }
                        .content { padding: 40px 30px; }
                        .content h2 { color: #5D4037; margin-top: 0; }
                        .content p { color: #795548; line-height: 1.6; }
                        .order-box { background: #FFF8F5; border-radius: 12px; padding: 20px; margin: 20px 0; }
                        .order-box .label { color: #A1887F; font-size: 12px; text-transform: uppercase; }
                        .order-box .value { color: #5D4037; font-size: 18px; font-weight: bold; }
                        .total { font-size: 24px; color: #E91E63; font-weight: bold; }
                        .button { display: inline-block; background: linear-gradient(135deg, #E91E63, #F48FB1); color: white; padding: 14px 30px; text-decoration: none; border-radius: 30px; font-weight: bold; margin-top: 20px; }
                        .footer { background: #FFF8F5; padding: 20px; text-align: center; font-size: 12px; color: #A1887F; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <span class="emoji">✨</span>
                            <h1>¡Compra Confirmada!</h1>
                        </div>
                        <div class="content">
                            <h2>Gracias, %s</h2>
                            <p>Tu pedido ha sido procesado exitosamente. ¡Pronto recibirás tus productos!</p>

                            <div class="order-box">
                                <p class="label">Número de orden</p>
                                <p class="value">#%s</p>
                            </div>

                            <div class="order-box">
                                <p class="label">Producto</p>
                                <p class="value">%s</p>
                            </div>

                            <div class="order-box">
                                <p class="label">Total pagado</p>
                                <p class="total">$%s COP</p>
                            </div>

                            <a href="https://puntoylana.com/perfil" class="button">Ver Mi Pedido</a>
                        </div>
                        <div class="footer">
                            <p>¿Tienes preguntas? Escríbenos a contacto@puntoylana.com</p>
                            <p>© 2026 Punto y Lana. Todos los derechos reservados.</p>
                        </div>
                    </div>
                </body>
                </html>
                """
                .formatted(userName, orderNumber, productName, total.toString());
    }

    private String buildPasswordResetEmail(String userName, String resetToken) {
        String resetUrl = "https://puntoylana.com/reset-password?token=" + resetToken;
        return """
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <style>
                        body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #FFF8F5; margin: 0; padding: 20px; }
                        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
                        .header { background: linear-gradient(135deg, #2196F3, #64B5F6); padding: 40px 20px; text-align: center; }
                        .header h1 { color: white; margin: 0; font-size: 28px; }
                        .header .emoji { font-size: 60px; display: block; margin-bottom: 10px; }
                        .content { padding: 40px 30px; }
                        .content h2 { color: #5D4037; margin-top: 0; }
                        .content p { color: #795548; line-height: 1.6; }
                        .button { display: inline-block; background: linear-gradient(135deg, #2196F3, #64B5F6); color: white; padding: 14px 30px; text-decoration: none; border-radius: 30px; font-weight: bold; margin-top: 20px; }
                        .warning { background: #FFF3E0; border-left: 4px solid #FF9800; padding: 15px; margin: 20px 0; border-radius: 4px; color: #E65100; font-size: 14px; }
                        .footer { background: #FFF8F5; padding: 20px; text-align: center; font-size: 12px; color: #A1887F; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <span class="emoji">🔐</span>
                            <h1>Recupera tu contraseña</h1>
                        </div>
                        <div class="content">
                            <h2>Hola %s,</h2>
                            <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta.</p>
                            <p>Haz clic en el siguiente botón para crear una nueva contraseña:</p>

                            <a href="%s" class="button">Restablecer Contraseña</a>

                            <div class="warning">
                                ⚠️ Este enlace expirará en 1 hora. Si no solicitaste este cambio, ignora este correo.
                            </div>
                        </div>
                        <div class="footer">
                            <p>Si tienes problemas, contacta a: soporte@puntoylana.com</p>
                            <p>© 2026 Punto y Lana. Todos los derechos reservados.</p>
                        </div>
                    </div>
                </body>
                </html>
                """
                .formatted(userName, resetUrl);
    }
}
