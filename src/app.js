const Util = require('./Util');
const Cars = require('./Cars');

class App {
  constructor() {
    var i = 0,
        key;
    for (i = 0; i < Util.getElementsByClassName(document.getElementById("content"), "carList", "div").length; i++) {
      Util.addListener(Util.getElementsByClassName(document.getElementById("content"), "carList", "div")[i], "click", (e) => {
        this.carListClick(e);
      });
    }
    // 表示設定
    for (i = 0; i < Util.getElementsByClassName(document.getElementById("content"), "btnViewSetting", "a").length; i++) {
      Util.addListener(Util.getElementsByClassName(document.getElementById("content"), "btnViewSetting", "a")[i], "click", (e) => {
        this.btnViewSettingClick(e);
      });
    }
    if (!JSON.parse(localStorage.getItem("content.driftspirits.car.list.setting"))) {
      return;
    } else {
      this.setting = JSON.parse(localStorage.getItem("content.driftspirits.car.list.setting"));
    }
    for (key in this.setting) {
      if (this.setting[key] === true) {
        Util.addClass(document.getElementById(key), "on");
      }
    }
    Util.addListener(document.getElementById("btnCompare"), "click", (e) => {
      this.btnCompareClick(e);
    });
    this.refreshAllViewSetting(this.setting);
    this.setView();
  }

  // 車種一覧テーブルをクリックした時のハンドラー
  carListClick(e) {
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

  // 比較するボタンのイベントハンドラー
  btnCompareClick(e) {
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
    this.setView();
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
  }

  // 表示設定ボタン
  btnViewSettingClick(e) {
    var ev = e || event,
        target = ev.target || ev.srcElement;
    Util.preventDefault(e);
    if (Util.hasClass(target, "on")) {
      Util.removeClass(target, "on");
      this.setting[target.id] = false;
      localStorage.setItem("content.driftspirits.car.list.setting", JSON.stringify(this.setting));
    } else {
      Util.addClass(target, "on");
      this.setting[target.id] = true;
      localStorage.setItem("content.driftspirits.car.list.setting", JSON.stringify(this.setting));
    }
    this.refreshAllViewSetting(this.setting);
    this.setView();
  }

  // 表示設定の反映
  setView() {
    var modal = document.getElementById("compareDialog"),
        nitroless = Util.getElementsByClassName(modal, "nitroless", "*"),
        performance = Util.getElementsByClassName(modal, "performance", "*");
    if (this.setting.shownNitroless === true) {
      for (i = 0; i < nitroless.length; i++) {
        nitroless[i].style.display = "table-cell";
      }
    } else {
      for (i = 0; i < nitroless.length; i++) {
        nitroless[i].style.display = "none";
      }
    }
    if (this.setting.shownPerformance === true) {
      for (i = 0; i < performance.length; i++) {
        performance[i].style.display = "table-cell";
      }
    } else {
      for (i = 0; i < performance.length; i++) {
        performance[i].style.display = "none";
      }
    }
  }

  refreshAllViewSetting(setting) {
    Cars.threeStars.refreshViewSetting(setting);
    Cars.fourStars.refreshViewSetting(setting);
    Cars.fiveStars.refreshViewSetting(setting);
    Cars.sixStars.refreshViewSetting(setting);
    Cars.sevenStars.refreshViewSetting(setting);
  }
}

new App();
