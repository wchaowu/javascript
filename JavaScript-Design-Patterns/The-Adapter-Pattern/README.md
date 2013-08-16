<h3>适配器模式</h3>
适配模式可用来在现有接口和不兼容的类之间进行适配，使用这种模式的对象又叫包装器（wrapper），因为它们是在用一个新的接口包装另一个对象。<br />
从表面上看，适配器模式很像外观模式。它们都要对别的对象进行包装并改变其呈现的接口。
> 二者的差别在于它们如何改变接口。<br >
> > 外观元素展现的是一个简化的接口，它并不提供额外的选择，而且有时为了方便完成常见任务它还会做出一些假定。<br />
> > 适配器则要把一个接口转换为另一个接口，它并不会滤除某些能力，也不会简化接口。如果客户系统API不可用，就需要用到适配器。<br />
PS2-to-USB适配器就是一个例子。<br />
示例：<a href="https://github.com/wchaowu/javascript-code/blob/master/JavaScript-Design-Patterns/The-Adapter-Pattern/1%20-%20Characteristics%20of%20an%20adapter.js">
创建一个简单的适配器方法，修改传入参数的方式
</a>
<br />
示例：
<a href="https://github.com/wchaowu/javascript-code/blob/master/JavaScript-Design-Patterns/The-Adapter-Pattern/1%20-%20Characteristics%20of%20an%20adapter.js">
适配两个库
</a>
<br />
示例：
<a href="https://github.com/wchaowu/javascript-code/blob/master/JavaScript-Design-Patterns/The-Adapter-Pattern/3%20-%20Adapting%20an%20email%20API.html">
适配电子邮件API
</a>
<br />
<a href="https://github.com/wchaowu/javascript-code/blob/master/JavaScript-Design-Patterns/The-Adapter-Pattern/4%20-%20More%20on%20adapting%20an%20email%20API.js">
添加适配器
</a>
<br />
###1.1、适配器模式的适用场合：<br />
适配器适用于客户系统期待的接口与现有API提供的接口不兼容这种场合。适配器所适配的两个方法执行的应该是类似的任务，否则的话就解决不了问题。就像桥接元素和外观元素一样，通过创建适配器，可以把抽象与其实现隔离开来，以便二者独立变化。<br />
###1.2、适配器模式之利：<br />
用一个新的接口对现有类的接口进行包装，这样客户程序就能使用这个并非为其量身打造的类而又无需为此大动手术。<br />
###1.3、设配器模式之弊：<br />
有人认为适配器是一种不必要的开销，完全可以通过重写现有代码避免。此外适配器模式也会引入一批需要支持的新工具。如果现有API还未定形，或者新接口还未定形，那么适配器可能不会一直管用。<br />
在涉及大型系统和遗留框架的情况下，它的优点往往比缺点更突出。