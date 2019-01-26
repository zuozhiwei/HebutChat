package com.hebut.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.hebut.sql.Sql;

public class CommentController extends HttpServlet{
	//还需添加回复功能
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        this.doPost(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    	Sql sql = new Sql();
    	HashMap<String, Object> result = new HashMap<>();
    	
    	String type = request.getParameter("type");
    	if("submit".equals(type)) {
    		String talking = request.getParameter("talking");//还需要用户名 评论日期
        	System.out.println(talking);
        	
        	Boolean isOk = sql.addComment(talking);
        	
        	if (isOk) {
        		result.put("status", "success");
        		result.put("code", "200");
        	} else {
        		result.put("status", "error");
        		result.put("code", "500");
        	}
            Gson gson = new Gson();
            response.setHeader("Access-Control-Allow-Origin", "*");
            response.setContentType("text/javascript;charset=UTF-8");
            response.getWriter().write(gson.toJson(result));
    	}
    }

}
