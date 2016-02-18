"use strict";

angular.module('chatApp').controller("LoginController",
["$scope", "$location", "$rootScope", "$routeParams", 
function LoginController($scope, $location, $rootScope, $routeParams) {
    $scope.nickname = "";
    $scope.login = function() {
            if($scope.nickname === "") {
                
                $location.path("/roomlist");
               // toastr.error("Einar is a fag")
            } else { 
                $scope.errorMessage = "Innskráning mistókst og einar is a fagit";
                /*socket.emit("adduser", $scope.nickname, function(available) {
                    if(available) {
                        $location.path("/roomlist");
                    } else {
                        toastr.error("Einar is a superfagit")
                    }
                })*/
            }
    }
 
    

}]);