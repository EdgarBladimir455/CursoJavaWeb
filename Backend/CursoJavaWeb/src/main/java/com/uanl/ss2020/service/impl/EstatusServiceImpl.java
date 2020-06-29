package com.uanl.ss2020.service.impl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;

import com.uanl.ss2020.dao.EstatusDAO;
import org.springframework.stereotype.Service;

import com.uanl.ss2020.model.Estatus;
import com.uanl.ss2020.service.EstatusService;

@Service
public class EstatusServiceImpl implements EstatusService {

	@Autowired
	private EstatusDAO estatusDAO;
	
	@Override
	@Transactional
	public Estatus consultarPorClave(String clave) {
		return this.estatusDAO.consultarPorClave(clave);
	}

}
