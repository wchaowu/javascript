/* Command interface. */

var Command = new Interface('Command', ['execute']);

/* Checking the interface of a command object. */

// Ensure that the execute operation is defined. If not, a descriptive exception
// will be thrown.
// 用接口检查命令对象是否实现了正确的执行操作
Interface.ensureImplements(someCommand, Command);

// If no exception is thrown, you can safely invoke the execute operation. 
someCommand.execute(); 


/* Checking command functions. */
// 如果用闭包来创建命令函数，那么这种检查更简单，只需要检查该命令是否为函数即可。
if(typeof someCommand != 'function') {
  throw new Error('Command isn't a function');
}
