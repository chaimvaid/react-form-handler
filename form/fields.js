import {ErrorMsg} from './errors'
import { Field } from './field';
import { Form } from './form';
import { Publisher } from './publisher';

export class Fields {
    
    fields = [];
    validators;

    constructor (fields, validators) {
        if(!Array.isArray(fields)){
            throw Error(ErrorMsg.MUST_BE_ARRAY)
        }
        this.validators = validators;
        fields.map(f=>this._add(f))
        this.fields.forEach(f => {
            f.stateChange.subscribe(()=>{this.stateChange.publish(this.value)})
        });
    }

    get valid () {
        return !this.fields.find(f=>!f.valid);
    }

    _add(value){
        if (value instanceof Object) {
            this.fields.push(new Form([value, this.validators]))
        } else {
            this.fields.push(new Field(value, this.validators))
        }
    }

    add (value) {
        this._add(value);
    }

    removeAt(position){
        this.fields.splice(position - 1, 1);
    }

    get value() {
        return this.fields.map(f=>f.value);
    }

    stateChange = new Publisher
}