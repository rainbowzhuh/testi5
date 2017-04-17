function getXMLHttpObj() {
	var axO = [ 'Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.4.0',
		'Msxml2.XMLHTTP.3.0', 'Msxml2.XMLHTTP', 'Microsoft.XMLHTTP' ], i;
	for (i = 0; i < axO.length; i++)
		try {
			return new ActiveXObject(axO[i]);
		} catch (e) {
		}
		if (typeof (XMLHttpRequest) != 'undefined'){
			return new XMLHttpRequest();}
		return new XMLHttpRequest();
}


//手机号码验证
function phoneerror(){
	var phone=$("#phone").val();
	var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
	if(!myreg.test(phone)){ 
	    document.getElementById("kqerror").innerText="请输入有效的手机号码!";
	    return false; 
	 }else{
		 document.getElementById("kqerror").innerText="";
	 }
}
//验证吗验证
function phonevaliderror(){
	var phonevalid=$("#phonevalid").val();
	var myreg =/^\d{6}$/;
	if(!myreg.test(phonevalid)){ 
	    document.getElementById("kqerror").innerText="请输入有效的验证码！";
	    return false; 
	 }else{
		 document.getElementById("kqerror").innerText="";
	 }
}

//发送验证
function PhoneValid(phone,openId){
	requestButton  = getXMLHttpObj();
	var fullContext = document.getElementsByName("fullContext")[0].value; //全路径
	var url = fullContext + "/weixin/member.do?";
	var param ="mhd=getPhonevalid&phone="+phone+"&openId="+openId;
	param = encodeURI(param);
	requestButton .open("POST", url, true);
	requestButton .setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	requestButton .onreadystatechange = phonevalidButton;
	requestButton .send(param);

}

//发送验证是否成功
function phonevalidButton(){
	if (requestButton .readyState == 4) {
		if (requestButton .status == 200) {
			var retString=requestButton .responseText;
			if (retString == ""){
				return;
			}
			 document.getElementById("kqerror").innerText="获取验证码成功";

		}
	}
}



// 点击获取验证码按钮后按钮变灰，倒计时一段时间后又可重复点击
var wait=60; 
function time(o) { 
        if (wait == 0) { 
            o.removeAttribute("disabled");           
           // o.value="获取验证码"; 
            wait = 60; 
        } else { 
            o.setAttribute("disabled", true); 
            o.value=wait+"秒后重新发送"; 
            wait--; 
            setTimeout(function() { 
                time(o) 
            }, 
            1000) 
        } 
    } 
//会员领券(会员在手机已绑定情况下的会员领取)
function receiveCoupon(){
	requestButton  = getXMLHttpObj();
    var openId = document.forms[0].elements["vo.openId"].value;
	var merchant_no = document.forms[0].elements["vo.merchant_no"].value;
	var coupon_def_code = document.forms[0].elements["vo.coupon_def_code"].value;
	var fullContext = document.getElementsByName("fullContext")[0].value; //全路径
	var url = fullContext + "/weixin/cardvoucher.do?";
	var param ="mhd=receiveCoupon&merchant_no="+merchant_no+"&openId="+openId+"&openId="+openId+"&coupon_def_code="+coupon_def_code;
	param = encodeURI(param);
	requestButton .open("POST", url, true);
	requestButton .setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	requestButton .onreadystatechange = CouponButton;
	requestButton .send(param);
 }
//会员领券结果
function CouponButton(){
	 var openId = document.forms[0].elements["vo.openId"].value;
	 var context = document.getElementsByName("context")[0].value; //全路径
	if (requestButton .readyState == 4) {
		if (requestButton .status == 200) {
			var retString=requestButton .responseText;
			
			if (retString == ""){
				return;
			}
			//领券成功
			if(retString=="0"){
			 window.location =context+"/weixin/cardvoucher.do?mhd=toList&openId="+openId;
			//券已领完
			}else if(retString=="2"){
				document.getElementById("error").innerText="优惠券已领完！";
			//领券失败
			}else {
				document.getElementById("error").innerText="优惠券领取失败！";
			}
		    
		}
	}
	
	hasErrorMsg();
}

