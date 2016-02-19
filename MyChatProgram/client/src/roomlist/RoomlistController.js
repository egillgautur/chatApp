"use strict";

angular.module("chatApp").controller("RoomlistController",
["$scope", "$location", "$rootScope", "$routeParams", "socket",
function RoomlistController($scope, $location, $rootScope, $routeParams, socket) {
    $scope.roomlist = [];
    $scope.roomNames = [];
    $scope.currUser = $routeParams.user;

    socket.emit("rooms");
    
    $scope.createRoom = function createRoom() {
		var obj = {room: $scope.roomName, pass: undefined};
		socket.emit("joinroom", obj, function(accepted, reason) {
			if (!accepted) {
				$scope.errorMessage = reason;
			} else {
                console.log("sdfs");
                console.log($scope.currUser);
                console.log($scope.roomName);
				$location.path("room/" + $scope.roomName + "/" + $scope.currUser);
			}
		});
	}
   
    var funcRoomlistChanges = function(roomlist) {
        console.log(roomlist);
        $scope.roomlist = roomlist;
        $scope.roomNames = Object.keys(roomlist);
    }
    
    socket.on("roomlist", funcRoomlistChanges);
    
}]);