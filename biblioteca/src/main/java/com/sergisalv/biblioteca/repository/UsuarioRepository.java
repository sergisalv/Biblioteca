package com.sergisalv.biblioteca.repository;

import com.sergisalv.biblioteca.entities.Usuario;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsuarioRepository extends CrudRepository<Usuario, Integer> {

    @Query("SELECT c FROM Usuario c WHERE email = :email AND password = :password ")
    List<Usuario> findByEmailAndPassword(@Param("email") String email, @Param("password") String password);

    @Query("SELECT c FROM Usuario c WHERE email LIKE %:email%")
    List<Usuario> findUsuarioByEmail(@Param("email") String email);
}
