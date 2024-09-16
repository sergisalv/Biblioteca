package com.sergisalv.biblioteca.repository;

import com.sergisalv.biblioteca.entities.Libro;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LibroRepository extends CrudRepository<Libro,Integer> {

    //SQL
    @Query("SELECT c FROM Libro c WHERE titulo LIKE %:titulo% OR isbn LIKE %:isbn%")

    List<Libro> findByTituloOrIsbn(@Param("titulo") String titulo, Integer isbn);
}
