import './index.css'
const style = {color:'red', fontSize:'30px'}
function App() {
    return (
        <div className="app">
            {/**行内样式控制 */}
            <span style={style}>this is span</span>

            {/**class类名控制 */}
            <span className="foo">this is class foo</span>
        </div>
    )
}
export default App