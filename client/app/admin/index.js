'use strict';

import routes from './admin.routes';
import auth from '../../components/auth/auth.module';
import uiRouter from 'angular-ui-router';
import AdminController from './admin.controller';

export default angular.module('demoApp.admin', [auth, uiRouter])
  .config(routes)
  .controller('AdminController', AdminController)
  .name;
