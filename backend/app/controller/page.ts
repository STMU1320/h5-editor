import { Controller } from 'egg';
export default class PageController extends Controller {
  public async add() {
    const { ctx } = this;
    const { pageList, name, cover, immutable } = ctx.request.body;
    ctx.body = await ctx.service.page.create(pageList, name, cover, immutable);
  }
  public async update() {
    const { ctx } = this;
    const { pageList, name, cover, id } = ctx.request.body;
    ctx.body = await ctx.service.page.update(pageList, name, cover, id);
  }
  public async preview() {
    const { ctx } = this;
    const { pageList, previewId } = ctx.request.body;
    if (previewId) {
      ctx.body = await ctx.service.page.updatePreview(pageList, previewId);
    } else {
      ctx.body = await ctx.service.page.addPreview(pageList);
    }
  }
  public async list() {
    const { ctx } = this;
    const { query } = ctx.request;
    const { page = 1, pageSize = 20, name = '' } = query;
    ctx.body = await ctx.service.page.find(+page, +pageSize, name);
  }
  public async detail() {
    const { ctx } = this;
    const { id } = ctx.request.query;
    ctx.body = await ctx.service.page.findOne(id);
  }
}