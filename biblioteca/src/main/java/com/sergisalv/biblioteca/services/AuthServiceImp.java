package com.sergisalv.biblioteca.services;

import com.sergisalv.biblioteca.entities.Usuario;
import com.sergisalv.biblioteca.repository.UsuarioRepository;
import com.google.common.hash.Hashing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.List;



@Service
public class AuthServiceImp implements AuthService{

    @Autowired
    private UsuarioRepository usuarioRepository;


    @Override
    public Usuario login(String email, String password) {
        String hashPassword = Hashing.sha256()
                .hashString(password + System.getenv("Palabra_Secreta"), StandardCharsets.UTF_8)
                .toString();

        List<Usuario> result = usuarioRepository.findByEmailAndPassword(email,hashPassword);
        if(result.isEmpty()){
            return null;
            //no encontró nada
        }else{
            return result.get(0);
            //encontró el usuario
        }
    }
}
