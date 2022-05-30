package com.deliveryops.app.repository;

import com.deliveryops.app.domain.ProductoOrden;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ProductoOrden entity.
 */
@Repository
public interface ProductoOrdenRepository extends JpaRepository<ProductoOrden, Long> {
    default Optional<ProductoOrden> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<ProductoOrden> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<ProductoOrden> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct productoOrden from ProductoOrden productoOrden left join fetch productoOrden.producto",
        countQuery = "select count(distinct productoOrden) from ProductoOrden productoOrden"
    )
    Page<ProductoOrden> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct productoOrden from ProductoOrden productoOrden left join fetch productoOrden.producto")
    List<ProductoOrden> findAllWithToOneRelationships();

    @Query("select productoOrden from ProductoOrden productoOrden left join fetch productoOrden.producto where productoOrden.id =:id")
    Optional<ProductoOrden> findOneWithToOneRelationships(@Param("id") Long id);
}
