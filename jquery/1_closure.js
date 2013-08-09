/**
 * Created with JetBrains WebStorm.
 * User: cwwu
 * Date: 13-8-9
 * Time: 上午9:31
 * 对于jquery的closure的封装机制的确对项目的空间隔离有很大的借鉴意义，双层闭包和内调用首先可以防止命名空间污染
 * ，其次逻辑结构也非常清晰，对于内层私有变量的保护和外层库的扩展这种设计的模式在以后的开发中也有很大的借鉴意义。
 */
//首先是jQuery将自己所有的代码封装在一个闭包内；用闭包防止命名空间的变量污染，继续在本身闭包中初始化了一个名为jQuery的自动运行闭包函数；
(function(window, undefined){
    var jQuery = (function(){
    })();
})();
//如此的匿名函数赋值语句，一般就会返回一个内嵌函数如下：
var jQuery = (function(){

    var jQuery = function(){

    }
    return (window.$ = window.jQuery = jQuery);
});
/*而这个内嵌函数在return时做了外部对象（window）的引用以及外部的调用的，
* 所以根js的词法作用域规则，在上层函数运行后它仍将保存其作用域（相当于包含其函数内部调用的外层函数私有变量不会被垃圾回收机制回收掉），
* 这里的jQuery函数在作为window这个全局对象中的引用后便保存了它在上层jQuery函数中调用的所用变量作用域。而这些变量也是jQ自身的属性。
*/
 var jQuery = (function(){

 var jQuery = function(){
 return new jQuery.fn.init(selector, context);
 }
 return (window.$ = window.jQuery = jQuery);
 });
/*
* 这里的jQ函数返回一个新new出来的对象，相当于类的构造函数实际是一个对象工厂函数，而这个对象则是自己prototype里的一个方法的对象，\
* 这边的fn属性既是jQuery的原型而已，而下面的init则是其初始化函数

 我们平时用的fn的插件实际是jQ的原型（注意：这边返回的必须是构造函数而不是new好的对象）
* */
var jQuery = (function(){

    var jQuery = function(){
        return new jQuery.fn.init(selector, context);
    }

    jQuery.fn = jQuery.prototype = {
        init: function(){}
    };

    return (window.$ = window.jQuery = jQuery);
});
/*
* 恩，上面的便是返回了一个init为构造函数的一个对象，相当于说是我们平时用的jQuery对象实质上是jQ对象自己原型中的一个构造函数对象，
* 这个对象是init对象，并不是jQuery对象本身，所以它的原型是空的，并不包含jQ的原型，所以下面这句话异常重要。
 将init的原型指向fn，而fn是指向jQ的原型，相当于init的原型是指向jQ的原型的
 jQuery.fn.init.prototype = jQuery.fn;
 之后代码变成了这样：
* */
var jQuery = (function(){

    var jQuery = function(){
        return new jQuery.fn.init(selector, context);
    }

    jQuery.fn = jQuery.prototype = {
        init: function(){}
    };

    jQuery.fn.init.prototype = jQuery.fn;

    return (window.$ = window.jQuery = jQuery);
});
/*
* 再然后便可以往jQ类中加入静态对象，放在内核内的这里的对象或方法往往是要调用对象内私有属性的，下面是对jQ命名空间的工厂函数：

 jQuery.extend = jQuery.fn.extend = function(){}

 实际上也是jQ原型中定义的一个扩展函数
 至此jQ的内核已经结束。接下来时外层闭包中的jQuery对象，这个对象首先持有了内层返回的jQ对象，而这个对象同样其实是一个函数，
 或者更确切的说是一个类构造函数，然后就可以在外闭包中放一些无需依赖jQ类私有变量的库函数。再对这个类附上库函数。
*
* */
(function(window, undefined){
    //内核
    var jQuery = (function(){})();

    //非依赖私有变量的类方法
    (function(){

        //可以直接调用jQuery外层应用类对其进行扩展
        jQuery.support = {};
        jQuery.extend({
        /*TODO*/
        })

    })();

})();
/*
* 而我们平时用的$(//TODO)或是jQuery(//TODO)则是在用jQ中的init方法new 出一个jQ的对象（更确切说是init对象）

 下面是类似于jQ的全局对象构造机制的自己实现的一个函数
* */
(function(){
    function _$(ele){
        this.eles = [];
        for(var i = 0; i < eles.length ;++i){
            var ele = ele[i];
            if(typeof ele == 'string'){
                ele = document.getElementById(element);
            }
            this.eles.push(ele);
        }
    }

    window.$ = function(){
        return new _$(arguments);
    }
})();
//
