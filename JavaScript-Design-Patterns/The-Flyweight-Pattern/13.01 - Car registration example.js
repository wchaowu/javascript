/* Car class, un-optimized. */
// 示例：汽车登记
// 把每辆汽车表示为一个对象
var Car = function(make, model, year, owner, tag, renewDate) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.owner = owner;
  this.tag = tag;
  this.renewDate = renewDate;
};
Car.prototype = {
  getMake: function() {
    return this.make;
  },
  getModel: function() {
    return this.model;
  },
  getYear: function() {
    return this.year;
  },
  
  transferOwnership: function(newOwner, newTag, newRenewDate) {
    this.owner = newOwner;
    this.tag = newTag;
    this.renewDate = newRenewDate;
  },
  renewRegistration: function(newRenewDate) {
    this.renewDate = newRenewDate;    
  },
  isRegistrationCurrent: function() {
    var today = new Date();
    return today.getTime() < Date.parse(this.renewDate);
  }
};

 /* Car class, optimized as a flyweight. */
// 使用享元模式，把对象数据划分为内在状态和外在状态
var Car = function(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
};
Car.prototype = {
  getMake: function() {
    return this.make;
  },
  getModel: function() {
    return this.model;
  },
  getYear: function() {
    return this.year;
  }
};
// 上面代码删除了所有的外在数据。
// 所有处理登记事宜的方法都被转移到一个对象管理器中。
// 因为现在对象的数据已被分为两大部分，所以必须用工厂来实例化它。
/* CarFactory singleton. */
// 工厂说明：它会检查之前是否已经创建过对应于指定品牌-型号-出厂日期组合的汽车，如果存在这样的汽车那就返回它，
// 否则就创建一辆新车，并把它保存起来。这就确保了对应于每个唯一的内在状态。
var CarFactory = (function() {
  
  var createdCars = {};
  
  return {
    createCar: function(make, model, year) {
      // Check to see if this particular combination has been created before.
      if(createdCars[make + '-' + model + '-' + year]) {
        return createdCars[make + '-' + model + '-' + year];
      }
      // Otherwise create a new instance and save it.
      else {
        var car = new Car(make, model, year);
        createdCars[make + '-' + model + '-' + year] = car;
        return car;
      }
    }
  };
})();

/* CarRecordManager singleton. */
// 封装在管理器中的外在状态
// 要完成这种优化还需要一个对象，用一个单例来做封装这些数据的管理器。
var CarRecordManager = (function() {
  // 从Car类剥离的所有数据现在都保存在这个对象中
  var carRecordDatabase = {};
  
  return {
    // Add a new car record into the city's system. 
    addCarRecord: function(make, model, year, owner, tag, renewDate) {
      // 创建汽车
      var car = CarFactory.createCar(make, model, year);
      // 添加外在状态数据
      carRecordDatabase[tag] = {
        owner: owner,
        renewDate: renewDate,
        car: car
      };
    },
    
    // Methods previously contained in the Car class.
    transferOwnership: function(tag, newOwner, newTag, newRenewDate) {
      var record = carRecordDatabase[tag];
      record.owner = newOwner;
      record.tag = newTag;
      record.renewDate = newRenewDate;
    },
    renewRegistration: function(tag, newRenewDate) {
      carRecordDatabase[tag].renewDate = newRenewDate;    
    },
    isRegistrationCurrent: function(tag) {
      var today = new Date();
      return today.getTime() < Date.parse(carRecordDatabase[tag].renewDate);
    }
  };
})();
