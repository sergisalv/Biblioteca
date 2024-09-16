package com.sergisalv.biblioteca.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="libros")
public class Libro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String titulo;
    private String autor;
    private String isbn;
    private Integer disponibles;

}