//会员领券（在没有绑定的情况下的领券）
function coupon_submit(){
	requestButton  = getXMLHttpObj();
    var openId = document.forms[0].elements["vo.openId"].value;
	var merchant_no = document.forms[0].elements["vo.merchant_no"].value;
	var coupon_def_code = document.forms[0].elements["vo.coupon_def_code"].value;
	var phonevalid=$("#phonevalid").val();
	var myreg =/^\d{6}$/;
	if(!myreg.test(phonevalid)){ 
	    document.getElementById("kqerror").innerText="请输入有效的验证码！";
	    return false; 
	 }else{
		 document.getElementById("kqerror").innerText="";
	 }
	var phone=$("#phone").val();
	var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
	if(!myreg.test(phone)){ 
	    document.getElementById("kqerror").innerText="请输入有效的手机号码!";
	    return false; 
	 }else{
		 document.getElementById("kqerror").innerText="";
	 }
	var fullContext = document.getElementsByName("fullContext")[0].value; //全路径
	var url = fullContext + "/weixin/cardvoucher.do?";
	var param ="mhd=couponSubmit&merchant_no="+merchant_no+"&openId="+openId+"&openId="+openId+"&coupon_def_code="+coupon_def_code+"&phonevalid="+phonevalid+"&phone="+phone;
	param = encodeURI(param);
	requestButton .open("POST", url, true);
	requestButton .setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	requestButton .onreadystatechange = submitButton;
	requestButton .send(param);
	
}
//领券结果
function submitButton(){
    var openId = document.forms[0].elements["vo.openId"].value;
    var context = document.getElementsByName("context")[0].value; //全路径
	if (requestButton .readyState == 4) {
		if (requestButton .status == 200) {
			var retString=requestButton .responseText;
			if (retString == ""){
				return;
			}
			//领券成功
			if(retString=="0"){
			window.location =context+"/weixin/cardvoucher.do?mhd=toList&openId="+openId;
			//券已领完
			}else if(retString=="2"){
			document.getElementById("error").innerText="优惠券已领完！";
			//领券失败
			}else {
			document.getElementById("error").innerText="领取优惠券失败，请重新领取！";
			}
		}
	}
	
	hasErrorMsg();
}





//会员领ka(会员在手机已绑定情况下的会员领取)
function receiveCard(){
	requestButton  = getXMLHttpObj();
    var openId = document.getElementsByName("openId")[0].value; //全路径
	var merchant_no = document.forms[0].elements["vo.merchant_no"].value;
	var cardd_code = document.forms[0].elements["vo.cardd_code"].value;
	var fullContext = document.getElementsByName("fullContext")[0].value; //全路径
	var url = fullContext + "/weixin/cardvoucher.do?";
	var param ="mhd=receiveCard&merchant_no="+merchant_no+"&openId="+openId+"&openId="+openId+"&cardd_code="+cardd_code;
	param = encodeURI(param);
	requestButton .open("POST", url, true);
	requestButton .setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	requestButton .onreadystatechange = CardButton;
	requestButton .send(param);
 }
//会员领ka结果
function CardButton(){
   var openId = document.getElementsByName("openId")[0].value; //全路径
	var context = document.getElementsByName("context")[0].value; //全路径
	if (requestButton .readyState == 4) {
		if (requestButton .status == 200) {
			var retString=requestButton .responseText;
			if (retString == ""){
				return;
			} 
			//领卡成功
			if(retString=="0"){
				window.location =context+"/weixin/cardvoucher.do?mhd=toCard&openId="+openId;
			//此会员卡已领完
			}else  if(retString=="3"){
				document.getElementById("error").innerText="此会员卡已领完！";
			//此会员卡已领过
			}else if(retString=="4"){
				document.getElementById("error").innerText="此会员卡已领过！";
			}else{
				document.getElementById("error").innerText="领取会员卡失败，请重新领取！";
			}
			
			
			
		     
		}
	}
	
	hasErrorMsg();
}


