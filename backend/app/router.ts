
import { Application } from 'egg';
export default (app: Application) => {
  app.get('/', app.controller.home.index);
  app.get('/h5', app.controller.home.h5);
  app.post('/page_add', app.controller.page.add);
};
