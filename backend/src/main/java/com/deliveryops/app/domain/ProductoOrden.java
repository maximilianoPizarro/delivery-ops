package com.deliveryops.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ProductoOrden.
 */
@Entity
@Table(name = "producto_orden")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ProductoOrden implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Min(value = 0)
    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "precio_total", precision = 21, scale = 2, nullable = false)
    private BigDecimal precioTotal;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "productoCategoria" }, allowSetters = true)
    private Producto producto;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "ordens", "cliente" }, allowSetters = true)
    private Carrito cart;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ProductoOrden id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCantidad() {
        return this.cantidad;
    }

    public ProductoOrden cantidad(Integer cantidad) {
        this.setCantidad(cantidad);
        return this;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public BigDecimal getPrecioTotal() {
        return this.precioTotal;
    }

    public ProductoOrden precioTotal(BigDecimal precioTotal) {
        this.setPrecioTotal(precioTotal);
        return this;
    }

    public void setPrecioTotal(BigDecimal precioTotal) {
        this.precioTotal = precioTotal;
    }

    public Producto getProducto() {
        return this.producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public ProductoOrden producto(Producto producto) {
        this.setProducto(producto);
        return this;
    }

    public Carrito getCart() {
        return this.cart;
    }

    public void setCart(Carrito carrito) {
        this.cart = carrito;
    }

    public ProductoOrden cart(Carrito carrito) {
        this.setCart(carrito);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProductoOrden)) {
            return false;
        }
        return id != null && id.equals(((ProductoOrden) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProductoOrden{" +
            "id=" + getId() +
            ", cantidad=" + getCantidad() +
            ", precioTotal=" + getPrecioTotal() +
            "}";
    }
}
