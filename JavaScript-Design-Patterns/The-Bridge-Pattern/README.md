<h3>桥接模式</h3>
按照GoF的定义，桥接模式的作用在于“将抽象与其实现隔离开来，以便二者独立变化”。这种模式对于Javascript中常见的事件驱动的编程大有裨益。<br />
桥接模式最常见和实际的应用场合之一是事件监听器回调函数。 example：事件监听器，把事件处理的语句封装到回调函数中，通过接口而不是实现进行编程。<br />
桥接模式的其他例子：<br />
除了在事件回调函数与接口之间进行桥接外<br />
桥接模式也可以用于连接公开的API代码和私用的实现代码<br />
此外，它还可以用来把多个类联结在一起。从类的角度来看，这意味着把接口作为公开的代码编写，而把类的实现作为私用代码编写。<br />
<a href="https://github.com/wchaowu/javascript-code/blob/master/JavaScript-Design-Patterns/The-Bridge-Pattern/2%20-%20Other%20examples%20of%20bridges.js"  target="_black">
example：用桥接模式收集某些私用性的信息 </a><br />
<a href="https://github.com/wchaowu/javascript-code/blob/master/JavaScript-Design-Patterns/The-Bridge-Pattern/3%20-%20Bridging%20multiple%20classes%20together.js" target="_black">
example：用桥接模式联结多个类 使用桥接模式，让Class1和Class2能够独立于BridgeClass而发生改变。
</a>
<br />
构建一个Ajax请求队列，把请求存储在浏览器内存中的一个队列 化数组中，刷新队列时，每个请求都会按“先入先出”的顺序被发送给一个后端的Web服务。<br />
<a href="https://github.com/wchaowu/javascript-code/blob/master/JavaScript-Design-Patterns/The-Bridge-Pattern/4%20-%20Building%20an%20XHR%20connection%20queue.js">
该Ajax请求队列的框架实现：example
</a>
<br />
<a href="https://github.com/wchaowu/javascript-code/blob/master/JavaScript-Design-Patterns/The-Bridge-Pattern/5%20-%20XHR%20connection%20queue%20example%20page.html">
该Ajax请求队列的使用例子：example<br />
</a>
<a href="https://github.com/wchaowu/javascript-code/blob/master/JavaScript-Design-Patterns/The-Bridge-Pattern/6%20-%20Where%20have%20bridges%20been%20used_.js">
添加桥接方法的例子：example<br />
</a>
这个应用程序到处都有桥接元素的身影，最明显的是，事件监听器回调函数并不直接与队列打交道，而是使用了桥接函数。<br />
在供用户执行刷新和暂停操作的部分，我们提供了一个动作调度函数，其作用就是桥接用户操作所包含的输入信息并将其委托给恰当的处理代码。在DOM脚本编程中，这种技术也称为事件委托。click事件所代表的用户操作与DED.Queue实现完全分开的结果就是，后者的方法并不直接与那些事件耦合在一起，因此你可以在任何地方执行这些方法。<br />
2.1、适用场合：<br />
这里的要诀是要让接口“可桥接”，实际上也就是可适配。<br />
2.2、优点：<br />
把抽象与实现隔离开，有助于独立地管理软件的各组成部分。<br />
2.3、缺点：<br />
每使用一个桥接元素都要增加一次函数调用，这对应用程序的性能会有一些负面影响。提高了系统的复杂程度。如果一个桥接函数被用于连接两个函数，而其中某个函数根本不会在桥接函数之外被调用，那么此时这个桥接函数就不是非要不可的。<br />
桥接模式“将抽象与实现隔离开来，以便二者独立变化”。它可以促进代码的模块化、促成更简洁的实现并提高抽象的灵活性。它可以用来把一组类和函数连接起来，而且提供了一种借助于特权函数访问私用数据的手段。