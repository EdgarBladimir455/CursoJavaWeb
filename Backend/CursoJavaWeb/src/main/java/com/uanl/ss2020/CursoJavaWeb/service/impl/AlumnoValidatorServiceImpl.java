package com.uanl.ss2020.CursoJavaWeb.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uanl.ss2020.CursoJavaWeb.model.Usuario;
import com.uanl.ss2020.CursoJavaWeb.service.AlumnoService;
import com.uanl.ss2020.CursoJavaWeb.service.AlumnoValidatorService;
import com.uanl.ss2020.CursoJavaWeb.service.UsuarioService;

@Service
public class AlumnoValidatorServiceImpl implements AlumnoValidatorService {

	private final String MENSAJE_USUARIO_DUPLICADO = "El Usuario se encuentra en uso";
	private final String MENSAJE_MATRICULA_DUPLICADA = "La Matricula ingresada se encuentra en uso";
	
	@Autowired
	private AlumnoService alumnoService;
	
	@Autowired
	private UsuarioService usuarioService;
	
	@Override
	public void validarAgregar(Usuario usuario) throws Exception {
		this.validarUsuarioDuplicado(usuario);
		this.validarMatriculaDuplicada(usuario);
	}
	
	private void validarUsuarioDuplicado(Usuario usuario) throws Exception {
		Usuario usuarioDuplicado = this.usuarioService.consultarPorUsuario(usuario.getUsuario());
		
		if (usuarioDuplicado != null && usuarioDuplicado.getIdUsuario() != usuario.getIdUsuario()) {
			throw new Exception(this.MENSAJE_USUARIO_DUPLICADO);
		}
	}
	
	private void validarMatriculaDuplicada(Usuario usuario) throws Exception {
		Usuario usuarioDuplicado = this.alumnoService.consultarPorMatricula(usuario.getAlumno().getMatricula());
		
		if (usuarioDuplicado != null && usuarioDuplicado.getIdUsuario() != usuario.getIdUsuario()) {
			throw new Exception(MENSAJE_MATRICULA_DUPLICADA);
		}
	}

	@Override
	public void validarEditar(Usuario usuario) throws Exception {
		this.validarUsuarioDuplicado(usuario);
		this.validarMatriculaDuplicada(usuario);
	}

}
