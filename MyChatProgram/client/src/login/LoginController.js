"use strict";

angular.module('chatApp').controller("LoginController",
["$scope", "$location", "$ChatResource", //optional að hafa þetta, skoða betur
function LoginController($scope, $location, ChatResource) {
    
    $scope.user = "gilligoodshit";
    $scope.pass = "einarFagit";
    $scope.errorMessage = "";
    
    $scope.onLogin = function onLogin() {
        ChatResource.login($scope.user, $scope.pass, function(success) {
            if(!success) {
                $scope.errorMessage = "Innskráning mistókst og einar is a fagit";
            } else { 
                $location("/roomlist");
                //TO DO: Senda notanda á herbergjalistann
            }
        })
    };
    

}]);