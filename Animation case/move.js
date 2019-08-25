function getStyle(obj,attr) {
	if(obj.currentStyle){
		return obj.currentStyle[attr];//适配IE浏览器
	}else{
		return getComputedStyle(obj,false)[attr];//适配火狐浏览器...
	}
}
// startMove(obj,{attr1:iTarget1,attr2:iTarget2},fn);
//startMove(当前获取的obj，json=(要改变的属性attr，目标/最终属性值iTarget),回调函数/方法fn)
function startMove(obj,json,fn){
	var timer =null;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var flag = true;//定义一个执行标准
		for(var attr in json){
			//1.获取当前的值
			var icur = 0;
		 	//透明度的单位和值比较特殊，其他属性单位是px，所以要进行判断
		 	if (attr == 'opacity' ){
				//方便计算，透明度小数*100，变成opacity 1=100
				icur = Math.round(parseFloat(getStyle(obj,attr))*100);
			}else{
				icur = parseInt(getStyle(obj,attr));
			}		 		
			//2.算出缓冲速度
			var speed = (json[attr]-icur)/5;
	 		speed = speed>0?Math.ceil(speed):Math.floor(speed);//缓冲速度效果
	 		//3.检测停止
	 		//假如还有值没有达到终点，标准为假，继续执行运动
	 		if(icur != json[attr]){
	 			flag = false;
	 		}
	 		if (attr == 'opacity') {
	 			obj.style.filter = 'alpha(opacity:'+(icur + speed)+')';
	 			obj.style.opacity = (icur + speed)/100;
	 		}else{
	 			obj.style[attr] = icur + speed+'px';
	 		}				 					 						
 		}
 		//直到for遍历完所有的函数且都到终点，flag为真，清除定时器，检测有没有回调函数
 		if (flag) {
			clearInterval(timer);
			if(fn){
				fn();
			}
		}
 	},30);
}
