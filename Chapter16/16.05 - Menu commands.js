/* Command, Composite and MenuObject interfaces. */

var Command = new Interface('Command', ['execute']);
var Composite = new Interface('Composite', ['add', 'remove', 'getChild', 
  'getElement']);
var MenuObject = new Interface('MenuObject', ['show']);

/* MenuBar class, a composite. */

var MenuBar = function() { // implements Composite, MenuObject
  this.menus = {};
  this.element = document.createElement('ul');
  this.element.style.display = 'none';
};
MenuBar.prototype = {
  add: function(menuObject) {
    Interface.ensureImplements(menuObject, Composite, MenuObject);
    this.menus[menuObject.name] = menuObject;
    this.element.appendChild(this.menus[menuObject.name].getElement());
  },
  remove: function(name) {
    delete this.menus[name];
  },
  getChild: function(name) {
    return this.menus[name];
  },
  getElement: function() {
    return this.element;
  },
  
  show: function() {
    this.element.style.display = 'block';
    for(name in this.menus) { // Pass the call down the composite.
      this.menus[name].show();
    }
  }
};

/* Menu class, a composite. */

var Menu = function(name) { // implements Composite, MenuObject
  this.name = name;
  this.items = {};
  this.element = document.createElement('li');
  this.element.innerHTML = this.name;
  this.element.style.display = 'none';
  this.container = document.createElement('ul');
  this.element.appendChild(this.container);
};
Menu.prototype = {
  add: function(menuItemObject) {
    Interface.ensureImplements(menuItemObject, Composite, MenuObject);
    this.items[menuItemObject.name] = menuItemObject;
    this.container.appendChild(this.items[menuItemObject.name].getElement());
  },
  remove: function(name) {
    delete this.items[name];
  },
  getChild: function(name) {
    return this.items[name];
  },
  getElement: function() {
    return this.element;
  },
  
  show: function() {
    this.element.style.display = 'block';
    for(name in this.items) { // Pass the call down the composite.
      this.items[name].show();
    }
  }
};

/* MenuItem class, a leaf. */

var MenuItem = function(name, command) { // implements Composite, MenuObject
  Interface.ensureImplements(command, Command);
  this.name = name;
  this.element = document.createElement('li');
  this.element.style.display = 'none';
  this.anchor = document.createElement('a');
  this.anchor.href = '#'; // To make it clickable.
  this.element.appendChild(this.anchor);
  this.anchor.innerHTML = this.name;

  addEvent(this.anchor, 'click', function(e) { // Invoke the command on click.
    e.preventDefault(); 
    command.execute();
  });
};
MenuItem.prototype = {
  add: function() {},
  remove: function() {},
  getChild: function() {},
  getElement: function() {
    return this.element;
  },
  
  show: function() {
    this.element.style.display = 'block';
  }
};


/* MenuCommand class, a command object. */

var MenuCommand = function(action) { // implements Command
  this.action = action;
};
MenuCommand.prototype.execute = function() {
  this.action();
};


/* Implementation code. */

/* Receiver objects, instantiated from existing classes. */
var fileActions = new FileActions();
var editActions = new EditActions();
var insertActions = new InsertActions();
var helpActions = new HelpActions();

/* Create the menu bar. */
var appMenuBar = new MenuBar();

/* The File menu. */
var fileMenu = new Menu('File');

var openCommand = new MenuCommand(fileActions.open);
var closeCommand = new MenuCommand(fileActions.close);
var saveCommand = new MenuCommand(fileActions.save);
var saveAsCommand = new MenuCommand(fileActions.saveAs);

fileMenu.add(new MenuItem('Open', openCommand));
fileMenu.add(new MenuItem('Close', closeCommand));
fileMenu.add(new MenuItem('Save', saveCommand));
fileMenu.add(new MenuItem('Save As...', saveAsCommand));

appMenuBar.add(fileMenu);

/* The Edit menu. */
var editMenu = new Menu('Edit');

var cutCommand = new MenuCommand(editActions.cut);
var copyCommand = new MenuCommand(editActions.copy);
var pasteCommand = new MenuCommand(editActions.paste);
var deleteCommand = new MenuCommand(editActions.delete);

editMenu.add(new MenuItem('Cut', cutCommand));
editMenu.add(new MenuItem('Copy', copyCommand));
editMenu.add(new MenuItem('Paste', pasteCommand));
editMenu.add(new MenuItem('Delete', deleteCommand));

appMenuBar.add(editMenu);

/* The Insert menu. */
var insertMenu = new Menu('Insert');

var textBlockCommand = new MenuCommand(insertActions.textBlock);
insertMenu.add(new MenuItem('Text Block', textBlockCommand));

appMenuBar.add(insertMenu);

/* The Help menu. */
var helpMenu = new Menu('Help');

var showHelpCommand = new MenuCommand(helpActions.showHelp);
helpMenu.add(new MenuItem('Show Help', showHelpCommand));

appMenuBar.add(helpMenu);

/* Build the menu bar. */
document.getElementsByTagName('body')[0].appendChild(appMenuBar.getElement());
appMenuBar.show();


/* Adding more menu items later on. */

var imageCommand = new MenuCommand(insertActions.image);
insertMenu.add(new MenuItem('Image', imageCommand));

