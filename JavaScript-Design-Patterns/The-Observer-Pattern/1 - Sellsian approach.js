/* From http://pluralsight.com/blogs/dbox/archive/2007/01/24/45864.aspx */

/*
  * Publishers are in charge of "publishing" i.e. creating the event.
  * They're also in charge of "notifying" (firing the event).
*/
/**
 * 下面的例子发布者处于明显的主导地位
 * 它们负责登记其顾客，而且有权停止为其投送
 * 最后，新的报纸出版后它们将其投送给顾客
 */
var Publisher = new Observable;

/*
  * Subscribers basically... "subscribe" (or listen).
  * Once they've been "notified" their callback functions are invoked.
*/
var Subscriber = function(news) {
  // news delivered directly to my front porch
};
// 以一个代表订阅者的回调函数为参数，deliver方法在调用过程中将通过这些回调函数把数据发送给每一个订阅者。
Publisher.subscribeCustomer(Subscriber);

/*
  * Deliver a paper:
  * sends out the news to all subscribers.
*/
Publisher.deliver('extre, extre, read all about it');

/*
  * That customer forgot to pay his bill.
*/
Publisher.unSubscribeCustomer(Subscriber);
