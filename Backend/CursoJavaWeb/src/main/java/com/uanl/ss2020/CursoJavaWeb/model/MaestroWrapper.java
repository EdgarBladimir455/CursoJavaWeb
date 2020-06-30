package com.uanl.ss2020.CursoJavaWeb.model;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonView;
import com.uanl.ss2020.CursoJavaWeb.model.Usuario.UsuarioDatosGrid;

public class MaestroWrapper implements Serializable {

	private static final long serialVersionUID = 1L;
	@JsonView(UsuarioDatosGrid.class) private List<Usuario> maestros;
	@JsonView(UsuarioDatosGrid.class) private Long cantidadRegistros;
	
	public List<Usuario> getMaestros() {
		return maestros;
	}
	public void setMaestros(List<Usuario> maestros) {
		this.maestros = maestros;
	}
	public Long getCantidadRegistros() {
		return cantidadRegistros;
	}
	public void setCantidadRegistros(Long cantidadRegistros) {
		this.cantidadRegistros = cantidadRegistros;
	}
	
}
