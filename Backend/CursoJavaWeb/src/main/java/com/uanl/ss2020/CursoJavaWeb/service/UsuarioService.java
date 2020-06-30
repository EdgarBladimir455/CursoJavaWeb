package com.uanl.ss2020.CursoJavaWeb.service;

import java.util.List;

import com.uanl.ss2020.CursoJavaWeb.model.JwtRequest;
import com.uanl.ss2020.CursoJavaWeb.model.Paginacion;
import com.uanl.ss2020.CursoJavaWeb.model.Usuario;

public interface UsuarioService {
	public int registrarAdministrador(JwtRequest register);
	public List<Usuario> consultarUsuarios();
	public List<Usuario> consultarUsuariosConFiltros(Usuario usuarioFiltro, Paginacion paginacion);
	public int agregarUsuario(Usuario usuario);
	public int editarUsuario(Usuario usuario);
	public Usuario consultarPorUsuario(String usuario);
	public Usuario consultarPorId(int id);
}
