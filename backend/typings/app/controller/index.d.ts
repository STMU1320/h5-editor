// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAct from '../../../app/controller/act';
import ExportHome from '../../../app/controller/home';

declare module 'egg' {
  interface IController {
    act: ExportAct;
    home: ExportHome;
  }
}
