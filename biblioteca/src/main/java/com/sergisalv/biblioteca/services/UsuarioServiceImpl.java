package com.sergisalv.biblioteca.services;

import com.google.common.hash.Hashing;
import com.sergisalv.biblioteca.entities.Usuario;
import com.sergisalv.biblioteca.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServiceImpl implements UsuarioService{

    @Autowired
    private UsuarioRepository repository;



    @Override
    public Usuario getUsuario(Integer id) {
        Optional<Usuario> usuario = repository.findById(id);
        if(usuario.isPresent()){
            return usuario.get();
        }
        return null;
    }

    @Override
    public List<Usuario> getAllUsuarios() {
        List<Usuario> list = new ArrayList<>();
        Iterable<Usuario> usuarios = repository.findAll();
        for(Usuario usuario : usuarios){
            list.add(usuario);
        }
        return list;
    }

    @Override
    public void removeUsuario(Integer id) {
        repository.deleteById(id);

    }

    @Override
    public void updateCustomer(Integer id, Usuario updateUsuario) {
        updateUsuario.setId(id);
        repository.save(updateUsuario);

    }
    //Todo Terminar y cambiar palabra secreta por variable
    @Override
    public void addUsuario(Usuario usuario) {

        repository.save(usuario);
    }

    @Override
    public List<Usuario> searchUsuario(String email) {
        return repository.findUsuarioByEmail(email);
    }
}
