const s1 = new FieldValidator('txtLoginId', async function (val) {
    if (!val) {
        return '账号为空'
    }
    const reply = await API.exists(val);
    if (reply.data) {
        return '账号名已存在'
    }
})
const s2 = new FieldValidator('txtNickname', async function (val) {
    if (!val) {
        return '名称为空'
    }
})

const s3 = new FieldValidator('txtLoginPwd', async function (val) {
    if (!val) {
        return '密码为空'
    }
})
const s4 = new FieldValidator('txtLoginPwdConfirm', async function (val) {
    if (!val) {
        return '再一次密码为空'
    }
    if(val!==s3.input.value) {
        return '再一次密码错错误'
    }
})
const arr=[s1, s2, s3, s4];
const from=document.querySelector('.user-form')


from.onsubmit = async function(e){
e.preventDefault();
console.log('正在注册')
    const result=await FieldValidator.validate(...arr)
    if(!result){
        return
    }
    const resp=await API.reg({
        loginId:s1.input.value,
        loginPwd:s3.input.value,
        nickname:s2.input.value
    })
    if(resp.code===0){
       location.href='../html部分/login.html' 
    }
}


