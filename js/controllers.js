'use strict';

angular.module('app.controllers', [])

.controller('AnchorListCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
  $scope.data = [];
  for (var i=0; i<20; i++) {
    $scope.data[i] = 'Category' + i;
  }
}])

.controller('DocCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
  $scope.data = [];

  for (var i=0; i<20; i++) {
    $scope.data[i] = {
      id: 'Category' + i,
      title: 'Title of #Category' + i,
      detail: []
    }
    for (var j=0; j<20; j++) {
      $scope.data[i].detail[j] = {
        image: 'http://placehold.it/250x250',
        title: 'Title of Item ' + j,
        description: 'Description of Item ' + j
      }
    }
  }

  $scope.more = function(index) {
    for (var j=0; j<20; j++) {
      $scope.data[index].detail.push({
        image: 'http://placehold.it/250x250',
        title: 'Title of Item ' + j,
        description: 'Description of Item ' + j
      });
    }
  }

}]);
