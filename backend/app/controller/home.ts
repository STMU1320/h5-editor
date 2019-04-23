import { Controller } from 'egg';
import { isEmpty } from '../utils/func';
export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    await ctx.render('home.js', {
      title: '--Ant Design Tab--',
      keywords: 'react, server side render, ant design',
      message: { text: 'Ant Design Tab Theme and Code Spliting' }
    });
  }

  public async h5 () {
    const { ctx } = this;
    const { query } = ctx.request;
    const { mode, aid, pid } = query;
    let pages = [], pageData = {};
    if (mode === 'preview') {

    } else {
      let res = await ctx.service.page.find(aid);
      if (res.success) {
        pages = res.data;
      }
    }
    if (!isEmpty(pages)) {
      if (pid) {
        pageData = pages.find((page) => page.uuid === pid);
      } else {
        pageData = pages[0];
      }
    }
    if (isEmpty(pageData)) {
      ctx.body = '404';
    } else {
      await ctx.render('h5.js', pageData);
    }
  }
}