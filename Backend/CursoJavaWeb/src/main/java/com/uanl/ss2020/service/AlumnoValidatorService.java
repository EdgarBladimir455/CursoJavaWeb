package com.uanl.ss2020.service;

import com.uanl.ss2020.model.Usuario;

public interface AlumnoValidatorService {
	public void validarAgregar(Usuario usuario) throws Exception;
	public void validarEditar(Usuario usuario) throws Exception;
}
