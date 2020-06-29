package com.uanl.ss2020.service.impl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uanl.ss2020.dao.TipoPerfilDAO;
import com.uanl.ss2020.model.TipoPerfil;
import com.uanl.ss2020.service.TipoPerfilService;

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
