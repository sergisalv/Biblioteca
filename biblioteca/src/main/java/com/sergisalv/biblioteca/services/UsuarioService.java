package com.sergisalv.biblioteca.services;

import com.sergisalv.biblioteca.entities.Usuario;

import java.util.List;

public interface UsuarioService {

    Usuario getUsuario(Integer id);
    List<Usuario> getAllUsuarios();
    void removeUsuario(Integer id);
    void updateCustomer(Integer id, Usuario updateUsuario);
    void addUsuario(Usuario usuario);
    List<Usuario> searchUsuario (String email);


}
