"use strict";

angular.module('chatApp').controller("LoginController",
["$scope", "$location", "$rootScope", "$routeParams", 
function LoginController($scope, $location, $rootScope, $routeParams) {
    $scope.nickname = "";
    $scope.onLogin = function onLogin() {
            if($scope.nickname === "") {
                //$scope.errorMessage = "Innskráning mistókst og einar is a fagit";
                toastr.error("Einar is a fag")
            } else { 
                //$location("/roomlist");
                socket.emit("adduser", $scope.nickname, function(available) {
                    if(available) {
                        $location.path("roomlist/" + $scope.nickname);
                    } else {
                        toastr.error("Einar is a superfagit")
                    }
                })
            }
    }
 
    

}]);