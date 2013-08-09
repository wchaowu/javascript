var clientObject = {
  string1: 'foo',
  string2: 'bar',
  string3: 'baz'
};
function interfaceMethod(str1, str2, str3) {
  //todo
}

function clientToInterfaceAdapter(o) {
  interfaceMethod(o.string1, o.string2, o.string3);
}

/* Usage. */

clientToInterfaceAdapter(clientObject);
