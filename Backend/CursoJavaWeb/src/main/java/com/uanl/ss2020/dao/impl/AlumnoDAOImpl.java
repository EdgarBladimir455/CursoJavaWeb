package com.uanl.ss2020.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import com.uanl.ss2020.dao.AlumnoDAO;
import com.uanl.ss2020.model.Alumno;
import com.uanl.ss2020.model.AlumnoWrapper;
import com.uanl.ss2020.model.Paginacion;
import com.uanl.ss2020.model.Usuario;
import com.uanl.ss2020.util.GeneralConstant;

@Repository
public class AlumnoDAOImpl implements AlumnoDAO {

    @PersistenceContext
    private EntityManager entityManager;
    
	@Override
	public List<Usuario> consultarActivos() {
		Session session = entityManager.unwrap(Session.class);
    	List<Usuario> usuarios = session.createQuery("from Usuario u where u.alumno != null", Usuario.class)
    									.list();
    	return usuarios;
	}

	@Override
	public int agregarAlumno(Alumno alumno) {
		Session session = entityManager.unwrap(Session.class);
		session.persist(alumno);
		return alumno.getIdAlumno();
	}
	
	@Override
	public int editarAlumno(Alumno alumno) {
		Session session = entityManager.unwrap(Session.class);
		session.merge(alumno);
		return alumno.getIdAlumno();
	}

	@Override
	public Usuario consultarPorMatricula(int matricula) {
		Session session = entityManager.unwrap(Session.class);
		return session.createQuery("from Usuario u where u.alumno.matricula = :matricula", Usuario.class)
					  .setParameter("matricula", matricula)
					  .setMaxResults(1)
					  .uniqueResult();
	}

	@Override
	public AlumnoWrapper consultarUsuariosConFiltros(Usuario usuarioFiltro, Paginacion paginacion) {
		Session session = entityManager.unwrap(Session.class);
		
		StringBuilder queryStr = new StringBuilder("from Usuario u where u.alumno != null and u.estatus.clave = :claveEstatus");
		String claveEstatus = GeneralConstant.CLAVE_ESTATUS_ACTIVO;
		
		if (usuarioFiltro.getEstatus() != null) {
			claveEstatus = usuarioFiltro.getEstatus().getClave();
		}
		
		List<Usuario> usuarios = session.createQuery(queryStr.toString(), Usuario.class)
										.setParameter("claveEstatus", claveEstatus)
										.setFirstResult(paginacion.getPageIndex() * paginacion.getPageSize())
										.setMaxResults(paginacion.getPageSize())
										.list();
		
		Long cantidadRegistros = session.createQuery("select count(*) from Usuario u where u.alumno != null and u.estatus.clave = :claveEstatus", Long.class)
										.setParameter("claveEstatus", claveEstatus)
										.uniqueResult();
		
		AlumnoWrapper alumnoWrapper = new AlumnoWrapper();
		alumnoWrapper.setAlumnos(usuarios);
		alumnoWrapper.setCantidadRegistros(cantidadRegistros);
		
		return alumnoWrapper;
	}

	@Override
	public int eliminarAlumno(int idAlumno) {
		Session session = entityManager.unwrap(Session.class);
		session.remove(session.getReference(Alumno.class, idAlumno));
		return idAlumno;
	}

	@Override
	public Usuario consultarPorId(int idAlumno) {
		Session session = entityManager.unwrap(Session.class);
		return session.createQuery("from Usuario u where u.alumno.idAlumno = :idAlumno", Usuario.class)
					  .setParameter("idAlumno", idAlumno)
					  .setMaxResults(1)
					  .uniqueResult();
	}

}
