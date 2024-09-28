package com.sergisalv.biblioteca.controller;

import com.sergisalv.biblioteca.entities.Usuario;
import com.sergisalv.biblioteca.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @GetMapping("/usuario/{id}")
    public Usuario getUsuario(@PathVariable Integer id){
        return service.getUsuario(id);
    }

    @GetMapping ("/usuario")
    public List<Usuario> getAllUsuarios(){
        return service.getAllUsuarios();
    }

    @DeleteMapping("/usuario/{id}")
    public void removeUsuario(@PathVariable Integer id){
        service.removeUsuario(id);
    }

    @PostMapping("/usuario")
    public void addUsuario(@RequestBody Usuario usuario){
        service.addUsuario(usuario);
    }

    @PutMapping("/usuario/{id}")
    public void updateUsuario(@PathVariable Integer id,
                              @RequestBody Usuario updateUsuario){
        Usuario oldUser = service.getUsuario(id);

        updateUsuario.setId(id);
        updateUsuario.setPassword(oldUser.getPassword());
        updateUsuario.setAdministrador(false);
        service.updateCustomer(id,updateUsuario);
    }

    @GetMapping("/usuario/search")
    public List<Usuario> searchUsuario(@RequestParam(name="email") String email){
    return service.searchUsuario(email);
    }




}
