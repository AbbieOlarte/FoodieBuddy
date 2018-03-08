'use strict';

/**
 * @ngdoc overview
 * @name foodiebuddyApp
 * @description
 * # foodiebuddyApp
 *
 * Main module of the application.
 */

angular
  .module('foodiebuddyApp', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvier){
    $urlRouterProvier.otherwise('/');
    $stateProvider
    .state('home',{
      url:'/',
      templateUrl: 'views/main.html'
    })
    .state('reservation',{
      url:'/Reservations',
      templateUrl: 'views/reservations.html',
      controller: 'ReservationCtrl as reservation',
      controllerAs: 'res'
    })
    .state('menu',{
      url: '/Menu',
      templateUrl: 'views/menu.html',
      controller: 'MenuCtrl as menu'
    });
  }]);
