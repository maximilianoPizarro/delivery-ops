package com.deliveryops.app.repository;

import com.deliveryops.app.domain.ProductoCategoria;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ProductoCategoria entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductoCategoriaRepository extends JpaRepository<ProductoCategoria, Long> {}
