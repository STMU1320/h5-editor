// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportPage from '../../../app/model/page';

declare module 'egg' {
  interface IModel {
    Page: ReturnType<typeof ExportPage>;
  }
}
