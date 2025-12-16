package com.hoangtien2k3.productservice.service.impl;

import com.hoangtien2k3.productservice.dto.ProductDto;
import com.hoangtien2k3.productservice.entity.Product;
import com.hoangtien2k3.productservice.exception.wrapper.ProductNotFoundException;
import com.hoangtien2k3.productservice.helper.ProductMappingHelper;
import com.hoangtien2k3.productservice.repository.ProductRepository;
import com.hoangtien2k3.productservice.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Transactional
@Slf4j
@RequiredArgsConstructor
@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private final ProductRepository productRepository;

    @Override
    public List<ProductDto> findAll() {
        log.info("ProductDto List, service, fetch all products");
        return productRepository.findAll().stream()
                .map(ProductMappingHelper::map)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDto> findByName(String name) {
        log.info("ProductDto List, service, search products by name");
        return productRepository.findByNameContainingIgnoreCase(name).stream()
                .map(ProductMappingHelper::map)
                .collect(Collectors.toList());
    }

    @Override
    public ProductDto findById(Integer productId) {
        log.info("ProductDto, service; fetch product by id");
        return productRepository.findById(productId)
                .map(ProductMappingHelper::map)
                .orElseThrow(() -> new ProductNotFoundException(String.format("Product with id[%d] not found", productId)));
    }

    @Override
    public ProductDto save(ProductDto productDto) {
        log.info("ProductDto, service; save product");
        Product product = ProductMappingHelper.map(productDto);
        return ProductMappingHelper.map(productRepository.save(product));
    }

    @Override
    public ProductDto update(ProductDto productDto) {
        log.info("ProductDto, service; update product");
        Product product = ProductMappingHelper.map(productDto);
        return ProductMappingHelper.map(productRepository.save(product));
    }

    @Override
    public ProductDto update(Integer productId, ProductDto productDto) {
        log.info("ProductDto, service; update product with productId");
        Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Product not found with id: " + productId));
        BeanUtils.copyProperties(productDto, existingProduct, "productId");
        Product updatedProduct = productRepository.save(existingProduct);
        return ProductMappingHelper.map(updatedProduct);
    }

    @Override
    public void deleteById(Integer productId) {
        log.info("Void, service; delete product by id");
        productRepository.deleteById(productId);
    }
}
