/* CalendarItem interface. */
// 创建一个Web日历
// 首先实现的是一个未经优化的、未使用享元的版本，这是个大型组合对象。
var CalendarItem = new Interface('CalendarItem', ['display']);

/* CalendarYear class, a composite. */
// 组合对象
var CalendarYear = function(year, parent) { // implements CalendarItem
  this.year = year;
  this.element = document.createElement('div');
  this.element.style.display = 'none';
  parent.appendChild(this.element);

  function isLeapYear(y) {
    return (y > 0) && !(y % 4) && ((y % 100) || !(y % 400));
  }

  this.months = [];
  // The number of days in each month.
  this.numDays = [31, isLeapYear(this.year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 
    31, 30, 31]; 
  for(var i = 0, len = 12; i < len; i++) {
    this.months[i] = new CalendarMonth(i, this.numDays[i], this.element);
  }
);
CalendarYear.prototype = {
  display: function() {
    for(var i = 0, len = this.months.length; i < len; i++) {
      // 继续向下调用子对象的display方法
      this.months[i].display(); // Pass the call down to the next level.
    }
    this.element.style.display = 'block';
  }
};

/* CalendarMonth class, a composite. */
// 组合对象
var CalendarMonth = function(monthNum, numDays, parent) { // implements CalendarItem
  this.monthNum = monthNum;
  this.element = document.createElement('div');
  this.element.style.display = 'none';
  parent.appendChild(this.element);

  this.days = [];
  for(var i = 0, len = numDays; i < len; i++) {
    this.days[i] = new CalendarDay(i, this.element);
  }
);
CalendarMonth.prototype = {
  display: function() {
    for(var i = 0, len = this.days.length; i < len; i++) {
      // 继续向下调用子对象的display方法
      this.days[i].display(); // Pass the call down to the next level.
    }
    this.element.style.display = 'block';
  }
};

/* CalendarDay class, a leaf (unoptimized). */
// 叶对象
var CalendarDay = function(date, parent) { // implements CalendarItem
  this.date = date;
  this.element = document.createElement('div');
  this.element.style.display = 'none';
  parent.appendChild(this.element);  
};
CalendarDay.prototype = {
  display: function() {
    this.element.style.display = 'block';
    this.element.innerHTML = this.date;
  }  
};



/* CalendarDay class, a flyweight leaf (optimized). */
// 把日期对象转换为享元进行优化
// 把CalendarDay对象转化为享元对象的过程很简单。
// 首先，修改CalendarDay类本身，除去其中保存的所有数据，让这些数据成为外在数据：
var CalendarDay = function() {}; // implements CalendarItem
CalendarDay.prototype = {
  display: function(date, parent) {
    var element = document.createElement('div');
    parent.appendChild(element);
    element.innerHTML = date;
  }  
};

/* Single instance of CalendarDay */
// 创建日期对象的单个实例，所有CalendarMonth对象中都要使用这个实例。
var calendarDay = new CalendarDay();
// 享元的典型工作方式：现在外在数据成了display方法的参数，而不是类的构造函数的参数。

/* CalendarMonth class, a composite (optimized). */
// 修改CalendarMonth类
var CalendarMonth = function(monthNum, numDays, parent) { // implements CalendarItem
  this.monthNum = monthNum;
  this.element = document.createElement('div');
  this.element.style.display = 'none';
  parent.appendChild(this.element);

  this.days = [];
  for(var i = 0, len = numDays; i < len; i++) {
  	// 原来用CalendarDay类构造函数创建该，替换为calendarDay对象
    this.days[i] = calendarDay;
  }
);
CalendarMonth.prototype = {
  display: function() {
    for(var i = 0, len = this.days.length; i < len; i++) {
      // 原本提供该给CalendarDay类构造函数的参数现在被转而提供给display方法
      this.days[i].display(i, this.element); 
    }
    this.element.style.display = 'block';
  }
};
