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
        },
        stopPropagation: function (e) {
            var eo = e || window.event;
            if (eo.stopPropagation) {
                eo.stopPropagation();
            } else { 
                eo.cancelBubble = false;
            }
        },
        getElementsByClassName: function (el, searchClass, tag) {
            if (el) {
                var returnArr = [], els, pattern, i;
                if (typeof document.getElementsByClassName === "function") {
                    returnArr = el.getElementsByClassName(searchClass, tag);
                } else { 
                    tag = tag || '*';
                    els = el.getElementsByTagName(tag);
                    pattern = new RegExp('(^|\\s)' + searchClass + '(\\s|$)');
                    for (i = 0; i < els.length; i = i + 1) {
                        if (pattern.test(els[i].className)) {
                            returnArr.push(els[i]);
                        }
                    }
                }
                return returnArr;
            }
        },
        addClass: function (el, className) {
            if (el) {
                if (!el.className.match(className)) {
                    el.className += ' ' + className;
                }
            }
        },
        removeClass: function (el, className) {
            if (el) {
                el.className = el.className.replace(className, '').replace(/^\s+|\s+$/g, "");
            }
        }
    },
    i = 0,
    threeStars = new Vue({
    el: "#threeStars",
    data: {
        stars: 3,
        id: "threeStars",
        plus: 0,
        cars: threeStarsCars,
        originalCars: JSON.parse(JSON.stringify(threeStarsCars)),
        originalStars: 3,
        carLevel: 1,
        parts: {
            engine: {
                size: 1,
                level: 1
            },
            transmission: {
                size: 1,
                level: 1
            },
            tire: {
                size: 1,
                level: 1
            },
            nitro: {
                size: 1,
                level: 1
            },
            ecu: {
                size: 1,
                level: 1
            },
            free1: {
                selected: "towerbar",
                type: [
                    {text:"", value:""},
                    {text:"タワーバー", value:"towerbar"},
                    {text:"サスペンション", value:"suspension"},
                    {text:"クラッチ", value:"clutch"},
                    {text:"シャフト", value:"shaft"},
                    {text:"マフラー", value:"muffler"},
                    {text:"タービン", value:"turbine"}
                ],
                size: 1,
                level: 1
            },
            free2: {
                selected: "towerbar",
                type: [
                    {text:"", value:""},
                    {text:"タワーバー", value:"towerbar"},
                    {text:"サスペンション", value:"suspension"},
                    {text:"クラッチ", value:"clutch"},
                    {text:"シャフト", value:"shaft"},
                    {text:"マフラー", value:"muffler"},
                    {text:"タービン", value:"turbine"}
                ],
                size: 1,
                level: 1
            }
        },
        isAppliedParts: false,
        saveMessage: ""
    },
    methods: {
        incrementStar: function(e) {
            var reset = false;
            Util.preventDefault(e);
            this.stars++;
            if (this.stars === 8) {
                this.stars = this.originalStars;
                reset = true;
            }
            updateStarStatus(this.originalCars, this.stars, {reset:reset, originalStars:this.originalStars});
            this.cars = JSON.parse(JSON.stringify(this.originalCars));
            if (this.isAppliedParts) {
                updateParts({
                    cars: this.cars,
                    originalCars: this.originalCars,
                    carLevel: this.carLevel,
                    parts: this.parts,
                    mode: "set"
                });
            }
        },
        incrementPlus: function(e) {
            Util.preventDefault(e);
            this.plus++;
            if (this.plus == 3) {
                this.plus = 0;
            }
            updatePlusStatus(this.originalCars, this.plus);
            this.cars = JSON.parse(JSON.stringify(this.originalCars));
            if (this.isAppliedParts) {
                updateParts({
                    cars: this.cars,
                    originalCars: this.originalCars,
                    carLevel: this.carLevel,
                    parts: this.parts,
                    mode: "set"
                });
            }
        },
        toggleParts: function(e) {
            Util.preventDefault(e);
            var partsContainer = document.getElementById(this.id + "Parts");
            if (partsContainer.className.match(/close/)) {
                partsContainer.className = partsContainer.className.replace(/close/g, "");
                e.target.className += " iconOpened";
                this.isAppliedParts = true;
                if (localStorage.getItem("content.driftspirits.car.list." + this.stars + "stars.carLevel") !== null) {
                    this.carLevel = JSON.parse(localStorage.getItem("content.driftspirits.car.list." + this.stars + "stars.carLevel"));
                    this.parts = JSON.parse(localStorage.getItem("content.driftspirits.car.list." + this.stars + "stars.parts"));
                }
                updateParts({
                    cars: this.cars,
                    originalCars: this.originalCars,
                    carLevel: this.carLevel,
                    parts: this.parts,
                    mode: "set"
                });
            } else {
                partsContainer.className += " close";
                e.target.className = e.target.className.replace(/iconOpened/g, "");
                this.isAppliedParts = false;
                resetParts(this.cars, this.originalCars);
            }
        },
        saveParts: function(e) {
            var thisObj = this;
            Util.preventDefault(e);
            localStorage.setItem("content.driftspirits.car.list." + this.stars + "stars.carLevel", JSON.stringify(this.carLevel));
            localStorage.setItem("content.driftspirits.car.list." + this.stars + "stars.parts", JSON.stringify(this.parts));
            this.saveMessage = "反映しました。";
            setTimeout(function() {
                thisObj.saveMessage = "";
            }, 2000);
            updateParts({
                cars: this.cars,
                originalCars: this.originalCars,
                carLevel: this.carLevel,
                parts: this.parts,
                mode: "set"
            });
        }
    }
}),
    fourStars = new Vue({
    el: "#fourStars",
    data: {
        stars: 4,
        id: "fourStars",
        plus: 0,
        cars: fourStarsCars,
        originalCars: JSON.parse(JSON.stringify(fourStarsCars)),
        originalStars: 4,
        carLevel: 1,
        parts: {
            engine: {
                size: 1,
                level: 1
            },
            transmission: {
                size: 1,
                level: 1
            },
            tire: {
                size: 1,
                level: 1
            },
            nitro: {
                size: 1,
                level: 1
            },
            ecu: {
                size: 1,
                level: 1
            },
            free1: {
                selected: "towerbar",
                type: [
                    {text:"", value:""},
                    {text:"タワーバー", value:"towerbar"},
                    {text:"サスペンション", value:"suspension"},
                    {text:"クラッチ", value:"clutch"},
                    {text:"シャフト", value:"shaft"},
                    {text:"マフラー", value:"muffler"},
                    {text:"タービン", value:"turbine"}
                ],
                size: 1,
                level: 1
            },
            free2: {
                selected: "towerbar",
                type: [
                    {text:"", value:""},
                    {text:"タワーバー", value:"towerbar"},
                    {text:"サスペンション", value:"suspension"},
                    {text:"クラッチ", value:"clutch"},
                    {text:"シャフト", value:"shaft"},
                    {text:"マフラー", value:"muffler"},
                    {text:"タービン", value:"turbine"}
                ],
                size: 1,
                level: 1
            }
        },
        isAppliedParts: false,
        saveMessage: ""
    },
    methods: {
        incrementStar: function(e) {
            var reset = false;
            Util.preventDefault(e);
            this.stars++;
            if (this.stars === 8) {
                this.stars = this.originalStars;
                reset = true;
            }
            updateStarStatus(this.originalCars, this.stars, {reset:reset, originalStars:this.originalStars});
            this.cars = JSON.parse(JSON.stringify(this.originalCars));
            if (this.isAppliedParts) {
                updateParts({
                    cars: this.cars,
                    originalCars: this.originalCars,
                    carLevel: this.carLevel,
                    parts: this.parts,
                    mode: "set"
                });
            }
        },
        incrementPlus: function(e) {
            Util.preventDefault(e);
            this.plus++;
            if (this.plus == 3) {
                this.plus = 0;
            }
            updatePlusStatus(this.originalCars, this.plus);
            this.cars = JSON.parse(JSON.stringify(this.originalCars));
            if (this.isAppliedParts) {
                updateParts({
                    cars: this.cars,
                    originalCars: this.originalCars,
                    carLevel: this.carLevel,
                    parts: this.parts,
                    mode: "set"
                });
            }
        },
        toggleParts: function(e) {
            Util.preventDefault(e);
            var partsContainer = document.getElementById(this.id + "Parts");
            if (partsContainer.className.match(/close/)) {
                partsContainer.className = partsContainer.className.replace(/close/g, "");
                e.target.className += " iconOpened";
                this.isAppliedParts = true;
                if (localStorage.getItem("content.driftspirits.car.list." + this.stars + "stars.carLevel") !== null) {
                    this.carLevel = JSON.parse(localStorage.getItem("content.driftspirits.car.list." + this.stars + "stars.carLevel"));
                    this.parts = JSON.parse(localStorage.getItem("content.driftspirits.car.list." + this.stars + "stars.parts"));
                }
                updateParts({
                    cars: this.cars,
                    originalCars: this.originalCars,
                    carLevel: this.carLevel,
                    parts: this.parts,
                    mode: "set"
                });
            } else {
                partsContainer.className += " close";
                e.target.className = e.target.className.replace(/iconOpened/g, "");
                this.isAppliedParts = false;
                resetParts(this.cars, this.originalCars);
            }
        },
        saveParts: function(e) {
            var thisObj = this;
            Util.preventDefault(e);
            localStorage.setItem("content.driftspirits.car.list." + this.stars + "stars.carLevel", JSON.stringify(this.carLevel));
            localStorage.setItem("content.driftspirits.car.list." + this.stars + "stars.parts", JSON.stringify(this.parts));
            this.saveMessage = "反映しました。";
            setTimeout(function() {
                thisObj.saveMessage = "";
            }, 2000);
            updateParts({
                cars: this.cars,
                originalCars: this.originalCars,
                carLevel: this.carLevel,
                parts: this.parts,
                mode: "set"
            });
        }
    }
}),
    fiveStars = new Vue({
    el: "#fiveStars",
    data: {
        stars: 5,
        id: "fiveStars",
        plus: 0,
        cars: fiveStarsCars,
        originalCars: JSON.parse(JSON.stringify(fiveStarsCars)),
        originalStars: 5,
        carLevel: 1,
        parts: {
            engine: {
                size: 1,
                level: 1
            },
            transmission: {
                size: 1,
                level: 1
            },
            tire: {
                size: 1,
                level: 1
            },
            nitro: {
                size: 1,
                level: 1
            },
            ecu: {
                size: 1,
                level: 1
            },
            free1: {
                selected: "towerbar",
                type: [
                    {text:"", value:""},
                    {text:"タワーバー", value:"towerbar"},
                    {text:"サスペンション", value:"suspension"},
                    {text:"クラッチ", value:"clutch"},
                    {text:"シャフト", value:"shaft"},
                    {text:"マフラー", value:"muffler"},
                    {text:"タービン", value:"turbine"}
                ],
                size: 1,
                level: 1
            },
            free2: {
                selected: "towerbar",
                type: [
                    {text:"", value:""},
                    {text:"タワーバー", value:"towerbar"},
                    {text:"サスペンション", value:"suspension"},
                    {text:"クラッチ", value:"clutch"},
                    {text:"シャフト", value:"shaft"},
                    {text:"マフラー", value:"muffler"},
                    {text:"タービン", value:"turbine"}
                ],
                size: 1,
                level: 1
            }
        },
        isAppliedParts: false,
        saveMessage: ""
    },
    methods: {
        incrementStar: function(e) {
            var reset = false;
            Util.preventDefault(e);
            this.stars++;
            if (this.stars === 8) {
                this.stars = this.originalStars;
                reset = true;
            }
            updateStarStatus(this.originalCars, this.stars, {reset:reset, originalStars:this.originalStars});
            this.cars = JSON.parse(JSON.stringify(this.originalCars));
            if (this.isAppliedParts) {
                updateParts({
                    cars: this.cars,
                    originalCars: this.originalCars,
                    carLevel: this.carLevel,
                    parts: this.parts,
                    mode: "set"
                });
            }
        },
        incrementPlus: function(e) {
            Util.preventDefault(e);
            this.plus++;
            if (this.plus == 3) {
                this.plus = 0;
            }
            updatePlusStatus(this.originalCars, this.plus);
            this.cars = JSON.parse(JSON.stringify(this.originalCars));
            if (this.isAppliedParts) {
                updateParts({
                    cars: this.cars,
                    originalCars: this.originalCars,
                    carLevel: this.carLevel,
                    parts: this.parts,
                    mode: "set"
                });
            }
        },
        toggleParts: function(e) {
            Util.preventDefault(e);
            var partsContainer = document.getElementById(this.id + "Parts");
            if (partsContainer.className.match(/close/)) {
                partsContainer.className = partsContainer.className.replace(/close/g, "");
                e.target.className += " iconOpened";
                this.isAppliedParts = true;
                if (localStorage.getItem("content.driftspirits.car.list." + this.stars + "stars.carLevel") !== null) {
                    this.carLevel = JSON.parse(localStorage.getItem("content.driftspirits.car.list." + this.stars + "stars.carLevel"));
                    this.parts = JSON.parse(localStorage.getItem("content.driftspirits.car.list." + this.stars + "stars.parts"));
                }
                updateParts({
                    cars: this.cars,
                    originalCars: this.originalCars,
                    carLevel: this.carLevel,
                    parts: this.parts,
                    mode: "set"
                });
            } else {
                partsContainer.className += " close";
                e.target.className = e.target.className.replace(/iconOpened/g, "");
                this.isAppliedParts = false;
                resetParts(this.cars, this.originalCars);
            }
        },
        saveParts: function(e) {
            var thisObj = this;
            Util.preventDefault(e);
            localStorage.setItem("content.driftspirits.car.list." + this.stars + "stars.carLevel", JSON.stringify(this.carLevel));
            localStorage.setItem("content.driftspirits.car.list." + this.stars + "stars.parts", JSON.stringify(this.parts));
            this.saveMessage = "反映しました。";
            setTimeout(function() {
                thisObj.saveMessage = "";
            }, 2000);
            updateParts({
                cars: this.cars,
                originalCars: this.originalCars,
                carLevel: this.carLevel,
                parts: this.parts,
                mode: "set"
            });
        }
    }
}),
    sixStars = new Vue({
    el: "#sixStars",
    data: {
        stars: 6,
        id: "sixStars",
        plus: 0,
        cars: sixStarsCars,
        originalCars: JSON.parse(JSON.stringify(sixStarsCars)),
        originalStars: 6,
        carLevel: 1,
        parts: {
            engine: {
                size: 1,
                level: 1
            },
            transmission: {
                size: 1,
                level: 1
            },
            tire: {
                size: 1,
                level: 1
            },
            nitro: {
                size: 1,
                level: 1
            },
            ecu: {
                size: 1,
                level: 1
            },
            free1: {
                selected: "towerbar",
                type: [
                    {text:"", value:""},
                    {text:"タワーバー", value:"towerbar"},
                    {text:"サスペンション", value:"suspension"},
                    {text:"クラッチ", value:"clutch"},
                    {text:"シャフト", value:"shaft"},
                    {text:"マフラー", value:"muffler"},
                    {text:"タービン", value:"turbine"}
                ],
                size: 1,
                level: 1
            },
            free2: {
                selected: "towerbar",
                type: [
                    {text:"", value:""},
                    {text:"タワーバー", value:"towerbar"},
                    {text:"サスペンション", value:"suspension"},
                    {text:"クラッチ", value:"clutch"},
                    {text:"シャフト", value:"shaft"},
                    {text:"マフラー", value:"muffler"},
                    {text:"タービン", value:"turbine"}
                ],
                size: 1,
                level: 1
            }
        },
        isAppliedParts: false,
        saveMessage: ""
    },
    methods: {
        incrementStar: function(e) {
            var reset = false;
            Util.preventDefault(e);
            this.stars++;
            if (this.stars === 8) {
                this.stars = this.originalStars;
                reset = true;
            }
            updateStarStatus(this.originalCars, this.stars, {reset:reset, originalStars:this.originalStars});
            this.cars = JSON.parse(JSON.stringify(this.originalCars));
            if (this.isAppliedParts) {
                updateParts({
                    cars: this.cars,
                    originalCars: this.originalCars,
                    carLevel: this.carLevel,
                    parts: this.parts,
                    mode: "set"
                });
            }
        },
        incrementPlus: function(e) {
            Util.preventDefault(e);
            this.plus++;
            if (this.plus == 3) {
                this.plus = 0;
            }
            updatePlusStatus(this.originalCars, this.plus);
            this.cars = JSON.parse(JSON.stringify(this.originalCars));
            if (this.isAppliedParts) {
                updateParts({
                    cars: this.cars,
                    originalCars: this.originalCars,
                    carLevel: this.carLevel,
                    parts: this.parts,
                    mode: "set"
                });
            }
        },
        toggleParts: function(e) {
            Util.preventDefault(e);
            var partsContainer = document.getElementById(this.id + "Parts");
            if (partsContainer.className.match(/close/)) {
                partsContainer.className = partsContainer.className.replace(/close/g, "");
                e.target.className += " iconOpened";
                this.isAppliedParts = true;
                if (localStorage.getItem("content.driftspirits.car.list." + this.stars + "stars.carLevel") !== null) {
                    this.carLevel = JSON.parse(localStorage.getItem("content.driftspirits.car.list." + this.stars + "stars.carLevel"));
                    this.parts = JSON.parse(localStorage.getItem("content.driftspirits.car.list." + this.stars + "stars.parts"));
                }
                updateParts({
                    cars: this.cars,
                    originalCars: this.originalCars,
                    carLevel: this.carLevel,
                    parts: this.parts,
                    mode: "set"
                });
            } else {
                partsContainer.className += " close";
                e.target.className = e.target.className.replace(/iconOpened/g, "");
                this.isAppliedParts = false;
                resetParts(this.cars, this.originalCars);
            }
        },
        saveParts: function(e) {
            var thisObj = this;
            Util.preventDefault(e);
            localStorage.setItem("content.driftspirits.car.list." + this.stars + "stars.carLevel", JSON.stringify(this.carLevel));
            localStorage.setItem("content.driftspirits.car.list." + this.stars + "stars.parts", JSON.stringify(this.parts));
            this.saveMessage = "反映しました。";
            setTimeout(function() {
                thisObj.saveMessage = "";
            }, 2000);
            updateParts({
                cars: this.cars,
                originalCars: this.originalCars,
                carLevel: this.carLevel,
                parts: this.parts,
                mode: "set"
            });
        }
    }
}),
    sevenStars = new Vue({
    el: "#sevenStars",
    data: {
        stars: 7,
        id: "sevenStars",
        plus: 0,
        cars: sevenStarsCars,
        originalCars: JSON.parse(JSON.stringify(sevenStarsCars)),
        originalStars: 7,
        carLevel: 1,
        parts: {
            engine: {
                size: 1,
                level: 1
            },
            transmission: {
                size: 1,
                level: 1
            },
            tire: {
                size: 1,
                level: 1
            },
            nitro: {
                size: 1,
                level: 1
            },
            ecu: {
                size: 1,
                level: 1
            },
            free1: {
                selected: "towerbar",
                type: [
                    {text:"", value:""},
                    {text:"タワーバー", value:"towerbar"},
                    {text:"サスペンション", value:"suspension"},
                    {text:"クラッチ", value:"clutch"},
                    {text:"シャフト", value:"shaft"},
                    {text:"マフラー", value:"muffler"},
                    {text:"タービン", value:"turbine"}
                ],
                size: 1,
                level: 1
            },
            free2: {
                selected: "towerbar",
                type: [
                    {text:"", value:""},
                    {text:"タワーバー", value:"towerbar"},
                    {text:"サスペンション", value:"suspension"},
                    {text:"クラッチ", value:"clutch"},
                    {text:"シャフト", value:"shaft"},
                    {text:"マフラー", value:"muffler"},
                    {text:"タービン", value:"turbine"}
                ],
                size: 1,
                level: 1
            }
        },
        isAppliedParts: false,
        saveMessage: ""
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
            updatePlusStatus(this.originalCars, this.plus);
            this.cars = JSON.parse(JSON.stringify(this.originalCars));
            if (this.isAppliedParts) {
                updateParts({
                    cars: this.cars,
                    originalCars: this.originalCars,
                    carLevel: this.carLevel,
                    parts: this.parts,
                    mode: "set"
                });
            }
        },
        toggleParts: function(e) {
            Util.preventDefault(e);
            var partsContainer = document.getElementById(this.id + "Parts");
            if (partsContainer.className.match(/close/)) {
                partsContainer.className = partsContainer.className.replace(/close/g, "");
                e.target.className += " iconOpened";
                this.isAppliedParts = true;
                if (localStorage.getItem("content.driftspirits.car.list." + this.stars + "stars.carLevel") !== null) {
                    this.carLevel = JSON.parse(localStorage.getItem("content.driftspirits.car.list." + this.stars + "stars.carLevel"));
                    this.parts = JSON.parse(localStorage.getItem("content.driftspirits.car.list." + this.stars + "stars.parts"));
                }
                updateParts({
                    cars: this.cars,
                    originalCars: this.originalCars,
                    carLevel: this.carLevel,
                    parts: this.parts,
                    mode: "set"
                });
            } else {
                partsContainer.className += " close";
                e.target.className = e.target.className.replace(/iconOpened/g, "");
                this.isAppliedParts = false;
                resetParts(this.cars, this.originalCars);
            }
        },
        saveParts: function(e) {
            var thisObj = this;
            Util.preventDefault(e);
            localStorage.setItem("content.driftspirits.car.list." + this.stars + "stars.carLevel", JSON.stringify(this.carLevel));
            localStorage.setItem("content.driftspirits.car.list." + this.stars + "stars.parts", JSON.stringify(this.parts));
            this.saveMessage = "反映しました。";
            setTimeout(function() {
                thisObj.saveMessage = "";
            }, 2000);
            updateParts({
                cars: this.cars,
                originalCars: this.originalCars,
                carLevel: this.carLevel,
                parts: this.parts,
                mode: "set"
            });
        }
    }
});

