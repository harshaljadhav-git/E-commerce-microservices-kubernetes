
SET FOREIGN_KEY_CHECKS = 0;

-- ==========================================
-- Product Service
-- ==========================================
CREATE DATABASE IF NOT EXISTS productservice;
USE productservice;

DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS products;

CREATE TABLE categories (
	category_id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	parent_category_id INT(11),
	category_title VARCHAR(255),
	image_url VARCHAR(255),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_parent_category FOREIGN KEY (parent_category_id) REFERENCES categories (category_id)
);

INSERT INTO categories (category_id, parent_category_id, category_title, image_url) VALUES
(1, NULL, 'Electronics', 'https://e-com-b3-bucket.s3.ap-south-1.amazonaws.com/Harshal_jadhav_Single_wireless_headphone_on_clean_white_background%2C_modern_sleek_df59b047-4b5a-407f-992b-68a92fa467ef_upscaled.png'),
(2, NULL, 'Clothing', 'https://e-com-b3-bucket.s3.ap-south-1.amazonaws.com/Harshal_jadhav_Single_folded_casual_shirt_on_pure_white_background%2C_front_view%2C_812830a2-bcee-416e-9f10-135c21054178.png'),
(3, 1, 'Laptops', 'https://e-com-b3-bucket.s3.ap-south-1.amazonaws.com/Harshal_jadhav_Premium_sleek_laptop_with_ultra-thin_design%2C_open_at_perfect_angl_8ad8b33f-5b12-42ca-b9b6-0211f9fb1e5b_upscaled.png'),
(4, 1, 'Smartphones', 'https://e-com-b3-bucket.s3.ap-south-1.amazonaws.com/Harshal_jadhav_Single_modern_smartphone_standing_upright_on_white_background%2C_fr_add46221-7084-49e0-a66e-c32d9808c0f6_upscaled.png'),
(5, 2, 'T-Shirts', 'https://e-com-b3-bucket.s3.ap-south-1.amazonaws.com/Harshal_jadhav_Single_plain_t-shirt_flat_lay_on_white_background%2C_front_view%2C_wr_8f461104-01c6-4eb7-93aa-400c4c5b7c39.png');

CREATE TABLE products (
	product_id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	category_id INT(11),
	product_title VARCHAR(255),
	image_url VARCHAR(255),
	sku VARCHAR(255),
	price_unit DECIMAL(7, 2),
	quantity INT(11),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_product_category FOREIGN KEY (category_id) REFERENCES categories (category_id)
);

INSERT INTO products (product_id, category_id, product_title, image_url, sku, price_unit, quantity) VALUES
(1, 4, 'Smartphone Model X', 'https://e-com-b3-bucket.s3.ap-south-1.amazonaws.com/Harshal_jadhav_Single_modern_smartphone_standing_upright_on_white_background%2C_fr_add46221-7084-49e0-a66e-c32d9808c0f6_upscaled.png', 'SKU101', 599.99, 20),
(2, 4, 'Smartphone Model Y', 'https://e-com-b3-bucket.s3.ap-south-1.amazonaws.com/Gemini-pics/mobile.png', 'SKU102', 699.99, 15),
(3, 3, 'Laptop Model A', 'https://e-com-b3-bucket.s3.ap-south-1.amazonaws.com/Harshal_jadhav_Premium_sleek_laptop_with_ultra-thin_design%2C_open_at_perfect_angl_8ad8b33f-5b12-42ca-b9b6-0211f9fb1e5b_upscaled.png', 'SKU001', 999.99, 10),
(4, 3, 'Laptop Model B', 'https://e-com-b3-bucket.s3.ap-south-1.amazonaws.com/Gemini-pics/Laptop.png', 'SKU002', 1299.99, 5),
(5, 5, 'T-Shirt Red', 'https://e-com-b3-bucket.s3.ap-south-1.amazonaws.com/Gemini-pics/t-shirt+red.png', 'SKU200', 19.99, 50),
(6, 5, 'T-Shirt Blue', 'https://e-com-b3-bucket.s3.ap-south-1.amazonaws.com/Gemini-pics/blue-tshirt.png', 'SKU201', 19.99, 30),
(7, 3, 'Lenovo ThinkPad X1', 'https://e-com-b3-bucket.s3.ap-south-1.amazonaws.com/Gemini-pics/laptop-lenovo.png', 'LTP-X1', 1600.00, 20),
(8, 4, 'Google Pixel 8', 'https://e-com-b3-bucket.s3.ap-south-1.amazonaws.com/Gemini-pics/google+pixel.png', 'GPX-8', 799.00, 45),
(9, 1, 'Sony Headphones', 'https://e-com-b3-bucket.s3.ap-south-1.amazonaws.com/Gemini-pics/wireless.png', 'SNY-HP', 299.00, 60),
(10, 1, 'Mechanical Keyboard', 'https://e-com-b3-bucket.s3.ap-south-1.amazonaws.com/Gemini-pics/keyboard.png', 'MKB-001', 120.00, 40);


-- ==========================================
-- Inventory Service
-- ==========================================
CREATE DATABASE IF NOT EXISTS inventoryservice;
USE inventoryservice;

DROP TABLE IF EXISTS inventory;

CREATE TABLE inventory (
       id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
       productName VARCHAR(255) NOT NULL,
       quantity INT NOT NULL
) ENGINE=InnoDB;

INSERT INTO inventory (productName, quantity) VALUES
('Smartphone Model X', 20),
('Smartphone Model Y', 15),
('Laptop Model A', 10),
('Laptop Model B', 5),
('T-Shirt Red', 50),
('T-Shirt Blue', 30),
('Lenovo ThinkPad X1', 20),
('Google Pixel 8', 45),
('Sony Headphones', 60),
('Mechanical Keyboard', 40);


