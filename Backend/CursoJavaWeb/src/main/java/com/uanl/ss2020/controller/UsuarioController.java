package com.uanl.ss2020.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.uanl.ss2020.model.JwtRequest;
import com.uanl.ss2020.model.Usuario;
import com.uanl.ss2020.model.Usuario.UsuarioDatosGenerales;
import com.uanl.ss2020.service.UsuarioService;

@RestController
@RequestMapping("/usuario")
@CrossOrigin
public class UsuarioController {
	
	@Autowired
	private UsuarioService usuarioService;

	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public ResponseEntity<?> register(@RequestBody JwtRequest registerRequest)
			throws Exception {

		int idUsuario = this.usuarioService.registrarAdministrador(registerRequest);
		return ResponseEntity.ok(idUsuario);
	}
	
	@JsonView(UsuarioDatosGenerales.class)
	@GetMapping(value = "/consultar",
				params = { "usuario" })
	public Usuario consultarUsuario(@RequestParam("usuario") String usuario) {
		return this.usuarioService.consultarPorUsuario(usuario);
	}
	
}
