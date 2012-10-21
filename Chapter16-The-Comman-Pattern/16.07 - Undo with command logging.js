/* Movement commands. */

var MoveUp = function(cursor) { // implements Command
  this.cursor = cursor;
};
MoveUp.prototype = {
  execute: function() {
    cursor.move(0, -10);
  }
};

/* Cursor class, with an internal command stack. */

var Cursor = function(width, height, parent) {
  this.width = width;
  this.height = height;
  this.commandStack = [];

  this.canvas = document.createElement('canvas');
  this.canvas.width = this.width;
  this.canvas.height = this.height;
  parent.appendChild(this.canvas);
  
  this.ctx = this.canvas.getContext('2d');
  this.ctx.strokeStyle = '#cc0000';
  this.move(0, 0);
};
Cursor.prototype = {
  move: function(x, y) {
    var that = this;
    this.commandStack.push(function() { that.lineTo(x, y); });
    this.executeCommands();
  },
  lineTo: function(x, y) {
    this.position.x += x;
    this.position.y += y; 
    this.ctx.lineTo(this.position.x, this.position.y);
  },
  executeCommands: function() {
    this.position = { x: this.width / 2, y: this.height / 2 };
    this.ctx.clearRect(0, 0, this.width, this.height); // Clear the canvas.
    this.ctx.beginPath();
    this.ctx.moveTo(this.position.x, this.position.y);
    for(var i = 0, len = this.commandStack.length; i < len; i++) {
      this.commandStack[i]();
    }
    this.ctx.stroke();
  },
  undo: function() {
    this.commandStack.pop();
    this.executeCommands();
  }
};

/* UndoButton class. */

var UndoButton = function(label, parent, cursor) {
  this.element = document.createElement('button');
  this.element.innerHTML = label;
  parent.appendChild(this.element);
  
  addEvent(this.element, 'click', function() {
    cursor.undo();
  });  
};

/* Implementation code. */

var body = document.getElementsByTagName('body')[0];
var cursor = new Cursor(400, 400, body);

var upCommand = new MoveUp(cursor);
var downCommand = new MoveDown(cursor);
var leftCommand = new MoveLeft(cursor);
var rightCommand = new MoveRight(cursor);

var upButton = new CommandButton('Up', upCommand, body);
var downButton = new CommandButton('Down', downCommand, body);
var leftButton = new CommandButton('Left', leftCommand, body);
var rightButton = new CommandButton('Right', rightCommand, body);
var undoButton = new UndoButton('Undo', body, cursor);
