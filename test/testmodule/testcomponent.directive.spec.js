describe('testComponentDirective', function() {
    var element;
    var scope;

    beforeEach(module('myApp'));
    beforeEach(module('testModule'));
    beforeEach(module('templates'));

    beforeEach(inject(function ($rootScope, $compile, $httpBackend) {
        scope = $rootScope.$new();
        $httpBackend
            .when('GET','/data/testdata.json')
            .respond(200, {"data":"myService response data"});

        // Compile some HTML that uses the directive
        element = $compile('<test-component></test-component>')(scope);
        $httpBackend.flush();
        scope.$apply();
    }));


    it('directive shows text', function() {
        expect(element.eq(0).find('div').text()).toEqual('\n' +
            '    Hello from ng jasmin karma app\n' +
            '    \n' +
            '    myService response data\n');
        //element.find('div').click();

    });
});
