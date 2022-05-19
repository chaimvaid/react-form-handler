import { ErrorMsg } from "./errors";
import { Field } from "./field";
import { Fields } from "./fields";
import { Publisher } from "./publisher";

export class Form {
    
    fields;
    

    constructor(fields){
        if(typeof fields != 'object'){
            throw Error(ErrorMsg.MUST_BE_OBJECT);
        }
        this.fields = Object.keys(fields).reduce((f, k) => Object.assign(f, {[k]: this._add(fields[k])}), {});
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
        this.stateChange.publish(this.value)
    }

    remove (name) {
        delete this.fields[name]
    }

    get value() {
        return Object.keys(this.fields).reduce((values, k) => {
            return Object.assign(values, {[k]: this.fields[k].value})
        }, {})
    }

    _add(fieldVal) {
        let field
        if(fieldVal instanceof Fields) {
            fieldVal.stateChange.subscribe(()=>{ this.stateChange.publish(this.value)})
            return fieldVal
        } else {
            if (typeof fieldVal === 'object' &&!Array.isArray(fieldVal) && fieldVal !== null) {
                field = new Form(fieldVal)
                field.stateChange.subscribe(()=>{ this.stateChange.publish(this.value)})
            } else {
                field = new Field(...(Array.isArray(fieldVal) ? fieldVal : [fieldVal]))
                field.stateChange.subscribe(()=>{ this.stateChange.publish(this.value)})
            }
            return field;
        }
    }

    changeFieldName (oldName, newName) {
        this.fields[newName] =this.fields[oldName];
        delete this.fields[oldName];
    }

    stateChange = new Publisher


}