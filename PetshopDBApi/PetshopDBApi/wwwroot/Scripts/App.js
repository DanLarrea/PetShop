var app = angular.module('LaTienda', ['ngAnimate', 'ngRoute', 'ui.grid']);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/employees',
        {
            template: '<employees></employees>'
        });
    $routeProvider.when('/products',
        {
            template: '<products></products>'
        });
    $routeProvider.when('/clients',
        {
            template: '<clients></clients>'
        });
    $routeProvider.when('/orders',
        {
            template: '<orders></orders>'
        });

    // use the HTML5 History API
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});