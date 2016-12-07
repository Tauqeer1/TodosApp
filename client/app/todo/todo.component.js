import angular from 'angular';
import uiRouter from 'angular-ui-router';
// import auth from '../../components/auth/auth.module';
import routes from './todo.routes';

export class TodoComponent {
  /*@ngInject*/
  /*constructor() {
   this.message = 'Hello';
   }*/

  constructor($http, $scope, socket, Auth, $timeout) {
    this.$http = $http;
    this.socket = socket;
    this.isAdmin = Auth.isAdminSync;
    this.timeout = $timeout;
    Auth.getCurrentUser((data) => {
      this.user = data;
    });
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('todo');
    });
  }

  $onInit() {
    this.timeout(() => {
      if(this.isAdmin()) {
        this.$http.get('/api/todos')
          .then(response => {
            this.todos = response.data;
            this.socket.syncUpdates('todo', this.todos);
          });
      }
      else {
        this.$http.get('/api/todos/'+this.user._id)
          .then(response => {
            this.todos = response.data;
            this.socket.syncUpdates('todo', this.todos);
          });
      }
    }, 1000);
  }

  addTodo() {
    console.log('this.todo ', this.todo);
    console.log('this.user ', this.user._id);
    let data = {userId: this.user._id, todo: this.todo};
    if (this.todo) {
      this.$http.post('/api/todos', data)
        .then((res) => {
          console.log('res', res);
        }).catch((err) => {
        console.log('err', err);
      })
      this.todo = '';
    }
  }

  deleteThing(todo) {
    console.log('todo ', todo);
    this.$http.delete('/api/todos/' + todo._id);
  }
}

export default angular.module('myApp.todo', [uiRouter])
  .config(routes)
  .component('todo', {
    template: require('./todo.html'),
    controller: TodoComponent,
    controllerAs: 'todoCtrl'
  })
  .name;
