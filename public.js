
$(document).ready(function(){
	$("dl").hide();
	$(".footer li").click(function(){
	    var index = $(".footer li").index(this);
		if("block" == $(".footer li").eq(index).children("dl").css("display")){
			$("dl").hide();
		}
		else{
			$("dl").hide();
			$(".footer li").eq(index).children("dl").show();
		}
		
	});
	$("dl").each(function(){
		$(this).children("dd").last().css("background","none");
	});
	
});


function showCompanyRightsReserved(divClass){
	var winHeight = $(window).height();//手机高度
	$(window).load(function () {//页面加载
		var winWidth = $(window).width();
		var htmlHeight = $("."+divClass).height();//页面html高度
		if(winHeight - htmlHeight <= 0){
			$(".contact_html_info").css("position","relative");
			
			if(winWidth > winHeight){
			   $(".contact_html_info").css("margin-bottom","0px");
			}
		}
		else{
			$(".contact_html_info").removeAttr("style");
		}
		
		if(winWidth > winHeight){
		   winHeight = winWidth;
		}
	});
	$(window).resize(function () {//手机屏幕旋转
		if(winHeight < $(window).height()){
		   winHeight = $(window).height();
		}
		var winWidth = $(window).width();
		var htmlHeight = $("."+divClass).height();//页面html高度
		if(winHeight - htmlHeight <=0 || $(window).height() - htmlHeight <= 0){
			$(".contact_html_info").css("position","relative");
			
			if(winWidth > winHeight){
			   $(".contact_html_info").css("margin-bottom","0px");
			}
		}
		else{
			$(".contact_html_info").removeAttr("style");
		}
	});
}


function showCompanyRightsReservedCoupon(divClass){
	/*$(window).load(function () {//页面加载
		var winWidth = $(window).width();
		var winHeight = $(window).height();//手机高度
		var htmlHeight = $("."+divClass).height();//页面html高度
		if(winHeight - htmlHeight > 0){
			$(".coupon_html_info").css("position","absolute");
		}
		else{
			$(".coupon_html_info").css("position","relative");
		}
	});
	$(window).resize(function () {//手机屏幕旋转
		var winWidth = $(window).width();
		var winHeight = $(window).height();//手机高度
		var htmlHeight = $("."+divClass).height();//页面html高度
		if(winHeight - htmlHeight > 0){
			$(".coupon_html_info").css("position","absolute");
		}
		else{
			$(".coupon_html_info").css("position","relative");
		}
	});*/
}
