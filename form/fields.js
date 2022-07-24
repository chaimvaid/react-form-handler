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
        // this.fields.forEach(f => {
        //     f.stateChange.subscribe(()=>{this.stateChange.publish(this.value)})
        // });
    }
    
    get valid () {
        return !this.fields.find(f=>!f.valid);
    }
    
    _add(value){
        let f;
        if (value instanceof Object) {
            f= new Form(value)
        } else {
            f= new Field(value, this.validators)
        }
        f.stateChange.subscribe(()=>{this.stateChange.publish(this.value)})
        this.fields.push(f)
    }

    add (value) {
        this._add(value);
        this.stateChange.publish(this.value)
    }

    removeAt(position){
        this.fields = this.fields.filter((s,index) => position !== index)
        this.stateChange.publish(this.value)
    }

    reset(){
        this.fields = [];
        this.stateChange.publish(this.value)
    }

    addForm(form){
        form.stateChange.subscribe(()=>{this.stateChange.publish(this.value)})
        this.fields.push(form);
        this.stateChange.publish(this.value)
    }

    get value() {
        return this.fields.map(f=>f.value);
    }

    stateChange = new Publisher
}