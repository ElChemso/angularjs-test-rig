angular.module('testModule').service('testService',['$http', function($http){
    var getHistory = function() {
        return $http.get('/data/historic.json')
        .then(function(response){
            return response.data;
        });
    };

    var getServers = function() {
            return $http.get('/data/server_data.json')
            .then(function(response){
                return response.data;
            },function(){

            });
        };


    return {
        getHistory:getHistory,
        getServers:getServers
    };
}]);