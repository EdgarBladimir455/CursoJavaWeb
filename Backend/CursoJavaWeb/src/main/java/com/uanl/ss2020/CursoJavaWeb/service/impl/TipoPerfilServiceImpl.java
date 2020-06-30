package com.uanl.ss2020.CursoJavaWeb.service.impl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uanl.ss2020.CursoJavaWeb.dao.TipoPerfilDAO;
import com.uanl.ss2020.CursoJavaWeb.model.TipoPerfil;
import com.uanl.ss2020.CursoJavaWeb.service.TipoPerfilService;

@Service
public class TipoPerfilServiceImpl implements TipoPerfilService {

	@Autowired
	private TipoPerfilDAO tipoPerfilDAO;
	
	@Override
	@Transactional
	public TipoPerfil consultarPorClave(String clave) {
		return this.tipoPerfilDAO.consultarPorClave(clave);
	}

}
