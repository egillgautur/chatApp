"use strict";

angular.module("chatApp").controller("RoomController",
["$scope", "$location", "$rootScope", "$routeParams", "socket",
function RoomController($scope, $location, $rootScope, $routeParams, socket) {
	$scope.currentUser = $routeParams.user;
    $scope.id = $routeParams.id;
    $scope.banned = false;
    socket.emit("rooms");
    
    var obj = {
        room: $scope.id, pass: undefined
    };
    
    socket.emit("joinroom", obj, function(success, reason) {
        if(!success) {
            $scope.banned = true;
            $scope.errorMessage = "You're banned from this room"
            $location.path("/roomlist/" + $scope.currentUser);
            console.log("ihhh");
            console.log($scope.currentUser);
        } else {
            console.log("jake");
        }
    });
    
	$scope.leaveRoom = function () {
        console.log($scope.currentUser);
        var homePath = "/roomlist/" + $scope.currentUser;
		$location.path(homePath);
        console.log($scope.currentUser);
		socket.emit('partroom', $scope.id);
	};

}]);
