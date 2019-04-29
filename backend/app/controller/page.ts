import { Controller } from 'egg';
export default class PageController extends Controller {
  public async add() {
    const { ctx } = this;
    const { pageList, name, cover, immutable } = ctx.request.body;
    ctx.body = await ctx.service.page.create(pageList, name, cover, immutable);
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
}