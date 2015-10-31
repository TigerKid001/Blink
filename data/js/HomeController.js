(function() {

    var app = angular.module('blink');

    var HomeController = function($scope, $http, $interval) {
        $scope.selected = undefined;

        $scope.username = "Emma";

        $scope.clock = Date.now();

        // Any function returning a promise object can be used to load values asynchronously
        $scope.getSuggestions = function(toComplete) {
            //var url = "http://suggestqueries.google.com/complete/search";
            var url = 'http://suggestqueries.google.com/complete/search?';
            url += 'callback=JSON_CALLBACK&client=firefox&hl=en&q='
            url += encodeURIComponent(toComplete);
            $http.defaults.useXDomain = true;

            return $http({
                url: url,
                method: 'JSONP',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'

                }
            }).then(function(response) {
                //console.log("Response: " + JSON.stringify(response));
                //console.log(response.data[1].toString());
                return response.data[1];
            });
            //TODO: Succes and Error checking
        };

        $scope.google = function(query, selection) {
            console.log("q: " + query + " s: " + selection);
            if (selection.length < 1)
                if (typeof query != 'undefined' && query.length !== 0)
                    window.location = "https://www.google.com/search?q=" +
                    encodeURIComponent(query);
                else window.location = "https://www.google.com/";
            else window.location = "https://www.google.com/search?q=" +
                encodeURIComponent(selection);
        }

        $scope.clocky = function() {
            $interval(function () { $scope.clock = Date.now(); }, 1000)
        }

        $scope.clocky();
    };

    app.controller('HomeController', ['$scope', '$http', '$interval', HomeController]);

}());
