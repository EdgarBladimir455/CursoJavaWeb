package com.uanl.ss2020.config;

import java.io.IOException;
import java.io.Serializable;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint, Serializable {

	private static final long serialVersionUID = -7858869558953243875L;

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException {

		if (authException.getClass().equals(BadCredentialsException.class) || authException.getClass().equals(InsufficientAuthenticationException.class)) {
			response.addHeader("Access-Control-Allow-Origin", "*");
			response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
		} else {
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, authException.getMessage());			
		}
	}
}
