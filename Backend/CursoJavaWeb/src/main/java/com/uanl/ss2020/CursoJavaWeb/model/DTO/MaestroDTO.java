package com.uanl.ss2020.CursoJavaWeb.model.DTO;

import com.uanl.ss2020.CursoJavaWeb.model.Estatus;
import com.uanl.ss2020.CursoJavaWeb.model.TipoMaestro;

public class MaestroDTO {
	private int idUsuario;
	private int idMaestro;
	private String nombre;
	private String usuario;
	private String contrasena;	
	private int numeroEmpleado;
	private Estatus estatus;
	private TipoMaestro tipoMaestro;
	public int getIdUsuario() {
		return idUsuario;
	}
	public void setIdUsuario(int idUsuario) {
		this.idUsuario = idUsuario;
	}
	public int getIdMaestro() {
		return idMaestro;
	}
	public void setIdMaestro(int idMaestro) {
		this.idMaestro = idMaestro;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getUsuario() {
		return usuario;
	}
	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}
	public String getContrasena() {
		return contrasena;
	}
	public void setContrasena(String contrasena) {
		this.contrasena = contrasena;
	}
	public int getNumeroEmpleado() {
		return numeroEmpleado;
	}
	public void setNumeroEmpleado(int numeroEmpleado) {
		this.numeroEmpleado = numeroEmpleado;
	}
	public Estatus getEstatus() {
		return estatus;
	}
	public void setEstatus(Estatus estatus) {
		this.estatus = estatus;
	}
	public TipoMaestro getTipoMaestro() {
		return tipoMaestro;
	}
	public void setTipoMaestro(TipoMaestro tipoMaestro) {
		this.tipoMaestro = tipoMaestro;
	}
	
}
