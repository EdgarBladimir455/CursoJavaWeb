package com.uanl.ss2020.CursoJavaWeb.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uanl.ss2020.CursoJavaWeb.model.Usuario;
import com.uanl.ss2020.CursoJavaWeb.service.MaestroService;
import com.uanl.ss2020.CursoJavaWeb.service.MaestroValidatorService;
import com.uanl.ss2020.CursoJavaWeb.service.UsuarioService;

@Service
public class MaestroValidatorServiceImpl implements MaestroValidatorService {

	private final String MENSAJE_USUARIO_DUPLICADO = "El Usuario se encuentra en uso";
	private final String MENSAJE_NUMERO_EMPLEADO_DUPLICADA = "El Número de Empleado se encuentra en uso";
	
	@Autowired
	private MaestroService maestroService;
	
	@Autowired
	private UsuarioService usuarioService;
	
	@Override
	public void validarAgregar(Usuario usuario) throws Exception {
		this.validarUsuarioDuplicado(usuario);
		this.validarNumeroEmpleadoDuplicada(usuario);
	}

	@Override
	public void validarEditar(Usuario usuario) throws Exception {
		this.validarUsuarioDuplicado(usuario);
		this.validarNumeroEmpleadoDuplicada(usuario);
	}
	
	private void validarUsuarioDuplicado(Usuario usuario) throws Exception {
		Usuario usuarioDuplicado = this.usuarioService.consultarPorUsuario(usuario.getUsuario());
		
		if (usuarioDuplicado != null && usuarioDuplicado.getIdUsuario() != usuario.getIdUsuario()) {
			throw new Exception(this.MENSAJE_USUARIO_DUPLICADO);
		}
	}
	
	private void validarNumeroEmpleadoDuplicada(Usuario usuario) throws Exception {
		Usuario usuarioDuplicado = this.maestroService.consultarPorNumeroEmpleado(usuario.getMaestro().getNumeroEmpleado());
		
		if (usuarioDuplicado != null && usuarioDuplicado.getIdUsuario() != usuario.getIdUsuario()) {
			throw new Exception(this.MENSAJE_NUMERO_EMPLEADO_DUPLICADA);
		}
	}

}
