package com.sergisalv.biblioteca.services;

import com.sergisalv.biblioteca.entities.Usuario;
import com.sergisalv.biblioteca.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImp implements AuthService{

    @Autowired
    private UsuarioRepository usuarioRepository;


    @Override
    public Usuario login(String email, String password) {
        return null;
    }
}
