import * as path from 'path';
import * as fs from 'fs';
import { EggAppConfig } from 'egg';
export default function(app: EggAppConfig) {
  const exports: any = {};

  exports.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(app.baseDir, 'app/web/asset/images/favicon.ico')),
    '/flexible.js': fs.readFileSync(path.join(app.baseDir, 'app/web/asset/js/flexible.js')),
  };

  exports.logger = {
    consoleLevel: 'DEBUG',
    dir: path.join(app.baseDir, 'logs')
  };

  exports.static = {
    prefix: '/public/',
    dir: path.join(app.baseDir, 'public')
  };

  exports.bodyParser = {
    jsonLimit: '5mb',
    formLimit: '6mb',
  };

  exports.keys = 'stmu-h5-editor-ayo';

  exports.middleware = [
    // 'access'
  ];

  exports.reactssr = {
    layout: path.join(app.baseDir, 'app/web/view/layout.html')
  };
  exports.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/pages',
      options: {},
    },
  };

  return exports;
}
