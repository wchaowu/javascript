/* AdCommand interface. */
// 下面展示一个典型的命令类StartAd和StopAd，它们的构造函数由另一个对象adObject作为参数
// 借助命令模式，可以实现用户界面对象与广告对象的隔离
// 定义一个所有命令对象都必须实现的接口AdCommand
var AdCommand = new Interface('AdCommand', ['execute']);

/* StopAd command class. */
// 封装广告的StopAd方法的类
var StopAd = function(adObject) { // implements AdCommand
  this.ad = adObject;
};
// execute()方法调用adObject对象的某个方法
StopAd.prototype.execute = function() {	
  this.ad.stop();
};

/* StartAd command class. */
// 封装广告StartAd方法的类
var StartAd = function(adObject) { // implements AdCommand
  this.ad = adObject;
};
// execute()方法调用adObject对象的某个方法
StartAd.prototype.execute = function() {	
  this.ad.start();
};
// 现在有了两个可用在用户界面中的类，它们具有相同的接口，你不需要也不关心adObject方法的具体实现，只需要知道它实现了start()和stop()方法就可以了。

/* Implementation code. */

var ads = getAds();
for(var i = 0, len = ads.length; i < len; i++) {
  // Create command objects for starting and stopping the ad.
  var startCommand = new StartAd(ads[i]);
  var stopCommand = new StopAd(ads[i]);

  // Create the UI elements that will execute the command on click.
  new UiButton('Start ' + ads[i].name, startCommand);
  new UiButton('Stop ' + ads[i].name, stopCommand);
}
