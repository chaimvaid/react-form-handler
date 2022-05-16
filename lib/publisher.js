"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Publisher = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Publisher = /*#__PURE__*/function () {
  function Publisher() {
    var _this = this;

    _classCallCheck(this, Publisher);

    _defineProperty(this, "subscribers", {});

    _defineProperty(this, "subscribe", function (callback) {
      var key = _this.generateKey();

      _this.subscribers[key] = callback;
      return {
        unsubscribe: function unsubscribe() {
          delete _this.subscribers[key];
        }
      };
    });

    _defineProperty(this, "publish", function (value) {
      Object.keys(_this.subscribers).forEach(function (key) {
        return _this.subscribers[key](value);
      });
    });
  }

  _createClass(Publisher, [{
    key: "generateKey",
    value: function generateKey() {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;

      for (var i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      return result;
    }
  }]);

  return Publisher;
}();

exports.Publisher = Publisher;