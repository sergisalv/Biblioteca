package com.sergisalv.biblioteca.controller;

import com.google.common.hash.Hashing;
import com.sergisalv.biblioteca.Utils.JwtUtil;
import com.sergisalv.biblioteca.dto.RequestLogin;
import com.sergisalv.biblioteca.entities.Usuario;
import com.sergisalv.biblioteca.repository.UsuarioRepository;
import com.sergisalv.biblioteca.services.AuthService;
import com.sergisalv.biblioteca.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService service;

    @Autowired
    private UsuarioService usuarioService;


    @PostMapping("/auth/login")
    public String login(@RequestBody RequestLogin request){
        String email = request.getEmail();
        String password = request.getPassword();
        Usuario usuario = service.login(email,password);
        String token = JwtUtil.generateToken(usuario);
        return token;
    }

    @PostMapping("/auth/register")
    public void registerUsuario(@RequestBody Usuario usuario){
        service.register(usuario);
    }

    @GetMapping("/auth/existeUsuario")
    public Boolean existe(@RequestHeader String Authorization){
        String id = JwtUtil.getUserIdByToken(Authorization);
        Usuario usuario = usuarioService.getUsuario(Integer.valueOf(id));
        return usuario != null;
    }


    @GetMapping("/auth/administrator")
     public Boolean isAdministrator(@RequestHeader String Authorization){
        String id = JwtUtil.getUserIdByToken(Authorization);
        Usuario usuario = usuarioService.getUsuario(Integer.valueOf(id));
        return usuario.getAdministrador();
    }

}

