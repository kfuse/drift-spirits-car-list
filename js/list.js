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
        cars: [
            {name:"MAZDASPEED ATENZA GG3P",power:435,speed:2200,acceleration:600,handling:2200,nitro:3700,efficiency:315},
            {name:"INTEGRA TYPE-R DC5",power:432,speed:2162,acceleration:462,handling:2462,nitro:3562,efficiency:300},
            {name:"MR2 GT-S SW20",power:431,speed:2180,acceleration:580,handling:2280,nitro:3580,efficiency:320},
            {name:"CIVIC TYPE-R EK-9",power:429,speed:2136,acceleration:436,handling:2386,nitro:3636,efficiency:290},
            {name:"LEGACY B4 BM9",power:429,speed:2210,acceleration:560,handling:2210,nitro:3610,efficiency:315},
            {name:"TOYOTA 86 ZN6",power:424,speed:2147,acceleration:547,handling:2247,nitro:3547,efficiency:300},
            {name:"SUBARU BRZ ZC6",power:424,speed:2147,acceleration:547,handling:2247,nitro:3547,efficiency:300},
            {name:"FTO DE3A",power:421,speed:2147,acceleration:547,handling:2197,nitro:3547,efficiency:310},
            {name:"180SX RPS13",power:420,speed:2151,acceleration:501,handling:2201,nitro:3551,efficiency:315},
            {name:"CooperS F56",power:420,speed:2129,acceleration:429,handling:2229,nitro:3629,efficiency:280},
            {name:"CELICA XX 2800GT MA61",power:420,speed:2126,acceleration:526,handling:2126,nitro:3626,efficiency:325},
            {name:"ROADSTER NCEC",power:420,speed:2125,acceleration:525,handling:2225,nitro:3525,efficiency:305},
            {name:"CR-Z ZF2",power:419,speed:2088,acceleration:618,handling:2088,nitro:3588,efficiency:265},
            {name:"SPRINTER TRUENO AE86",power:416,speed:2096,acceleration:546,handling:2196,nitro:3496,efficiency:305},
            {name:"FAIRLADY Z S30",power:411,speed:2096,acceleration:446,handling:2196,nitro:3496,efficiency:340}
        ]
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
        cars: [
            /*
            {name:"FALKEN PETORONAS OTG86",power:485,speed:2451,acceleration:851,handling:2551,nitro:3851,efficiency:430},
            {name:"SUNOCO/Diversion/Dixcel SILVIA",power:483,speed:2404,acceleration:754,handling:2604,nitro:3904,efficiency:435},
            {name:"HKS Racing Performer 86",power:480,speed:2366,acceleration:766,handling:2716,nitro:3766,efficiency:420},
            */
            {name:"CAMARO SS RS",power:479,speed:2398,acceleration:798,handling:2398,nitro:3998,efficiency:430},
            {name:"TOYO TIRES DRIFT S15 SILVIA'15",power:478,speed:2412,acceleration:722,handling:2521,nitro:3922,efficiency:410},
            {name:"CHARGER SRT8",power:478,speed:2417,acceleration:1117,handling:2117,nitro:3917,efficiency:440},
            {name:"FD3S 頭文字D-夢現-Ver.",power:476,speed:2467,acceleration:792,handling:2469,nitro:3800,efficiency:400},
            {name:"FALKEN PETRONAS OTG86'15",power:473,speed:2397,acceleration:815,handling:2611,nitro:3646,efficiency:400},
            {name:"RK coupe",power:471,speed:2334,acceleration:834,handling:2434,nitro:3834,efficiency:385},
            {name:"LANCER EvolutionVIII MR CT9A",power:471,speed:2306,acceleration:706,handling:2506,nitro:3906,efficiency:405},
            /*
            {name:"AE86 頭文字D Ver.",power:470,speed:2276,acceleration:726,handling:2726,nitro:3676,efficiency:410},
            */
            {name:"LANCER EvolutionV CP9A",power:468,speed:2306,acceleration:756,handling:2406,nitro:3906,efficiency:405},
            {name:"SKYLINE GT-R BNR32",power:468,speed:2306,acceleration:656,handling:2506,nitro:3906,efficiency:420},
            {name:"SKYLINE GT-R BNR34",power:468,speed:2306,acceleration:656,handling:2506,nitro:3906,efficiency:420},
            {name:"DRIVE TOPTUL ADVAN 86",power:467,speed:2261,acceleration:661,handling:2361,nitro:4061,efficiency:405},
            {name:"S2000 AP1",power:466,speed:2284,acceleration:584,handling:2584,nitro:3884,efficiency:390},
            {name:"SUPRA RZ JZA80",power:466,speed:2306,acceleration:706,handling:2406,nitro:3906,efficiency:410},
            {name:"CHASER JZX100 -爆加-",power:466,speed:2306,acceleration:956,handling:2406,nitro:3656,efficiency:405},
            {name:"LANCER EvolutionIII CE9A",power:464,speed:2299,acceleration:699,handling:2399,nitro:3899,efficiency:400},
            {name:"GTO Z16A",power:463,speed:2306,acceleration:656,handling:2306,nitro:4006,efficiency:420},
            {name:"IMPREZA WRX STi VersionVI GC8",power:463,speed:2306,acceleration:656,handling:2406,nitro:3906,efficiency:400},
            {name:"IMPREZA WRX STI GDB-F",power:463,speed:2306,acceleration:656,handling:2406,nitro:3906,efficiency:400},
            {name:"SKYLINE GT-R BCNR33",power:463,speed:2306,acceleration:656,handling:2406,nitro:3906,efficiency:410},
            {name:"RX-8 SE3P",power:462,speed:2286,acceleration:686,handling:2486,nitro:3786,efficiency:405},
            {name:"IMPREZA WRX STi GDB-C",power:462,speed:2306,acceleration:636,handling:2406,nitro:3906,efficiency:395},
            {name:"SAVANNA RX-7 FC3S",power:460,speed:2251,acceleration:651,handling:2551,nitro:3751,efficiency:430},
            {name:"SILVIA spec.R S15",power:459,speed:2284,acceleration:634,handling:2484,nitro:3784,efficiency:390},
            {name:"CHASER JZX100",power:456,speed:2306,acceleration:656,handling:2406,nitro:3756,efficiency:405},
            {name:"CORVETTE C3",power:454,speed:2324,acceleration:724,handling:2124,nitro:3924,efficiency:435},
            {name:"CROWN ATHLETE GRS204",power:451,speed:2332,acceleration:732,handling:2132,nitro:3832,efficiency:405},
            {name:"ALCYONE SVX CXD",power:442,speed:2277,acceleration:627,handling:2177,nitro:3777,efficiency:420}
        ]
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
        cars: [
            /*
            {name:"雨宮SUNOCO RX-7",power:508,speed:2494,acceleration:794,handling:2794,nitro:4094,efficiency:550},
            {name:"TOYO TIRES DRIFT S15",power:506,speed:2519,acceleration:869,handling:2719,nitro:4019,efficiency:520},
            {name:"UP GARAGE・FALKEN・HT86",power:498,speed:2481,acceleration:1031,handling:2581,nitro:3881,efficiency:475},
            */
            {name:"RX-7 Type R FD3S [PROJECT.D]",power:520,speed:2722,acceleration:1033,handling:2645,nitro:4001,efficiency:505},
            {name:"CTR",power:504,speed:2525,acceleration:1005,handling:2655,nitro:3905,efficiency:500},
            {name:"FD3S 頭文字D Ver.",power:499,speed:2426,acceleration:826,handling:2576,nitro:4156,efficiency:540},
            {name:"NSX TYPE-R NA2",power:498,speed:2406,acceleration:856,handling:2706,nitro:4006,efficiency:495},
            {name:"IMPREZA WRX STI GRB",power:497,speed:2427,acceleration:827,handling:2677,nitro:4027,efficiency:475},
            {name:"LANCER EvolutionX CZ4A",power:497,speed:2421,acceleration:771,handling:2721,nitro:4041,efficiency:480},
            {name:"LANCER EvolutionIX MR CT9A",power:496,speed:2406,acceleration:906,handling:2606,nitro:4006,efficiency:480},
            {name:"FC3S 頭文字D Ver.",power:495,speed:2391,acceleration:891,handling:2691,nitro:3941,efficiency:540},
            {name:"FC3S 頭文字D-夢現-Ver.",power:493,speed:2490,acceleration:842,handling:2711,nitro:3833,efficiency:460},
            {name:"RX-7 FD3S",power:491,speed:2406,acceleration:706,handling:2706,nitro:4006,efficiency:510},
            {name:"FAIRLADY Z Z34",power:489,speed:2447,acceleration:797,handling:2547,nitro:3997,efficiency:490},
            {name:"SKYLINE COUPE CKV36",power:481,speed:2445,acceleration:795,handling:2445,nitro:3945,efficiency:485},
            {name:"ROADSTER ND5RC",power:474,speed:2396,acceleration:946,handling:2546,nitro:3596,efficiency:430},
            {name:"FUGA 370GT TypeS Y51",power:474,speed:2445,acceleration:695,handling:2345,nitro:3995,efficiency:485},
            {name:"2000GT MF10",power:467,speed:2310,acceleration:810,handling:2410,nitro:3810,efficiency:440}
        ]
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
        cars: [
            {name:"GT-R R35",power:558,speed:2705,acceleration:1055,handling:3005,nitro:4405,efficiency:595}
        ]
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
