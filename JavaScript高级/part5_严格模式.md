# JavaScript 严格模式


> ES6中类和模块内部默认使用严格模式，无需手动指定。 


## 严格模式的含义
JavaScript严格模式，即在严格的模式下运行代码，使用 `use strict` 指令。  
> IE10+支持严格模式，不支持的浏览器会忽略 `use strict` 指令。   

## 严格模式的好处
1. 消除JavaScript中不严谨、不合理的之处、减少怪异现象；
2. 提高编译效率和运行速度；
3. 为新版本的JavaScript做铺垫。  

## 严格模式的声明方式
1. 全局作用域声明： 在js文件的第一行（`use strict` 之前没有可执行的有效语句）添加 `'use strict'`；
2. 函数作用域声明： 在函数内部第一行添加 `'use strict'`；

> 由于全局作用域声明的方式不利于文件的合并，可以使用自调用函数来包裹所有代码，保证全部代码以严格模式运行：  
> ```js
> (function (){
>   'use strict'
>    // 严格模式代码
> })()
> ```

## 严格模式的语法与行为变更
1. 不允许使用未声明的变量  
   非严格模式对于没有声明的变量会默认改为全局变量；  
   严格模式会报错：
   ```js
   'use strict'
   x = 3.14  // 报错，x未定义
   ```  
2. 禁止使用with语句  
   非严格模式允许使用with语句改变运行环境；  
   严格模式禁止使用：  
   ```js
   var foo = {
     name: '123'
   }

   with(foo){
     console.log(name)  // '123'
   }
   ```  
3. 创设eval作用域  
   非严格模式下有全局作用域和函数作用域，eval语句的作用域取决于它处于全局作用域还是函数作用域；  
   严格模式下eval语句是一个独立作用域，它所生成的变量只能用于eval内部：  
   ```js
   'use strict'
   var name = '123'
   eval('var name = \'456\'')
   console.log(name)  // '123'
   ```  
4. 禁止this默认指向全局对象，而是默认指向undefined
   ```js
   'use strict'
   console.log(this)  // Window

   function a(){
     console.log(this)  // undefined
   }
   ```  
   > call、apply、bind中this对应的参数传递什么就指向什么：  
   > ```js
   > 'use strict'
   > function a(x){
   >   console.log(this, x)
   > }
   > a.call(null, 1)  // null  1
   > a.call(undefined, 1)  // undefined  1
   > ```  
5. 禁止使用arguments.caller和arguments.callee调用自身和被调用函数  
   ```js
   'use strict'
   function a(){
     console.log(arguments.caller)  // 报错
     console.log(arguments.callee)  // 报错
   }
   ```  
6. 禁止删除变量、对象，但是**可以删除属性**
   ```js
   'use strict'
   var name = '123'
   delete name  // 报错

   var obj = {age: 123, name: '123'}
   delete obj  // 报错
   // 但是 delete obj.age 不报错，因为删除的是obj的age属性，返回true
   ```  
7. 禁止函数参数重名  
   ```js
   'use strict'
   function fn(a, b, a){}  // 报错，函数参数重名
   ```  
   > 注： ES6严格模式允许对象属性重名。
8. 禁止八进制表示法  
   ```js
   'use strict'
   var a = 010  // 报错
   ```  
9. 针对对象的操作，只读属性不可修改，删除不可删除的属性会报错  
   ```js
   'use strict'
   var foo = {}
   // 只读属性不可修改
   Object.defineProperty(foo, 'v', { value: 1, writable: false})
   foo.v = 2  // 报错

   // 删除不可删除的属性会报错
   delete Object.prototype  // 报错 
   ```  
10. 增加保留字  
    为了向未来的JavaScript过渡，严格模式新增了一些保留字（主要与类相关）：implements、interface、let、package、private、protected、public、static、yield。