"use strict";

angular.module("chatApp", [ui.bootstrap])
.config(function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "src/login/login.html",
        controller: "LoginController"
    }).when("/rooms", {
        templateUrl: "src/roomlist/roomlist.html",
        controller: "RoomListController"
    }).when("/rooms/:id", {
        
    }) //osfrv... (Note .otherwise() fyrir else)
});