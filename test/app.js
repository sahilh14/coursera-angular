(function () {
'use strict';

var shoppingList = [
  {name:"Milk",
   type:"branded",
   theme:"T1"
  },
  {name:"Donuts",
   type:"nonbranded",
   theme:"T2"
  },
  {name:"Cookies",
   type:"branded",
   theme:"T2"
  },
  {name:"Chocolate",
   type:"nonbranded",
   theme:"T1"
  },
  {name:"Peanut Butter",
   type:"branded",
   theme:"T1"
  },
  {name:"Pepto Bismol",
   type:"branded",
   theme:"T3"
  },
  {name:"Pepto Bismol (Chocolate flavor)",
   type:"nonbranded",
   theme:"T3"
  },
];

var themes = ["T1", "T2", "T3"];
var type = ["branded", "nonbranded"];

angular.module('ShoppingListApp', [])
.controller('ShoppingListController', ShoppingListController);

ShoppingListController.$inject = ['$scope'];
function ShoppingListController($scope) {
  $scope.shoppingList = shoppingList;
  $scope.themes = themes;
  $scope.type = type;
  $scope.mythemes = {};
  $scope.mytypes = {};
  $scope.dummy = false;
  $scope.branded = false;
  $scope.checked = function () {
    var newShoppingList = [];
    for (var key in $scope.mythemes){
      if ($scope.mythemes.hasOwnProperty(key)){
        if ($scope.mythemes[key]){
          $scope.dummy = true;
          for (var item in shoppingList){
            if (shoppingList[item].theme === key){
                newShoppingList.push(shoppingList[item]);
            }
          }
        }
      }
    }
    if ($scope.dummy === false){
      $scope.shoppingList = shoppingList;
    }
    else{
      $scope.shoppingList = newShoppingList;
      $scope.dummy = false;
    }
    var finalList = [];
    for (var key in $scope.mytypes){
      if ($scope.mytypes.hasOwnProperty(key)){
        if ($scope.mytypes[key]){
          $scope.branded = true;
          for (var item in $scope.shoppingList){
            if ($scope.shoppingList[item].type === key){
              finalList.push($scope.shoppingList[item]);
            }
          }
        }
      }
    }
    if ($scope.branded === true){
      $scope.shoppingList = finalList;
      $scope.branded = false;
    }
  }
}

})();
