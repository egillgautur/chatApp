'use strict';

angular.module('chatApp', ['ngRoute']).config(['$routeProvider',
function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'src/login/login.html',
        controller: 'LoginController'
    }).when("/roomlist/:user", {
        templateUrl: "src/roomlist/roomlist.html",
        controller: "RoomlistController"
    })
    .when("/room/:id/:user", {
        templateUrl: "src/room/room.html",
        controller: "RoomController"
    })
    .when("/rooms/:id", {
        
    })
 //osfrv... (Note .otherwise() fyrir else)
}]);
