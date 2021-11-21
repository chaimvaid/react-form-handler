import {ErrorMsg} from './errors'
import { Field } from './field';
import { Publisher } from './publisher';

export class Fields {
    
    fields;
    validators;

    constructor (fields, validators) {
        if(!Array.isArray(fields)){
            throw Error(ErrorMsg.MUST_BE_ARRAY)
        }
        this.validators = validators;
        this.fields = fields.map(f=>(new Field(f, validators)))
        this.fields.forEach(f => {
            f.stateChange.subscribe(()=>{this.stateChange.publish(this.value)})
        });
    }

    get valid () {
        return !this.fields.find(f=>!f.valid);
    }

    add(value){
        this.fields.push(new Field(value, this.validators))
    }

    removeAt(position){
        this.fields.splice(position - 1, 1);
    }

    get value() {
        return this.fields.map(f=>f.value);
    }

    stateChange = new Publisher
}