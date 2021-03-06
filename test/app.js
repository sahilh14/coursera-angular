(function () {
'use strict';

var shoppingList = [
  {name:"Milk",
   type:"branded",
   theme:["T1", "T2"]
  },
  {name:"Donuts",
   type:"nonbranded",
   theme:["T2"]
  },
  {name:"Cookies",
   type:"branded",
   theme:["T2"]
  },
  {name:"Chocolate",
   type:"nonbranded",
   theme:["T1"]
  },
  {name:"Peanut Butter",
   type:"branded",
   theme:["T1"]
  },
  {name:"Pepto Bismol",
   type:"branded",
   theme:["T3"]
  },
  {name:"Pepto Bismol (Chocolate flavor)",
   type:"nonbranded",
   theme:["T3"]
  },
];

var themes = ["T1", "T2", "T3"];
var type = ["branded", "nonbranded"];
var target_keywords = ["Milk", "Pepto Bismol"];
var ranking_keywords = ["Pepto Bismol","Chocolate"];

angular.module('ShoppingListApp', [])
.controller('ShoppingListController', ShoppingListController)
.filter('Mysearch', customFilter);

ShoppingListController.$inject = ['$scope'];
function ShoppingListController($scope) {
  $scope.keywordarray = shoppingList;
  $scope.shoppingList = shoppingList;
  $scope.themes = themes;
  $scope.type = type;
  $scope.mythemes = {};
  $scope.mytypes = {};
  $scope.mykeywords = {};
  $scope.mykeywordsback = {};
  $scope.dummy = false;
  $scope.branded = false;
  $scope.ranking = false;
  $scope.target = false;
  $scope.newbucket = [];
  $scope.ranking_set = false;
  $scope.target_set = false;
  $scope.select = false;
  $scope.selectback = false;
  $scope.search = "";
  $scope.movekeywordsback = function () {
    var keyword_delete = [];
    console.log("mykeywordsback before->", $scope.mykeywordsback);
    for (var key in $scope.mykeywordsback){
      if ($scope.mykeywordsback.hasOwnProperty(key)){
        if ($scope.mykeywordsback[key]){
          keyword_delete.push(key);
          delete $scope.mykeywordsback[key];
        }
      }
    }
    console.log("mykeywordsback after->", $scope.mykeywordsback);
    console.log("newbucket before ->", $scope.newbucket);
    // console.log("movekeywordsback - keyword_delete", keyword_delete);
    for (var i = 0; i<$scope.newbucket.length; i++){
      var obj = $scope.newbucket[i];
      if(keyword_delete.indexOf(obj.name) !== -1){
        $scope.newbucket.splice(i,1);
        $scope.shoppingList.push(obj);
        if($scope.keywordarray.indexOf(obj) == -1){
          $scope.keywordarray.push(obj);
        }
        i--;
      }
    }
    console.log("keywordarray -> ", $scope.keywordarray);
    console.log("shoppingList -> ", $scope.shoppingList);
  }
  $scope.movekeywords = function () {
    var keyword_delete = [];
    // console.log("mykeywords before->", $scope.mykeywords);
    for (var key in $scope.mykeywords){
      if ($scope.mykeywords.hasOwnProperty(key)){
        if ($scope.mykeywords[key]){
          keyword_delete.push(key);
          delete $scope.mykeywords[key];
        }
      }
    }
    // console.log(keyword_delete);
    // console.log("mykeywords after->", $scope.mykeywords);

    for (var i = 0; i<$scope.shoppingList.length; i++){
      var obj = $scope.shoppingList[i];
      if(keyword_delete.indexOf(obj.name) !== -1){
        $scope.shoppingList.splice(i,1);
        $scope.newbucket.push(obj);
        i--;
      }
    }
    for (var i = 0; i<$scope.keywordarray.length; i++){
      var obj = $scope.keywordarray[i];
      if(keyword_delete.indexOf(obj.name) !== -1){
        $scope.keywordarray.splice(i,1);
        i--;
      }
    }

    // console.log("keywordarray -> ", $scope.keywordarray);
    // console.log("shoppingList -> ", $scope.shoppingList);
  }
  $scope.selectAll = function (search) {
    if($scope.select){
      for (var obj in $scope.shoppingList){
        if (search !== ""){
            if ($scope.shoppingList[obj].name.toLowerCase().includes(search.toLowerCase())){
              // newbuck.push($scope.shoppingList[obj]);
              $scope.mykeywords[$scope.shoppingList[obj].name] = true;
            }
          }
          else{
            $scope.mykeywords[$scope.shoppingList[obj].name] = true;            
          }

        // $scope.mykeywords[$scope.shoppingList[obj].name] = true;
      }
    }
    else{
      for (var obj in $scope.shoppingList){
        $scope.mykeywords[$scope.shoppingList[obj].name] = false;
      }
    }
    // console.log("not");
  }
  $scope.selectAllback= function () {
    if($scope.selectback){
      for (var obj in $scope.newbucket){
        $scope.mykeywordsback[$scope.newbucket[obj].name] = true;
      }
    }
    else{
      for (var obj in $scope.newbucket){
        $scope.mykeywordsback[$scope.newbucket[obj].name] = false;
      }
    }
  }

  $scope.keywordselected = function () {
    console.log("not");
  }
  $scope.checked = function () {
    var newShoppingList = [];
    for (var key in $scope.mythemes){
      if ($scope.mythemes.hasOwnProperty(key)){
        if ($scope.mythemes[key]){
          $scope.dummy = true;
          for (var item in $scope.keywordarray){
            // console.log("key ->", key);
            // console.log("$scope.keywordarray[item].theme ->", $scope.keywordarray[item].theme[0]);
            // console.log("key in ->", key in $scope.keywordarray[item].theme);
            if ($scope.keywordarray[item].theme.indexOf(key) != -1){
              if (newShoppingList.indexOf($scope.keywordarray[item]) == -1){
                newShoppingList.push($scope.keywordarray[item]);
              }
            }
          }
        }
      }
    }
    if ($scope.dummy === false){
      $scope.shoppingList = $scope.keywordarray;
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
    finalList = [];
    if ($scope.ranking_set){
      $scope.ranking = true;
      for (var i = 0; i<$scope.shoppingList.length; i++){
        var obj = $scope.shoppingList[i];
        if(ranking_keywords.indexOf(obj.name) !== -1){
          finalList.push(obj);
        }
      }
    }
    if ($scope.ranking === true){
      $scope.shoppingList = finalList;
      $scope.ranking = false;
    }
    if ($scope.target_set){
      $scope.target = true;
      for (var i = 0; i<$scope.shoppingList.length; i++){
        var obj = $scope.shoppingList[i];
        if(target_keywords.indexOf(obj.name) !== -1){
          finalList.push(obj);
        }
      }
    }
    if ($scope.target === true){
      $scope.shoppingList = finalList;
      $scope.target = false;
    }

  }
}

function customFilter() {
  return function (text, search) {
    if (search === ""){
      return text
    }
    var newbuck = [];
    for (var item in text){
      if (text[item].name.toLowerCase().includes(search.toLowerCase())){
        newbuck.push(text[item]);
      }
    }
    return newbuck
  }
};

})();
