package com.uanl.ss2020.CursoJavaWeb.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import com.uanl.ss2020.CursoJavaWeb.dao.UsuarioDAO;
import com.uanl.ss2020.CursoJavaWeb.model.Alumno;
import com.uanl.ss2020.CursoJavaWeb.model.Paginacion;
import com.uanl.ss2020.CursoJavaWeb.model.Usuario;

@Repository
public class UsuarioDAOImpl implements UsuarioDAO {
    
    @PersistenceContext
    private EntityManager entityManager;
    
	@Override
	public List<Usuario> consultarUsuarios() {
		Session session = entityManager.unwrap(Session.class);
    	List<Usuario> usuarios = session.createQuery("from Usuario", Usuario.class).list();
    	return usuarios;
	}

	@Override
	public int agregarUsuario(Usuario usuario) {
		Session session = entityManager.unwrap(Session.class);
		session.persist(usuario);
		return usuario.getIdUsuario();
	}
	
	@Override
	public int editarUsuario(Usuario usuario) {
		Session session = entityManager.unwrap(Session.class);
		session.merge(usuario);
		return usuario.getIdUsuario();
	}

	@Override
	public Usuario consultarPorUsuario(String usuario) {
		Session session = entityManager.unwrap(Session.class);
		return session.createQuery("from Usuario u where u.usuario = :usuario", Usuario.class)
					  .setParameter("usuario", usuario)
					  .setMaxResults(1)
					  .uniqueResult();
	}

	@Override
	public List<Usuario> consultarUsuariosConFiltros(Usuario usuarioFiltro, Paginacion paginacion) {
		Session session = entityManager.unwrap(Session.class);
		
		StringBuilder queryStr = new StringBuilder("from Usuario u");
		
		if (usuarioFiltro != null && paginacion == null) {
			// Solo filtros
		} else if (paginacion != null && usuarioFiltro == null) {
			// Solo paginacion
			return session.createQuery(queryStr.toString(), Usuario.class)
						  .setFirstResult(paginacion.getPreviousPageIndex() * paginacion.getPageSize())
						  .setMaxResults(paginacion.getPageSize())
						  .list();
		} else if (usuarioFiltro != null && paginacion != null) {
			
		}
		
		return null;
	}

	@Override
	public int eliminarUsuario(int idUsuario) {
		Session session = entityManager.unwrap(Session.class);
		Usuario usuario = new Usuario();
		usuario.setIdUsuario(idUsuario);
		session.delete(usuario);
		return usuario.getIdUsuario();
	}

	@Override
	public Usuario consultarPorId(int id) {
		Session session = entityManager.unwrap(Session.class);
		return session.getReference(Usuario.class, id);
	}

}
