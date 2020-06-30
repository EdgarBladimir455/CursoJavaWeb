package com.uanl.ss2020.CursoJavaWeb.service;

import java.util.List;

import com.uanl.ss2020.CursoJavaWeb.model.AlumnoWrapper;
import com.uanl.ss2020.CursoJavaWeb.model.Paginacion;
import com.uanl.ss2020.CursoJavaWeb.model.Usuario;
import com.uanl.ss2020.CursoJavaWeb.model.DTO.AlumnoDTO;

public interface AlumnoService {
	public List<Usuario> consultarActivos();
	public int agregarAlumno(AlumnoDTO alumnoDTO) throws Exception;
	public int editarAlumno(AlumnoDTO alumnoDTO) throws Exception;
	public AlumnoWrapper consultarUsuariosConFiltros(Usuario usuarioFiltro, Paginacion paginacion);
	public Usuario consultarPorMatricula(int matricula);
	public Usuario consultarPorId(int idAlumno);
	public int eliminarAlumno(int idAlumno);
}
