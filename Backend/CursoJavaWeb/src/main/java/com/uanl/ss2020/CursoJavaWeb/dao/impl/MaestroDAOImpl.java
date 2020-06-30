package com.uanl.ss2020.CursoJavaWeb.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import com.uanl.ss2020.CursoJavaWeb.dao.MaestroDAO;
import com.uanl.ss2020.CursoJavaWeb.model.Maestro;
import com.uanl.ss2020.CursoJavaWeb.model.MaestroWrapper;
import com.uanl.ss2020.CursoJavaWeb.model.Paginacion;
import com.uanl.ss2020.CursoJavaWeb.model.Usuario;
import com.uanl.ss2020.CursoJavaWeb.util.GeneralConstant;

@Repository
public class MaestroDAOImpl implements MaestroDAO {

    @PersistenceContext
    private EntityManager entityManager;
    
	@Override
	public List<Usuario> consultarActivos() {
		Session session = entityManager.unwrap(Session.class);
    	List<Usuario> usuarios = session.createQuery("from Usuario u where u.maestro != null", Usuario.class)
    									.list();
    	return usuarios;
	}

	@Override
	public MaestroWrapper consultarUsuariosConFiltros(Usuario usuarioFiltro, Paginacion paginacion) {
		Session session = entityManager.unwrap(Session.class);
		
		StringBuilder queryStr = new StringBuilder("from Usuario u where u.maestro != null and u.estatus.clave = :claveEstatus");
		String claveEstatus = GeneralConstant.CLAVE_ESTATUS_ACTIVO;
		
		if (usuarioFiltro.getEstatus() != null) {
			claveEstatus = usuarioFiltro.getEstatus().getClave();
		}
		
		List<Usuario> usuarios = session.createQuery(queryStr.toString(), Usuario.class)
										.setParameter("claveEstatus", claveEstatus)
										.setFirstResult(paginacion.getPageIndex() * paginacion.getPageSize())
										.setMaxResults(paginacion.getPageSize())
										.list();
		
		Long cantidadRegistros = session.createQuery("select count(*) from Usuario u where u.maestro != null and u.estatus.clave = :claveEstatus", Long.class)
										.setParameter("claveEstatus", claveEstatus)
										.uniqueResult();
		
		MaestroWrapper maestroWrapper = new MaestroWrapper();
		maestroWrapper.setMaestros(usuarios);
		maestroWrapper.setCantidadRegistros(cantidadRegistros);
		
		return maestroWrapper;
	}

	@Override
	public int agregarMaestro(Maestro maestro) {
		Session session = entityManager.unwrap(Session.class);
		session.persist(maestro);
		return maestro.getIdMaestro();
	}

	@Override
	public int editarMaestro(Maestro maestro) {
		Session session = entityManager.unwrap(Session.class);
		session.merge(maestro);
		return maestro.getIdMaestro();
	}

	@Override
	public Usuario consultarPorNumeroEmpleado(int numeroEmpleado) {
		Session session = entityManager.unwrap(Session.class);
		return session.createQuery("from Usuario u where u.maestro.numeroEmpleado = :numeroEmpleado", Usuario.class)
					  .setParameter("numeroEmpleado", numeroEmpleado)
					  .setMaxResults(1)
					  .uniqueResult();
	}

	@Override
	public Usuario consultarPorId(int idMaestro) {
		Session session = entityManager.unwrap(Session.class);
		return session.createQuery("from Usuario u where u.maestro.idMaestro = :idMaestro", Usuario.class)
					  .setParameter("idMaestro", idMaestro)
					  .setMaxResults(1)
					  .uniqueResult();
	}

	@Override
	public int eliminarMaestro(int idMaestro) {
		Session session = entityManager.unwrap(Session.class);
		session.remove(session.getReference(Maestro.class, idMaestro));
		return idMaestro;
	}

}
