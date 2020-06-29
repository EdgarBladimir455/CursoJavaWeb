package com.uanl.ss2020;

import java.util.List;

import javax.persistence.EntityManagerFactory;
import javax.transaction.Transactional;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uanl.ss2020.service.UsuarioService;

@RestController
@CrossOrigin
@RequestMapping("/test")
public class HelloController {
    @Autowired
    NamedParameterJdbcTemplate jdbcTemplate;
    
    @Autowired
    private UsuarioService usuarioService;
    
	@GetMapping("/asd")
	public String h() {
		return "Hello cruel world";
	}
    
//    @Data
//    static class Result {
//        private final int left;
//        private final int right;
//        private final long answer;
//    }
//
//    // SQL sample
//    @RequestMapping("calc")
//    Result calc(@RequestParam int left, @RequestParam int right) {
//        MapSqlParameterSource source = new MapSqlParameterSource()
//                .addValue("left", left)
//                .addValue("right", right);
//        return jdbcTemplate.queryForObject("SELECT :left + :right AS answer", source,
//                (rs, rowNum) -> new Result(left, right, rs.getLong("answer")));
//    }
}
