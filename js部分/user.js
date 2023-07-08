
//  对表单项验证
/** 
 *@param {string} txtid   传入文本的id
 * @param {fn} validatorFunc 传入一个验证规则，验证时触发该函数
 * 
**/
class FieldValidator {
   constructor(txtId, validatorFunc) {
      this.input = document.querySelector('#' + txtId)
      this.validatorFunc = validatorFunc
      this.p = this.input.nextElementSibling;
      this.input.onblur = () => {
         this.validate()
      }
   }
 

async validate() {
      //验证方法
      const err= await this.validatorFunc(this.input.value)
      if(err){ 
         this.p.innerHTML = err
         return false
      }else{
         this.p.innerHTML = ''
         return true
      }
   }

static async validate(...validate){
      const proms = validate.map((m)=>m.validate());
      const result=await Promise.all(proms);
      return result.every((r)=>r)
   }
}
