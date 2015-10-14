/*
 * iTabbar
 * Copyright (c) Gino Cote & Pascal Carmoni
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */
var count = $("#tabbar li").length;
var percent = 100 / count;
$("#tabbar li").css("width", percent + "%");
//alert(percent);

var clickEventType=((document.ontouchstart!==null)?'click':'touchstart');

$("#tabbar a").bind(clickEventType, function(e) {
	$("#tabbar a").addClass("current").not(this).removeClass("current");
	$.cookie("type",$(this).attr("data-content-type"));
	jQT.goTo($(this).attr("href"), "slideleft");
	e.preventDefault();
	return false;
    //$("#tabbar div").addClass("current").not(this).removeClass("current");
});

function changeTabBarTopic(topic) {
	$("#tabbar a").each(function() {
		$(this).attr("href",$(this).attr("data-content-type")+"-"+topic+".html");
	});
}

function selectTabBarItem(type) {
	console.log("selectTabBarItem. type="+type);
	$("#tabbar a").addClass("current").not("[data-content-type="+type+"]").removeClass("current");
}