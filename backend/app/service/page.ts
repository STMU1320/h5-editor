import { Service } from 'egg';
import { dateFormat } from '../utils/format';
import * as moment from 'moment';
class PageService extends Service {
  async addPreview(pageList) {
    const { ctx } = this;
    const now = new Date();
    return ctx.model.PagePre.create({
      createTime: now,
      updateTime: now,
      pageList
    }).then(res =>{
      let data = {
        id: res._id,
        updateTime: dateFormat(now)
      };
      return { success:true, msg:'', code:0, data }
    }).catch(err =>{
      return {success:false, msg:err, code: 1}
    })
  }
  async updatePreview(pageList, previewId) {
    const { ctx } = this;
    const now = new Date();
    return ctx.model.PagePre.updateOne(
      {_id: previewId},
      {$set: { updateTime: now, pageList}}
      ).then(res =>{
        const { nModified } = res;
        if (!nModified) {
          return this.addPreview(pageList);
        }
        let data = {
          id: previewId,
          updateTime: dateFormat(now)
        };
        return { success:true, msg:'', code:0, data }
    }).catch(err =>{
      return { success:false, msg: err, code:1 }
    })
  }
  async removePreviews() {
    const { ctx } = this;
    const before10 = moment().subtract(10, 'm');
    return ctx.model.PagePre.deleteMany({
      updateTime: { $lt: before10 },
    }).then(res =>{
      return { success:true, msg: '', code:0, data: res }
    }).catch(err =>{
      return {success:false, msg:err, code: 1}
    })
  }
  async findPreview(aid) {
    const { ctx } = this;
    return ctx.model.PagePre.findOne({
      _id: aid
    }).then(res =>{
      return { success:true, mag:'', code:0, data: res.pageList}
    }).catch(err =>{
      return {success:false, msg:err, code: 1}
    })
  }
  async create(pageList, name, cover = '', immutable = false) {
    const { ctx } = this;
    const now = new Date();
    return ctx.model.Page.create({
      createTime: now,
      updateTime: now,
      pageList,
      name,
      cover,
      immutable
    }).then(res =>{
      return { success: true, mag:'', code:0, data: res._id}
    }).catch(err =>{
      return {success:false, msg:err, code: 1}
    })
  }
  async findOne(aid) {
    const { ctx } = this;
    return ctx.model.Page.findOne({
      _id: aid
    }).then(res =>{
      return { success:true, mag:'', code:0, data: res.pageList}
    }).catch(err =>{
      return {success:false, msg:err, code: 1}
    })
  }
}

module.exports = PageService;