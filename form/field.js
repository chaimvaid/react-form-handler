import { ErrorMsg } from "./errors";
import { Publisher } from "./publisher";

export class Field {
    
    _value;
    validators = [];//[{(value)=>{}, 'error_msg'}]
    
    constructor (value, validators) {
        this._value = value == '' ? value : (value || null);
        if(validators && !Array.isArray(validators)){
            this.validators = [[validators, ErrorMsg.INVALID]]
        } else if (validators) {
            this.validators = (validators || []).map(v=>Array.isArray(v) ? v : [v,ErrorMsg.INVALID]);
        } else {
            this.validators = [];
        }
    }
    get valid () {
        return this.errors.length == 0
    }

    get errors () {
        return this.validators.reduce((errors, validator)=>[...errors, ...(!validator[0](this._value) ? [validator[1]] : [])], [])
    }
    
    get value(){  
        return this._value;
    }

    get touched(){  
        return this._touched;
    }

    set value(value){
        this._value = value; 
        this.stateChange.publish(value)
    }

    onChange = ({target:{value}}) => {
        this.value = value;
    }

    get inputProps () {
        return {
            defaultValue: this.value,
            onChange: this.onChange,
            onBlur: (e) => {
                // console.log('##############');
                // e.target.setCustomValidity(!this.valid ? "Invalid field." : '')
                this._touched = true;
                this.stateChange.publish(this.value)
            }
        }
    } 

    stateChange = new Publisher
}