<h3>CommonJS</h3>

2009年，美国程序员Ryan Dahl创造了node.js项目，将javascript语言用于服务器端编程。<br />

这标志"Javascript模块化编程"正式诞生。因为老实说，在浏览器环境下，没有模块也不是特别大的问题，毕竟网页程序的复杂性有限；<br />
但是在服务器端，一定要有模块，与操作系统和其他应用程序互动，否则根本没法编程。<br />
<br />
node.js的模块系统，就是参照CommonJS规范实现的。在CommonJS中，有一个全局性方法require()，用于加载模块。假定有一个数学模块math.js，就可以像下面这样加载。<br />
<code>
　　var math = require('math');
<code>
然后，就可以调用模块提供的方法：<br />

<code>
　　var math = require('math');
　　math.add(2,3); // 5
<code>
因为这个系列主要针对浏览器编程，不涉及node.js，所以对CommonJS就不多做介绍了。我们在这里只要知道，require()用于加载模块就行了
