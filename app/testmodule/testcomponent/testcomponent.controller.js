angular.module('testModule').controller('testcomponent.controller', ['testService', '$http', function(testService, $http) {
    var model = this;
    model.serverList = [];
    model.pages = [];

    var page_no = 1;

    testService.getData().then(function(returnedData){

        model.serverList = returnedData.data;
        model.serverAmount = model.serverList.length;

        for (var i = 1; i <= model.serverAmount; i++) { // 5 items per page
           model.serverList[i-1].myIndex = i;

           if(i % 5 === 0){
                model.pages.push(page_no++);
            }
        }

        console.log(model.pages);
        console.log( model.serverList );
    });

    //model.msg = "Hello from ng jasmin karma app";
    model.table_headers = [
        {"index": "myIndex", "name": "#"},
        {"index": "name", "name": "Name"},
        {"index": "log_count", "name": "Log count"},
        {"index": "company", "name": "Company"},
        {"index": "country", "name": "Location"}
    ];

    model.current_page = 1;

    model.order_by = "myIndex";
    model.show_servers_table = true;

    model.months = ['January', 'February', 'March', 'April', 'May' , 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    $http.get('/data/historic_data.json').then(function(response){
        console.log(response);
        model.historic_data = response.data;
    });
}]);