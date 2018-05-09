describe('testService testing', function() {
    var testService;
    var httpBackend;

    beforeEach(function(){

        module('testModule');

        inject(function(_testService_,$httpBackend){
            testService = _testService_;
            httpBackend = $httpBackend;
            $httpBackend
                .when('GET','/data/testdata.json')
                .respond(200, {"data":"myService response data"});
        });
    });

    it('Should return data from get data', function(){

        var servResponse='';
        testService.getData().then(function(data){
            servResponse = data;
        });
        httpBackend.flush();

        var result = servResponse.data;

        expect(result).toEqual('myService response data');
    });

});