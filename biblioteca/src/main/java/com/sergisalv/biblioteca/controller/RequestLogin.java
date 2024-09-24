package com.sergisalv.biblioteca.controller;

import lombok.Data;

@Data
public class RequestLogin {
    private String email;
    private String password;
}
