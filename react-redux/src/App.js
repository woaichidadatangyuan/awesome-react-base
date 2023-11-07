import { useState, useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { decrement, increment, addToNum } from "./store/modules/counterStore"
import { fetchChannelList } from "./store/modules/channelStore"
function App() {
    // 组件里使用store里的数据， useSelector
    const { count } = useSelector(state => state.counter)
    const { channelList } = useSelector( state => state.channel)

    // 使用dispatch去提交action
    const dispatch = useDispatch()
    

    //使用useEffect触发异步请求执行
    useEffect(() => {
        dispatch(fetchChannelList())
    },[dispatch])
    return (
        <div className="app">
            <button onClick={() => dispatch(decrement())}>-</button>
            {count}
            <button onClick={() => dispatch(increment())}>+</button>

            <button onClick={() => dispatch(addToNum(10))}>add to 10</button>
            <button onClick={() => dispatch(addToNum(20))}>add to 20</button>

            <ul>
                { channelList.map(item => <li key={item.id}>{item.name}</li>)}
            </ul>
        </div>
    )
}
export default App

