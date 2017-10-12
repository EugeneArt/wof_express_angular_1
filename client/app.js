'use strict';

var serviceBase = 'http://192.168.0.88:3000/';

var AngApp = angular.module('AngApp', [
    'ngRoute',
    'ui.bootstrap',
    'ngTouch',
    'angular.filter',
    'AngApp.main',
    'AngApp.timetable',
    'AngApp.trainers',
    'AngApp.exercises',
    'AngApp.gyms',
    'AngApp.comments',
    'AngApp.levels',
    'AngApp.banners',
    'AngApp.filter',
    'ngFileUpload',
    'ui.router',
    'duScroll',
    'ngLodash'
]);

var AngApp_main = angular.module('AngApp.main', ['ui.router']);
var AngApp_timetable = angular.module('AngApp.timetable', ['ui.router']);
var AngApp_gyms = angular.module('AngApp.gyms', ['ui.router']);
var AngApp_trainers = angular.module('AngApp.trainers', ['ui.router']);
var AngApp_exercises = angular.module('AngApp.exercises', ['ui.router']);
var AngApp_comments = angular.module('AngApp.comments', ['ui.router']);
var AngApp_levels = angular.module('AngApp.levels', ['ui.router']);
var AngApp_banners = angular.module('AngApp.banners', ['ui.router']);
var AngApp_filter = angular.module('AngApp.filter', ['ui.router']);

//show errors
AngApp.run(function($rootScope) {
    $rootScope.$on("$stateChangeError", console.log.bind(console));
});
//scroll top view
AngApp.run(function($rootScope, $state, $stateParams){
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$on('$stateChangeSuccess', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
});