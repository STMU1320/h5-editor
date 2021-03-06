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
      return { success:true, mag:'', code:0, data: res}
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
  async update(pageList, name, cover, id) {
    const { ctx } = this;
    const now = new Date();
    return ctx.model.Page.updateOne(
      {_id: id},
      {$set: { updateTime: now, pageList, name, cover}}
      ).then(res =>{
        const { nModified } = res;
        if (!nModified) {
          return { success: false, msg: '记录不存在', code: 1 }
        }
        let data = id;
        return { success:true, msg:'', code:0, data }
    }).catch(err =>{
      return { success:false, msg: err, code:1 }
    })
  }
  async findOne(aid) {
    const { ctx } = this;
    if (!aid) {
      return { success:false, msg: 'id不存在', code: 1}
    }
    return ctx.model.Page.findOne({
      _id: aid
    }).then(res =>{
      return { success:true, mag:'', code:0, data: res}
    }).catch(err =>{
      return {success:false, msg:err, code: 1}
    })
  }
  async find(page, pageSize, name) {
    const { ctx } = this;
    let params = name ? { name } : {};
    const skip = (page - 1) * pageSize;
    return Promise.all([ctx.model.Page.find(params).skip(skip).limit(pageSize), ctx.model.Page.find().count()])
    .then(([list, count]) =>{
      return { success:true, mag:'', code:0, data: { list, total: count }}
    }).catch(err =>{
      return {success:false, msg:err, code: 1}
    })
  }
}

module.exports = PageService;