<h3>命令模式</h3>
在软件系统中，**“行为请求者”**与**“行为实现者”**通常呈现一种**“紧耦合”**。但在某些场合，比如要对行为进行“记录、撤销/重做、事务”等处理，这种无法抵御变化的紧耦合是不合适的。在这种情况下，如何将“**行为请求者**”与**“行为实现者**”解耦？将**一组行为抽象为对象，实现二者之间的松耦合**。这就是命令模式（Command Pattern）<br />
>[计算器Demo](https://github.com/wchaowu/javascript-code/blob/master/JavaScript-Design-Patterns/The-Command-Pattern/Calculator.js"计算器Demo")
>
###1、命令的结构###
下面展示一个典型的命令类StartAd和StopAd，它们的构造函数由另一个对象adObject作为参数，而它们实现的execute()方法则要调用该对象的某个方法。现在有了两个可用在用户界面中的类，它们具有相同的接口，你不需要也不关心adObject方法的具体实现，只需要知道它实现了start()和stop()方法就可以了。借助命令模式，可以实现用户界面对象与广告对象的隔离。<br />
<a href="https://github.com/wchaowu/javascript-code/blob/master/JavaScript-Design-Patterns/The-Command-Pattern/1%20-%20StopAd%20and%20StartAd%20classes.js">
example
<a>  
####1.1、用闭包创建命令对象  
这种方法不需要创建一个具有execute方法的对象，而是把想要执行的方法包装在闭包中。这样做省却了作用域和this关键字的绑定这方面的烦恼。<br />
<a href="https://github.com/wchaowu/javascript-code/blob/master/JavaScript-Design-Patterns/The-Command-Pattern/2%20-%20Commands%20using%20closures.js">
example
</a>
<br />
这些命令函数可以像命令对象一样四处传递，并且在需要的时候执行。它们是正式的对象类的简单替代品，但并不适用于需要多个命令方法的场合，比如后面实现取消功能的那个示例。<br />
<h4>1.2、客户、调用者和接受者</h4><br />
客户：创建命令，StartAd StopAd<br />
调用者：执行命令，UiButton<br />
接受者：在命令执行时执行相应操作，adObject<br />
<h4>1.3、在命令模式中使用接口</h4><br />
可以使用接口检查命令对象是否实现了正确的执行操作。果用闭包来创建命令函数，那么这种检查更简单，只需要检查该命令是否为函数即可。<br />
<a href="https://github.com/wchaowu/javascript-code/blob/master/JavaScript-Design-Patterns/The-Command-Pattern/3%20-%20Using%20interfaces%20with%20the%20command%20pattern.js">
example
</a>
<br />
<h3>2、命令对象的类型</h3><br />
简单命令对象：这种情况下的命令对象所起的作用只不过是把现有接受者的操作与调用者绑定在一起。它们与客户、接受者和调用者之间只是松散地耦合在一起。<br />
复杂命令对象：封装这一套复杂指令的命令对象，这种命令对象实际上没有接受者，因为它自己提供了操作的具体实现。<br />
灰色地带：有些命令对象不但封装了接收者操作，而且其execute方法也具有一些实现代码。<br />
<a href="https://github.com/wchaowu/javascript-code/blob/master/JavaScript-Design-Patterns/The-Command-Pattern/4%20-%20Types%20of%20commands.js">
example
</a>
<br />
简单命令对象一般用来消除两个对象（接收者和调用者）之间的耦合，而复杂命令对象则一般用来封装不可分的（atomic）或事务性（transactional）的指令。本章着重讨论简单命令对象。<br />
<h3>3、示例：菜单项</h3><br />
<a href="https://github.com/wchaowu/javascript-code/blob/master/JavaScript-Design-Patterns/The-Command-Pattern/5%20-%20Menu%20commands.js">
example
</a>
<br />
命令模式非常适合用来构建用户界面，这是因为这种模式可以把执行具体工作的类与生成用户界面的类隔离开来。在这种模式中，甚至可以让多个用户界面元素公用同一个接受者或命令对象。<br />
<h3>4、示例：取消操作和命令日志 </h3><br />
像UndoDecorator类一样，UndoButton类的构造函数也需要把命令栈作为参数传入。这个栈其实就是一个数组。调用经UndoDecorator对象装饰过的命令对象的execute方法时这个命令对象会被压入栈。为了执行取消操作，取消按钮会从命令栈中弹出最近的命令并调用其undo方法。这将逆转刚执行过的操作。<br />
创建命令接口和对象，使用数组保存操作，通过装饰者加入保存和获取操作命令的方法。<br />
<a href="https://github.com/wchaowu/javascript-code/blob/master/JavaScript-Design-Patterns/The-Command-Pattern/6%20-%20Undo%20with%20reversible%20commands.js">
example
</a>
<br />
<h3>4.1、使用命令日志实现不可逆操作的取消</h3><br />
前面讨论的取消擦偶偶针对的都是移动指针这类容易逆转的操作。对于那些本质上不可逆的操作，要想实现不受限制的取消就困难的多。取消这种操作的唯一办法就是清除状态，然后把之前执行过的操作依次重做一遍。即把所有执行过的命令记录在栈中，要想取消一个操作，需要做的就是从栈中弹出最近那个命令并弃之不用，然后清理画布并从头开始重新执行记录下来的所有命令。<br />
<a href="https://github.com/wchaowu/javascript-code/blob/master/JavaScript-Design-Patterns/The-Command-Pattern/7%20-%20Undo%20with%20command%20logging.js">
example
</a>
<br />
<h3>4.2、用于崩溃恢复的命令日志</h3><br />
命令日志的一个有趣用途是在程序崩溃后恢复其状态。可以用XHR把经过序列化处理的命令记录到服务器上。用户下次访问该网页的时候，系统可以找出这些命令并用其将画布上的图案精确恢复到浏览器关闭时的状态。<br />
<h3>5、命令模式的适用场合</h3><br />
命令模式主要用途是把调用对象（用户界面、API和代理等）与实现操作的对象隔离开。最能体现其效用的还是那种需要对操作进行规范化处理的场合。有了这种规范化处理，一个类或调用者也能调用多种方法，而且不需要先为此了解哪些方法。许多用户界面元素都非常符合这样的特征，比如前面例子中的那种菜单。命令模式可以彻底消除用户界面元素与负责实际工作的类之间的耦合。<br />
可以受益于命令模式的还有其他一些特别场合。这种模式可以用来封装用于XHR调用或其他延迟性调用场合的回调函数。用一个回调函数命令代替回调函数，可以把多条函数调用封装为一个单位。有了命令对象的帮助，在应用程序中实现取消机制几乎是一件不足挂齿的事。<br />
<h3>6、命令模式之利</h3><br />
如果运用得当，可以提高程序的模块化程度和灵活性；<br />
有了它，实现取消和状态恢复等复杂的有用特性非常容易。<br />
命令对象具有的特性比普通方法引用多得多。它可以被参数化处理，而且将那些参数保存起来以供多次调用。你可以为它定义的方法不只有execute，还可以是undo等别的方法，这样一来同样的操作就可以用不同的方式执行。还可以定义与操作相关的元数据，这些元数据可用于对象内省（introspection）或事件日志等目的。命令对象是经过封装的方法调用，它因为这种封装而拥有了方法调用本身所不具备的许多特性。<br />
<h3>7、命令模式之弊</h3><br />
如果一个命令对象只包装了一个方法调用，而且其唯一目的就是这层对象包装的话，那么这种做法是一种浪费。如果你不需要命令模式给予的任何额外特性，也不需要具有一致接口的类所带来的模块性，那么直接使用方法引用而不是完整的命令对象也许更恰当。如果命令对象是运行期间动态创建的而你又难以确定它包含着什么操作的话，情况尤其如此。命令对象都具有同样的接口并且可以所有更好这一点是把双刃剑。在调试复杂的应用程序时它们很难跟踪。