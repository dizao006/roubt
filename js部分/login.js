const s1 = new FieldValidator('txtLoginId', async function (val) {
    if (!val) {
        return '账号为空'
    }
})
const s3 = new FieldValidator('txtLoginPwd', async function (val) {
    if (!val) {
        return '密码为空'
    }
})
const arr=[s1,s3];
const from=document.querySelector('.user-form')
from.onsubmit = async function(e){
e.preventDefault();
    const result=await FieldValidator.validate(...arr)
    if(!result){
        return
    }
    const resp=await API.login({
        loginId:s1.input.value,
        loginPwd:s3.input.value,
    })
    if(resp.code===0){
       location.href='../html部分/index.html' 
    }
    else{
        alert('失败，检查账号密码')
        s1.input.value=''
        s3.input.value=''
    }
}

