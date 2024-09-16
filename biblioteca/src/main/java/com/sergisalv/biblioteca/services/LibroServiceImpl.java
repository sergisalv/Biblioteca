package com.sergisalv.biblioteca.services;

import com.sergisalv.biblioteca.entities.Libro;
import com.sergisalv.biblioteca.repository.LibroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LibroServiceImpl implements LibroService{

    @Autowired
    private LibroRepository repository;

    @Override
    public Libro getLibro(Integer id) {
        Optional<Libro> libro = repository.findById(id);
        if(libro.isPresent()){
            return libro.get();
        }
        return null;
    }

    @Override
    public List<Libro> getAllLibros() {
        List<Libro> list = new ArrayList<>();
        Iterable<Libro> libros = repository.findAll();
        for(Libro libro: libros){
            list.add(libro);
        }
        return list;
    }

    @Override
    public void addLibro(Libro libro) {
        repository.save(libro);
    }

    @Override
    public void updateLibro(Integer id, Libro updateLibro) {
        updateLibro.setId(id);
        repository.save(updateLibro);
    }

    @Override
    public void removeLibro(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public List<Libro> searchLibro(String titulo, Integer isbn) {
        return repository.findByTituloOrIsbn(titulo,isbn);
    }
}
