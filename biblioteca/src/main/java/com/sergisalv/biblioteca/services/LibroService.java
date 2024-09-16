package com.sergisalv.biblioteca.services;

import com.sergisalv.biblioteca.entities.Libro;

import java.util.List;

public interface LibroService {

    Libro getLibro(Integer id);
    List<Libro> getAllLibros();
    void addLibro(Libro libro);
    void updateLibro(Integer id, Libro updateLibro);
    void removeLibro(Integer id);
    List<Libro> searchLibro(String titulo, Integer isbn);

}
