/* From http://pluralsight.com/blogs/dbox/archive/2007/01/24/45864.aspx */

/*
  * Publishers are in charge of "publishing" i.e. creating the event.
  * They're also in charge of "notifying" (firing the event).
*/
var Publisher = new Observable;

/*
  * Subscribers basically... "subscribe" (or listen).
  * Once they've been "notified" their callback functions are invoked.
*/
var Subscriber = function(news) {
  // news delivered directly to my front porch
};
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
