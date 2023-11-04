import { useState, useRef, useEffect } from "react"
import './app.css'
import _ from 'lodash'
import classNames from 'classnames'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import axios from 'axios'
//评论列表 使用server-json拿到动态的
// const list = [
//     {
//         "rpid": 3,
//         "user": {
//           "uid": "13258165",
//           "avatar": "http://toutiao.itheima.net/resources/images/98.jpg",
//           "uname": "周杰伦"
//         },
//         "content": "哎哟，不错哦",
//         "ctime": "10-18 08: 15",
//         "like": 126
//     },
//     {
//     "rpid": 2,
//     "user": {
//         "uid": "36080105",
//         "avatar": "http://toutiao.itheima.net/resources/images/98.jpg",
//         "uname": "许嵩"
//     },
//     "content": "我寻你千百度 日出到迟暮",
//     "ctime": "11-13 11: 29",
//     "like": 88
//     },
//     {
//     "rpid": 1,
//     "user": {
//         "uid": "30009257",
//         "avatar": "http://toutiao.itheima.net/resources/images/98.jpg",
//         "uname": "黑马前端"
//     },
//     "content": "学前端就来黑马",
//     "ctime": "10-19 09: 00",
//     "like": 66
//     }
// ]
// 当前登录用户信息
const user = {
    "uid": "30009257",
    "avatar": "http://toutiao.itheima.net/resources/images/98.jpg",
    "uname": "黑马前端"
}
// 导航 tab 数组
const tabs = [
    {type:'hot',text:'最热'},
    {type:'time',text:'最新'},
]
// 封装数据请求的hook
function useGetList() {
    const [commentList, setCommentList] = useState([])
    useEffect(() => {
        async function getList(){
            //axios
            const res = await axios.get('http://localhost:3004/list')
            setCommentList(res.data)
        }
        getList()
    }, [])
    return {
        commentList,
        setCommentList
    }
}

function Item({item, onDel}){
    return (
        <div className="reply-item">
            <div>{item.user.uname}</div>                      
            <div>{item.content}</div>
            <div>{item.ctime}</div>
            <div>{item.like}</div>
            <div onClick={() => onDel(item.rpid)}><span>删除</span></div>
            <div>{'------------'}</div>
        </div>
    )
}
function App() {
    //1.渲染评论列表
    // const [commentList, setCommentList] = useState(_.orderBy(list, 'like', 'desc'))
    // const [commentList, setCommentList] = useState([])
    const {commentList, setCommentList} = useGetList()
    const handleDel = (id) => {
       setCommentList(
        //2.过滤删除处理
        commentList.filter(item => item.rpid !== id)
       )
    }
    const [type, setType] = useState('hot')
    //2.转换tab
    const handleTabChange = (type) => {
        setType(type)
        if(type === 'hot'){
            setCommentList(_.orderBy(commentList, 'like', 'desc'))
        }else {
            setCommentList(_.orderBy(commentList, 'ctime', 'desc'))
        }
    }
    // 3.获取评论，发表评论
    const [content, setContent] = useState('')
    const inputRef = useRef(null)


    const handlePublish = () => {
        //添加一条评论
        setCommentList([
            ...commentList,
            {
                "rpid": uuidv4(),//随机
                "user": {
                  "uid": "13258165",
                  "avatar": "http://toutiao.itheima.net/resources/images/98.jpg",
                  "uname": "嘿嘿"
                },
                "content": content,
                "ctime": dayjs(new Date()).format('MM-DD hh:mm'),//格式化 月-日 时：分
                "like": 1299
            },
        ])
        //清空输入框内容
        setContent('')
        //重新聚焦
        inputRef.current.focus()
    }
    return (
        <div className="app">
            <div className="tab" >
                { tabs.map(item => (
                    <span 
                        key={item.type}
                        onClick={() => handleTabChange(item.type)}
                        className={classNames('nav-item', {'nav-active':type === item.type})}
                    >
                        {/**className={`nav-item ${ type === item.type && 'nav-active'}`} */}
                        {item.text }{'|'}
                    </span>
                ))
                }
            </div>
            <div className="reply-input">
                <div>{'评论:'}</div>
                <textarea 
                    placeholder="发表一条评论" 
                    value={content} 
                    onChange={(e)=> setContent(e.target.value)}
                    ref={inputRef}
                />
                <button onClick={handlePublish}>发表评论</button>
            </div>
            <div className="reply-list">
                {/**评论项 */}
                { commentList.map(item => (
                    <Item item={item} key={item.rpid} onDel={handleDel}></Item>
                ))}
            </div>
        </div>
    )
}
export default App
