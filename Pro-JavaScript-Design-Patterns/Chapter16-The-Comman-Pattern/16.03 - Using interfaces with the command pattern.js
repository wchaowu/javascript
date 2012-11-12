/* Command interface. */

var Command = new Interface('Command', ['execute']);

/* Checking the interface of a command object. */

// Ensure that the execute operation is defined. If not, a descriptive exception
// will be thrown.
Interface.ensureImplements(someCommand, Command);

// If no exception is thrown, you can safely invoke the execute operation. 
someCommand.execute(); 


/* Checking command functions. */

if(typeof someCommand != 'function') {
  throw new Error('Command isn't a function');
}
