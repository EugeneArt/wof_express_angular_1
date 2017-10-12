'use strict';
AngApp_main
    .controller('index', ['$scope', '$http', '$document','$window','$location', '$timeout', 'timeTableServices','levelsServices','lodash',
        function($scope, $http, $document, $window, $location, $timeout, timeTableServices,levelsServices) {
            $scope.toggleAllGyms = false;

            $scope.showAllGyms = function () {
              $scope.toggleAllGyms = true;
            };
            $scope.hideAllGyms = function () {
              $scope.toggleAllGyms = false;
            };

            $scope.time = 0;
            var updateCounter = function() {
                $scope.time++;
                $timeout(updateCounter, 1000);
                if($scope.time === 120 && /site|filter|comment\/|exercise\/|trainer\//.test($location.path())) {
                    $scope.time = 0;
                    $location.path('/site/index');
                    $document.scrollTop(0, 1000).then(function() {
                    });
                }
            };
            updateCounter();

            if (!($scope.timetables)) {
                updateSchedule();
            }
            setInterval(updateSchedule, 600000);

            function updateSchedule() {
                timeTableServices.getTimetables().then(function(data){
                    if( !(Object.is($scope.timetables, data.data)) ) {
                        $scope.timetables = data.data;
                    }
                });
            }

            timeTableServices.getTimetables().then(function(data){
                $scope.timetables = data.data;
            });
            levelsServices.getLevels().then(function(data){
                $scope.levels = data.data;
            });

            $scope.upDown = function () {
                var btnScroll = angular.element(document.getElementById('scroll-btn'))[0];
                var scrollHeight = $document[0].body.scrollHeight;
                switch (btnScroll.className) {
                    case 'bottom':
                        $document.scrollTop(scrollHeight, 1000).then(function() {
                        });
                        break;
                    case 'top':
                        $document.scrollTop(0, 1000).then(function() {
                        });
                        break;
                }
            };

            $scope.finished =   function() {
                setTimeout(function () {
                    var btnScroll = angular.element(document.getElementById('scroll-btn'))[0];
                    var innerHeight = document.documentElement.clientHeight;
                    var scrollHeight =  document.documentElement.scrollHeight;
                    if(btnScroll &&  scrollHeight > innerHeight) {
                        btnScroll.className = 'bottom';
                    }
                }, 3000);


            };

            $document.on('click', function () {
                var btnScroll = angular.element(document.getElementById('scroll-btn'))[0];
                var scrollHeight =  document.documentElement.scrollHeight;
                var innerHeight = document.documentElement.clientHeight;
                if(btnScroll !== undefined){
                    if(scrollHeight < innerHeight) {
                        btnScroll.className = '';
                    } else {
                        btnScroll.className = 'bottom';
                    }
                }

                $scope.time = 0;
            });

            $document.on('scroll', function() {
                var btnScroll = angular.element(document.getElementById('scroll-btn'))[0];
                var content = angular.element(document.getElementById('schedule'))[0];

                var pageY = window.pageYOffset || $document.scrollTop();
                var innerHeight = document.documentElement.clientHeight;
                if(content) {
                    var contentHeight = content.clientHeight;
                }

                var scrollHeight =  document.documentElement.scrollHeight;
                var scrollFromHead =  innerHeight - (scrollHeight - innerHeight);

                pageY = pageY + scrollFromHead;
                if(btnScroll) {
                    switch (btnScroll.className) {
                        case '':
                            if (pageY >= 0 && contentHeight >= innerHeight) {
                                btnScroll.className = 'bottom';
                            }
                            break;
                        case 'bottom':
                            if (pageY == innerHeight) {
                                btnScroll.className = 'top';
                            }
                            break;
                        case 'top':
                            if (pageY == scrollFromHead) {
                                btnScroll.className = 'bottom';
                            }
                            break;
                    }
                }

            });

    }])
    .controller('nav', ['$scope', '$http', 'bannersServices',
        function($scope, $http, bannersServices) {
            bannersServices.getBanners().then(function(data){
                $scope.banner = data.data.filter(function (item) {
                    return item.is_used;
                });
            });

        }]);

