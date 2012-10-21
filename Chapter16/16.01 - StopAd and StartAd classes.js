/* AdCommand interface. */

var AdCommand = new Interface('AdCommand', ['execute']);

/* StopAd command class. */

var StopAd = function(adObject) { // implements AdCommand
  this.ad = adObject;
};
StopAd.prototype.execute = function() {	
  this.ad.stop();
};

/* StartAd command class. */

var StartAd = function(adObject) { // implements AdCommand
  this.ad = adObject;
};
StartAd.prototype.execute = function() {	
  this.ad.start();
};


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
