package com.hebut.sql;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;


public class Sql {
	Connection conn = null;
	Statement stmt = null;
	ResultSet result = null;
	
	/**
	 * 建立连接
	 */
	public void connect() {
		// jdbc连接字符串
		String url = "jdbc:mysql://182.254.132.179:3306/we_hebut?"
				+ "user=wehebut&password=12345678&useUnicode=true&characterEncoding=UTF8";
		try {
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection(url);
			System.out.println("connect success");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 关闭连接 
	 */
	public void close() {
		try {
			if(null != result) {
				result.close();
			}
			if(null != stmt) {
				stmt.close();
			}
			if(null != conn) {
				conn.close();
			}
		} catch(Exception e) {
			// do nothing
		}
	}
	
	/**
	 * 根据用户id查用户名字
	 * @param userId	用户id
	 * @return
	 */
	public String findUserNameByUserId(String userId) {
		connect();
		String userName="";
		try {
			stmt = conn.createStatement();
			String sql = "select user_name from user where user_id = '" + userId + "'";
			result = stmt.executeQuery(sql);
			if (result.next()) {
				userName = result.getString("user_name");
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			close();
		}
		return userName;
	}
	
	public static void main(String[] args) {
		Sql sql = new Sql();
		sql.connect();
	}
}
