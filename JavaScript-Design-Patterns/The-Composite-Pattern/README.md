组合模式：<br />
1、表单验证<br />
topForm对象将在其所有子对象上递归调用save方法，实际上的save操作只会发生在底层的叶对象上。组合对象只起到一个传递调用的作用。
<br/>
<a href="https://github.com/wchaowu/javascript-code/blob/master/JavaScript-Design-Patterns/The-Composite-Pattern/1%20-%20Form%20validation.js">example</a>
<br />
1、向FormItem添加操作：<a href="https://github.com/wchaowu/javascript-code/blob/master/JavaScript-Design-Patterns/The-Composite-Pattern/2%20-%20Adding%20operations%20to%20FormItem.js">example</a><br />
2、向层次体系中添加类：<br />
我们可以把域组织在域集中，每一个域集都是一个实现了FormItem接口的组合对象，在域集上调用restore将导致在其所有子对象上调用restore。<a href="https://github.com/wchaowu/javascript-code/blob/master/JavaScript-Design-Patterns/The-Composite-Pattern/3%20-%20Adding%20classes%20to%20the%20hierarchy.js">example</a><br />
3、示例：图片库<br />
创建一个图片库，有选择地隐藏或显示图片库的特定部分。这可能是单独的图片，也可能是图片库。<a href="https://github.com/wchaowu/javascript-code/blob/master/JavaScript-Design-Patterns/The-Composite-Pattern/4%20-%20Image%20gallery%20example.js">example</a><br />
4、组合模式之利：<br />
简单的操作也能产生复杂的结果，只需对最顶层的对象执行操作，让每一个子对象自己传递这个操作即可。这对于那些再三执行的操作尤其有用。<br />
在组合模式中，各个对象之间的耦合非常松散。只要它们实现了同样的接口那么改变它们的位置或互换它们只是举手之劳。着促进了代码的重用，也有利于代码重构。<br />
每当对顶层组合对象执行一个操作时，实际上是在对整个结构进行深度优先的搜索以查找节点，而创建组合对象的程序员对这些细节一无所知。在这个层次体系中添加、删除和查找节点都非常容易。<br />
5、组合模式之弊：<br />
组合对象的易用性可能掩盖了它所支持的每一种操作的代价。由于组合对象调用的任何操作都会被传递到它的所有子对象如果这个层次体系很大的话，系统的性能将会受到影响。组合模式的正常运作需要用到某种形式的接口。<br />
组合对象和节点类被用作HTML元素的包装工具时，组合对象必须遵守HTML的使用规则。例如，表格就很难转化为一个组合对象。<br />
接口检查越严格，组合对象类也就越可靠。