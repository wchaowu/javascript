<h3>异步模块定义</h3><br />
AMD是"Asynchronous Module Definition"的缩写，意思就是"异步模块定义"。它采用异步方式加载模块，模块的加载不影响它后面语句的运行。<br />
所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。<br />
<br />
AMD也采用require()语句加载模块，但是不同于CommonJS，它要求两个参数：<br />
<code>

　　require([module], callback);
</code>

第一个参数[module]，是一个数组，里面的成员就是要加载的模块；第二个参数callback，则是加载成功之后的回调函数。如果将前面的代码改写成AMD形式，就是下面这样：<<br />
<code>

　　require(['math'], function (math) {

　　　　math.add(2, 3);

　　});
<code>
<br />
math.add()与math模块加载不是同步的，浏览器不会发生假死。所以很显然，AMD比较适合浏览器环境。<br />

目前，主要有两个Javascript库实现了AMD规范：require.js和curl.js。本系列的第三部分，将通过介绍require.js，进一步讲解AMD的用法，以及如何将模块化编程投入实战。<br />
