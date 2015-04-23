'use strict';
app.factory('RandomGreetings', function () {

    var getRandomFromArray = function (arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    };

    var img1 = '/../../img/arctic_fox.jpg';
    var img2 = '/../../img/amur_leopard.jpeg';
    var img3 = '/../../img/amur_tiger.jpg';
    var img4 = '/../../img/eastern_lowland_gorilla.jpg';
    var img5 = '/../../img/giant_panda.jpg';
    var img6 = '/../../img/malayan_tiger.jpg';
    var img7 = '/../../img/monarch_butterfly.jpg';
    var img8 = '/../../img/sea_turtle.jpg';
    var img9 = '/../../img/polar_bear.jpg';
    var img10 = '/../../img/pronghorn.jpg';
    var img11 = '/../../img/red_panda.jpg';
    var img12 = '/../../img/sloth.jpeg';
    var img13 = '/../../img/south_china_tiger.jpg';
    var img14 = '/../../img/sumatran_tiger.jpg';




    var greetings = [
        img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14
    ];

    return {
        greetings: greetings,
        getRandomGreeting: function () {
            return getRandomFromArray(greetings);
        }
    };

});