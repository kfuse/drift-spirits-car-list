(function(){
var Util = {
        addListener: function(oElm, sType, func, cap) {
            if (!oElm) { return false; }
            if (oElm.addEventListener) {
                oElm.addEventListener(sType, func, cap);
            } else if (oElm.attachEvent) {
                oElm.attachEvent("on"+sType, func);
            } else {
                return false;
            }
            return false;
        },
        preventDefault: function (e) {
            var eo = e || window.event;
            if (eo.preventDefault) {
                eo.preventDefault();
            } else { 
                eo.returnValue = false;
            }
        }
    },
    threeStars = new Vue({
    el: "#threeStars",
    data: {
        stars: 3,
        plus: 0,
        cars: threeStarsCars
    },
    methods: {
        incrementStar: function(e) {
            var reset = false;
            Util.preventDefault(e);
            this.stars++;
            if (this.stars === 7) {
                this.stars = 3;
                reset = true;
            }
            updateStarStatus(this.cars, this.stars, reset);
        },
        incrementPlus: function(e) {
            Util.preventDefault(e);
            this.plus++;
            if (this.plus == 3) {
                this.plus = 0;
            }
            updatePlusStatus(this.cars, this.plus);
        }
    }
}),
    fourStars = new Vue({
    el: "#fourStars",
    data: {
        stars: 4,
        plus: 0,
        cars: fourStarsCars
    },
    methods: {
        incrementStar: function(e) {
            var reset = false;
            Util.preventDefault(e);
            this.stars++;
            if (this.stars === 7) {
                this.stars = 4;
                reset = true;
            }
            updateStarStatus(this.cars, this.stars, reset);
        },
        incrementPlus: function(e) {
            Util.preventDefault(e);
            this.plus++;
            if (this.plus == 3) {
                this.plus = 0;
            }
            updatePlusStatus(this.cars, this.plus);
        }
    }
}),
    fiveStars = new Vue({
    el: "#fiveStars",
    data: {
        stars: 5,
        plus: 0,
        cars: fiveStarsCars
    },
    methods: {
        incrementStar: function(e) {
            var reset = false;
            Util.preventDefault(e);
            this.stars++;
            if (this.stars === 7) {
                this.stars = 5;
                reset = true;
            }
            updateStarStatus(this.cars, this.stars, reset);
        },
        incrementPlus: function(e) {
            Util.preventDefault(e);
            this.plus++;
            if (this.plus == 3) {
                this.plus = 0;
            }
            updatePlusStatus(this.cars, this.plus);
        }
    }
}),
    sixStars = new Vue({
    el: "#sixStars",
    data: {
        stars: 6,
        plus: 0,
        cars: sixStarsCars
    },
    methods: {
        incrementStar: function(e) {
            Util.preventDefault(e);
        },
        incrementPlus: function(e) {
            Util.preventDefault(e);
            this.plus++;
            if (this.plus == 3) {
                this.plus = 0;
            }
            updatePlusStatus(this.cars, this.plus);
        }
    }
});

function updateStarStatus(cars, star, reset) {
    var i,
        power,
        specs,
        efficiency;
    switch (star) {
        case 3:
            power = -80;
            specs = -400;
            efficiency = -255;
            break;
        case 4:
            if (!reset) {
                power = 20;
                specs = 100;
                efficiency = 75;
            } else {
                power = -60;
                specs = -300;
                efficiency = -180;
            }
            break;
        case 5:
            if (!reset) {
                power = 20;
                specs = 100;
                efficiency = 80;
            } else {
                power = -40;
                specs = -200;
                efficiency = -100;
            }
            break;
        case 6:
            power = 40;
            specs = 200;
            efficiency = 100;
            break;
    }
    for (i = 0; i < cars.length; i++) {
        cars[i].power += power;
        cars[i].speed += specs;
        cars[i].acceleration += specs;
        cars[i].handling += specs;
        cars[i].nitro += specs;
        cars[i].efficiency += efficiency;
    }
}
function updatePlusStatus(cars, plus) {
    var i,
        power,
        specs;
    switch (plus) {
        case 0:
            power = -12;
            specs = -60;
            break;
        case 1:
            power = 6;
            specs = 30;
            break;
        case 2:
            power = 6;
            specs = 30;
            break;
    }
    for (i = 0; i < cars.length; i++) {
        cars[i].power += power;
        cars[i].speed += specs;
        cars[i].acceleration += specs;
        cars[i].handling += specs;
        cars[i].nitro += specs;
    }
}

})();
