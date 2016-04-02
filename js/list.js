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
        id: "threeStars",
        plus: 0,
        cars: threeStarsCars,
        originalCars: JSON.parse(JSON.stringify(threeStarsCars)),
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
            if (this.stars === 7) {
                this.stars = 3;
                reset = true;
            }
            updateStarStatus(this.originalCars, this.stars, reset);
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
            this.saveMessage = "保存しました。";
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
            if (this.stars === 7) {
                this.stars = 4;
                reset = true;
            }
            updateStarStatus(this.originalCars, this.stars, reset);
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
            this.saveMessage = "保存しました。";
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
            if (this.stars === 7) {
                this.stars = 5;
                reset = true;
            }
            updateStarStatus(this.originalCars, this.stars, reset);
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
            this.saveMessage = "保存しました。";
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
            this.saveMessage = "保存しました。";
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

})();
