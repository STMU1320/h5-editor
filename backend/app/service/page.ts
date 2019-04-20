import { Service } from 'egg';

class PageService extends Service {
  async create(uid, pageList) {
    const { ctx } = this;
    return ctx.model.Page.create({
      uid,
      pageList
    }).then(res =>{
      return { success:true,mag:'',code:0}
    }).catch(err =>{
      return {success:false, msg:err, code: 1}
    })
  }
}

module.exports = PageService;