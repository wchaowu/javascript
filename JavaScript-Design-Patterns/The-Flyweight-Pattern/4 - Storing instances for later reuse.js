/* DisplayModule interface. */

var DisplayModule = new Interface('DisplayModule', ['show', 'hide', 'state']);

/* DialogBox class. */

var DialogBox = function() { // implements DisplayModule
  //todo
};
DialogBox.prototype = {
  show: function(header, body, footer) { // Sets the content and shows the
    //todo                                  // dialog box.
  },
  hide: function() { // Hides the dialog box.
    //todo
  },
  state: function() { // Returns 'visible' or 'hidden';
    //todo
  }
};

/* DialogBoxManager singleton. */
// 用一个单例来包装管理器需要的部件
var DialogBoxManager = (function() {
  // 保存所生成的对话框的数据结构
  var created = []; // Stores created instances.
  
  return {
  	// 用来显示对话框的方法
    displayDialogBox: function(header, body, footer) {
      var inUse = this.numberInUse(); // Find the number currently in use.
      // 这种技术类似于服务器语言中的SQL连接池，仅当现有连接都在使用当中时才会创建新连接
      if(inUse > created.length) {
        created.push(this.createDialogBox()); // Augment it if need be.
      }
      created[inUse].show(header, body, footer); // Show the dialog box.
    },
    
    createDialogBox: function() { // Factory method.
      var db = new DialogBox();
      return db;
    },
    // 检查当前网页上正在使用的对话框的数目的方法
    numberInUse: function() {
      var inUse = 0;
      for(var i = 0, len = created.length; i < len; i++) {
        if(created[i].state() === 'visible') {
          inUse++;
        }
      }
      return inUse;
    }
  };
})();
