/* Tooltip class, un-optimized. */
// 未经优化（未使用享元模式）的Tooltip类
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
/* 如果网页上有几百个甚至几千个元素需要用到工具提示，这意味着将会出现成百上千个Tooltip类的实例，
 * 他们每个都有自己的属性、Dom元素和样式，这是非常低效的
 * 如果把Tooltip对象实现为享元，那么它只要有一个实例就行，
 * 可以让管理器对象把要显示的文字作为外在数据提供给它的方法。
 */


/* Tooltip class, as a flyweight. */
// 作为享元的Tooltip
// 把Tooltip类转化为共享需要做三件事：
//    把外在数据从Tooltip对象中删除
//    创建一个用来实例化Tooltip的工厂
//    创建一个用来保存外在数据的管理器

// 把外在数据从Tooltip类中删除
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
  // 由于外在数据可以作为事件监听器的一部分保存，因此没有必要使用一个中心数据库
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
// 上面的Tooltip类删除了原来的构造函数的所有参数以及注册事件的处理代码，
// 而startDelay和show方法则各增加了一个新的参数，这样一来，
// 要显示的文字就可以作为外在数据传给它们。

/* TooltipManager singleton, a flyweight factory and manager. */
// 此例用一个单例同时扮演工厂和管理器的角色
var TooltipManager = (function() {
  var storedInstance = null;
  
  /* Tooltip class, as a flyweight. */
  // 把ToolTip放到单例中，就不能在别的地方被实例化。
  var Tooltip = function() {
    //todo
  };
 Tooltip.prototype = {
   //todo
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
// 


/* Tooltip usage. */

TooltipManager.addTooltip($('link-id'), 'Lorem ipsum...');
