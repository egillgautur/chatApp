"use strict";

angular.module("chatApp").controller("RoomlistController",
["$scope", "$location", "$rootScope", "$routeParams", "socket",
function RoomlistController($scope, $location, $rootScope, $routeParams, socket) {
    $scope.rooms = [];
    $scope.roomList = [];
    $scope.currUser = $routeParams.user;
    $scope.roomName = '';
    $scope.successMessage = '';
    socket.emit("rooms");
    
    socket.on("roomList", function (rooms) {
        $scope.roomList = [];
        
        for(var room in rooms) {
            $scope.roomList.push(room);
        }
    });
    
    $scope.enterRoom = function(params) {
        //TO DO
    }
    
    $scope.createRoom = function() {
        var newRoom = {
            room: $scope.name
        };
        
        var roomExists = false;
        
        for(var j = 0; j < $scope.roomList.length; j++) {
            if(newRoom.room === $scope.roomList[j]) {
                roomExists = true;
            }
        }
        
        if(!roomExists) {
            if($scope.name !== '') {
                $location.path("/roomlist/" + $scope.currUser + "/" + $scope.newRoom.room);
            } else {
                $scope.errorMessage = "Please choose a name for room"
            }
        } else {
            $scope.errMessage = "Room" + $scope.name + "already exists"
        }
    };
   /* var funcRoomlistChanges = function(roomList) {
        console.log(roomList);
        $scope.$apply(function() {
            $scope.roomlist = roomList;
        });
    }
    
    $scope.$watch("name", function(newValue, oldValue) {
        //senda á server? Eða færa í LoginController?
        if(newValue) {
            if(newValue.length > 3) {
                
            }
        }
        
    });
    
    $scope.name = "EinarFagit";
  //socket.on("roomlist", function(roomList) {
    socket.on("roomlist", funcRoomlistChanges);
        
    });
    */
    
    $scope.roomlist = [ {
        name: "Einar is a fagit",
        id: 1
    }, {
        name: "Einar is a superfagit",
        id: 2
    }]; //osfrv......
}])