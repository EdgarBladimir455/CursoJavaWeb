package com.uanl.ss2020.dao.impl;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import com.uanl.ss2020.dao.EstatusDAO;
import com.uanl.ss2020.model.Estatus;
import com.uanl.ss2020.model.TipoPerfil;

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

}
