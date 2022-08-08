"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fields = void 0;

var _errors = require("./errors");

var _field = require("./field");

var _form = require("./form");

var _publisher = require("./publisher");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Fields = /*#__PURE__*/function () {
  function Fields(fields, validators) {
    var _this = this;

    _classCallCheck(this, Fields);

    _defineProperty(this, "fields", []);

    _defineProperty(this, "validators", void 0);

    _defineProperty(this, "stateChange", new _publisher.Publisher());

    if (!Array.isArray(fields)) {
      throw Error(_errors.ErrorMsg.MUST_BE_ARRAY);
    }

    this.validators = validators;
    fields.map(function (f) {
      return _this._add(f);
    }); // this.fields.forEach(f => {
    //     f.stateChange.subscribe(()=>{this.stateChange.publish(this.value)})
    // });
  }

  _createClass(Fields, [{
    key: "valid",
    get: function get() {
      return !this.fields.find(function (f) {
        return !f.valid;
      });
    }
  }, {
    key: "_add",
    value: function _add(value) {
      var _this2 = this;

      var f;

      if (value instanceof Object) {
        f = new _form.Form(value);
      } else {
        f = new _field.Field(value, this.validators);
      }

      f.stateChange.subscribe(function () {
        _this2.stateChange.publish(_this2.value);
      });
      this.fields.push(f);
    }
  }, {
    key: "add",
    value: function add(value) {
      this._add(value);

      this.stateChange.publish(this.value);
    }
  }, {
    key: "removeAt",
    value: function removeAt(position) {
      this.fields.splice(position, 1);
      this.stateChange.publish(this.value);
    }
  }, {
    key: "reset",
    value: function reset() {
      this.fields = [];
      this.stateChange.publish(this.value);
    }
  }, {
    key: "addForm",
    value: function addForm(form) {
      var _this3 = this;

      form.stateChange.subscribe(function () {
        _this3.stateChange.publish(_this3.value);
      });
      this.fields.push(form);
      this.stateChange.publish(this.value);
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