"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Form = void 0;

var _errors = require("./errors");

var _field = require("./field");

var _fields = require("./fields");

var _publisher = require("./publisher");

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Form = /*#__PURE__*/function () {
  function Form(fields) {
    var _this = this;

    _classCallCheck(this, Form);

    _defineProperty(this, "fields", void 0);

    _defineProperty(this, "stateChange", new _publisher.Publisher());

    if (_typeof(fields) != 'object') {
      throw Error(_errors.ErrorMsg.MUST_BE_OBJECT);
    }

    this.fields = Object.keys(fields).reduce(function (f, k) {
      return Object.assign(f, _defineProperty({}, k, _this._add(fields[k])));
    }, {});
  }

  _createClass(Form, [{
    key: "valid",
    get: function get() {
      var _this2 = this;

      return !Object.keys(this.fields).find(function (k) {
        return _this2.fields[k].valid === false;
      });
    }
  }, {
    key: "add",
    value: function add(field) {
      var _this3 = this;

      if (typeof field === 'string') {
        this.fields[field] = new _field.Field(null);
      } else if (_typeof(field) === 'object') {
        Object.keys(field).forEach(function (k) {
          _this3.fields[k] = _this3._add(field[k]);
        });
      }

      this.stateChange.publish(this.value);
    }
  }, {
    key: "remove",
    value: function remove(name) {
      delete this.fields[name];
    }
  }, {
    key: "value",
    get: function get() {
      var _this4 = this;

      return Object.keys(this.fields).reduce(function (values, k) {
        return Object.assign(values, _defineProperty({}, k, _this4.fields[k].value));
      }, {});
    }
  }, {
    key: "_add",
    value: function _add(fieldVal) {
      var _this5 = this;

      var field;

      if (fieldVal instanceof _fields.Fields) {
        fieldVal.stateChange.subscribe(function () {
          _this5.stateChange.publish(_this5.value);
        });
        return fieldVal;
      } else {
        if (_typeof(fieldVal) === 'object' && !Array.isArray(fieldVal) && fieldVal !== null) {
          field = new Form(fieldVal);
          field.stateChange.subscribe(function () {
            _this5.stateChange.publish(_this5.value);
          });
        } else {
          field = _construct(_field.Field, _toConsumableArray(Array.isArray(fieldVal) ? fieldVal : [fieldVal]));
          field.stateChange.subscribe(function () {
            _this5.stateChange.publish(_this5.value);
          });
        }

        return field;
      }
    }
  }, {
    key: "changeFieldName",
    value: function changeFieldName(oldName, newName) {
      this.fields[newName] = this.fields[oldName];
      delete this.fields[oldName];
    }
  }]);

  return Form;
}();

exports.Form = Form;