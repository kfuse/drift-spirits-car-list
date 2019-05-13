module.exports = class Util {
  static addListener(oElm, sType, func, cap) {
    if (!oElm) { return false; }
    if (oElm.addEventListener) {
      oElm.addEventListener(sType, func, cap);
    } else if (oElm.attachEvent) {
      oElm.attachEvent("on"+sType, func);
    } else {
      return false;
    }
    return false;
  }

  static preventDefault(e) {
    var eo = e || window.event;
    if (eo.preventDefault) {
      eo.preventDefault();
    } else {
      eo.returnValue = false;
    }
  }

  static stopPropagation(e) {
    var eo = e || window.event;
    if (eo.stopPropagation) {
      eo.stopPropagation();
    } else {
      eo.cancelBubble = false;
    }
  }

  static getElementsByClassName(el, searchClass, tag) {
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
  }

  static hasClass(elem, value) {
    if (typeof value !== "string") {
      return false;
    }
    var obj = (typeof elem === "string") ? _d.getElementById(elem) : elem,
        myClassList,
        i,
        len;
    if (obj) {
      myClassList = obj.className.split(" ");
      for (i = 0, len = myClassList.length; i < len; i = i + 1) {
        if (myClassList[i] == value) {
          return true;
        }
      }
      return false;
    }
  }

  static addClass(el, className) {
    if (el) {
      if (!el.className.match(className)) {
        el.className += ' ' + className;
      }
    }
  }

  static removeClass(el, className) {
    if (el) {
      el.className = el.className.replace(className, '').replace(/^\s+|\s+$/g, "");
    }
  }
};
