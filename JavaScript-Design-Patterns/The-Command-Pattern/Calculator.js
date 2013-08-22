//javascript 实现计算器
var Calculator={
   　　add:function(x,y){
    　　  return x+y;
   　　},
   　　substract:function(x,y){
    　　  return x-y;
   　　},
   　　multiply:function(x,y){
    　　  return x*y;
   　　},
   　　divide:function(x,y){
    　　  return x/y;
   　　}
　　}
　　Calculator.calc =function(command){
   　　return Calculator[command.type](command.op1,command.opd2)
　　};
　　Calculator.calc({type:'add',op1:1,op2:1});
　　Calculator.calc({type:'substract',op1:5,op2:2});
　　Calculator.calc({type:'multiply',op1:5,op2:2});
　　Calculator.calc({type:'divide',op1:8,op2:4});