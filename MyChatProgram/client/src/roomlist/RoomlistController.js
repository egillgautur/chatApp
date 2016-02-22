"use strict";

angular.module("chatApp").controller("RoomlistController",
["$scope", "$location", "$rootScope", "$routeParams", "socket",
function RoomlistController($scope, $location, $rootScope, $routeParams, socket) {
    $scope.roomlist = {};
    $scope.roomNames = [];

    socket.emit("rooms");
    
    $scope.createRoom = function createRoom() {
		var obj = {
            room: $scope.roomName, pass: undefined
        };
        
        if($scope.roomName !== undefined) {
            socket.emit("joinroom", obj, function(accepted, reason) {
                if (!accepted) {
                    $scope.errorMessage = reason;
                } else {
                    $location.path("room/" + $scope.roomName);
                }
            });
        }
	};
   
    var funcRoomlistChanges = function(roomlist) {
        $scope.roomlist = roomlist;
        $scope.roomNames = Object.keys(roomlist);
    };
    
    socket.on("roomlist", funcRoomlistChanges);
    
}]);