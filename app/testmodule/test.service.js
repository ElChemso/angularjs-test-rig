angular.module('testModule').service('testService',['$http', function($http){
    var getData = function() {
        return $http.get('/data/server_info.json')
        .then(function(response){
            return response;
        });
    };

    return {
        getData:getData
    };
}]);
