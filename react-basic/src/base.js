// 项目的根组件
// App--> index.js --> public/index.html
import Button from "./components/Button"
const count = 100
function getName() {
  return 'jack'
}
const list = [
  { id:1, name:'xjh1' },
  { id:2, name:'xjh2' },
  { id:3, name:'xjh3' },
]
const isLogin = true

const articleType = 1 //0 1 3
function getArticleTem(){
  if(articleType === 0){
    return <div>我是无图</div>
  }else if(articleType === 1){
    return <div>我是单图</div>
  }else {
    return <div>我是三图</div>
  }
}
/**
 * 注意： jsx可以通过大括号{}识别js中的表达式，比如：变量， 函数调用，方法调用，对象
 * 但是不能识别语句：if, switch, 变量声明等语句
 */
function App() {
  const handleClick = (name, e) => {
    console.log('button被点击了', name, e)
  }
  return (
    <div className="App">
      { /** 1.jsx基本使用 */}
      {/* 使用引号传递字符串*/}
      {'this is apps'}

      {/** 识别js变量 */}
      { count }

      {/** 函数调用 */}
      { getName() }

      {/** 方法调用 */}
      { new Date().getDate() }

      {/** 使用js对象 */}
      <div style={{ color: 'red'}}>this is div red using object</div>

      { /** 2.渲染列表 map 循环哪个结构就return哪个结构 key:需加上，更新性能 */}
      <div className="list">
        { list.map(item => <li key={item.id}>{item.name}</li>) }
      </div>

      {/** 3.逻辑&&和三元数 */}
      { isLogin && <div>this is luoji</div>}
      { isLogin ? <span>jack</span> : <span>loading...</span>}

      { /** 4.调用函数渲染不同的模板 */}
      { getArticleTem() }

      { /**5.事件绑定：on+事件名称={事件处理函数}--基础 */}
      <button onClick={ () => handleClick('jack') }>click me</button>
      <button onClick={ (e) => handleClick('jack',e) }>click me</button>

      {/**渲染组件 */}
      <Button/>
      <Button></Button>
    </div>
  );
}

export default App;
