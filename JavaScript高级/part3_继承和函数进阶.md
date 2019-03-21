# 继承和函数进阶

## 继承

### 属性的继承：借用构造函数

```js
function Person(name, age){
    this.name = name
    this.age = age
}

function Student(name, age, number){
    // 借用构造函数继承属性成员
    Person.call(this, name, age)
    this.number = number
}
```

### 原型方法的继承

#### 1. 拷贝继承（for...in)

```js
Person.prototype.sayName = function (){
    console.log(this.name)
}

for(var key in Person.prototype){
    // 原型对象拷贝继承原型对象的成员
    Student.prototype[key] = Person.prototpye[key]
}
```

#### 2. 原型继承

```js
Person.prototype.sayName = function (){
    console.log(this.name)
}

// 利用原型的特性实现继承，需要手动添加constructor
Student.prototype = new Person()
Student.prototype.constructor = Student
```

> 总结： 
>
> 组合继承（组合使用**原型继承**和**借用构造函数**）的方式最全面。

## 函数进阶

### 函数的定义方式

- 函数声明

  ```js
  function fn(){}
  ```

- 函数表达式

  ```js
  var fn = function (){}
  ```

- 创建函数对象

  ```js
  // 创建函数对象的方式，需要传递的参数放在函数主体前面，如这里的a和b
  var fn = new Function('a', 'b', 'var x = 0; console.log(x + a + b)')
  fn(1, 2)  // 3
  ```

### 函数声明和函数表达式区别

- 函数声明在预解析阶段会被函数提升，在声明前后都可以调用
- 函数表达式不会被函数提升，必须在表达式执行之后才可以调用

```js
fn1()	// fn1
fn2()	// 报错： fn2 is not a function

function fn1(){ console.log('fn1')}

var fn2 = function (){console.log('fn2')}
```

### 函数内this指向的不同场景

| 调用方式     | 非严格模式           | 备注                           |
| :----------- | :------------------- | :----------------------------- |
| 普通函数     | window               | 严格模式下为undefined          |
| 构造函数     | 构造函数的实例对象   | 原型方法中的this也指向实例对象 |
| 对象方法     | 该方法所属的实例对象 |                                |
| 事件绑定方法 | 事件的绑定对象       |                                |
| 定时器函数   | window               |                                |

### 函数也是对象

所有函数都是 `Function` 的实例。

```js
var fn = function (){}
console.log(fn instanceof Function)  	// true
console.log(fn instanceof Object)    	// true
```

### call、apply和bind

这三个方法用来优雅地处理函数内部 `this` 指向问题。

#### call

语法：

```js
fn.call(thisArg[, arg1[, arg2[, ...]]])
```

参数:

- thisArg
  - 指定fn函数运行时this的值
  - 如果指定null或者undefined，则函数内部this指向window
- arg1, arg2, ...
  - 指定的参数列表

#### apply

`apply` 方法和 `call` 方法作用类似，唯一不同点是 `apply` 方法接收的是**参数数组**而不是参数列表。

语法：

```js
fn.apply(thisArg, [argsArray])
```

参数：

- thisArg
- argsArray

例子：

```js
// 求数组最大值
var arr = [1,2,5,4]

// Math.max()只接收参数列表，使用apply可以让数组作为参数传入
console.log(Math.max.apply(null, arr))	// 5
```

#### bind

`bind` 方法会创建一个由指定的this值和与原函数相同函数体的新函数。 `bind` 与 `call` 、`apply` 不同点是 `bind` 不会立即调用，而是返回新函数。

语法：

```js
fn.bind(thisArg[, arg1[, arg2[, ...]]])
```

参数：

- thisArg
  - 当返回的新函数被调用时，该参数会作为原函数运行时的this指向
- arg1, arg2, ...
  - 传入的参数列表, 这些参数会在新函数的实参之前传给新函数。

返回值：

- 返回由指定的this值和原函数相同函数体的新函数。

例子：

```js
this.x = 9
var obj = {
    x: 1,
    printX: function (){
        console.log(this.x)
    }
}

var printX = obj.printX
printX()			// 9		--- 函数调用时this指向window
// 注意这里是将obj.printX赋值给printX,然后再调用printX, 如果直接调用obj.printX则返回 1
obj.printX() 		// 1

var boundPrintX = obj.printX.bind(obj)
boundPrintX()   	// 1      --- bind改变函数中this指向为obj
```

#### 小结

call 和 apply：

- 都是立即调用
- 通过第一个参数指定函数内部 this指向，如果第一个参数为null或undefined，则内部this指向window
- call传入的是参数列表
- apply传入的是参数数组，执行时会将数组中元素一一取出作为形参传入

bind：

- 不会调用，而是返回改变了this指向的新函数

- bind传递参数的方式有两种

  1. 在bind同时，以参数列表的形式传入
  2. 在调用时，以参数列表的形式传入

  合并的原则：**bind时传入的参数在调用时传入的参数之前**。

### 函数的其它成员

- name - 函数名称
- length - 形参的个数
- caller - 函数调用者
- arguments - 实参集合，伪数组

```js
function fn(a){
    console.log(fn.name)
    console.log(fn.length)
    console.log(fn.caller)
    console.log(arguments)
}

function callerFn(){
    fn(1,2,3)
}

callerFn()
```

### 高阶函数

函数可以作为参数和返回值

### 闭包

#### js中的作用域、作用域链

- 全局作用域
- 函数作用域
- **没有块级作用域**

```js
if(true){
    var a = 123
}
console.log(a)	// 123
```

作用域链中，内层作用域可以访问外层作用域，反之不行。

#### 什么是闭包（closure）

闭包就是能够读取其它函数内部变量的函数。

在JavaScript中，只有函数内部的子函数才可以读取局部变量，因此可以把闭包简单理解为“定义在函数内部的函数”。

MDN的定义：闭包是函数和声明该函数的词法环境的组合。

#### 闭包的例子

```js
console.log(111)

for(var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i)
  }, 0)
}
console.log(222)
```

#### 闭包的思考题

思考题 1：

```javascript
var name = "The Window";
var object = {
  name: "My Object",
  getNameFunc: function () {
    return function () {
      return this.name;
    };
  }
};

console.log(object.getNameFunc()())
```

思考题 2：

```javascript
var name = "The Window";　　
var object = {　　　　
  name: "My Object",
  getNameFunc: function () {
    var that = this;
    return function () {
      return that.name;
    };
  }
};
console.log(object.getNameFunc()())
```

### 函数递归

#### 递归举例：计算阶乘

```js
function factorial(num){
    if(num <= 1){
        return 1
    }else{
        return factorial(num - 1) * num
    }
}
```

#### 递归应用场景

- 对象的深拷贝
- 遍历DOM树
- Hanoi塔问题





