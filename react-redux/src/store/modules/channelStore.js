import { createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

// 创建store的写法保持不变，配置好同步代码
const channelStore = createSlice({
    name:'channel',
    initialState:{
        channelList:[]
    },
    reducers:{
        setChannels(state, action) {
            state.channelList = action.payload
        }
    }
})

const { setChannels} = channelStore.actions
const channelReducer = channelStore.reducer
// 异步请求
const fetchChannelList = () => {
    return async(dispatch) => {
        const res = await axios.get('http://geek.itheima.net/v1_0/channels')
        dispatch(setChannels(res.data.data.channels))
    }
}
export { fetchChannelList }
export default channelReducer