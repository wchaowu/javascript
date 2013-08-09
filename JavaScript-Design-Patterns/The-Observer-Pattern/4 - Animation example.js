// Publisher API
// 使用前面的Publisher工具实现动画的三个事件
var Animation = function(o) {
  this.onStart = new Publisher,
  this.onComplete = new Publisher,
  this.onTween = new Publisher;
};
Animation.
  method('fly', function() {
    // begin animation
    this.onStart.deliver();
    for (var i=0;i<this.length;i++) { // loop through frames
      // deliver frame number
      this.onTween.deliver(i); 
    }
    // end animation
    this.onComplete.deliver();
  });

// setup an account with the animation manager
var Superman = new Animation({//todoconfig properties...});

// Begin implementing subscribers
var putOnCape = function(i) {};
var takeOffCape = function(i) { };

putOnCape.subscribe(Superman.onStart);
takeOffCape.subscribe(Superman.onComplete);


// fly can be called anywhere
Superman.fly();
// for instance:
addEvent(element, 'click', function() {
  Superman.fly();
});
