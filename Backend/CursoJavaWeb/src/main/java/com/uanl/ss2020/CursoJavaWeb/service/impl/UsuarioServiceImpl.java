package com.uanl.ss2020.CursoJavaWeb.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.uanl.ss2020.CursoJavaWeb.dao.UsuarioDAO;
import com.uanl.ss2020.CursoJavaWeb.model.Estatus;
import com.uanl.ss2020.CursoJavaWeb.model.JwtRequest;
import com.uanl.ss2020.CursoJavaWeb.model.Paginacion;
import com.uanl.ss2020.CursoJavaWeb.model.TipoPerfil;
import com.uanl.ss2020.CursoJavaWeb.model.Usuario;
import com.uanl.ss2020.CursoJavaWeb.service.UsuarioService;

@Service
public class UsuarioServiceImpl implements UsuarioService {

	@Autowired
	private UsuarioDAO usuarioDAO;

	@Autowired
	private PasswordEncoder bcryptEncoder;	
	
	@Override
	@Transactional
	public List<Usuario> consultarUsuarios() {
		return this.usuarioDAO.consultarUsuarios();
	}

	@Override
	@Transactional
	public int registrarAdministrador(JwtRequest register) {
		Usuario usuarioAdministrador = new Usuario();
		usuarioAdministrador.setNombre("admin");
		usuarioAdministrador.setUsuario("admin");
		usuarioAdministrador.setContrasena(this.bcryptEncoder.encode(register.getPassword()));

		usuarioAdministrador.setEstatus(new Estatus(1));
		usuarioAdministrador.setTipoPerfil(new TipoPerfil(1));
		
		return this.usuarioDAO.agregarUsuario(usuarioAdministrador);
	}

	@Override
	@Transactional
	public int agregarUsuario(Usuario usuario) {
		usuario.setContrasena(this.bcryptEncoder.encode(usuario.getContrasena()));
		return this.usuarioDAO.agregarUsuario(usuario);
	}
	
	@Override
	@Transactional
	public int editarUsuario(Usuario usuario) {
		return this.usuarioDAO.editarUsuario(usuario);
	}

	@Override
	@Transactional
	public Usuario consultarPorUsuario(String usuario) {
		return this.usuarioDAO.consultarPorUsuario(usuario);
	}

	@Override
	@Transactional
	public List<Usuario> consultarUsuariosConFiltros(Usuario usuarioFiltro, Paginacion paginacion) {
		return this.usuarioDAO.consultarUsuariosConFiltros(usuarioFiltro, paginacion);
	}

	@Override
	public Usuario consultarPorId(int id) {
		return this.usuarioDAO.consultarPorId(id);
	}

}
