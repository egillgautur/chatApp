'use strict';

angular.module('chatApp', ['ngRoute']).config(['$routeProvider',
function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'src/login/login.html',
        controller: 'LoginController'
    }).when("/roomlist/", {
        templateUrl: "src/roomlist/roomlist.html",
        controller: "RoomlistController"
    })
    .when("/room/:id/", {
        templateUrl: "src/room/room.html",
        controller: "RoomController"
    })
    .when("/room/:id", {
        templateUrl: "src/room/room.html",
        controller: "RoomController"
    });
}]);
