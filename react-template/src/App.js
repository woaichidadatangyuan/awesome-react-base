import { useState, useRef } from "react"

// input 影响表单受控绑定
/**
 * 1.通过value属性绑定react状态
 * 2.绑定onChange事件 通过事件参数e拿到输入框最新值 反向修改到react
 * 3.react中获取DOM, 使用useRef先声明一个对象，ref={}绑定，渲染完毕之后，进行dom生成，通过inputRef.current拿到
 */
function App() {
    const [value,setValue] = useState('')
    const inputRef = useRef(null)
    const showDom = () => {
        console.dir(inputRef.current)
    }
    return (
        <div className="app">
            {'input:'}
            <input value={value} type="text" onChange={(e) => setValue(e.target.value)}/>

            {'inputRef:'}
            <input type="text" ref={inputRef} />
            <button onClick={showDom}>点击获取inputRef</button>

        </div>
    )
}
export default App

