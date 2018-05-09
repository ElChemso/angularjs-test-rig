describe('controller scope testing', function() {

    var testComponentController;
    var scope;

    beforeEach(module('testModule'));

    beforeEach(inject(function ($controller,$httpBackend) {
        $httpBackend
            .when('GET','/data/testdata.json')
            .respond(200, {"data":"myService response data"});

        testComponentController = $controller('testcomponent.controller', {
            $scope: scope
        });

        $httpBackend.flush();
    }));

    it('says Hello from ng jasmin karma app', function () {
        expect(testComponentController.msg).toEqual('Hello from ng jasmin karma app');
        expect(testComponentController.servResult).toEqual('myService response data');
    });

});