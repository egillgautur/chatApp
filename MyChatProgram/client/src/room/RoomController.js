angular.module("chatApp").controller("RoomController",
function RoomController($scope, $routeParams) {
    var id = $routeParams.id;
    
    var queryString = $location.search(); //Þarf ekki endilega
    var status = queryString["status"];
    
    if(status === "available") {
        //TO DO
    }
});