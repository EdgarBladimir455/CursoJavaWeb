package com.uanl.ss2020.controller;

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
import com.uanl.ss2020.model.AlumnoWrapper;
import com.uanl.ss2020.model.Paginacion;
import com.uanl.ss2020.model.Usuario;
import com.uanl.ss2020.model.DTO.AlumnoDTO;
import com.uanl.ss2020.model.Usuario.UsuarioDatosGrid;
import com.uanl.ss2020.service.AlumnoService;

@RestController
@RequestMapping("/alumno")
@CrossOrigin
public class AlumnoController {

	@Autowired
	private AlumnoService alumnoService;
	
	@JsonView(UsuarioDatosGrid.class)
	@GetMapping(value = "/consultarActivos")
	public List<Usuario> consultarActivos() {
		return this.alumnoService.consultarActivos();
	}
	
	@JsonView(UsuarioDatosGrid.class)
	@GetMapping(value = "/consultarAlumno")
	public Usuario consultarAlumno(@RequestParam String idAlumno) {
		return this.alumnoService.consultarPorId(Integer.parseInt(idAlumno));
	}
	
	@JsonView(UsuarioDatosGrid.class)
	@GetMapping(value = "/consultarUsuariosConFiltros")
	public AlumnoWrapper consultarUsuariosConFiltros(Usuario usuarioFiltro, Paginacion paginacion) {
		return this.alumnoService.consultarUsuariosConFiltros(usuarioFiltro, paginacion);
	}
	
	@PostMapping("/agregarAlumno")
	public int agregarAlumno(@RequestBody AlumnoDTO alumno) throws Exception {
		return this.alumnoService.agregarAlumno(alumno);
	}
	
	@PostMapping("/editarAlumno")
	public int editarAlumno(@RequestBody AlumnoDTO alumno) throws Exception {
		return this.alumnoService.editarAlumno(alumno);
	}
	
	@PostMapping("/eliminarAlumno")
	public int eliminarAlumno(@RequestBody int idAlumno) throws Exception {
		return this.alumnoService.eliminarAlumno(idAlumno);
	}
	
}
