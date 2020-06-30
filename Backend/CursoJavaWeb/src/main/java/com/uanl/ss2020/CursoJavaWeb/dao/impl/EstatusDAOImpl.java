package com.uanl.ss2020.CursoJavaWeb.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import com.uanl.ss2020.CursoJavaWeb.dao.EstatusDAO;
import com.uanl.ss2020.CursoJavaWeb.model.Estatus;

@Repository
public class EstatusDAOImpl implements EstatusDAO {

    @PersistenceContext
    private EntityManager entityManager;
	
	@Override
	public Estatus consultarPorClave(String clave) {
		Session session = entityManager.unwrap(Session.class);
		return session.createQuery("from Estatus e where e.clave = :clave", Estatus.class)
					  .setParameter("clave", clave)
					  .setMaxResults(1)
					  .uniqueResult();
	}

	@Override
	public List<Estatus> consultar() {
		Session session = entityManager.unwrap(Session.class);
    	List<Estatus> listaEstatus = session.createQuery("from Estatus", Estatus.class)
    									    .list();
    	return listaEstatus;
	}

}
