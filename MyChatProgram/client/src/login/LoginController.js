"use strict";

angular.module('chatApp').controller("LoginController",
["$scope", "$location", "$rootScope", "$routeParams", "socket",
function LoginController($scope, $location, $rootScope, $routeParams, socket) {
    $scope.user = '';
    $scope.login = function() {
            if($scope.user === '') {
                $scope.errorMessage = "Please choose a nickname"
            } else {    
                socket.emit("adduser", $scope.user, function(available) {
                    if(available) {
                        $location.path("/roomlist/");
                    } else {
                        $scope.errorMessage = "Nickname already taken, choose another"
                    }
                })
            }
    }

}]);