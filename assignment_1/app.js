(function () {
  'use strict'

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', function ($scope) {
    $scope.info = "";
    $scope.message = "";
    $scope.check = function () {
      var res = $scope.info.split(",");
      var index = res.indexOf("", 1)
      while (index > -1){
        res.splice(index, 1)
        var index = res.indexOf("", 1)
      }
      console.log(res);
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

  });

})();
