/* Original AcmeBicycleShop factory class. */

var AcmeBicycleShop = function() {};
extend(AcmeBicycleShop, BicycleShop);
AcmeBicycleShop.prototype.createBicycle = function(model) {
  var bicycle;

  switch(model) {
    case 'The Speedster':
      bicycle = new AcmeSpeedster();
      break;
    case 'The Lowrider':
      bicycle = new AcmeLowrider();
      break;
    case 'The Flatlander':
      bicycle = new AcmeFlatlander();
      break;
    case 'The Comfort Cruiser':
    default:
      bicycle = new AcmeComfortCruiser();
  }

  Interface.ensureImplements(bicycle, Bicycle);
  return bicycle;  
};

/* AcmeBicycleShop factory class, with decorators. */

var AcmeBicycleShop = function() {};
extend(AcmeBicycleShop, BicycleShop);
AcmeBicycleShop.prototype.createBicycle = function(model, options) {
  // Instantiate the bicycle object.
  var bicycle = new AcmeBicycleShop.models[model]();

  // Iterate through the options and instantiate decorators.
  for(var i = 0, len = options.length; i < len; i++) {
    var decorator = AcmeBicycleShop.options[options[i].name];
    if(typeof decorator !== 'function') {
      throw new Error('Decorator ' + options[i].name + ' not found.');
    }
    var argument = options[i].arg;
    bicycle = new decorator(bicycle, argument);
  }

  // Check the interface and return the finished object.
  Interface.ensureImplements(bicycle, Bicycle);
  return bicycle;  
};

// Model name to class name mapping.
AcmeBicycleShop.models = {
  'The Speedster': AcmeSpeedster,
  'The Lowrider': AcmeLowrider,
  'The Flatlander': AcmeFlatlander,
  'The Comfort Cruiser': AcmeComfortCruiser
};

// Option name to decorator class name mapping.
AcmeBicycleShop.options = {
  'headlight': HeadlightDecorator,
  'taillight': TaillightDecorator,
  'bell': BellDecorator,
  'basket': BasketDecorator,
  'color': FrameColorDecorator,
  'lifetime warranty': LifetimeWarrantyDecorator,
  'timed warranty': TimedWarrantyDecorator
};

var myBicycle = new AcmeSpeedster();
myBicycle = new FrameColorDecorator(myBicycle, 'blue');
myBicycle = new HeadlightDecorator(myBicycle);
myBicycle = new TaillightDecorator(myBicycle);
myBicycle = new TimedWarrantyDecorator(myBicycle, 2);

var alecsCruisers = new AcmeBicycleShop();
var myBicycle = alecsCruisers.createBicycle('The Speedster', [
  { name: 'color', arg: 'blue' }, 
  { name: 'headlight' }, 
  { name: 'taillight' }, 
  { name: 'timed warranty', arg: 2 }
]);
