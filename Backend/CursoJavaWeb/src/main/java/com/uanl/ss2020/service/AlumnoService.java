package com.uanl.ss2020.service;

import java.util.List;

import com.uanl.ss2020.model.AlumnoWrapper;
import com.uanl.ss2020.model.Paginacion;
import com.uanl.ss2020.model.Usuario;
import com.uanl.ss2020.model.DTO.AlumnoDTO;

public interface AlumnoService {
	public List<Usuario> consultarActivos();
	public int agregarAlumno(AlumnoDTO alumnoDTO) throws Exception;
	public int editarAlumno(AlumnoDTO alumnoDTO) throws Exception;
	public AlumnoWrapper consultarUsuariosConFiltros(Usuario usuarioFiltro, Paginacion paginacion);
	public Usuario consultarPorMatricula(int matricula);
	public Usuario consultarPorId(int idAlumno);
	public int eliminarAlumno(int idAlumno);
}
