package com.uanl.ss2020.dao;

import java.util.List;

import com.uanl.ss2020.model.Alumno;
import com.uanl.ss2020.model.AlumnoWrapper;
import com.uanl.ss2020.model.Paginacion;
import com.uanl.ss2020.model.Usuario;

public interface AlumnoDAO {
	public List<Usuario> consultarActivos();
	public AlumnoWrapper consultarUsuariosConFiltros(Usuario usuarioFiltro, Paginacion paginacion);
	public int agregarAlumno(Alumno alumno);
	public int editarAlumno(Alumno alumno);
	public Usuario consultarPorMatricula(int matricula);
	public Usuario consultarPorId(int idAlumno);
	public int eliminarAlumno(int idAlumno);
}
