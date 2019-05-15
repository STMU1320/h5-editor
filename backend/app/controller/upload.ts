import {Controller} from 'egg';
const fs = require('fs');
const path = require('path');
const domain = require('../../../common/config/domain.json');
import { dateFormat } from '../utils/format';
export default class HomeController extends Controller {
  public async img() {
    // 正式生产部署应该将文件上传到oss服务器
    const {ctx}: any = this;
    const file = ctx.request.files.img;
    const basePath = path.join('./public/img/');
    const reader = fs.createReadStream(file.path);
    let fileResource = `${basePath}${dateFormat(new Date(), 'YYYY-MM-DD-')}${file.name}`;
    if (!fs.existsSync(basePath)) fs.mkdirSync(basePath, { recursive: true });
    let upstream = fs.createWriteStream(fileResource);
    reader.pipe(upstream);
    ctx.body = {
      url: `${domain.h5}${fileResource}`
    };
  }
}
