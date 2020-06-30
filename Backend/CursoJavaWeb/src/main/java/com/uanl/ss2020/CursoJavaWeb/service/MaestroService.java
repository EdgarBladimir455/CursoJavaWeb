package com.uanl.ss2020.CursoJavaWeb.service;

import java.util.List;

import com.uanl.ss2020.CursoJavaWeb.model.MaestroWrapper;
import com.uanl.ss2020.CursoJavaWeb.model.Paginacion;
import com.uanl.ss2020.CursoJavaWeb.model.Usuario;
import com.uanl.ss2020.CursoJavaWeb.model.DTO.MaestroDTO;

public interface MaestroService {
	public List<Usuario> consultarActivos();
	public MaestroWrapper consultarUsuariosConFiltros(Usuario usuarioFiltro, Paginacion paginacion);
	public int agregarMaestro(MaestroDTO maestroDTO) throws Exception;
	public int editarMaestro(MaestroDTO maestroDTO) throws Exception;
	public Usuario consultarPorNumeroEmpleado(int numeroEmpleado);
	public Usuario consultarPorId(int idMaestro);
	public int eliminarMaestro(int idMaestro);
}
