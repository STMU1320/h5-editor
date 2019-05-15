
import { Application } from 'egg';
export default (app: Application) => {
  // app.get('/', app.controller.home.index);
  app.get('/', app.controller.home.h5);
  app.get('/api/page/list', app.controller.page.list);
  app.get('/api/page/detail', app.controller.page.detail);
  app.post('/api/page/add', app.controller.page.add);
  app.post('/api/page/update', app.controller.page.update);
  app.post('/api/page/preview', app.controller.page.preview);
  app.post('/api/upload/img', app.controller.upload.img);
};
