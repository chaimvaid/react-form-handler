import React from 'react';
import {useForm} from '../../form/useForm'
import { mount } from 'enzyme';

function TestObjectComponent () {
    let obj = useForm({test: ''})
    return obj.toString()
}

function TestFormValidatorComponent ({formDef}) {
    let obj = useForm(formDef)
    return obj.valid ? 'true' : 'false'
}

function TestFormOtherFieldComponent ({formDef, fieldName}) {
    let obj = useForm(formDef)
    let field = obj[fieldName];
    return (
        <div>

            <input {...field.inputProps}></input>
            {field && field.valid && field.touched && <p>
                test
            </p>}
        </div>
    ) 
}

describe('useForm', ()=>{
    it('should return object', () => {
        
        let component = mount(<TestObjectComponent/>)
        
        expect(component.text()).toBe('[object Object]')
    })

    it('should print true for valid  field', () => { 
        let component = mount(<TestFormValidatorComponent formDef={{test: ''}}/>)
        expect(component.text()).toBe('true')
    })

    it('should return false for invalid field', () => { 
        let component = mount(<TestFormValidatorComponent formDef={{test: ['', ()=>false]}}/>)
        expect(component.text()).toBe('false')
    })

    it('should return field object', () => { 
        let component = mount(<TestFormOtherFieldComponent formDef={{test: ''}} fieldName="test"/>)
        let input = component.find('input')
        input.simulate('blur')
        expect(component.text()).toBe('test')
    })

    
})