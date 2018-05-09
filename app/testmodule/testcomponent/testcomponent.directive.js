angular.module('testModule').directive('testComponent', [function() {
    return {
        scope : {},
        restrict : 'E',
        templateUrl:'app/testmodule/testcomponent/testcomponent.html',
        bindToController:'true',
        controllerAs:'model',
        controller:'testcomponent.controller',
        link : function(scope,element,attr){

        }
    };
}]);