package com.sergisalv.biblioteca.controller;

import com.sergisalv.biblioteca.Utils.JwtUtil;
import com.sergisalv.biblioteca.dto.RequestLogin;
import com.sergisalv.biblioteca.entities.Usuario;
import com.sergisalv.biblioteca.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping("/auth/login")
    public String login(@RequestBody RequestLogin request){
        String email = request.getEmail();
        String password = request.getPassword();
        Usuario usuario = service.login(email,password);
        String token = JwtUtil.generateToken(usuario);
        return token;
    }
}

