package com.salessavvy.products.repository;

import com.salessavvy.products.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryId(Long categoryId);

    @Query(value = "SELECT * FROM products ORDER BY RAND() LIMIT :limit", nativeQuery = true)
    List<Product> findRandomProducts(int limit);
}
