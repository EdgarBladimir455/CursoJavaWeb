package com.uanl.ss2020.CursoJavaWeb.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uanl.ss2020.CursoJavaWeb.dao.TipoMaestroDAO;
import com.uanl.ss2020.CursoJavaWeb.model.TipoMaestro;
import com.uanl.ss2020.CursoJavaWeb.service.TipoMaestroService;

@Service
public class TipoMaestroServiceImpl implements TipoMaestroService {

	@Autowired
	private TipoMaestroDAO tipoMaestroDAO;
	
	@Override
	@Transactional
	public List<TipoMaestro> consultar() {
		return this.tipoMaestroDAO.consultar();
	}

}
