import { useState, useEffect} from "react"
/**
 * useEffect是一个React Hook函数，用于在react组件中创建不是由事件引起的
 * 而是由渲染本身引起的操作，比如：发送ajax请求，更改DOM
 * @returns useEffect(()=>{}, [])
 * 第一个参数，副作用函数，放置要执行的操作
 * 第二个参数，数组，可选，不同依赖项会影响第一个参数函数的执行
 * 1) 没有依赖项， 组件初次渲染 + 组件更新时执行
 * 2) 空数组，副作用函数只会在组件渲染完毕之后执行一次
 * 3）添加特定依赖项，组件初次渲染 + 特定依赖项发生变化时执行
 */

/**
 * 清除副作用：在useEffect中编写的由渲染本身引起的对接组件外部的操作，
 * 比如： 开启一个定时器，在组件卸载时把这个定时器清理掉--->清理副作用
 * 最常见的执行时机：组件卸载自动执行
 */

/**
 * 封装自定义hook
 * 问题：布尔切换逻辑 当前组件耦合在一起 不方便复用
 * 
 * 解决思路：自定义hook
 * 1.使用一个以use打头的函数
 * 2.在函数内部封装可复用的逻辑（只要是可复用的逻辑）
 * 3.在组件中用到的状态或者回调return出去（对象或者数组）
 * 4.在哪个组件中要用到这个逻辑，就执行这个函数，解构出来状态和回调进行使用
 */

/**
 * reactHooks使用规则
 * 1.只能在组件中或者其它自定义hook函数中调用
 * 2.只能在组件的顶层调用，不能嵌套在if,for,其它函数中
 */
const URL = 'http://geek.itheima.net/v1_0/channels'
function Son(){
    useEffect(() => {
        const timer = setInterval(() => {
            console.log('定时器执行中...')
        },1000)

        return () =>{
            //清除副作用
            clearInterval(timer)
        }
    },[])
    return (
        <div>this is son</div>
    )
}
function useToggle() {
    const [value, setValue] = useState(true)
    const toggle = () => {
        setValue(!value)
    }
    return {
        value,
        toggle
    }
}
function App() {
    // 模拟请求
    const [list,setList] = useState([])
    // 模拟计时器
    const [count, setCount] = useState(0)
    //清除副作用
    const [show, setShow] = useState(true)
    // useEffect(()=>{
    //     //额外的操作，获取频道列表
    //     async function getList(){
    //         const res = await fetch(URL)
    //         const jsonRes = await res.json()
    //         console.log(list)
    //         setList(jsonRes.data.channels)
    //     }
    //     getList()
    // },[])

    // useEffect(()=>{
    //     console.log('副作用函数执行了')
    // })

    // useEffect(()=>{
    //     console.log('副作用函数执行了')
    // },[])

    // useEffect(()=>{
    //     console.log('副作用函数执行了')
    // },[count])
    const {value, toggle} = useToggle()
    return (
        <div className="app">
            this is app
            <br/>
            {'--------渲染后请求'}
            <ul>
                {list.map(item => <li key={item.id}>{item.name}</li>)}
            </ul>

            <br/>
            {'---------计时器'}
            <button onClick={() => {setCount(count + 1)}}>{count}</button>

            <br/>
            {'---------清除副作用'}
            { show && <Son/>}
            <button onClick={() => {setShow(false)}}>卸载Son组件</button>

            <br/>
            {'---------自定义hook'}
            { value && <Son/>}
            <button onClick={toggle}>切换Son组件</button>
        </div>
    )
}
export default App

