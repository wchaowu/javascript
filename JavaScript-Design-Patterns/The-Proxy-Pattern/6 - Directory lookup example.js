/* Directory interface. */
// 首先是没有使用代理的情况
var Directory = new Interface('Directory', ['showPage']);

/* PersonnelDirectory class, the Real Subject */
// 在构造函数中发送一个XHR请求以获取员工数据。
var PersonnelDirectory = function(parent) { // implements Directory
  this.xhrHandler = XhrManager.createXhrHandler();
  this.parent = parent;
  this.data = null;
  this.currentPage = null;

  var that = this;
  var callback = {
  	// _configure方法在数据返回的时候被调用
    success: that._configure,
    failure: function() { 
      throw new Error('PersonnelDirectory: failure in data retrieval.'); 
    }
  }
  xhrHandler.request('GET', 'directoryData.php', callback); 
};
PersonnelDirectory.prototype = {
  // 生成HTML元素并向其中填入数据
  _configure: function(responseText) {
    this.data = eval('(' + reponseText + ')');
    //todo
    this.currentPage = 'a';
  },
  showPage: function(page) {
    $('page-' + this.currentPage).style.display = 'none';
    $('page-' + page).style.display = 'block';
    this.currentPage = page;
  }
};
// 上面的类在实例化的过程中会加载大量数据，如果在网页加载的时候实例化这个类
// 那么每一个用户都不得不加载这些数据，即使他根本不使用员工目录。
// 代理的作用就是推迟这个实例化过程
/* DirectoryProxy class, just the outline. */
// 首先勾勒出虚拟代理的大体轮廓，它包含了该类需要的所有方法。
var DirectoryProxy = function(parent) { // implements Directory

};
DirectoryProxy.prototype = {
  showPage: function(page) {
    
  }
};

/* DirectoryProxy class, as a useless proxy. */
// 下一步是先将这个类实现为一个无用的代理，它的每个方法所做的只是调用本体的同名方法
var DirectoryProxy = function(parent) { // implements Directory
  this.directory = new PersonnelDirectory(parent);
};
DirectoryProxy.prototype = {
  showPage: function(page) {
    return this.directory.showPage(page);
  }
};

/* DirectoryProxy class, as a virtual proxy. */
// 要想发挥虚拟代理的作用，需要创建一个用来实例化本体的方法，并注册一个用来触发这个实例化过程的事件监听器。
var DirectoryProxy = function(parent) { // implements Directory
  this.parent = parent;
  this.directory = null;
  var that = this;
  // 一旦用户把鼠标指针移到目录的父容器上方，就调用_initialize方法实例化其本体。
  addEvent(parent, 'mouseover', that._initialize); // Initialization trigger.
};
DirectoryProxy.prototype = {
  // DirectoryProxy类的构造函数不再实例化本体，而是把这个工作推迟到_initialize中进行。
  _initialize: function() {
    this.directory = new PersonnelDirectory(this.parent);
  },
  showPage: function(page) {
    return this.directory.showPage(page);
  }
};

/* DirectoryProxy class, with loading message. */
// 剩下的任务就是提示用户当前正在加载员工目录
var DirectoryProxy = function(parent) { // implements Directory
  this.parent = parent;
  this.directory = null;
  this.warning = null;
  this.interval = null;
  this.initialized = false;
  var that = this;
  addEvent(parent, 'mouseover', that._initialize); // Initialization trigger.
};
DirectoryProxy.prototype = {
  _initialize: function() {
    this.warning = document.createElement('div');
    this.parent.appendChild(this.warning);
    this.warning.innerHTML = 'The company directory is loading...';

    this.directory = new PersonnelDirectory(this.parent);
    var that = this;
    // 每隔100毫秒检查一次是否加载完毕
    this.interval = setInterval(that._checkInitialization, 100);
  },
  // 判断是否加载完毕，加载完毕则设置initialized为true
  _checkInitialization: function() {
    if(this.directory.currentPage != null) {
      clearInterval(this.interval);
      this.initialized = true;
      // 加载完毕则移除提示信息
      this.parent.removeChild(this.warning);
    }
  },
  showPage: function(page) {
    if(!this.initialized) {
      return;
    }
    return this.directory.showPage(page);
  }
};
