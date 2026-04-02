package com.salessavvy.payment.controller;

import com.salessavvy.payment.model.Payment;
import com.salessavvy.payment.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {
    @Autowired
    private PaymentRepository paymentRepository;

    @PostMapping("/process")
    public Payment processPayment(@RequestBody Payment payment) {
        // Mocking payment gateway logic
        payment.setTransactionId(UUID.randomUUID().toString());
        payment.setStatus(Payment.PaymentStatus.COMPLETED);
        return paymentRepository.save(payment);
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<Payment> getPaymentByOrder(@PathVariable Long orderId) {
        return paymentRepository.findByOrderId(orderId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
