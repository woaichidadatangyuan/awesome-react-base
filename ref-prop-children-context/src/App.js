import { useState, useRef, createContext, useContext } from "react"

// input 影响表单受控绑定
/**
 * 1.通过value属性绑定react状态
 * 2.绑定onChange事件 通过事件参数e拿到输入框最新值 反向修改到react
 * 3.react中获取DOM, 使用useRef先声明一个对象，ref={}绑定，渲染完毕之后，进行dom生成，通过inputRef.current拿到
 */

/**1.组件通信：
 * 父传子
 * 1） 父组件传递数据 子组件标签身上绑定属性
 * 2） 子组件接受数据 props的参数（数字，字符串，布尔值，数组，对象，函数，jsx） 
 *     只读 不允许直接修改
 * 子传父
 * 核心：在子组件中调用父组件中的函数并传递实参
 * 
 * 
 * 兄弟通信
 * 实现思路：借助状态提升机制， 通过父组件进行兄弟组件之间的数据通信
 * 1）A组件先通过子传父把数据传给父组件App
 * 2) App拿到数据后通过父传子方式再传递给B组件
 * 
 * 跨层通信
 * 1）使用createContext方法创建一个上下文对象ctx
 * 2）在顶层组件（App）中通过Ctx.Provider组件提供数据
 * 3）在底层组件（D)中通过useContext钩子函数获取消费数据
 */
const MsgContext = createContext()
function Son(props){
    console.log('props', props)
    return (
        <div>this is son {props.name}, jsx:{props.child}</div>
    )
}
function Son1(props){
    console.log('props1', props)
    return (
        <div>this is son, span children:{props.children}</div>
    )
}
function Son2({onGetSonMsg}){
    console.log('props2', onGetSonMsg)
    const sonMsg = 'this is son msg'
    return (
        <div>
            this is Son
            <button onClick={() => onGetSonMsg(sonMsg)}>sendMsg</button>
        </div>
    )
}
function A ({onGetAName}){
  const name = 'this is A name'
  return (
    <div>
      this is A component
      <button onClick={() => onGetAName(name)}>send</button>
    </div>
  )
}
function B ({name}){
  return (
    <div>
      this is B component
      {name}
    </div>
  )
}
function C(){
  return (
    <div>
      this is C component
      <D/>
    </div>
  )
}
function D(){
  const appMsg = useContext(MsgContext)
  return (
    <div>
      this is D component, {appMsg}
    </div>
  )
}

function App() {
    const [value,setValue] = useState('')
    const inputRef = useRef(null)
    const showDom = () => {
        console.dir(inputRef.current)
    }
    const name1 = 'this is app name'

    const [msg, setMsg] = useState('')
    const getMsg = (msg) => {
        console.log(msg)
        setMsg(msg)
    }

    const [name, setName] = useState('')
    const getAName = (name) => {
      console.log(name)
      setName(name)
    }

    const contextMsg = 'this is app context msg'
    return (
        <div className="app">
            <div>
              {'input:'}
              <input value={value} type="text" onChange={(e) => setValue(e.target.value)}/>

              {'inputRef:'}
              <input type="text" ref={inputRef} />
              <button onClick={showDom}>点击获取inputRef</button>
            </div>

            <br />
            {'--------父子组件传值'}
            <br />
            <div>
                <Son
                    name={name1}
                    age={18}
                    isTrue={false}
                    list={['vue', 'react']}
                    obj={{name:'jack'}}
                    cb={() => console.log(123)}
                    child={<span>this is child label span</span>}
                />
                <br />
                {'--------组件传值'}
                <br />
                <Son1>
                    <span>this is span child</span>
                </Son1>
                <br />
                {'--------组件传值'}
                <br />
                <Son2 onGetSonMsg={getMsg}></Son2>
                <div>this is app, {msg}</div>
            </div>

            <br />
            {'--------兄弟组件传值'}
            <br />
            <div>
              <div>this is father app, </div>
              <A onGetAName={getAName}></A>
              <B name={name}></B>
            </div>

            <br />
            {'--------跨层组件传值'}
            <br />
            <div>
              <MsgContext.Provider value={contextMsg}>
                this is app
                <C/>
              </MsgContext.Provider>
            </div>
        </div>
    )
}
export default App

