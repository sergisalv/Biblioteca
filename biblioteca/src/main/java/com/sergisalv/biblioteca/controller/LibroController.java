package com.sergisalv.biblioteca.controller;

import com.sergisalv.biblioteca.entities.Libro;
import com.sergisalv.biblioteca.services.LibroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class LibroController {

    @Autowired
    private LibroService service;

    @GetMapping("/libro/{id}") //Trae un libro específico por su id
    public Libro getLibro(@PathVariable Integer id) {
        return service.getLibro(id);
    }

    @GetMapping("/libro/prestamo") //Trae los libros que haya en préstamo
    public List<Libro> getLibrosPrestamo(@RequestBody String prestamo){
        return service.getLibrosPrestamo(prestamo);
    }
    
    @GetMapping("/libro") //Trae todos los libros
    public List<Libro> getAllLibros(){
        return service.getAllLibros();
    }

    @DeleteMapping ("/libro/{id}") //Borra un libro por su id
    public void removeLibro(@PathVariable Integer id){
        service.removeLibro(id);
    }

    @PostMapping("/libro") //Agregamos un libro
    public void registerLibro(@RequestBody Libro libro){
        service.addLibro(libro);
    }

    @PutMapping("/libro/{id}") //Modificamos un libro
    public void updateLibro(@PathVariable Integer id,
                            @RequestBody Libro updatelibro){
        service.updateLibro(id,updatelibro);
    }

    @GetMapping("libro/search") //Buscamos un libro
    public List<Libro> searchLibro (@RequestParam(name ="titulo", required = false) String titulo,
                                    @RequestParam(name="isbn", required = false) String isbn){
        if(titulo == null){
            return service.searchLibro(titulo, isbn);
        }else{
            return service.searchLibro(titulo.toUpperCase(), isbn);
        }

    }



}
