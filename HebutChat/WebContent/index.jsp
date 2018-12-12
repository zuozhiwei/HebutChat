<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>第一个例子</title>
</head>
<body>

<!-- 提交的form -->
<form action="firstExample" method="post">
登录名
<input name="userId"/>
<button>查看姓名</button>
</form>

<!-- jsp可以在页面中写java代码 -->
<!-- jsp拥有自己的标签 -->
<%
String userName = "";
if (null != session.getAttribute("userName")) {
	userName = session.getAttribute("userName").toString();
}
%>
<h4><%=userName%></h4>

</body>
</html>