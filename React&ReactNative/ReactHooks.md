# React Hooks

- [内置 Hooks](#%e5%86%85%e7%bd%ae-hooks)
- [基础 Hooks](#%e5%9f%ba%e7%a1%80-hooks)
  - [useState](#usestate)
    - [函数式更新](#%e5%87%bd%e6%95%b0%e5%bc%8f%e6%9b%b4%e6%96%b0)
    - [惰性初始化 state](#%e6%83%b0%e6%80%a7%e5%88%9d%e5%a7%8b%e5%8c%96-state)
    - [忽略重新渲染](#%e5%bf%bd%e7%95%a5%e9%87%8d%e6%96%b0%e6%b8%b2%e6%9f%93)
  - [useEffect](#useeffect)
    - [清除副作用](#%e6%b8%85%e9%99%a4%e5%89%af%e4%bd%9c%e7%94%a8)
    - [选择性地触发副作用](#%e9%80%89%e6%8b%a9%e6%80%a7%e5%9c%b0%e8%a7%a6%e5%8f%91%e5%89%af%e4%bd%9c%e7%94%a8)
    - [useEffect 与 useLayoutEffect 的触发时机](#useeffect-%e4%b8%8e-uselayouteffect-%e7%9a%84%e8%a7%a6%e5%8f%91%e6%97%b6%e6%9c%ba)
  - [useContext](#usecontext)
    - [useContext 示例](#usecontext-%e7%a4%ba%e4%be%8b)
- [其它 Hooks](#%e5%85%b6%e5%ae%83-hooks)
  - [useReducer](#usereducer)
    - [指定 initialState](#%e6%8c%87%e5%ae%9a-initialstate)
  - [useCallback](#usecallback)
  - [useMemo](#usememo)
  - [useRef](#useref)
  - [useImperativeHandle](#useimperativehandle)
  - [useLayoutEffect](#uselayouteffect)
  - [useDebugValue](#usedebugvalue)

Hooks 是 `React 16.8` 新增的功能，它能让你在不写 `class` 的情况下使用 `state` 和其它 React 特性。

## 内置 Hooks

- 基础 Hooks
  - [useState](#useState)
  - [useEffect](#useEffect)
  - [useContext](#useContext)
- 其它 Hooks
  - [useReducer](#useReducer)
  - [useCallback](#useCallback)
  - [useMemo](#useMemo)
  - [useRef](#useRef)
  - [useImperativeHandle](#useImperativeHandle)
  - [useLayoutEffect](#useLayoutEffect)
  - [useDebugValue](#useDebugValue)

## 基础 Hooks

### useState

```tsx
const [state, setState] = useState(initialState)
```

> React 保证 `setState` 方法是不变的，这是为什么可以在 `useEffect` 或者 `useCallback` 的依赖数组中忽略 `setState` 的原因。

#### 函数式更新

如果新 state 是根据前一个 state 计算而来，可以给 `setState` 传入一个函数，该函数接收旧的 `state`， 返回新的 state。

```tsx
function Counter({ initialCount = 0 }) {
  const [count, setCount] = useState(initialCount)
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>reset</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    </>
  )
}
```

如果传入的函数返回的是当前 state, 则不会进行重新渲染。

#### 惰性初始化 state

传给 `useState()` 的参数 `initialState` 只会在初次渲染时使用，重新渲染时是被忽略的。如果 `initialState`是一个昂贵计算的结果，
可以向 `useState()` 传入函数作为参数，在该函数中进行这个昂贵的计算并返回 `initialState`，此时该昂贵的计算过程只会在初次渲染时被执行。

```tsx
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props)
  return initialState
})
```

#### 忽略重新渲染

如果 `setState()` 接收的新 state 与当前 state 一样（使用 `Object.is()`进行比较），那么 React 将

- 不会渲染当前组件的子组件
- 也不会触发任何 `effect`
- ❗ **不会重新渲染当前组件，但是会执行该组件中`return`语句之前的代码**

所以，如果组件中有昂贵计算过程，可以使用 `useMemo()` 进行优化。

### useEffect

```tsx
useEffect(() => updateFn)
```

订阅、更新、计时器、日志等副作用都应该定义在 `useEffect()` 钩子函数中，传入 `useEffect()` 的函数将会在组件被渲染到屏幕上之后才会执行。

默认情况下，副作用在每次组件渲染完成后都会执行，但是可以选择性地指定当特定值改变后执行某些副作用。

#### 清除副作用

通常，副作用会创建一些资源， 这些资源需要在组件被卸载之前被清理掉（例如： 定时器 ID、消息订阅等）。可以通过给 `useEffect()` 函数指定一个函
数作为返回值，该函数将会在组件更新之前执行，进行清理工作。

```tsx
useEffect(() => {
  const subscription = props.source.subscribe()

  return () => {
    // 清理订阅信息
    subscription.unsubscribe()
  }
})
```

> 注意： 这里有一个问题，每次重新渲染该组件后都会触发 `useEffect()` ，导致每次都进行 `unsubscribe()、subscribe()`，

#### 选择性地触发副作用

`useEffect()` 默认会在组件每次完成渲染之后触发，但是有些时候仅仅需要在某些依赖项发生改变时触发副作用，例如上例中的 `subscription` 只需要在 `props.source`
发生改变时触发 `unsubscribe()` 和 `subscribe()`。

`useEffect()` 函数接收一个数组作为第二个参数，该数组中可以指定 `useEffect()` 依赖项，每当依赖项发生变化，就会触发该 `useEffect()` 中指定的副作用。

> 注意：
>
> 1. 如果使用这种优化方法，必须确保 `useEffect()` 中使用到的所有 `props/state` 中的变量都在依赖数组中指定过了。推荐使用
>    [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation) 的 `exhaustive-deps` 规则来检查
> 2. 如果传入一个 `[]` 作为依赖数组，那么该副作用只会在组件挂载和卸载时执行，效果类似于 `componentDidMount` 和 `componentWillUnmount`。

#### useEffect 与 useLayoutEffect 的触发时机

`useEffect()` 适用于处理大多数的副作用，因为这些副作用不需要阻塞浏览器渲染组件。但是，不是所有的副作用都可以延迟执行，例如用户可见的 DOM 突变必须在组件
下次重绘到屏幕之前执行，以使用户不会感觉到视觉上的不一致。对于这些类型的副作用，React 提供了一个 `useLayoutEffect()` 的钩子函数，它与 `useEffect()`
有相同的函数签名， 区别仅仅是触发时机不同。

### useContext

```tsx
const context = useContext(MyContext)
```

`useContext()` 接收一个 `context` 对象（由 `React.createContext()` 返回的值）， 然后返回该 `context` 对象当前的值。该 `context` 对象的值由
距离调用 `useContext()` 方法的组件最近的父级 `<MyContext.Provider>` 组件提供。当 `context` 对象的值改变时，该组件也会进行重新渲染。

> `useContext()` 只是让调用该钩子函数的组件可以访问 `context` 并订阅 `context` 的改变，还需要在该组件外层提供一个 `<MyContext.Provider>` 父级组件
> 来提供 `context` 的值，如果没有提供 `<MyContext.Provider>` 父级组件，则访问到的是 `React.createContext()` 中传入的默认值。

#### useContext 示例

**themeContext.jsx**

```tsx
import React from 'react'

const defaultTheme = {
  foreground: '#000',
  background: '#ddd'
}

const themeContext = React.createContext(defaultTheme)

function ThemeProvider({ theme, children }) {
  return (
    <themeContext.Provider value={{ ...defaultTheme, ...theme }}>
      {children}
    </themeContext.Provider>
  )
}

function useTheme() {
  const theme = React.useContext(themeContext)
  return theme
}

export { ThemeProvider, useTheme }
```

**UseContextBasic.jsx**

```tsx
import React from 'react'
import { ThemeProvider, useTheme } from './themeContext'

export default function UseContextBasic() {
  const [theme, setTheme] = React.useState(undefined)
  const darkTheme = { background: '#000', foreground: '#fff' }
  return (
    <ThemeProvider theme={theme}>
      <div>
        <p>useContext Demo</p>
        <button onClick={() => setTheme(darkTheme)}>dark theme</button>
        <Son />
      </div>
    </ThemeProvider>
  )
}

function Son() {
  const theme = useTheme()
  return (
    <div style={{ backgroundColor: theme.background, color: theme.foreground }}>
      <p>theme from context is: {JSON.stringify(theme)}</p>
    </div>
  )
}
```

## 其它 Hooks

### useReducer

```tsx
const [state, dispatch] = useReducer(reducer, initialArg, init)
```

`useState()` 的替代方法。接受一个形式为 `(state, action) => newState` 的 reducer 函数，返回一个数组，该数组第一个元素为当前 state, 第二个元素为 `dispatch` 方法。

当组件有涉及多个子值的复杂 state 逻辑或者下一个状态取决于上一个状态时， 使用 `useReducer` 函数比 `useState` 更加合适。

`useReducer` 示例：

```tsx
const initialState = { count: 0 }

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    default:
      return state
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </>
  )
}
```

`useReducer` 还可以配合 `useContext` 来避免在多层级组件之间手动传递 callback 函数，因为可以使用 `context` 来传递 `dispatch` 。

> 注意：  
> React 确保 `dispatch` 在重新渲染时不会改变，这就是为什么可以从 `useEffect`, `useCallback` 的依赖数组中忽略 `dispatch` 的原因。

#### 指定 initialState

有两种方法指定 initialState：

- 向 `useReducer()` 函数传入 initialState 作为第二个参数：

  ```tsx
  const [state, dispatch] = useReducer(reducer, {
    count: initialCount
  })
  ```

  > 注意：  
  > React 没有使用 Redux 流行的 `state = initialState` 的参数约定。

- 向 `useReducer()` 函数传入 initialArg 和 init 函数作为第二个和第三个参数，initialState 将被设置为 `init(initialArg)`：

  ```tsx
  function init(initialCount) {
    return {
      count: initialCount
    }
  }
  const [state, dispatch] = useReducer(reducer, initialCount, init)
  ```

### useCallback

```tsx
const memorizedCallback = useCallback(callback, deps)
```

返回一个缓存过的 callback。只有当 deps 数组中的某个值发生改变时才会重新生成。
**当将 callback 传递给子组件时非常有用，可以避免因为父组件更新导致传递过来的 callback 发生变化而导致子组件重新渲染。**

> `useCallback(fn deps)` 相当于 `useMemo(() => fn, deps)`。

### useMemo

```tsx
const memorizedValue = useMemo(() => computeExpensiveValue, deps)
```

返回一个缓存过的计算值。只有当 deps 数组中某个值发生改变时才会重新计算。这项优化可以避免每次渲染都执行某些昂贵的计算。

> 应该将 `useMemo` 作为性能优化的手段。编写代码，使其在不使用 `useMemo` 的情况下也可以正常工作，然后添加 `useMemo` 来进行性能优化。  
> 未来 React 可能会选择忘记一些之前缓存过的值，然后在下次渲染时重新计算，例如： 释放屏幕外的组件占用的内存等。

### useRef

```tsx
const refContainer = useRef(initialValue)
```

`useRef` 返回一个可变的 `ref` 对象， 它的 `current` 属性被初始化为传入 `useRef` 的参数 `initialValue`。返回的 `ref` 对象将在组件的整个生命周期中保持不变。

useRef 示例：

```tsx
function TextInputWithFocusButton() {
  const inputEleRef = useRef(null)
  const onButtonClick = function() {
    inputEleRef.current.focus()
  }
  return (
    <div>
      <input ref={inputEleRef} type="text" />
      <button onClick={onButtonClick}>focus the input</button>
    </div>
  )
}
```

`useRef` 不只是可以用于 `ref` 属性，保存任何可变的值都可以。

```tsx
function Timer() {
  const intervalRef = useRef()

  function handleCancelClick() {
    clearInterval(intervalRef.current)
  }

  useEffect(() => {
    const timerId = setInterval(() => {
      //...
    }, 1000)
    intervalRef.current = timerId
    return () => {
      clearInterval(intervalRef.current)
    }
  })

  return <button onClick={handleCancelClick}>cancel interval</button>
}
```

> 注意：  
> `useRef` 中保存的值发生改变时不会通知你。  
> 更改 `current` 属性值不会导致重新渲染。  
> 如果想在 React 将引用添加到 DOM 节点/从 DOM 节点移除时运行一些代码，则可能要改用 [回调引用](https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node)。

### useImperativeHandle

```tsx
useImperativeHandle(ref, createHandle, deps)
```

`useImperativeHandle` 用于自定义使用 ref 时公开给父组件的实例值。 `useImperativeHandle` 应该和 `forwardRef` 一起使用。

```tsx
function ChildComp(props, ref) {
  const inputEleRef = React.useRef()
  const btnEleRef = React.useRef()

  React.useImperativeHandle(ref, () => ({
    getInputValue: () => {
      return inputEleRef.current.value
    },
    getBtnText: () => {
      return btnEleRef.current.textContent
    }
  }))
  return (
    <div>
      <input type="text" ref={inputEleRef} defaultValue="input" />
      <button ref={btnEleRef}>button</button>
    </div>
  )
}

const ChildCompWithForwardRef = React.forwardRef(ChildComp)
```

然后在父级组件中可以调用不同的方法获取不同元素的值：

```tsx
function Parent() {
  const [value, setValue] = React.useState()
  const childComponentRef = React.useRef()

  const handleGetChildInputValue = function() {
    setValue(childComponentRef.current.getInputValue())
  }

  const handleGetChildButtonText = function() {
    setValue(childComponentRef.current.getBtnText())
  }
  return (
    <div>
      <h3>useImperativeHandle Demo</h3>
      <p>value got from child component is : {value}</p>
      <button onClick={handleGetChildInputValue}>
        get the value of input from child component
      </button>
      <button onClick={handleGetChildButtonText}>
        get the text of button from child component
      </button>

      <ChildCompWithForwardRef ref={childComponentRef} />
    </div>
  )
}
```

### useLayoutEffect

签名与 `useEffect` 相同，但是在所有 DOM 突变后都会同步触发。使用它从 DOM 读取 layout 布局并同步重新渲染。

> 尽可能使用 `useEffect` 以避免阻塞视觉更新。

### useDebugValue

`useDebugValue` 可用于在浏览器 `React DevTools` 中显示自定义钩子的标签。

```tsx
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null)

  // ...

  // Show a label in DevTools next to this Hook
  // e.g. "FriendStatus: Online"
  useDebugValue(isOnline ? 'Online' : 'Offline')

  return isOnline
}
```
