方法的链式调用<br />
Javascript中的对象是作为引用被传递的，所以可以让每个方法都传回对象的引用，即返回this值；<br />
这种编程风格可以简化代码的编写工作，让代码更简洁易读，<br />
<a href="https://github.com/wchaowu/javascript-code/blob/master/JavaScript-Design-Patterns/Chaining/3-Building%20a%20chainable%20JavaScript%20library.js">示例程序</a><br />
<br />
为了解决命名冲突，使用指定的API，可以为框架提供一个安装器<br />
<a href="https://github.com/wchaowu/javascript-code/blob/master/JavaScript-Design-Patterns/Chaining/3-The%20structure%20of%20the%20chain.js">示例程序</a><br />
<br />
如果想让getter和setter方法都支持链式调用，可以在getter方法中使用回调技术，
<a href="https://github.com/wchaowu/javascript-code/blob/master/JavaScript-Design-Patterns/Chaining/4-Using%20callbacks.js">示例程序</a>