import { Service } from 'egg';

class PageService extends Service {
  async create(uuid, pageList) {
    const { ctx } = this;
    return ctx.model.Page.create({
      uuid,
      pageList
    }).then(res =>{
      return { success:true,mag:'',code:0}
    }).catch(err =>{
      return {success:false, msg:err, code: 1}
    })
  }
  async find(aid) {
    const { ctx } = this;
    return ctx.model.Page.findOne({
      uuid: aid
    }).then(res =>{
      return { success:true, mag:'', code:0, data: res.pageList}
    }).catch(err =>{
      return {success:false, msg:err, code: 1}
    })
  }
}

module.exports = PageService;