angular.module('testModule').controller('testcomponent.controller', ['testService', function(testService) {
    var model = this;
    model.servResult = '';

    testService.getData().then(function(returnedData){
        model.servResult = returnedData.data;
    });

    model.msg = "Hello from ng jasmin karma app";

}]);