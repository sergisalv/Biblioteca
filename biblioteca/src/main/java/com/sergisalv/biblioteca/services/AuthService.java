package com.sergisalv.biblioteca.services;

import com.sergisalv.biblioteca.entities.Usuario;

public interface AuthService {

    Usuario login(String email, String password);
}
