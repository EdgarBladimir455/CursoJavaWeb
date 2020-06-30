package com.uanl.ss2020.CursoJavaWeb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.uanl.ss2020.CursoJavaWeb.model.Estatus;
import com.uanl.ss2020.CursoJavaWeb.model.Usuario.UsuarioDatosGrid;
import com.uanl.ss2020.CursoJavaWeb.service.EstatusService;

@RestController
@RequestMapping("/estatus")
@CrossOrigin
public class EstatusController {

	@Autowired
	private EstatusService estatusService;
	
	@JsonView(UsuarioDatosGrid.class)
	@GetMapping(value = "/consultar")
	public List<Estatus> consultar() {
		return this.estatusService.consultar();
	}
}
