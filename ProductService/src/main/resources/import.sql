-- Sales Savvy Seed Data
-- Initial Categories
INSERT INTO categories (id, name) VALUES (1, 'Men Fashion') ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO categories (id, name) VALUES (2, 'Women Fashion') ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO categories (id, name) VALUES (3, 'Accessories') ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO categories (id, name) VALUES (4, 'Lifestyle') ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Sample Products
INSERT INTO products (id, name, description, price, stock_quantity, image_url, rating, category_id) 
VALUES (101, 'Premium Oxford Shirt', 'Finest cotton tailored fit for formal excellence.', 2999.00, 50, 'https://picsum.photos/300?random=101', 4.8, 1)
ON DUPLICATE KEY UPDATE name=VALUES(name);

INSERT INTO products (id, name, description, price, stock_quantity, image_url, rating, category_id) 
VALUES (102, 'Leather Chrono Watch', 'Timeless aesthetics with precision engineering.', 8499.00, 20, 'https://picsum.photos/300?random=102', 4.9, 3)
ON DUPLICATE KEY UPDATE name=VALUES(name);

INSERT INTO products (id, name, description, price, stock_quantity, image_url, rating, category_id) 
VALUES (103, 'Minimalist Tote', 'Sustainable materials for the modern urban explorer.', 1599.00, 100, 'https://picsum.photos/300?random=103', 4.5, 4)
ON DUPLICATE KEY UPDATE name=VALUES(name);

INSERT INTO products (id, name, description, price, stock_quantity, image_url, rating, category_id) 
VALUES (104, 'Pulse Sneakers', 'Dynamic comfort for every stride.', 4599.00, 30, 'https://picsum.photos/300?random=104', 4.7, 4)
ON DUPLICATE KEY UPDATE name=VALUES(name);
