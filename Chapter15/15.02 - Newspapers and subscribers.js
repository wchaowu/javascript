/*
  * Newspaper Vendors
  * setup as new Publisher objects
*/
var NewYorkTimes = new Publisher;
var AustinHerald = new Publisher;
var SfChronicle = new Publisher;


/*
  * People who like to read
  * (Subscribers)
  *
  * Each subscriber is set up as a callback method.
  * They all inherit from the Function prototype Object.
*/
var Joe = function(from) {
  console.log('Delivery from '+from+' to Joe');
};
var Lindsay = function(from) {
  console.log('Delivery from '+from+' to Lindsay');
};
var Quadaras = function(from) {
  console.log('Delivery from '+from+' to Quadaras ');
};

/*
  * Here we allow them to subscribe to newspapers 
  * which are the Publisher objects.
  * In this case Joe subscribes to the NY Times and
  * the Chronicle. Lindsay subscribes to NY Times
  * Austin Herald and Chronicle. And the Quadaras
  * respectfully subscribe to the Herald and the Chronicle
*/
Joe.
  subscribe(NewYorkTimes).
  subscribe(SfChronicle);

Lindsay.
  subscribe(AustinHerald).
  subscribe(SfChronicle).
  subscribe(NewYorkTimes);

Quadaras.
  subscribe(AustinHerald).
  subscribe(SfChronicle);
    
/* 
  * Then at any given time in our application, our publishers can send 
  * off data for the subscribers to consume and react to.
*/
NewYorkTimes.
  deliver('Here is your paper! Direct from the Big apple');
AustinHerald.
  deliver('News').
  deliver('Reviews').
  deliver('Coupons');
SfChronicle.
  deliver('The weather is still chilly').
  deliver('Hi Mom! I\'m writing a book');
