package com.uanl.ss2020.CursoJavaWeb.dao.impl;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import com.uanl.ss2020.CursoJavaWeb.dao.TipoPerfilDAO;
import com.uanl.ss2020.CursoJavaWeb.model.TipoPerfil;

@Repository
public class TipoPerfilDAOImpl implements TipoPerfilDAO {

    @PersistenceContext
    private EntityManager entityManager;
	
	@Override
	public TipoPerfil consultarPorClave(String clave) {
		Session session = entityManager.unwrap(Session.class);
		return session.createQuery("from TipoPerfil tp where tp.clave = :claveTipoPerfil", TipoPerfil.class)
					  .setParameter("claveTipoPerfil", clave)
					  .setMaxResults(1)
					  .uniqueResult();
	}

}
