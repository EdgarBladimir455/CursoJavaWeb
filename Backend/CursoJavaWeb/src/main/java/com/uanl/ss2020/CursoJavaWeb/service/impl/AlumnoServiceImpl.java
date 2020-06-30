package com.uanl.ss2020.CursoJavaWeb.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.uanl.ss2020.CursoJavaWeb.dao.AlumnoDAO;
import com.uanl.ss2020.CursoJavaWeb.model.Alumno;
import com.uanl.ss2020.CursoJavaWeb.model.AlumnoWrapper;
import com.uanl.ss2020.CursoJavaWeb.model.Estatus;
import com.uanl.ss2020.CursoJavaWeb.model.Paginacion;
import com.uanl.ss2020.CursoJavaWeb.model.TipoPerfil;
import com.uanl.ss2020.CursoJavaWeb.model.Usuario;
import com.uanl.ss2020.CursoJavaWeb.model.DTO.AlumnoDTO;
import com.uanl.ss2020.CursoJavaWeb.service.AlumnoService;
import com.uanl.ss2020.CursoJavaWeb.service.AlumnoValidatorService;
import com.uanl.ss2020.CursoJavaWeb.service.EstatusService;
import com.uanl.ss2020.CursoJavaWeb.service.TipoPerfilService;
import com.uanl.ss2020.CursoJavaWeb.service.UsuarioService;
import com.uanl.ss2020.CursoJavaWeb.util.GeneralConstant;

@Service
public class AlumnoServiceImpl implements AlumnoService {

	@Autowired
	private AlumnoDAO alumnoDAO;
	
	@Autowired
	private TipoPerfilService tipoPerfilService;
	
	@Autowired
	private EstatusService estatusService;
	
	@Autowired
	private UsuarioService usuarioService;
	
	@Autowired
	private AlumnoValidatorService alumnoValidatorService;
	
	@Autowired
	private PasswordEncoder bcryptEncoder;
	
	@Override
	@Transactional
	public List<Usuario> consultarActivos() {
		return alumnoDAO.consultarActivos();
	}

	@Override
	@Transactional
	public int agregarAlumno(AlumnoDTO alumnoDTO) throws Exception {
		Usuario usuario = new Usuario();
		Alumno alumno = new Alumno();
		
		usuario.setMaestro(null);
		usuario.setAlumno(alumno);
		usuario.setNombre(alumnoDTO.getNombre());
		usuario.setUsuario(alumnoDTO.getUsuario());
		usuario.setContrasena(alumnoDTO.getContrasena());
		alumno.setMatricula(alumnoDTO.getMatricula());
		
		this.alumnoValidatorService.validarAgregar(usuario);
		alumno.setIdAlumno(this.alumnoDAO.agregarAlumno(alumno));
		
		Estatus estatus;
		if (alumnoDTO.getEstatus() == null || alumnoDTO.getEstatus().getIdEstatus() != null) {
			estatus = this.estatusService.consultarPorClave(GeneralConstant.CLAVE_ESTATUS_ACTIVO);
		} else {
			estatus = this.estatusService.consultarPorClave(alumnoDTO.getEstatus().getClave());
		}
		usuario.setEstatus(estatus);
		
		TipoPerfil tipoPerfilAlumno = this.tipoPerfilService.consultarPorClave(GeneralConstant.CLAVE_PERFIL_ALUMNO);
		usuario.setTipoPerfil(tipoPerfilAlumno);
		
		this.usuarioService.agregarUsuario(usuario);
		
		return alumno.getIdAlumno();
	}
	
	@Override
	@Transactional
	public int editarAlumno(AlumnoDTO alumnoDTO) throws Exception {
		Usuario usuario = this.usuarioService.consultarPorId(alumnoDTO.getIdUsuario());
		Alumno alumno = usuario.getAlumno();
		
		usuario.setMaestro(null);
		usuario.setAlumno(alumno);
		usuario.setNombre(alumnoDTO.getNombre());
		usuario.setUsuario(alumnoDTO.getUsuario());
		
		if (alumnoDTO.getContrasena() != null && !alumnoDTO.getContrasena().isEmpty()) {
			usuario.setContrasena(this.bcryptEncoder.encode(alumnoDTO.getContrasena()));
		}
		
		alumno.setMatricula(alumnoDTO.getMatricula());
		
		this.alumnoValidatorService.validarEditar(usuario);
		alumno.setIdAlumno(this.alumnoDAO.editarAlumno(alumno));
		
		Estatus estatus;
		if (alumnoDTO.getEstatus() == null || alumnoDTO.getEstatus().getIdEstatus() != null) {
			estatus = this.estatusService.consultarPorClave(GeneralConstant.CLAVE_ESTATUS_ACTIVO);
		} else {
			estatus = this.estatusService.consultarPorClave(alumnoDTO.getEstatus().getClave());
		}
		usuario.setEstatus(estatus);
		
		TipoPerfil tipoPerfilAlumno = this.tipoPerfilService.consultarPorClave(GeneralConstant.CLAVE_PERFIL_ALUMNO);
		usuario.setTipoPerfil(tipoPerfilAlumno);
		
		this.usuarioService.editarUsuario(usuario);
		
		return alumno.getIdAlumno();
	}

	@Override
	@Transactional
	public Usuario consultarPorMatricula(int matricula) {
		return this.alumnoDAO.consultarPorMatricula(matricula);
	}

	@Override
	@Transactional
	public AlumnoWrapper consultarUsuariosConFiltros(Usuario usuarioFiltro, Paginacion paginacion) {
		return this.alumnoDAO.consultarUsuariosConFiltros(usuarioFiltro, paginacion);
	}

	@Override
	@Transactional
	public int eliminarAlumno(int idAlumno) {
		return this.alumnoDAO.eliminarAlumno(idAlumno);
	}

	@Override
	@Transactional
	public Usuario consultarPorId(int idAlumno) {
		return this.alumnoDAO.consultarPorId(idAlumno);
	}

}
