package com.uanl.ss2020.CursoJavaWeb.dao;

import java.util.List;

import com.uanl.ss2020.CursoJavaWeb.model.Maestro;
import com.uanl.ss2020.CursoJavaWeb.model.MaestroWrapper;
import com.uanl.ss2020.CursoJavaWeb.model.Paginacion;
import com.uanl.ss2020.CursoJavaWeb.model.Usuario;

public interface MaestroDAO {
	public List<Usuario> consultarActivos();
	public MaestroWrapper consultarUsuariosConFiltros(Usuario usuarioFiltro, Paginacion paginacion);
	public int agregarMaestro(Maestro maestro);
	public int editarMaestro(Maestro maestro);
	public Usuario consultarPorNumeroEmpleado(int numeroEmpleado);
	public Usuario consultarPorId(int idMaestro);
	public int eliminarMaestro(int idMaestro);
}
