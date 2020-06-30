package com.uanl.ss2020.CursoJavaWeb.model;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonView;
import com.uanl.ss2020.CursoJavaWeb.model.Usuario.UsuarioDatosGrid;

public class AlumnoWrapper implements Serializable {
	
	private static final long serialVersionUID = 1L;
	@JsonView(UsuarioDatosGrid.class) private List<Usuario> alumnos;
	@JsonView(UsuarioDatosGrid.class) private Long cantidadRegistros;

	public List<Usuario> getAlumnos() {
		return alumnos;
	}
	public void setAlumnos(List<Usuario> alumnos) {
		this.alumnos = alumnos;
	}
	public Long getCantidadRegistros() {
		return cantidadRegistros;
	}
	public void setCantidadRegistros(Long cantidadRegistros) {
		this.cantidadRegistros = cantidadRegistros;
	}
	
}
