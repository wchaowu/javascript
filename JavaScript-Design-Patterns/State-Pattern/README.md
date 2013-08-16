状态模式主要可以用于这种场景
1 一个对象的行为取决于它的状态
2 一个操作中含有庞大的条件分支语句
<h3>回想下街头霸王的游戏</h3>
隆有走动，攻击，防御，跌倒，跳跃等等多种状态，而这些状态之间既有联系又互相约束。<br />
比如跳跃的时候是不能攻击和防御的。跌倒的时候既不能攻击又不能防御，而走动的时候既可以攻击也可以跳跃。<br />
要完成这样一系列逻辑, 常理下if else是少不了的. 而且数量无法估计, 特别是增加一种新状态的时候, 可能要从代码的第10行一直改到900行. <br />


```javascript
if ( state === 'jump' ){
   if ( currState === 'attack' || currState === 'defense' ){
     return false;
   }
}else if ( state === 'wait' ){
   if ( currState === 'attack' || currState === 'defense' ){
     return true;
   }
}

```

为了消灭这些if else, 并且方便修改和维护, 我们引入一个状态类.

```javascript
var StateManager = function(){
  var currState = 'wait';
  var states = {
    jump: function( state ){
    },
    wait: function( state ){
    },
    attack: function( state ){
    },
    crouch: function( state ){
    },
    defense: function( state ){
      if ( currState === 'jump'  ){
          return false;  //不成功，跳跃的时候不能防御
      }
    //do something;     //防御的真正逻辑代码, 为了防止状态类的代码过多, 应该把这些逻辑继续扔给真正的fight类来执行.
    currState = 'defense'; //  切换状态
    }
  }
  var changeState = function( state ){
    states[ state ] && states[ state ]();
  }
  return {
      changeState  : changeState
  }
}
var stateManager = StateManager();
stateManager.changeState( 'defense' );
```
Edit By [MaHua](http://mahua.jser.me)
