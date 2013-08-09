<h3>职责链模式</h3>
<br />
1、职责链的结构<br />
<a href="https://github.com/wchaowu/javascript-code/blob/master/JavaScript-Design-Patterns/The-Chain-of-Responsibility-Pattern/1%20-%20PublicLibrary%20class.js">
首先来看一个图书馆增加图书的例子
</a><br />
<a href="https://github.com/wchaowu/javascript-code/blob/master/JavaScript-Design-Patterns/The-Chain-of-Responsibility-Pattern/2%20-%20PublicLibrary%20class%20with%20hard-coded%20catalogs.js">
添加目录类
</a><br />
addBook方法中的代码固化了对5个不同类的依赖。如果想增加更多图书类别，那就需要修改构造函数和addBook方法这两处的代码。此外，把这些目录类别固化在构造函数中也没有多大意义。<br />
使用职责链模式进行
 <a href="https://github.com/wchaowu/javascript-code/blob/master/JavaScript-Design-Patterns/The-Chain-of-Responsibility-Pattern/3%20-%20PublicLibrary%20class%20with%20chain%20of%20responsibility%20catalogs.js">
改进
</a>
<br />
分类目录对象的具体
<a href="https://github.com/arthinking/Javascript/blob/master/Pro-JavaScript-Design-Patterns/Chapter17-The-Chain-of-Responsibility-Pattern/17.04%20-%20GenreCatalog%20and%20SciFiCatalog%20classes.js">
实现代码
</a>
<br />
2、传递请求<br />
在链上传递请求有许多不同的方法，最常见的做法要么是使用一个专门的请求对象，要么是根本不使用参数，只依靠方法自身传递消息（第6节的例子）。本节讨论第一种方法。<br />
在图书馆中根据分类搜索图书的例子，在GenreCatalog的findBoos()方法中进行传递请求的示例<br />
3、在现有层次中实现职责链<br />
在现有层次体系中实现这种模式往往更容易，在此情况下它经常与组合模式搭配使用。犹豫组合模式已经建立了一个对象层次体系，因此在此基础上添加一些用来处理（或传递）请求的方法很简单。<br />
在组合模式结合了职责链之后，方法调用就不再总是不加分辨地往下一直传到叶对象。此时每一层都要对请求进行分析，以判断当前对象应该处理它还是应该把它往下传。组合对象实际上也会承担部分工作，而不是单纯依靠叶对象执行所有操作。这样一来就不用单独实现一些对象来作链上的环节，也不用手工设定下家对象。通过规定在某些场合下一些方法调用可以再层次体系中较高的层次上得到处理，并且组织较低层次的节点和叶节点获取这些调用，可以让组合模式变得更加健壮。<br />
职责链模式和组合模式的结合对双方都是一种优化。由于职责链是现成的，所以设置代码的数量和用于职责链的额外对象的数目都减少了。由于在组合层次体系中某个方法可能会在高层得到处理，所以在整个树上执行该方法所需的计算量也降低了。<br />
4、事件委托<br />
Javascript语言使用了职责链模式来决定如何处理事件。事件被触发时要经历两个阶段：事件捕获阶段，事件沿HTML层次体系向下传播，直到到达被点击元素；事件冒泡阶段，在这个阶段事件会历经同一批元素升回到顶层祖先。绑定在经过的这些元素上的事件监听器既可以停止事件传播，也可以让其继续沿层次体系向上或向下传播。这里传递请求对象称为事件对象，它包含着与事件有关的所有信息。<br />
事件模型本质是作为职责链实现的所以事件模型也可以遵循如下经验：最好在层次体系较高层次上处理请求，假设有一个无序列表包含着几打列表项。与其为其中的每一个li元素绑定一个click事件监听器，不如只为ul元素绑定一个这种事件监听器，这样脚本会运行的更快，内存消耗得更少，而且以后维护起来也更容易，这种技术称为时间委托，这是职责链方面的知识有助于优化代码的情况之一。<br />
5、职责链模式的适用场合<br />
如果事先不知道在几个对象中有哪些能够处理请求，那么这就属于应该适用职责链的情况；<br />
如果这批处理器对象在开发期间不可知，而是需要动态指定的话，那么也应该使用这种模式；<br />
该模式还可以用在对于每个请求都不止有一个对象可以对它进行处理这种情况下。<br />
使用这种模式，可以把特定的具体类与客户端隔离开，并代之以一条由弱耦合的对象组成的链，它将隐式地对请求进行处理，这有助于提高代码的模块程度和可维护性。<br />
6、图片库的进一步讨论<br />
组合模式实现的
<a href="https://github.com/wchaowu/javascript-code/blob/master/JavaScript-Design-Patterns/The-Chain-of-Responsibility-Pattern/6%20-%20DynamicGallery%20class%20from%20Chapter%209.js">
图片库代码
</a>
<br />
<a href="https://github.com/arthinking/Javascript/blob/master/Pro-JavaScript-Design-Patterns/Chapter17-The-Chain-of-Responsibility-Pattern/17.07%20-%20DynamicGallery%20class%20with%20optimization.js">
6.1、用职责链提高组合对象的效率
</a>
<br />
在组合对象中，hide和show方法先对本层次的一个样式属性进行设置，然后将调用传递给所有子对象。这种做法慎密但效率不高，更好的做法是将这些方法作为沿职责链传递的请求实现，hide请求根本不用传递，show则总是需要传递。<br />
优化一：从hide方法中删除将方法调用传递给子节点的那部分代码<br />
6.2、为图片添加标签<br />
添加标签，提供搜索功能。<br />
通过职责链模式在组合对象中查找包含某个标签的所有对象，分别在组合对象和也对象中添加getPhotosWithTag()方法<br />
7、职责链模式之利<br />
可以动态选择由哪个对象处理请求。可以比试图在开发期间静态指定处理请求的对象高效得多。可以使用这种模式消除发出请求的对象与处理请求的对象之间的耦合。<br />
在已有现成的链或层次体系的情况下，职责链模式更加有效。与组合模式的结合使用就属于这种情况。<br />
8、职责链模式之弊<br />
请求与具体的处理程序被隔离开啦，因此无法保证它一定会被处理，而不是径直从链尾离开。这种模式的接收者都是隐式的，因此无法得知如果请求能够得到处理的话具体将由哪个对象处理它。可以通过创建一个通用的catch-all接收者并将其添加到所有链的尾端来解决，但这个办法很繁琐，失去随时在链尾添加新环节的灵活性。<br />
职责链与组合对象类的搭配使用可能有点令人困惑。组合模式期望组合对象节点完全可以与叶节点互换使用，而且客户代码看不出其中的差别，所有方法调用都被组合对象往层次体系的下层传递。而职责链模式引入后，有些方法会在组合对象进行处理，而不会进行往下传。