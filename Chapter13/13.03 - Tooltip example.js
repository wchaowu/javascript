/* Tooltip class, un-optimized. */

var Tooltip = function(targetElement, text) {
  this.target = targetElement;
  this.text = text;
  this.delayTimeout = null;
  this.delay = 1500; // in milliseconds.

  // Create the HTML.
  this.element = document.createElement('div');
  this.element.style.display = 'none';  
  this.element.style.position = 'absolute';    
  this.element.className = 'tooltip';
  document.getElementsByTagName('body')[0].appendChild(this.element);
  this.element.innerHTML = this.text;

  // Attach the events.
  var that = this; // Correcting the scope.
  addEvent(this.target, 'mouseover', function(e) { that.startDelay(e); });
  addEvent(this.target, 'mouseout', function(e) { that.hide(); });  
};
Tooltip.prototype = {
  startDelay: function(e) {
    if(this.delayTimeout == null) {
      var that = this;
      var x = e.clientX;
      var y = e.clientY;
      this.delayTimeout = setTimeout(function() { 
        that.show(x, y); 
      }, this.delay);
    }
  },
  show: function(x, y) {
    clearTimeout(this.delayTimeout);
    this.delayTimeout = null;
    this.element.style.left = (x) + 'px';    
    this.element.style.top = (y + 20) + 'px';
    this.element.style.display = 'block';    
  },
  hide: function() {
    clearTimeout(this.delayTimeout);
    this.delayTimeout = null;
    this.element.style.display = 'none';
  }
};

/* Tooltip usage. */

var linkElement = $('link-id');
var tt = new Tooltip(linkElement, 'Lorem ipsum...');



/* Tooltip class, as a flyweight. */

var Tooltip = function() {
  this.delayTimeout = null;
  this.delay = 1500; // in milliseconds.

  // Create the HTML.
  this.element = document.createElement('div');
  this.element.style.display = 'none';  
  this.element.style.position = 'absolute';    
  this.element.className = 'tooltip';
  document.getElementsByTagName('body')[0].appendChild(this.element);
};
Tooltip.prototype = {
  startDelay: function(e, text) {
    if(this.delayTimeout == null) {
      var that = this;
      var x = e.clientX;
      var y = e.clientY;
      this.delayTimeout = setTimeout(function() { 
        that.show(x, y, text); 
      }, this.delay);
    }
  },
  show: function(x, y, text) {
    clearTimeout(this.delayTimeout);
    this.delayTimeout = null;
    this.element.innerHTML = text;
    this.element.style.left = (x) + 'px';    
    this.element.style.top = (y + 20) + 'px';
    this.element.style.display = 'block';    
  },
  hide: function() {
    clearTimeout(this.delayTimeout);
    this.delayTimeout = null;
    this.element.style.display = 'none';
  }
};

/* TooltipManager singleton, a flyweight factory and manager. */

var TooltipManager = (function() {
  var storedInstance = null;
  
  /* Tooltip class, as a flyweight. */

  var Tooltip = function() {
    ...
  };
 Tooltip.prototype = {
   ...
  };

  return {
    addTooltip: function(targetElement, text) {
      // Get the tooltip object.
      var tt = this.getTooltip();
      
      // Attach the events.
      addEvent(targetElement, 'mouseover', function(e) { tt.startDelay(e, text); });
      addEvent(targetElement, 'mouseout', function(e) { tt.hide(); });      
    },
    getTooltip: function() {
      if(storedInstance == null) {
        storedInstance = new Tooltip();
      }
      return storedInstance;
    }
  };
})();

/* Tooltip usage. */

TooltipManager.addTooltip($('link-id'), 'Lorem ipsum...');
