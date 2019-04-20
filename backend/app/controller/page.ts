import { Controller } from 'egg';
export default class PageController extends Controller {
  public async add() {
    const { ctx } = this;
    const { uid, pageList } = ctx.request.body;
    ctx.body = await ctx.service.page.create(uid, pageList);
  }
}