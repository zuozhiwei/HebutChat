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

public class FeedbackController extends HttpServlet{

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
    		String content = request.getParameter("content");
        	String email = request.getParameter("email");
        	System.out.println(content+"--"+email);
        	
        	Boolean isOk = sql.addFeedback(content, email);
        	
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
    	}else if("list".equals(type)) {
        	 List<HashMap<String, Object>> feedbackList = sql.getFeedbackList();
         	if (null != feedbackList) {
        		result.put("status", "success");
        		result.put("code", "200");
        		result.put("result", feedbackList);
        	} else {
        		result.put("status", "error");
        		result.put("code", "500");
        		result.put("result", "查询失败");
        	}
            Gson gson = new Gson();
            response.setHeader("Access-Control-Allow-Origin", "*");
            response.setContentType("text/javascript;charset=UTF-8");
            response.getWriter().write(gson.toJson(result));
    	}
    	
    }

}
