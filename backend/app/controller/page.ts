import { Controller } from 'egg';
export default class PageController extends Controller {
  public async add() {
    const { ctx } = this;
    const { uuid, pageList } = ctx.request.body;
    ctx.body = await ctx.service.page.create(uuid, pageList);
  }
}