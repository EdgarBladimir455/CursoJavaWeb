package com.uanl.ss2020.CursoJavaWeb.service;

import java.util.List;

import com.uanl.ss2020.CursoJavaWeb.model.Estatus;

public interface EstatusService {
	public List<Estatus> consultar();
	public Estatus consultarPorClave(String clave);
}
