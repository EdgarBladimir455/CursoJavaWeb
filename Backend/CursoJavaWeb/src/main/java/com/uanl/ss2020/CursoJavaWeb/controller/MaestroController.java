package com.uanl.ss2020.CursoJavaWeb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.uanl.ss2020.CursoJavaWeb.model.MaestroWrapper;
import com.uanl.ss2020.CursoJavaWeb.model.Paginacion;
import com.uanl.ss2020.CursoJavaWeb.model.Usuario;
import com.uanl.ss2020.CursoJavaWeb.model.DTO.MaestroDTO;
import com.uanl.ss2020.CursoJavaWeb.model.Usuario.UsuarioDatosGrid;
import com.uanl.ss2020.CursoJavaWeb.service.MaestroService;

@RestController
@RequestMapping("/maestro")
@CrossOrigin
public class MaestroController {

	@Autowired
	private MaestroService maestroService;
	
	@JsonView(UsuarioDatosGrid.class)
	@GetMapping(value = "/consultarActivos")
	public List<Usuario> consultarActivos() {
		return this.maestroService.consultarActivos();
	}
	
	@JsonView(UsuarioDatosGrid.class)
	@GetMapping(value = "/consultarMaestro")
	public Usuario consultarMaestro(@RequestParam String idMaestro) {
		return this.maestroService.consultarPorId(Integer.parseInt(idMaestro));
	}
	
	@JsonView(UsuarioDatosGrid.class)
	@GetMapping(value = "/consultarUsuariosConFiltros")
	public MaestroWrapper consultarUsuariosConFiltros(Usuario usuarioFiltro, Paginacion paginacion) {
		return this.maestroService.consultarUsuariosConFiltros(usuarioFiltro, paginacion);
	}
	
	@PostMapping("/agregarMaestro")
	public int agregarMaestro(@RequestBody MaestroDTO maestroDTO) throws Exception {
		return this.maestroService.agregarMaestro(maestroDTO);
	}
	
	@PostMapping("/editarMaestro")
	public int editarMaestro(@RequestBody MaestroDTO maestroDTO) throws Exception {
		return this.maestroService.editarMaestro(maestroDTO);
	}
	
	@PostMapping("/eliminarMaestro")
	public int eliminarMaestro(@RequestBody int idMaestro) throws Exception {
		return this.maestroService.eliminarMaestro(idMaestro);
	}
	
}
