
import { Application } from 'egg';
export default (app: Application) => {
  app.get('/', app.controller.home.index);
  app.post('/page_add', app.controller.page.add);
};
