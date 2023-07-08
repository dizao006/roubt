(async function () {
    const resp = await API.profile()
    const user = resp.data
    if (!user) {
        alert('未登录')
        location.href = '../html部分/login.html'
        return
    }
    const msgContainer= document.querySelector('.msg-container')  
    console.log(msgContainer)
    const txtMsg = document.querySelector('#txtMsg')
    console.log(txtMsg)
    const close = document.querySelector('#closes')
    const chatContainer = document.querySelector('.chat-container')
    const dom = {
        aside: {
            nickname: document.querySelector('#nickname'),
            loginId: document.querySelector('#loginId'),
        }
    }
    close.onclick = function () {
        API.loginOut();
        location.href = '../html部分/login.html'
    }
    function setUserInfo() {
        dom.aside.nickname.innerText = user.nickname
        dom.aside.loginId.innerText = user.loginId
    }
    setUserInfo()
    //添加对象
    function addChat(chatInfo) {
        const div = document.createElement('div')
        div.classList.add('chat-item')
        if (chatInfo.from) {
            div.classList.add('me')
        }
        const img = document.createElement('img');
        img.className = 'chat-avatar';
        img.src = chatInfo.from ? '../asset/avatar.png' : '../asset/robot-avatar.jpg'

        const content = document.createElement('div');
        content.className = 'chat-content';
        content.innerText = chatInfo.content

        const date = document.createElement('div')
        date.className = 'chat-date'
        date.innerText = formatDate(chatInfo.createdAt)

        div.appendChild(img)
        div.appendChild(content)
        div.appendChild(date)
        chatContainer.appendChild(div)

    }

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');
        const second = date.getSeconds().toString().padStart(2, '0');

        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }

    async function load() {
        const reply = await API.getHistory()
        for (const key of reply.data) {
            addChat(key)
        }
        scrollBottom()
    }
    await load()
        //表单提交
        msgContainer.onsubmit=function(e){
                e.preventDefault();
                sendChat()
        }

    //滚动
    function scrollBottom() {
        chatContainer.scrollTop = chatContainer.scrollHeight
    }
    //输入消息
   async function sendChat() {
        const content = txtMsg.value.trim()
        if (!content) {
            return
        }
            addChat({
                from:user.loginId,
                to:null,
               createdAt:Date.now(),
                content,
            })
            txtMsg.value=''
            scrollBottom() 
           const reply= await API.sendChat(content)
           addChat({
            from: null,
            to: user.loginId,
            ...reply.data,
          });
        scrollBottom() 
    }
    window.sendChat = sendChat;

})()










  