/* Directory interface. */

var Directory = new Interface('Directory', ['showPage']);

/* PersonnelDirectory class, the Real Subject */

var PersonnelDirectory = function(parent) { // implements Directory
  this.xhrHandler = XhrManager.createXhrHandler();
  this.parent = parent;
  this.data = null;
  this.currentPage = null;

  var that = this;
  var callback = {
    success: that._configure,
    failure: function() { 
      throw new Error('PersonnelDirectory: failure in data retrieval.'); 
    }
  }
  xhrHandler.request('GET', 'directoryData.php', callback); 
};
PersonnelDirectory.prototype = {
  _configure: function(responseText) {
    this.data = eval('(' + reponseText + ')');
    ...
    this.currentPage = 'a';
  },
  showPage: function(page) {
    $('page-' + this.currentPage).style.display = 'none';
    $('page-' + page).style.display = 'block';
    this.currentPage = page;
  }
};


/* DirectoryProxy class, just the outline. */

var DirectoryProxy = function(parent) { // implements Directory

};
DirectoryProxy.prototype = {
  showPage: function(page) {
    
  }
};

/* DirectoryProxy class, as a useless proxy. */

var DirectoryProxy = function(parent) { // implements Directory
  this.directory = new PersonnelDirectory(parent);
};
DirectoryProxy.prototype = {
  showPage: function(page) {
    return this.directory.showPage(page);
  }
};

/* DirectoryProxy class, as a virtual proxy. */

var DirectoryProxy = function(parent) { // implements Directory
  this.parent = parent;
  this.directory = null;
  var that = this;
  addEvent(parent, 'mouseover', that._initialize); // Initialization trigger.
};
DirectoryProxy.prototype = {
  _initialize: function() {
    this.directory = new PersonnelDirectory(this.parent);
  },
  showPage: function(page) {
    return this.directory.showPage(page);
  }
};

/* DirectoryProxy class, with loading message. */

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
    this.interval = setInterval(that._checkInitialization, 100);
  },
  _checkInitialization: function() {
    if(this.directory.currentPage != null) {
      clearInterval(this.interval);
      this.initialized = true;
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
