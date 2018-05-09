angular.module('testModule').service('testService',['$http', function($http){
    var getData = function() {
        return $http.get('/data/testdata.json')
        .then(function(response){
            return response.data;
        });
    };

    return {
        getData:getData
    };
}]);