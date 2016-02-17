angular.module("chatApp").controller("RommlistController",
function RoomlistController($scope, socket) {
    
    socket.emit("rooms");
    
    var funcRoomlistChanges = function(roomList) {
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
    
    
    $scope.roomlist = [ {
        name: "Einar is a fagit",
        id: 1
    }, {
        name: "Einar is a superfagit",
        id: 2
    }]; //osfrv......
})