function updateStarStatus(cars, star, option) {
    var i,
        power,
        specs,
        reset = option.reset,
        originalStars = option.originalStars,
        sevenStarOffset = {},
        efficiency;
    if (originalStars < 5) {
        sevenStarOffset.power = 40;
        sevenStarOffset.specs = 200;
        sevenStarOffset.efficiency = 135;
    } else {
        sevenStarOffset.power = 60;
        sevenStarOffset.specs = 300;
        sevenStarOffset.efficiency = 135;
    }
    switch (star) {
        case 3:
            power      = -80  - sevenStarOffset.power;
            specs      = -400 - sevenStarOffset.specs;
            efficiency = -255 - sevenStarOffset.efficiency;
            break;
        case 4:
            if (!reset) {
                power      = 20;
                specs      = 100;
                efficiency = 75;
            } else {
                power      = -60  - sevenStarOffset.power;
                specs      = -300 - sevenStarOffset.specs;
                efficiency = -180 - sevenStarOffset.efficiency;
            }
            break;
        case 5:
            if (!reset) {
                power      = 20;
                specs      = 100;
                efficiency = 80;
            } else {
                power      = -40  - sevenStarOffset.power;
                specs      = -200 - sevenStarOffset.specs;
                efficiency = -100 - sevenStarOffset.efficiency;
            }
            break;
        case 6:
            if (!reset) {
                power = 40;
                specs = 200;
                efficiency = 100;
            } else {
                power      = -sevenStarOffset.power;
                specs      = -sevenStarOffset.specs;
                efficiency = -sevenStarOffset.efficiency;
            }
            break;
        case 7:
            power      = sevenStarOffset.power;
            specs      = sevenStarOffset.specs;
            efficiency = sevenStarOffset.efficiency;
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
function updateParts(param) {
    var cars = param.cars,
        originalCars = param.originalCars,
        carLevel = param.carLevel,
        parts = param.parts,
        mode = param.mode,
        i,
        key,
        coefficient,
        carLevelRotation = ["engine", "tire", "transmission", "nitro", "ecu"];
        rotationIndex = 0,
        specs = {engine:0, transmission:0, tire:0, nitro:0, ecu:0, free1:0, free2:0},
        free = {towerbar:0, suspension:0, clutch:0, shaft:0, muffler:0, turbine:0};
    for (key in parts) {
        if (parts[key].size == 0) break;
        if (key === "ecu") {
            specs[key] = (parseInt(parts[key].size, 10)) * 5 + (parseInt(parts[key].level, 10) - 1);
        } else if (key.match(/free/)) {
            if (parts[key].selected === "towerbar" || parts[key].selected === "clutch" || parts[key].selected === "muffler") {
                coefficient = 2;
            } else {
                coefficient = 3;
            }
            free[parts[key].selected] += (parseInt(parts[key].size, 10) - 1) * coefficient + parseInt(parts[key].level, 10) * coefficient;
        } else {
            specs[key] = (parseInt(parts[key].size, 10) - 1) * 5 + parseInt(parts[key].level, 10) * 5;
        }
    }
    for (i = 0; i < carLevel; i++) {
        if (i === 0) continue;
        rotationIndex = (i - 1) % 5;
        if (rotationIndex === 4) {
            specs[carLevelRotation[rotationIndex]] += 1;
            if (i === 95) {
                //レベル96なら燃費2改善
                specs[carLevelRotation[rotationIndex]] += 1;
            }
        } else {
            specs[carLevelRotation[rotationIndex]] += 5;
        }
    }
    for (i = 0; i < cars.length; i++) {
        if (mode === "set") {
            cars[i].speed = originalCars[i].speed + specs["engine"] + free["muffler"] + free["turbine"];
            cars[i].acceleration = originalCars[i].acceleration + specs["transmission"] + free["clutch"] + free["shaft"];
            cars[i].handling = originalCars[i].handling + specs["tire"] + free["towerbar"] + free["suspension"];
            cars[i].nitro = originalCars[i].nitro + specs["nitro"];
            cars[i].efficiency = originalCars[i].efficiency - specs["ecu"];
            cars[i].power = Math.floor((cars[i].speed + cars[i].acceleration + cars[i].handling + cars[i].nitro) / 20);
        } else {
            cars[i].speed = originalCars[i].speed - specs["engine"] - free["muffler"] - free["turbine"];
            cars[i].acceleration = originalCars[i].acceleration - specs["transmission"] - free["clutch"] - free["shaft"];
            cars[i].handling = originalCars[i].handling - specs["tire"] - free["towerbar"] - free["suspension"];
            cars[i].nitro = originalCars[i].nitro - specs["nitro"];
            cars[i].efficiency = originalCars[i].efficiency + specs["ecu"];
            cars[i].power = Math.floor((cars[i].speed + cars[i].acceleration + cars[i].handling + cars[i].nitro) / 20);
        }
    }
}
function resetParts(cars, originalCars) {
    for (i = 0; i < cars.length; i++) {
        cars[i].speed = originalCars[i].speed;
        cars[i].acceleration = originalCars[i].acceleration;
        cars[i].handling = originalCars[i].handling;
        cars[i].nitro = originalCars[i].nitro;
        cars[i].efficiency = originalCars[i].efficiency;
        cars[i].power = originalCars[i].power;
    }
}

for (i = 0; i < Util.getElementsByClassName(document.getElementById("content"), "carList", "div").length; i++) {
    Util.addListener(Util.getElementsByClassName(document.getElementById("content"), "carList", "div")[i], "click", carListClick);
}
// 車種一覧テーブルをクリックした時のハンドラー
function carListClick(e) {
    var ev = e || event,
        target = ev.target || ev.srcElement,
        parentTr,
        selectedCars = 0;
    if (target.tagName === "TD") {
        parentTr = target.parentNode;
    } else if (target.tagName === "SPAN") {
        parentTr = target.parentNode.parentNode;
    } else {
        return;
    }
    if (parentTr.className.match(/selected/)) {
        parentTr.className = parentTr.className.replace(/selected/, "");
    } else {
        parentTr.className += " selected";
    }
    selectedCars = Util.getElementsByClassName(document.getElementById("content"), "selected", "tr").length;
    // 2個以上選択でメニューを表示
    if (selectedCars === 1) {
        Util.removeClass(document.getElementById("footerMenu"), "open");
    } else if (selectedCars >= 2 && !document.getElementById("footerMenu").className.match(/open/)) {
        Util.addClass(document.getElementById("footerMenu"), "open");
    }
}
// 比較するボタン
Util.addListener(document.getElementById("btnCompare"), "click", function(e) {
    var trs = Util.getElementsByClassName(document.getElementById("content"), "selected", "tr"),
        carList = "",
        i = 0,
        modalTemplate = document.getElementById("modalTemplate").innerHTML;
    Util.preventDefault(e);
    for (i = 0; i < trs.length; i++) {
        carList += trs[i].outerHTML;
    }
    document.getElementById("compareDialog").innerHTML = modalTemplate.replace("{{carList}}", carList);
    document.getElementById("modal").style.display = "block";
    // 背景をクリックでダイアログを閉じる
    Util.addListener(document.getElementById("modal"), "click", function(e) {
        document.getElementById("modal").style.display = "none";
        document.getElementById("compareDialog").innerHTML = "";
    });
    Util.addListener(Util.getElementsByClassName(document.getElementById("modal"), "btnClose", "div")[0], "click", function(e) {
        Util.preventDefault(e);
        document.getElementById("modal").style.display = "none";
        document.getElementById("compareDialog").innerHTML = "";
    });
    Util.addListener(Util.getElementsByClassName(document.getElementById("modal"), "modalBox", "div")[0], "click", function(e) {
        Util.stopPropagation(e);
    });
});

})();
