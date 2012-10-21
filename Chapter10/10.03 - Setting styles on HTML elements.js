var element = document.getElementById('content');
element.style.color = 'red';

element.style.fontSize = '16px';

var element1 = document.getElementById('foo');
element1.style.color = 'red';

var element2 = document.getElementById('bar');
element2.style.color = 'red';

var element3 = document.getElementById('baz');
element3.style.color = 'red';




setStyle(['foo', 'bar', 'baz'], 'color', 'red');

function setStyle(elements, prop, val) {
  for (var i = 0, len = elements.length-1; I < len; ++i) {
    document.getElementById(elements[i]).style[prop] = val;
  }
}

setStyle(['foo'], 'position', 'absolute');
setStyle(['foo'], 'top', '50px');
setStyle(['foo'], 'left', '300px');

setCSS(['foo'], {
  position: 'absolute',
  top: '50px',
  left: '300px'
});

function setCSS(el, styles) {
  for ( var prop in styles ) {
    if (!styles.hasOwnProperty(prop)) continue;
    setStyle(el, prop, styles[prop]);
  }
}

setCSS(['foo', 'bar', 'baz'], {
  color: 'white',
  background: 'black',
  fontSize: '16px',
  fontFamily: 'georgia, times, serif'
});
