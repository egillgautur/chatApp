'use strict';

angular.module('chatApp', ['ngRoute']).config(['$routeProvider',
function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'src/login/login.html',
        controller: 'LoginController'
    }).when("/roomlist/", {
        templateUrl: "src/roomlist/roomlist.html",
        controller: "RoomlistController"
    })
    .when("/room/:id/", {
        templateUrl: "src/room/room.html",
        controller: "RoomController"
    })
    .when("/room/:id", {
        templateUrl: "src/room/room.html",
        controller: "RoomController"
    });
}]);

"use strict";

angular.module('chatApp').controller("LoginController",
["$scope", "$location", "$rootScope", "$routeParams", "socket",
function LoginController($scope, $location, $rootScope, $routeParams, socket) {
    $scope.user = '';
    $scope.login = function() {
            if($scope.user === '') {
                $scope.errorMessage = "Please choose a nickname";
            } else {    
                socket.emit("adduser", $scope.user, function(available) {
                    if(available) {
                        $location.path("/roomlist/");
                    } else {
                        $scope.errorMessage = "Nickname already taken, choose another";
                    }
                });
            }
    };

}]);
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
    $scope.prvMessages = [];
    $scope.messageString = '';
    socket.emit("rooms");
    
    var joinObj = {
		room: $scope.id, pass: undefined
	};

	socket.emit('joinroom', joinObj, function (success, reason) {
		if (!success) {
			$scope.banned = true;
			$scope.errorMessage = "You are banned";
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
    });
    
    
	$scope.leaveRoom = function () {
        console.log($scope.currentUser);
		$location.path("/roomlist/");
        console.log($scope.currentUser);
		socket.emit('partroom', $scope.id);
	};
    
    $scope.sendMessage = function () {
        if($scope.messageString !== '') {
            var data = {
                "roomName": $scope.id,
                "msg": $scope.messageString
            };
                
            socket.emit("sendmsg", data);
            $scope.messageString = "";
            console.log($scope.id);
            console.log("siddiddu");
            console.log(data);
        } else {
            $scope.errorMessage = "You cannot send an empty message!";
        }
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
    });
    
    $scope.kickUser = function(kickedUser) {
        var kick = {
            "user": kickedUser,
            "room": $scope.id
        };
        
        socket.emit('kick', kick, function (success) {
            if(!success) {
                $scope.errorMessage = "Not able to kick user";
            }
        });
    };
    
    socket.on('kicked', function(room, user, userName) {
        if(room === $scope.id) {
            if(user === $scope.userName) {
                console.log("kicked you fucker");
                $scope.errorMessage = "You have been kicked from this room";
                $location.path("/roomlist/");
            }
        }
    });
    
        $scope.banUser = function(bannedUser) {
        var ban = {
            "user": bannedUser,
            "room": $scope.id
        };
        
        socket.emit('ban', ban, function (success) {
            if(!success) {
                $scope.errorMessage = "Not able to ban user";
            }
        });
    };
    
    socket.on('banned', function(room, user, userName) {
        if(room === $scope.id) {
            if(user === $scope.userName) {
                console.log("banned you fucker");
                $scope.errorMessage = "You have been banned from this room";
                $location.path("/roomlist/");
            }
        }
    });
    
    $scope.sendPrivateMessage = function(user) {
        if($scope.messageString !== '') {
            var message = {
                nick: user,
                message: $scope.messageString
            };
            socket.emit('privatemsg', message, function (success) {
                if(!success) {
                    $scope.errorMessage = "Could not send!";
                } else {
                    $scope.messageString = '';
                }
            });
        } else {
            $scope.errorMessage = "You cannot send an empty message!";
        }
    };
    
    socket.on('recv_privatemsg', function(userName, message) {
        var msg = {
            nick: userName,
            message: message
        };
        
        $scope.prvMessages.push(msg);
    });
    
}]);

"use strict";

angular.module("chatApp").controller("RoomlistController",
["$scope", "$location", "$rootScope", "$routeParams", "socket",
function RoomlistController($scope, $location, $rootScope, $routeParams, socket) {
    $scope.roomlist = {};
    $scope.roomNames = [];
    $scope.currUser = $routeParams.user;

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
                    console.log("sdfs");
                    console.log($scope.currUser);
                    console.log($scope.roomName);
                    $location.path("room/" + $scope.roomName);
                }
            });
        }
	};
   
    var funcRoomlistChanges = function(roomlist) {
        console.log(roomlist);
        $scope.roomlist = roomlist;
        $scope.roomNames = Object.keys(roomlist);
    };
    
    socket.on("roomlist", funcRoomlistChanges);
    
}]);
// Factory to wrap around the socket functions
// Borrowed from Brian Ford
// http://briantford.com/blog/angular-socket-io.html
angular.module('chatApp').factory('socket', ['$rootScope', function ($rootScope) {
    var socket = io.connect('http://localhost:8080');
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        },
        getSocket: function() {
            return socket;
        }
    };
}]);