package com.salessavvy.products.repository;

import com.salessavvy.products.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
