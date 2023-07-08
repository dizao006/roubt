 var API=(function(){
//注册
async function reg(userInfo) {
        const headers = {'Content-Type': 'application/json'};
        const token = localStorage.getItem('token');
        if (token) {
            headers.authorization = `Bearer ${token}`;
        }
        const reply = await fetch('https://study.duyiedu.com/api/user/reg', {
            method: 'POST',
            headers,
            body: JSON.stringify(userInfo),
        })
        const s1 = await reply.json()
        return s1
    }

//登录
async function login(loginInfo) {
    const reply = await fetch('https://study.duyiedu.com/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
    })
    const resit = await reply.json()
    if (resit.code === 0) {
        const token = reply.headers.get('authorization')//登陆成功将响应头种的token保存起来保存令牌到token
        localStorage.setItem('token', token)
    }
    return resit
}
//是否存在账号
async function exists(loginId) {
    const headers = {};
    const token = localStorage.getItem('token')
    const resit = await fetch('https://study.duyiedu.com/api/user/exists?loginId=' + loginId, { headers })
    if (token) {
        headers.authorization = `Bearer ${token}`;
    }
    return resit.json()
}

//当前登录的信息
async function profile() {
    const headers = {};
    const token = localStorage.getItem('token')
    if (token) {
        headers.authorization = `Bearer ${token}`;
    }
    const resit = await fetch('https://study.duyiedu.com/api/user/profile', { headers })
    return resit.json()

}

//发送聊天消息
async function sendChat(content) {
    const headers = {'Content-Type': 'application/json'};
    const token = localStorage.getItem('token');
    if (token) {
        headers.authorization = `Bearer ${token}`;
    }
    const reply = await fetch('https://study.duyiedu.com/api/chat', {
        method: 'POST',
        headers,
        body: JSON.stringify({ content }),
    })
    const s1 = await reply.json()
    return s1
}

//获取聊天记录
async function getHistory() {
    const headers = {};
    const token = localStorage.getItem('token')
    if (token) {
        headers.authorization = `Bearer ${token}`;
    }
    const resit = await fetch('https://study.duyiedu.com/api/chat/history', { headers })
    return resit.json()
}
function loginOut(){
    localStorage.removeItem('token')
}

return {
    reg,
    login,
    exists,
    profile,
    sendChat,
    getHistory,
    loginOut,
}
})()