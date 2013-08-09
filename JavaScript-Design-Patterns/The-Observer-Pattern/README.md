<h3> 1、观察者模式</h3>
观察者模式又称为发布者-订阅者模式（publisher-subscriber）。用Javascript的话来说，这种模式的实质就是你可以对程序中某个对象的状态进行观察，并且在其发生改变时能够得到通知。
观察者模式存在的两个角色：观察者和被观察者。这里我们成为发布者和订阅者。
<h4>1.1、示例：报纸的投送</h4>
发行方也是投送方（deliver）。一般说来，一个发行方很可能有许多订阅者，同样，一个订阅者也很可能会订阅多家报社的报纸。问题的关键在于，这是一种多读多的关系，需要一种高级的抽象策略，以便订阅者能够彼此独立地发生改变，而发行方能够接受任何有消费意向 的订阅者。
<h4>1.1.1、推与拉的比较</h4>
推：主动把报纸发送到订阅者的家门口。
拉：规模较小的本地报社可能会在订阅者家附近的街角提供自己的数据，供订阅者“拉”。
<<h4>1.1.2、模式的实践</h4>
订阅者：可以订阅和退订。
下面是一个展示发布者和订阅者之间的互动过程的
<a href="https://github.com/wchaowu/javascript-code/blob/master/JavaScript-Design-Patterns/The-Observer-Pattern/1%20-%20Sellsian%20approach.js">
高层示例。
</a>
下面的
<a href="https://github.com/wchaowu/javascript-code/blob/master/JavaScript-Design-Patterns/The-Observer-Pattern/2%20-%20Newspapers%20and%20subscribers.js">
例子</a>
处理的是同一类问题，但发布者和订阅者之间的互动方式有所不同。
<h4>1.2、构建观察者API</h4>
首先需要一个发布者Publisher的构造函数，其中定义了一个类型为数组的属性，用来保存订阅者的引用；
接下来所有的Publisher实例都应该能够投送数据，所以在prototype中添加deliver方法；
给予订阅者订阅的能力；
提供unsubscribe方法供订阅者停止对指定发布者的观察；
<a href="https://github.com/wchaowu/javascript-code/blob/master/JavaScript-Design-Patterns/The-Observer-Pattern/3%20-%20Building%20an%20observer%20API.js">
example
</a>
<h4>1.3、现实生活中的观察者</h4>
观察着模式对于那种由许多Javascript程序员合作开发的大型程序特别有用，可以提高API灵活性，并行开发的多个实现能够彼此独立的进行修改。在富用户界面应用程序中，drag、drop、movedcomplete和tabSwitch都可能是令人感兴趣的事件，它们都是在普通浏览器事件的基础上抽象出来的可观察事件，可由发布者对象向其监听者广播。
<h4>1.4、示例：动画</h4>
动画的三个时刻：开始onStart，结束onComplete和进行中onTween。
<a href="https://github.com/wchaowu/javascript-code/blob/master/JavaScript-Design-Patterns/The-Observer-Pattern/4%20-%20Animation%20example.js">
example
</a>
<h4>1.5、事件监听器也是观察者</h4>
事件处理器：是一种把事件传递给与其关联的函数的手段，而且这种模型中一种事件只能指定一个毁掉方法。
监听器模式：一个事件可以与几个监听器关联，每个监听器都能能独立于其他监听器而改变。
<a href="https://github.com/wchaowu/javascript-code/blob/master/JavaScript-Design-Patterns/The-Observer-Pattern/5%20-%20Event%20listeners%20are%20also%20observers.js">
example
</a>
<h4>1.6、观察着模式的适用场合</h4>
如果希望把人的行为和应用程序的行为分开，那么观察者模式正适用于这种场合。你可以直接监听click事件，不过这需要知道监听的是哪个元素，这样做的另一个弊端是你的实现与click事件直接绑定在了一起。更好的做法是：创建一个可观察的onTabChange对象，并且在特定事件发生时通知所有观察着。
<h4>1.7、观察者模式之利</h4>
观察者模式是开发基于行为的大型应用程序的有力手段。你可以削减为事件注册监听器的次数，让可观察对象借助一个事件监听器替你处理各种行为并将信息委托给它的所有订阅者，从而降低了内存消耗和提高互动性能。
<h4>1.8、观察者模式之弊</h4>
使用这种观察着接口的一个不利之处在于创建可观察对象所带来的加载时间开销。这可以通过惰性加载技术加以化解。