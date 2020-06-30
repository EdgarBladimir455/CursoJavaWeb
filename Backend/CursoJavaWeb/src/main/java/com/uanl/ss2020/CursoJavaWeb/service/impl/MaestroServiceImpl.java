package com.uanl.ss2020.CursoJavaWeb.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.uanl.ss2020.CursoJavaWeb.dao.MaestroDAO;
import com.uanl.ss2020.CursoJavaWeb.model.Estatus;
import com.uanl.ss2020.CursoJavaWeb.model.Maestro;
import com.uanl.ss2020.CursoJavaWeb.model.MaestroWrapper;
import com.uanl.ss2020.CursoJavaWeb.model.Paginacion;
import com.uanl.ss2020.CursoJavaWeb.model.TipoPerfil;
import com.uanl.ss2020.CursoJavaWeb.model.Usuario;
import com.uanl.ss2020.CursoJavaWeb.model.DTO.MaestroDTO;
import com.uanl.ss2020.CursoJavaWeb.service.EstatusService;
import com.uanl.ss2020.CursoJavaWeb.service.MaestroService;
import com.uanl.ss2020.CursoJavaWeb.service.MaestroValidatorService;
import com.uanl.ss2020.CursoJavaWeb.service.TipoPerfilService;
import com.uanl.ss2020.CursoJavaWeb.service.UsuarioService;
import com.uanl.ss2020.CursoJavaWeb.util.GeneralConstant;

@Service
public class MaestroServiceImpl implements MaestroService {

	@Autowired
	private MaestroDAO maestroDAO;
	
	@Autowired
	private TipoPerfilService tipoPerfilService;
	
	@Autowired
	private EstatusService estatusService;
	
	@Autowired
	private UsuarioService usuarioService;
	
	@Autowired
	private MaestroValidatorService maestroValidatorService;
	
	@Autowired
	private PasswordEncoder bcryptEncoder;
	
	@Override
	@Transactional
	public List<Usuario> consultarActivos() {
		return this.maestroDAO.consultarActivos();
	}

	@Override
	@Transactional
	public MaestroWrapper consultarUsuariosConFiltros(Usuario usuarioFiltro, Paginacion paginacion) {
		return this.maestroDAO.consultarUsuariosConFiltros(usuarioFiltro, paginacion);
	}

	@Override
	@Transactional
	public int agregarMaestro(MaestroDTO maestroDTO) throws Exception {
		Usuario usuario = new Usuario();
		Maestro maestro = new Maestro();
		
		usuario.setAlumno(null);
		usuario.setMaestro(maestro);
		usuario.setNombre(maestroDTO.getNombre());
		usuario.setUsuario(maestroDTO.getUsuario());
		usuario.setContrasena(this.bcryptEncoder.encode(maestroDTO.getContrasena()));
		maestro.setNumeroEmpleado(maestroDTO.getNumeroEmpleado());
		maestro.setTipoMaestro(maestroDTO.getTipoMaestro());
		
		this.maestroValidatorService.validarAgregar(usuario);
		maestro.setIdMaestro(this.maestroDAO.agregarMaestro(maestro));
		
		Estatus estatus;
		if (maestroDTO.getEstatus() == null || maestroDTO.getEstatus().getIdEstatus() != null) {
			estatus = this.estatusService.consultarPorClave(GeneralConstant.CLAVE_ESTATUS_ACTIVO);
		} else {
			estatus = this.estatusService.consultarPorClave(maestroDTO.getEstatus().getClave());
		}
		usuario.setEstatus(estatus);
		
		TipoPerfil tipoPerfilMaestro = this.tipoPerfilService.consultarPorClave(GeneralConstant.CLAVE_PERFIL_MAESTRO);
		usuario.setTipoPerfil(tipoPerfilMaestro);
		
		this.usuarioService.agregarUsuario(usuario);
		
		return maestro.getIdMaestro();
	}

	@Override
	@Transactional
	public int editarMaestro(MaestroDTO maestroDTO) throws Exception {
		Usuario usuario = this.usuarioService.consultarPorId(maestroDTO.getIdUsuario());
		Maestro maestro = usuario.getMaestro();
		
		usuario.setAlumno(null);
		usuario.setMaestro(maestro);
		usuario.setNombre(maestroDTO.getNombre());
		usuario.setUsuario(maestroDTO.getUsuario());
		maestro.setNumeroEmpleado(maestroDTO.getNumeroEmpleado());
		maestro.setTipoMaestro(maestroDTO.getTipoMaestro());
				
		if (maestroDTO.getContrasena() != null && !maestroDTO.getContrasena().isEmpty()) {
			usuario.setContrasena(this.bcryptEncoder.encode(maestroDTO.getContrasena()));
		}
		
		this.maestroValidatorService.validarEditar(usuario);
		maestro.setIdMaestro(this.maestroDAO.editarMaestro(maestro));
		
		Estatus estatus;
		if (maestroDTO.getEstatus() == null || maestroDTO.getEstatus().getIdEstatus() != null) {
			estatus = this.estatusService.consultarPorClave(GeneralConstant.CLAVE_ESTATUS_ACTIVO);
		} else {
			estatus = this.estatusService.consultarPorClave(maestroDTO.getEstatus().getClave());
		}
		usuario.setEstatus(estatus);
		
		TipoPerfil tipoPerfilMaestro = this.tipoPerfilService.consultarPorClave(GeneralConstant.CLAVE_PERFIL_MAESTRO);
		usuario.setTipoPerfil(tipoPerfilMaestro);
		
		this.usuarioService.editarUsuario(usuario);
		
		return maestro.getIdMaestro();
	}

	@Override
	@Transactional
	public Usuario consultarPorNumeroEmpleado(int numeroEmpleado) {
		return this.maestroDAO.consultarPorNumeroEmpleado(numeroEmpleado);
	}

	@Override
	@Transactional
	public Usuario consultarPorId(int idMaestro) {
		return this.maestroDAO.consultarPorId(idMaestro);
	}

	@Override
	@Transactional
	public int eliminarMaestro(int idMaestro) {
		return this.maestroDAO.eliminarMaestro(idMaestro);
	}

}
