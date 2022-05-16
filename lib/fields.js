"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fields = void 0;

var _errors = require("./errors");

var _field = require("./field");

var _publisher = require("./publisher");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Fields = /*#__PURE__*/function () {
  function Fields(fields, validators) {
    var _this = this;

    _classCallCheck(this, Fields);

    _defineProperty(this, "fields", void 0);

    _defineProperty(this, "validators", void 0);

    _defineProperty(this, "stateChange", new _publisher.Publisher());

    if (!Array.isArray(fields)) {
      throw Error(_errors.ErrorMsg.MUST_BE_ARRAY);
    }

    this.validators = validators;
    this.fields = fields.map(function (f) {
      return new _field.Field(f, validators);
    });
    this.fields.forEach(function (f) {
      f.stateChange.subscribe(function () {
        _this.stateChange.publish(_this.value);
      });
    });
  }

  _createClass(Fields, [{
    key: "valid",
    get: function get() {
      return !this.fields.find(function (f) {
        return !f.valid;
      });
    }
  }, {
    key: "add",
    value: function add(value) {
      this.fields.push(new _field.Field(value, this.validators));
    }
  }, {
    key: "removeAt",
    value: function removeAt(position) {
      this.fields.splice(position - 1, 1);
    }
  }, {
    key: "value",
    get: function get() {
      return this.fields.map(function (f) {
        return f.value;
      });
    }
  }]);

  return Fields;
}();

exports.Fields = Fields;