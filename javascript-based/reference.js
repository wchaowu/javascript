/*正常的情况*/
var a = 5;
var b = a;

b += 3;

alert(b);  //8
alert(a);  //5



//对象和函数都是引用的关系
var a = [1,2,3];
var b = a;

b.push(4);

alert(b); //1,2,3,4
alert(a); //1,2,3,4*/

//数组重新写
var a = [1,2,3];
var b = a;
b = [1,2,3,4];

alert(b);  //1,2,3,4
alert(a);  //1,2,3

/*对象赋值*/
var obj = {
	a : 10
};
var obj2 = obj;

obj2.a = 20;

alert(obj.a);  //20*/

//赋值解决方案
var obj = {
	a : 10
};

function copy(obj){  //浅拷贝
	
	var newObj = {};
	
	for(var attr in obj){
		newObj[attr] = obj[attr];
	}
	
	return newObj;
	
}

var obj2 = copy(obj);

obj2.a = 20;

alert(obj.a);  //10

//解决方案二
function deepCopy(obj){  //深拷贝

	if(typeof obj != 'object'){
		console.trace();
		return obj;
	}
	
	var newObj = {};
	
	for(var attr in obj){
		newObj[attr] = deepCopy(obj[attr]);
	}
	
	return newObj;
	
}

var obj2 = deepCopy(obj);

obj2.a.b = 20;

alert(obj.a.b);  //10