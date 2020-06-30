package com.uanl.ss2020.CursoJavaWeb.model;

public class Paginacion {

	private int previousPageIndex;
	private int pageIndex;
	private int pageSize;
	private int length;
	public int getPreviousPageIndex() {
		return previousPageIndex;
	}
	public void setPreviousPageIndex(int previousPageIndex) {
		this.previousPageIndex = previousPageIndex;
	}
	public int getPageIndex() {
		return pageIndex;
	}
	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public int getLength() {
		return length;
	}
	public void setLength(int length) {
		this.length = length;
	}
	
}
