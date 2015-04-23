


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

            $scope.typeLoading = false;
        })
        .error(function(data, status, headers, config){
            //error-handling code -- confer with confreres about this.
            $scope.typeLoading = false;
        });

});