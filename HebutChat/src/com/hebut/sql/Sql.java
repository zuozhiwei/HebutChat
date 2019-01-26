package com.hebut.sql;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


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

	/**
	 * 添加反馈记录
	 * @param content	反馈内容
	 * @param email		邮箱
	 * @return			true or false
	 */
	public Boolean addFeedback(String content, String email) {
		connect();
		String sql = "insert into feedback(`content`,`email`) values('"+content+"','"+email+"')";
		try {
			stmt = conn.createStatement();
			stmt.executeUpdate(sql);
		} catch (SQLException e) {
			return false;
		} finally {
			close();
		}
		return true;
	}

	public List<HashMap<String, Object>> getFeedbackList() {
		connect();
		List<HashMap<String, Object>> list = new ArrayList<>();
		try {
			stmt = conn.createStatement();
			String sql = "select * from feedback";
			result = stmt.executeQuery(sql);
			ResultSetMetaData md = result.getMetaData(); //获得结果集结构信息,元数据
			int columnCount = md.getColumnCount();
			while (result.next()) {
				HashMap<String,Object> rowData = new HashMap<String,Object>();
				for (int i = 1; i <= columnCount; i++) {
					rowData.put(md.getColumnName(i), result.getObject(i));
				}
				list.add(rowData);
			}
		} catch (Exception e) {
			e.printStackTrace();
			list = null;
		} finally {
			close();
		}
		return list;
	}
	
	/**
	 * 添加微博评论记录
	 * @param taking  评论
	 * @return			true or false
	 */
	public Boolean addComment(String taking) {
		connect();
		String sql = "insert into feedback(`taking`) values('"+taking+"')";
		try {
			stmt = conn.createStatement();
			stmt.executeUpdate(sql);
		} catch (SQLException e) {
			return false;
		} finally {
			close();
		}
		return true;
	}
}


