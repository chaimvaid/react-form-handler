import { ErrorMsg } from "./errors";
import { Field } from "./field";
import { Fields } from "./fields";
import { Publisher } from "./publisher";

export class Form {
    
    fields;
    prevValue = {};
    

    constructor(fields){
        if(typeof fields != 'object'){
            throw Error(ErrorMsg.MUST_BE_OBJECT);
        }
        this.fields = Object.keys(fields).reduce((f, k) => Object.assign(f, {[k]: this._add(fields[k])}), {});
        this.prevValue = this.value;
    }

    get valid () {
        return !Object.keys(this.fields).find(k=>this.fields[k].valid === false)
    }

    add (field) {
        if(typeof field === 'string'){
            this.fields[field] = new Field(null);
        } else if (typeof field === 'object') {
            Object.keys(field).forEach((k) => {
                this.fields[k] = this._add(field[k])
            })
        }
        this.stateChange.publish(this.value, this.prevValue)
        this.prevValue = this.value;
    }

    remove (name) {
        if (this.fields[name]){
            delete this.fields[name]
            this.stateChange.publish(this.value, this.prevValue)
        }
    }

    get value() {
        return Object.keys(this.fields || {}).reduce((values, k) => {
            return Object.assign(values, {[k]: this.fields[k].value})
        }, {})
    }

    _add(fieldVal) {
        let field
        if(fieldVal instanceof Fields) {
            fieldVal.stateChange.subscribe(()=>{ this.stateChange.publish(this.value, this.prevValue)})
            return fieldVal
        } else {
            if (typeof fieldVal === 'object' &&!Array.isArray(fieldVal) && fieldVal !== null) {
                field = new Form(fieldVal)
                field.stateChange.subscribe(()=>{ this.stateChange.publish(this.value, this.prevValue)})
            } else {
                field = new Field(...(Array.isArray(fieldVal) ? fieldVal : [fieldVal]))
                field.stateChange.subscribe(()=>{ this.stateChange.publish(this.value, this.prevValue)})
            }
            return field;
        }
    }

    changeFieldName (oldName, newName) {
        this.fields[newName] =this.fields[oldName];
        delete this.fields[oldName];
    }

    // This function can get Form.fields or Field
    clearAllFields (formFieldsOrFieldObject) {
        formFieldsOrFieldObject = formFieldsOrFieldObject || this.fields;
        if (formFieldsOrFieldObject instanceof Field) {
            formFieldsOrFieldObject.value = '';
        } else {
            Object.keys(formFieldsOrFieldObject).forEach(k => {
                if (formFieldsOrFieldObject[k] instanceof Field) {
                    formFieldsOrFieldObject[k].value = '';
                } else if (formFieldsOrFieldObject[k] instanceof Fields) {
                    formFieldsOrFieldObject[k].fields.forEach(f => {
                        this.clearAllFields(f)
                    })
                } else if (formFieldsOrFieldObject[k] instanceof Form) {
                    this.clearAllFields(formFieldsOrFieldObject[k].fields)
                }
            })
        }
    }

    stateChange = new Publisher


}