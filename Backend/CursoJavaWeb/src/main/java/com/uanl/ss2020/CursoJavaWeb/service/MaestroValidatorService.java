package com.uanl.ss2020.CursoJavaWeb.service;

import com.uanl.ss2020.CursoJavaWeb.model.Usuario;

public interface MaestroValidatorService {
	public void validarAgregar(Usuario usuario) throws Exception;
	public void validarEditar(Usuario usuario) throws Exception;
}
