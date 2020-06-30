package com.uanl.ss2020.CursoJavaWeb.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import com.uanl.ss2020.CursoJavaWeb.dao.TipoMaestroDAO;
import com.uanl.ss2020.CursoJavaWeb.model.TipoMaestro;

@Repository
public class TipoMaestroDAOImpl implements TipoMaestroDAO {

    @PersistenceContext
    private EntityManager entityManager;
    
	@Override
	public List<TipoMaestro> consultar() {
		Session session = entityManager.unwrap(Session.class);
    	List<TipoMaestro> tiposMaestros = session.createQuery("from TipoMaestro", TipoMaestro.class)
    									.list();
    	return tiposMaestros;
	}

}
