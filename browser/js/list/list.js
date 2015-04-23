


app.config(function ($stateProvider) {
    $stateProvider.state('list', {
        url: '/list',
        controller: 'ListController',
        templateUrl: 'js/list/list.html'
    });
});




app.controller('ListController', function ($scope, $http) {

    $scope.listLoading = true;
    $http.get('/api/list/products')
        .success(function(data, status, headers, config){
            $scope.products = data;
            $scope.listLoading = false;
        })
        .error(function(data, status, headers, config){
            $scope.listloading = false;
        });

    $scope.typeLoading = true;
    $http.get('/api/list/categories')
        .success(function(data, status, headers, config){

            //Get a list of the types only.
            $scope.categoryTypes = data.
                map(function(category){return category.type;}).
                reduce(function(old, type, index, arr){ return (old.indexOf(type)===-1) ? old.concat(type) : old; }, []);

            //Get an object which has in each obj[categoryType] an array of the types in question
            $scope.typeData = data
                .reduce(function(old, datum, index, arr){
                    if (old[datum.type]){
                        old[datum.type].push(datum);
                        return old;
                    }else{
                        console.log(datum.type);
                        old[datum.type] = [datum];
                        return old
                    }
                },{});

            //Get an object which has in each obj[categoryType] is blank or a value
            $scope.filterValues = data
                .reduce(function(old, datum, index, arr){
                    if (old[datum.type]){return old;}
                    else{old[datum.type] = '';return old}
                },{});

            //Let's make everything visible
            $scope.typeLoading = false;

            //Add events
            $scope.updateList = function(){
                $scope.listLoading = true;
                var urlList = Object.keys($scope.filterValues).reduce(function(old, key, ind, arr){
                    return ($scope.filterValues[key]=="") ? old : old.concat($scope.filterValues[key]);
                },[]).join(',');
                var url = '/api/list/products?categories=' + urlList;
                $http.get(url)
                    .success(function(data, status, headers, config){
                        $scope.products = data;
                        $scope.listLoading = false;
                    })
                    .error(function(data, status, headers, config){
                        $scope.listLoading = false;
                    });
            }



        })
        .error(function(data, status, headers, config){
            //error-handling code -- confer with confreres about this.
            //Let's make everything visible
            $scope.typeLoading = false;
        });

});