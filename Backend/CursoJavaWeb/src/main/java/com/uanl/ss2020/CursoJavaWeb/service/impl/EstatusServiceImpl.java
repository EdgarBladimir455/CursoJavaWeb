package com.uanl.ss2020.CursoJavaWeb.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uanl.ss2020.CursoJavaWeb.dao.EstatusDAO;
import com.uanl.ss2020.CursoJavaWeb.model.Estatus;
import com.uanl.ss2020.CursoJavaWeb.service.EstatusService;

@Service
public class EstatusServiceImpl implements EstatusService {

	@Autowired
	private EstatusDAO estatusDAO;
	
	@Override
	@Transactional
	public Estatus consultarPorClave(String clave) {
		return this.estatusDAO.consultarPorClave(clave);
	}

	@Override
	@Transactional
	public List<Estatus> consultar() {
		return this.estatusDAO.consultar();
	}

}