//会员领券（在没有绑定的情况下的领券）
function card_submit(){
	requestButton  = getXMLHttpObj();
	 var openId = document.getElementsByName("openId")[0].value; //全路径
	var merchant_no = document.forms[0].elements["vo.merchant_no"].value;
	var cardd_code = document.forms[0].elements["vo.cardd_code"].value;
	var phonevalid=$("#phonevalid").val();
	var myreg =/^\d{6}$/;
	if(!myreg.test(phonevalid)){ 
	    document.getElementById("kqerror").innerText="请输入有效的验证码！";
	    return false; 
	 }else{
		 document.getElementById("kqerror").innerText="";
	 }
	var phone=$("#phone").val();
	var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
	if(!myreg.test(phone)){ 
	    document.getElementById("kqerror").innerText="请输入有效的手机号码!";
	    return false; 
	 }else{
		 document.getElementById("kqerror").innerText="";
	 }
	var fullContext = document.getElementsByName("fullContext")[0].value; //全路径
	var url = fullContext + "/weixin/cardvoucher.do?";
	var param ="mhd=cardSubmit&merchant_no="+merchant_no+"&openId="+openId+"&openId="+openId+"&cardd_code="+cardd_code+"&phonevalid="+phonevalid+"&phone="+phone;
	param = encodeURI(param);
	requestButton .open("POST", url, true);
	requestButton .setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	requestButton .onreadystatechange = cardsubmitButton;
	requestButton .send(param);
	
}
//领券结果
function cardsubmitButton(){
    var openId = document.getElementsByName("openId")[0].value; //全路径
    var context = document.getElementsByName("context")[0].value; //全路径
	if (requestButton .readyState == 4) {
		if (requestButton .status == 200) {
			var retString=requestButton .responseText;
			if (retString == ""){
				return;
			}
			//领卡成功
			if(retString=="0"){
				window.location =context+"/weixin/cardvoucher.do?mhd=toCard&openId="+openId;
			//此会员卡已领完
			}else  if(retString=="3"){
				document.getElementById("error").innerText="此会员卡已领完！";
			//此会员卡已领过
			}else if(retString=="4"){
				document.getElementById("error").innerText="此会员卡已领过！";
			}else{
				document.getElementById("error").innerText="会员卡领取失败！";
			}
		}
	}
	
	hasErrorMsg();
}




//获取二维码地址
function openPopup(kqno,type){
	requestButton  = getXMLHttpObj();
	var fullContext = document.getElementsByName("fullContext")[0].value; //全路径
	var openId = document.getElementsByName("openId")[0].value; //全路径
	var url = fullContext + "/weixin/cardvoucher.do?";
	var param ="mhd=TwoDimension&kqno="+kqno+"&openId="+openId+"&type="+type;
	param = encodeURI(param);
	requestButton .open("POST", url, true);
	requestButton .setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	requestButton .onreadystatechange = twoDimensionButton;
	requestButton .send(param);

}

//获取二维码地址结果
function twoDimensionButton(){
	 var fullContext = document.getElementsByName("fullContext")[0].value; //全路径
	if (requestButton .readyState == 4) {
		if (requestButton .status == 200) {
			var retString=requestButton .responseText;
			if (retString == ""){
				return;
			}
			document.getElementById("imageId").src =fullContext+retString;
            $( "#erweima").popup( "open" );
		}
	}
}

function hasErrorMsg(){		
	if($(".coupon_text_show label").html().trim().length > 0){
		$(".coupon_text_show").removeClass("display").addClass("show");
	}
	else{
		$(".coupon_text_show").removeClass("show").addClass("display");
	}
}