-- ==========================================
-- User Service
-- ==========================================
CREATE DATABASE IF NOT EXISTS userservice;
USE userservice;

DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS user_role;
DROP TABLE IF EXISTS hibernate_sequence;

CREATE TABLE hibernate_sequence (
    next_val BIGINT
);
INSERT INTO hibernate_sequence VALUES (1);

CREATE TABLE roles (
    id BIGINT NOT NULL PRIMARY KEY,
    role_name VARCHAR(60) UNIQUE
);
INSERT INTO roles (id, role_name) VALUES (1, 'USER'), (2, 'PM'), (3, 'ADMIN');

CREATE TABLE users (
    user_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    image_url LONGTEXT,
    email VARCHAR(50) UNIQUE,
    full_name VARCHAR(50),
    gender VARCHAR(255) NOT NULL,
    password VARCHAR(100),
    phone_number VARCHAR(11),
    user_name VARCHAR(50) UNIQUE
);
INSERT INTO users (email, full_name, gender, password, phone_number, user_name) VALUES
('test@example.com', 'Test User', 'Male', '$2a$10$wKokd4Hk7k.1X/yH.dO1.e1.1.1.1.1.1.1.1.1.1', '1234567890', 'testuser'); 

CREATE TABLE user_role (
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (role_id) REFERENCES roles (id)
);


-- ==========================================
-- Order Service
-- ==========================================
CREATE DATABASE IF NOT EXISTS orderservice;
USE orderservice;

DROP TABLE IF EXISTS carts;
DROP TABLE IF EXISTS orders;

CREATE TABLE carts (
	cart_id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	user_id BIGINT(20),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
    -- Foreign key to users would require cross-db FK which is messy. Omitting enforcement for now or assuming app handles it.
);

CREATE TABLE orders (
	order_id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	cart_id INT(11),
	order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	order_desc VARCHAR(255),
	order_fee DECIMAL(7, 2),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cart_id) REFERENCES carts (cart_id)
);


-- ==========================================
-- Shipping Service
-- ==========================================
CREATE DATABASE IF NOT EXISTS shippingservice;
USE shippingservice;

DROP TABLE IF EXISTS order_items;

CREATE TABLE order_items (
	product_id INT(11) NOT NULL,
	order_id INT(11) NOT NULL,
	ordered_quantity INT(11),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (product_id, order_id)
);


-- ==========================================
-- Payment Service
-- ==========================================
CREATE DATABASE IF NOT EXISTS paymentservice;
USE paymentservice;

DROP TABLE IF EXISTS payments;

CREATE TABLE payments (
	payment_id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	order_id INT(11),
	is_payed BOOLEAN,
	payment_status VARCHAR(255),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);


-- ==========================================
-- Favourite Service
-- ==========================================
CREATE DATABASE IF NOT EXISTS favouriteservice;
USE favouriteservice;

DROP TABLE IF EXISTS favourites;

CREATE TABLE favourites
(
    user_id    BIGINT                                 NOT NULL,
    product_id INT                                 NOT NULL,
    like_date  TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, product_id, like_date)
);


-- ==========================================
-- Tax Service
-- ==========================================
CREATE DATABASE IF NOT EXISTS tax;
USE tax;

DROP TABLE IF EXISTS tax_rate;
DROP TABLE IF EXISTS tax_class;

CREATE TABLE tax_class (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(255) NOT NULL, 
    created_by VARCHAR(255), 
    created_on TIMESTAMP(6), 
    last_modified_by VARCHAR(255), 
    last_modified_on TIMESTAMP(6)
);
CREATE TABLE tax_rate (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    rate DOUBLE NOT NULL, 
    zip_code VARCHAR(25), 
    tax_class_id BIGINT NOT NULL, 
    state_or_province_id BIGINT, 
    country_id BIGINT NOT NULL, 
    created_by VARCHAR(255), 
    created_on TIMESTAMP(6), 
    last_modified_by VARCHAR(255), 
    last_modified_on TIMESTAMP(6),
    FOREIGN KEY (tax_class_id) REFERENCES tax_class(id)
);


-- ==========================================
-- Rating Service
-- ==========================================
CREATE DATABASE IF NOT EXISTS rating;
USE rating;

DROP TABLE IF EXISTS rating;

CREATE TABLE rating (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    created_by VARCHAR(255), 
    created_on TIMESTAMP(6), 
    last_modified_by VARCHAR(255), 
    last_modified_on TIMESTAMP(6), 
    content VARCHAR(255), 
    first_name VARCHAR(255), 
    last_name VARCHAR(255), 
    product_id BIGINT, 
    rating_star INTEGER NOT NULL
);


-- ==========================================
-- Promotion Service
-- ==========================================
CREATE DATABASE IF NOT EXISTS promotion;
USE promotion;

DROP TABLE IF EXISTS promotion;

CREATE TABLE promotion (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    description VARCHAR(255) NULL,
    coupon_code VARCHAR(255),
    discount_percentage BIGINT NOT NULL,
    discount_amount BIGINT NOT NULL,
    is_active BOOLEAN NOT NULL,
    start_date TIMESTAMP NULL,
    end_date TIMESTAMP NULL,
    created_by VARCHAR(255),
    created_on TIMESTAMP,
    last_modified_by VARCHAR(255),
    last_modified_on TIMESTAMP
);

SET FOREIGN_KEY_CHECKS = 1;
