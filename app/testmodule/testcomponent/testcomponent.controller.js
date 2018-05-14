angular.module('testModule').controller('testcomponent.controller', ['testService', function(testService) {
    var model = this;
    model.servResult = '';

    model.server_data = {};
    model.history = {};

    model.ord = '-name';
    model.page = 1;
    model.pages = 1;
    model.start = 1;
    model.limit = 10;

    testService.getServers().then(function(returnedData){
        model.server_data = returnedData;
        model.pages = (model.server_data.length / 10).toFixed(0);
    });
    testService.getHistory().then(function(returnedData){
        model.history = returnedData;
        model.draw_history();
    });
    model.prev = function(){
        if(model.page > 1) model.page -= 1;
        model.start = (model.page * 10) - 10;
    };
    model.next = function(){
        if(model.page < model.pages) model.page += 1;
        model.start = (model.page * 10) - 10;
    };

    model.draw_history = function(){

        var dt = Array();

        for(var year in model.history) {
            for(var month in model.history[year]) {
                for(var n in model.history[year][month]) {
                    var this_date = new Date(year, month, '01', '00', '00', '00');
                    dt.push({date:this_date,value:model.history[year][month][n]});
                }
            }
        }

        console.log(dt);

        var chart = AmCharts.makeChart( "chartdiv", {
          "type": "serial",
          "theme": "light",
          "dataProvider": dt,
          "valueAxes": [ {
            "gridColor": "#FFFFFF",
            "gridAlpha": 0.2,
            "dashLength": 0
          } ],
          "gridAboveGraphs": true,
          "startDuration": 1,
          "graphs": [ {
            "balloonText": "[[category]]: <b>[[value]]</b>",
            "fillAlphas": 0.8,
            "lineAlpha": 0.2,
            "type": "column",
            "valueField": "logs"
          },{
            "balloonText": "[[category]]: <b>[[value]]</b>",
            "fillAlphas": 0.8,
            "lineAlpha": 0.2,
            "type": "column",
            "valueField": "value"
          } ],
          "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
          },
          "chartScrollbar": {
                  "autoGridCount": true,
                  "graph": "g1",
                  "scrollbarHeight": 40
              },
          "categoryField": "date",
          "categoryAxis": {
            "gridPosition": "start",
            "gridAlpha": 0,
            "tickPosition": "start",
            "tickLength": 20,
            "parseDates": true
          },
          "export": {
            "enabled": true
          }
        } );
    };

}]);