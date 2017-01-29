(function () {
  'use strict'

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController ($scope) {
    $scope.info = "";
    $scope.message = "";
    $scope.check = function () {
      var res = $scope.info.split(",");
      var index = res.indexOf("", 1)
      while (index > -1){
        res.splice(index, 1)
        var index = res.indexOf("", 1)
      }
      if (res.length === 1 && res[0] === ""){
        $scope.message = "Please enter data first";
      }
      else if (res.length <= 3){
        $scope.message = "Enjoy!";
      }
      else {
        $scope.message = "Too much!";
      }
    }

  }

})();
