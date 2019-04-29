
import { Application } from 'egg';
export default (app: Application) => {
  // app.get('/', app.controller.home.index);
  app.get('/', app.controller.home.h5);
  app.post('/page/add', app.controller.page.add);
  app.post('/page/preview', app.controller.page.preview);
};
