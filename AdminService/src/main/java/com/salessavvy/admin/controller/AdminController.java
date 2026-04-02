package com.salessavvy.admin.controller;

import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @GetMapping("/stats")
    public Map<String, Object> getDashboardStats() {
        // Mocking dashboard stats
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", 150);
        stats.put("totalProducts", 45);
        stats.put("totalOrders", 89);
        stats.put("revenue", 12500.50);
        return stats;
    }

    @GetMapping("/health")
    public String checkHealth() {
        return "Admin Service is Up and Running";
    }
}
