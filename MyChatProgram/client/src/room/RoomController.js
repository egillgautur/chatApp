"use strict";

angular.module("chatApp").controller("RoomController",
["$scope", "$location", "$rootScope", "$routeParams", "socket",
function RoomController($scope, $location, $rootScope, $routeParams, socket) {
    $scope.currentUser = $routeParams.user;
    $scope.id = $routeParams.id;
    $scope.banned = false;
    $scope.messages = [];
    $scope.users = [];
    $scope.ops = [];
    $scope.isOp = false;
    $scope.errorMessage = '';
    $scope.userName = '';
    socket.emit("rooms");
    
    var joinObj = {
		room: $scope.id, pass: undefined
	};

	socket.emit('joinroom', joinObj, function (success, reason) {
		if (!success) {
			$scope.banned = true;
			$scope.errorMessage = "You are banned"
			$location.path('/roomlist/');
		}
	});
    
    socket.on('roomlist', function(rooms) {
        $scope.room = rooms[$scope.id];
    });
    
    socket.on('servermessage', function(message, room, userName) {
        if(message === 'join') {
            $scope.id = $routeParams.id;
            if($scope.userName === '') {
                $scope.userName = userName;
            } 
        } else {
            if(userName === $scope.userName) {
                $location.path("/roomlist/");
            }
        }
    })
    
    
	$scope.leaveRoom = function () {
        console.log($scope.currentUser);
		$location.path("/roomlist/");
        console.log($scope.currentUser);
		socket.emit('partroom', $scope.id);
	};
    
    $scope.sendMessage = function () {
        var data = {
            "roomName": $scope.id,
            "msg": $scope.message
        };
            
        socket.emit("sendmsg", data);
        $scope.message = "";
        console.log($scope.id);
        console.log("siddiddu");
        console.log(data);

    };
    
    socket.on('updatechat', function(roomName, messageHistory) {
        console.log($scope.id);
        if(roomName === $scope.id) {
            console.log($scope.id);
            $scope.messages = [];
            for(var m in messageHistory) {
                console.log("HALLO");
                $scope.messages.push({
                    "date": messageHistory[m].timestamp,
                    "nick": messageHistory[m].nick,
                    "message": messageHistory[m].message
                });
            }
        }
    });
    
    socket.on('updateusers', function(room, users, ops) {
        if(room === $scope.id) {
            $scope.users = users;
            $scope.ops = ops;
        }
    })
    
    $scope.kickUser = function(kickedUser) {
        var kick = {
            "user": kickedUser,
            "room": $scope.id
        };
        
        socket.emit('kick', kick, function (success) {
            if(!success) {
                $scope.errorMessage = "Not able to kick user"
            }
        });
    };
    
    socket.on('kicked', function(room, user, userName) {
        if(room === $scope.id) {
            if(user === $scope.userName) {
                console.log("kicked you fucker");
                $scope.errorMessage = "You have been kicked from this room"
                $location.path("/roomlist/");
            }
        }
    })
    
        $scope.banUser = function(bannedUser) {
        var ban = {
            "user": bannedUser,
            "room": $scope.id
        };
        
        socket.emit('ban', ban, function (success) {
            if(!success) {
                $scope.errorMessage = "Not able to ban user"
            }
        });
    };
    
    socket.on('banned', function(room, user, userName) {
        if(room === $scope.id) {
            if(user === $scope.userName) {
                console.log("banned you fucker");
                $scope.errorMessage = "You have been banned from this room"
                $location.path("/roomlist/");
            }
        }
    })
    
}]);
