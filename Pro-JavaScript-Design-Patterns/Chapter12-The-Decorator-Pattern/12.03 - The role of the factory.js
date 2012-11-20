/* Original AcmeBicycleShop factory class. */
// 原来的AcmBicycleShop类如下
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
/**
 * 这个类的改进版允许用户指定想为自行车配件的选件。
 * 在这里使用工厂模式可以统揽各种类（既包括自行车类也包括装饰者类）
 * 把所有这些信息保存在一个地方，用户就可以把实际的类名与客户代码隔离开，
 * 这样以后添加新类或修改现有类也就更容易。
 */
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

// 创建装饰的自行车对象的两种不同做法
// 第一种做法不使用工厂，与客户代码紧密耦合在一起的类不下5个。
var myBicycle = new AcmeSpeedster();
myBicycle = new FrameColorDecorator(myBicycle, 'blue');
myBicycle = new HeadlightDecorator(myBicycle);
myBicycle = new TaillightDecorator(myBicycle);
myBicycle = new TimedWarrantyDecorator(myBicycle, 2);
// 第二种方法使用了工厂，与客户代码耦合在一起的只有一个类，即那个工厂本身。
var alecsCruisers = new AcmeBicycleShop();
var myBicycle = alecsCruisers.createBicycle('The Speedster', [
  { name: 'color', arg: 'blue' }, 
  { name: 'headlight' }, 
  { name: 'taillight' }, 
  { name: 'timed warranty', arg: 2 }
]);












