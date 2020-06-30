package com.uanl.ss2020.CursoJavaWeb.dao;

import java.util.List;

import com.uanl.ss2020.CursoJavaWeb.model.Estatus;

public interface EstatusDAO {
	public List<Estatus> consultar();
	public Estatus consultarPorClave(String clave);
}
