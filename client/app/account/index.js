'use strict';

import angular from 'angular';

import uiRouter from 'angular-ui-router';

import routing from './account.routes';
import login from './login';
import settings from './settings';
import signup from './signup';
import oauthButtons from '../../components/oauth-buttons';

export default angular.module('demoApp.account', [uiRouter, login, settings, signup, oauthButtons])
  .config(routing)
  .run(function($rootScope) {
    'ngInject';

    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
      if (next.name === 'logout' && current && current.name && !current.authenticate) {
        console.log('event ', event);
        console.log('next', next);
        console.log('nextParams ', nextParams);
        console.log('current ', current);
        
        next.referrer = current.name;
      }
    });
  })
  .name;
