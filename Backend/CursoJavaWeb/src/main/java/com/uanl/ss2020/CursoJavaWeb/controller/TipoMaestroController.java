package com.uanl.ss2020.CursoJavaWeb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.uanl.ss2020.CursoJavaWeb.model.TipoMaestro;
import com.uanl.ss2020.CursoJavaWeb.model.Usuario.UsuarioDatosGrid;
import com.uanl.ss2020.CursoJavaWeb.service.TipoMaestroService;

@RestController
@RequestMapping("/tipoMaestro")
@CrossOrigin
public class TipoMaestroController {

	@Autowired
	private TipoMaestroService tipoMaestroService;
	
	
	@JsonView(UsuarioDatosGrid.class)
	@GetMapping(value = "/consultar")
	public List<TipoMaestro> consultar() {
		return this.tipoMaestroService.consultar();
	}
}
