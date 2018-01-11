<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zkzc.ueditor.UEActionEnter" %>
<%@ page trimDirectiveWhitespaces="true" %>
<%

    request.setCharacterEncoding( "utf-8" );
	response.setHeader("Content-Type" , "text/html");
	
	String rootPath = application.getRealPath( "/" );
	
//	out.write( new ActionEnter( request, rootPath ).exec() );
	out.write(new UEActionEnter(request, rootPath).exec());
%>