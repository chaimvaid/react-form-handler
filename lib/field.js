"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Field = void 0;

var _errors = require("./errors");

var _publisher = require("./publisher");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Field = /*#__PURE__*/function () {
  //[{(value)=>{}, 'error_msg'}]
  function Field(_value, validators) {
    var _this = this;

    _classCallCheck(this, Field);

    _defineProperty(this, "_value", void 0);

    _defineProperty(this, "_disabled", false);

    _defineProperty(this, "validators", []);

    _defineProperty(this, "onChange", function (_ref) {
      var value = _ref.target.value;
      _this.value = value;
    });

    _defineProperty(this, "stateChange", new _publisher.Publisher());

    this._value = _value == '' ? _value : _value || null;

    if (validators && !Array.isArray(validators)) {
      this.validators = [[validators, _errors.ErrorMsg.INVALID]];
    } else if (validators) {
      this.validators = (validators || []).map(function (v) {
        return Array.isArray(v) ? v : [v, _errors.ErrorMsg.INVALID];
      });
    } else {
      this.validators = [];
    }
  }

  _createClass(Field, [{
    key: "valid",
    get: function get() {
      return this.errors.length == 0;
    }
  }, {
    key: "errors",
    get: function get() {
      var _this2 = this;

      return this.validators.reduce(function (errors, validator) {
        return [].concat(_toConsumableArray(errors), _toConsumableArray(!validator[0](_this2._value) ? [typeof validator[1] === "function" ? validator[1]() : validator[1]] : []));
      }, []);
    }
  }, {
    key: "value",
    get: function get() {
      return this._value;
    },
    set: function set(value) {
      var prevValue = JSON.parse(JSON.stringify(this._value));
      this._value = value;

      if (prevValue !== value) {
        this.stateChange.publish(value, prevValue);
      }
    }
  }, {
    key: "touched",
    get: function get() {
      return this._touched;
    }
  }, {
    key: "inputProps",
    get: function get() {
      var _this3 = this;

      return {
        defaultValue: this.value,
        onChange: this.onChange,
        onBlur: function onBlur(e) {
          // console.log('##############');
          // e.target.setCustomValidity(!this.valid ? "Invalid field." : '')
          _this3._touched = true;

          _this3.stateChange.publish(_this3.value);
        },
        disabled: this._disabled
      };
    }
  }, {
    key: "disable",
    value: function disable() {
      this._disabled = true;
      this.stateChange.publish(this.value);
    }
  }, {
    key: "enable",
    value: function enable() {
      this._disabled = false;
      this.stateChange.publish(this.value);
    }
  }, {
    key: "reset",
    value: function reset() {
      this._value = '';
      this._touched = false;
      this.stateChange.publish(this.value);
    }
  }]);

  return Field;
}();

exports.Field = Field;