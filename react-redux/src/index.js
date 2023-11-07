// 项目的入口

import React from 'react';
import ReactDOM from 'react-dom/client';

//导入项目的根组件
import App from './App';
import store from './store'
import { Provider } from 'react-redux';

// 把App组件渲染到id为root的dom节点上
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>

);

