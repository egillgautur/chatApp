'use strict';

angular.module('chatApp', ['ngRoute']).config(['$routeProvider',
function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'src/login/login.html',
        controller: 'LoginController'
    }).when("/roomlist/:user", {
        templateUrl: "src/roomlist/roomlist.html",
        controller: "RoomListController"
    })
    .when("/rooms", {
        templateUrl: "src/roomlist/roomlist.html",
        controller: "RoomListController"
    })
    .when("/rooms/:id", {
        
    })
 //osfrv... (Note .otherwise() fyrir else)
}]);
