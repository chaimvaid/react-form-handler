import { ErrorMsg } from "./errors";
import { Publisher } from "./publisher";

export class Field {
    
    _value;
    _disabled = false;
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
        return this.validators.reduce((errors, validator)=>[...errors, ...(!validator[0](this._value) ? [typeof validator[1] === "function" ? validator[1]() : validator[1]] : [])], [])
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
            },
            disabled: this._disabled
        }
    } 

    disable () {
        this._disabled = true;
        this.stateChange.publish(this.value)
    }
    
    enable () {
        this._disabled = false;
        this.stateChange.publish(this.value)
    }

    reset () {
        this._value = '';
        this._touched = false;
        this.stateChange.publish(this.value)
    }

    stateChange = new Publisher
}