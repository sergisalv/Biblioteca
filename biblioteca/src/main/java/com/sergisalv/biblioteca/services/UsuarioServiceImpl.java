package com.sergisalv.biblioteca.services;

import com.google.common.hash.Hashing;
import com.sergisalv.biblioteca.entities.Libro;
import com.sergisalv.biblioteca.entities.Usuario;
import com.sergisalv.biblioteca.repository.LibroRepository;
import com.sergisalv.biblioteca.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsuarioServiceImpl implements UsuarioService{

    @Autowired
    private UsuarioRepository repository;
    @Autowired
    private LibroRepository librorepository;



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
        // Obtener usuario actual
        Usuario oldUser = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Obtener préstamos antes y después
        List<String> antes = parsePrestamos(oldUser.getPrestamo());
        List<String> despues = parsePrestamos(updateUsuario.getPrestamo());

        // Determinar libros agregados y eliminados
        List<String> agregados = new ArrayList<>(despues);
        agregados.removeAll(antes);

        List<String> eliminados = new ArrayList<>(antes);
        eliminados.removeAll(despues);

        // Procesar libros agregados (prestar)
        for (String libroIdStr : agregados) {
            int libroId = Integer.parseInt(libroIdStr);
            Libro libro = librorepository.findById(libroId)
                    .orElseThrow(() -> new RuntimeException("Libro no encontrado (ID: " + libroId + ")"));

            if (libro.getDisponibles() <= 0) {
                throw new RuntimeException("No hay ejemplares disponibles del libro: " + libro.getTitulo());
            }

            libro.setDisponibles(libro.getDisponibles() - 1);
            librorepository.save(libro);
        }

        // Procesar libros eliminados (devolución)
        for (String libroIdStr : eliminados) {
            int libroId = Integer.parseInt(libroIdStr);
            Libro libro = librorepository.findById(libroId)
                    .orElseThrow(() -> new RuntimeException("Libro no encontrado (ID: " + libroId + ")"));

            libro.setDisponibles(libro.getDisponibles() + 1);
            librorepository.save(libro);
        }

        // Preservar campos protegidos
        updateUsuario.setId(id);
        updateUsuario.setPassword(oldUser.getPassword());
        updateUsuario.setAdministrador(false);

        // Guardar usuario actualizado
        repository.save(updateUsuario);
    }

    private List<String> parsePrestamos(String prestamos) {
        if (prestamos == null || prestamos.trim().isEmpty()) {
            return new ArrayList<>();
        }
        return Arrays.stream(prestamos.split(","))
                .map(String::trim)
                .collect(Collectors.toList());
    }



    @Override
    public void addUsuario(Usuario usuario) {

        repository.save(usuario);
    }

    @Override
    public List<Usuario> searchUsuario(String email) {
        return repository.findUsuarioByEmail(email);
    }
}
