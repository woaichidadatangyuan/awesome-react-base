// 1.useState是react hook（函数），它允许我们向组件添加一个状态变量(数据驱动视图)，从而控制影响组件的渲染结果
// 返回值是一个数组， 第一个是状态变量， 第二个是set函数用来修改状态变量， 传入参数作为初始值
// const [count, setCount] = useState(0)
//实现计数器
import { useState } from 'react'
import { useImmer } from 'use-immer'
function App() {
    // 1.基本类型
    let [count, setCount] = useState(0)
    const handleClick =  () => {
        // 要注意：开始可能会想，既然数据驱动视图，那我拿到原来的值进行修改，即count++，自然渲染UI也会改，但是不是的
        // react状态被认为是可读的， 我们应该始终替换它!!!而不是修改它!!!， 直接修改状态不能引发视图更新
        setCount(count++)
    }

    //2.1 无嵌套对象
    const [form, setForm] = useState({
        name:'jack'
    })
    const changeForm = () => {
        // form.name='xjh'
        // console.log('form',form)
        setForm({
            ...form,
            name:'hhh'
        })
    }
    // 2.2 嵌套对象
    const [person, setPerson] = useState({
        name: 'Niki de Saint Phalle',
        artwork: {
          title: 'Blue Nana',
          city: 'Hamburg',
          image: 'https://i.imgur.com/Sd1AgUOm.jpg',
        }
    });
    // 数据扁平化-如果嵌套特别多层，很不好解，不易维护，
    const changePersonCity = () => {
        setPerson({
            ...person,
            artwork:{
                ...person.artwork,
                city:'NewYork'
            }
        })
    }
    // Immer--> 直接修改
    const [things, updateThings] = useImmer({
        name: 'Niki de Saint Phalle',
        artwork: {
          title: 'Blue Nana',
          city: 'Hamburg',
          image: 'https://i.imgur.com/Sd1AgUOm.jpg',
        }
    });
    const changeImmer = () => {
        updateThings(draft => {
            draft.artwork.title = 'hot red'
        })
    }

    // 3.数组
    /**
     * 添加元素：concat， [...arr]!!not push,shift
     * 删除元素： filter，slice!!not pop shift,splice
     * 替换元素： map!! not splice, arr[i]=...赋值
     * 排序： 先把数组复制一份！！not reverse,sort
     * 插入元素：定义某个index, slice(0,index),{...},slice(index)
     */
    return (
        <div className="app">
            <button onClick={handleClick}>{count}</button>
            <button onClick={changeForm}>修改form对象{form.name}</button>
            <button onClick={changePersonCity}>多层扁平化修改person对象{person.artwork.city}</button>
            <button onClick={changeImmer}>简单修改{things.artwork.title}</button>
        </div>
    )
}
export default App

// function App() {
//     return (
//         <div className="app">
            
//         </div>
//     )
// }
// export default App

