function getDays(date){
	var dStart = date.getTime();/*先获取起始日期的毫秒数；*/

	date.setMonth(date.getMonth()+1);/*设置为下月；*/

	var dEnd = date.getTime();/*获取下月的毫秒数；*/

	return (dEnd-dStart)/1000/60/60/24;/*根据两月相减，可以算出当月多少天；*/
}


function timeOut(date){ /*倒计时*/
	var dDate = new Date();
	var nMs = date.getTime()-dDate.getTime();
	var nSeconds=Math.ceil(nMs/1000);
	var nMinutes=Math.floor(nSeconds/60);
	var nHours=Math.floor(nMinutes/60);
	var nDays=Math.floor(nHours/24);
	return [nDays,nHours%24,nMinutes%60,nSeconds%60,nMs%100]
}


function parseDay(num){ /*格式化星期*/
	switch(num){
		case 0:
			return "星期日";
			break;
		case 1:
			return "星期一";
			break;
		case 2:
			return "星期二";
			break;
		case 3:
			return "星期三";
			break;
		case 4:
			return "星期四";
			break;
		case 5:
			return "星期五";
			break;
		case 6:
			return "星期六";
			break;
		default:
			return null;
	}
}


function parseNum(num){ /*加0*/
	if(num<10){
		num="0"+num;
	}
	return num;
}


function randNum(start,end){
	return Math.floor(Math.random()*(end-start+1))+start;
}


function getEleByClass(ele,classname){/*通过类名获取节点*/
	var eAll=ele.getElementsByTagName("*");
	var eEal=[];
	for(var i=0;i<eAll.length;i++){
		if(eAll[i].className == classname){
			eEal.push(eAll[i]);
		}
	}
	return eEal;
}
function setCookie(key,value,days){/*设置cookie*/
	var date=new Date();
	date.setDate(date.getDate()+days);
	document.cookie=key+"="+value+"; expires="+date;
}

function getCookie(key){/*获取cookie*/
	var cook=document.cookie;
	var aCook=cook.split("; ");
	for(var i=0;i<aCook.length;i++){
		var aData=aCook[i].split("=");
		if(aData[0]==key){
			return aData[1];
		}
	}
	return null;
}

function removeCookie(key){/*删除coolie*/
	var date=new Date();
	date.setDate(date.getDate()-1);
	document.cookie=key+"="+""+"; expires="+date;
}

function ajax(data){/*ajax无需重新加载整个页面的情况下，能更新部分网页*/
	var xhr;
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest;
	}else{
		xhr=new ActiveXObject("Msxml2.XMLHTTP");/*兼容方式*/
	}
	/*创建对象*/
	xhr.open(data.type,data.url,data.async);
	/*设置请求信息。json.txt?t="+new Date().getTime()加时间是为了去除缓存*/
	if(!data.data){
		xhr.send(null);
	}else{
		xhr.send(data.data);
	}
	/*发送请求*/
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			data.success(xhr.responseText,xhr);
		}
		if(xhr.readyState==4 && xhr.status!=200){
		/*xhr.readyState服务器响应状态；xhr.status服务器响应最终结果。*/
			data.error();
		}
	}
	/*监听服务器响应*/
}
