import React, {useEffect} from 'react';
import {useField} from '../../form/useField'
import { mount } from 'enzyme';

function TestObjectComponent () {
    let obj = useField([''])
    return obj.toString()
}

function TestFieldValidatorComponent ({fieldDef}) {
    let field = useField(fieldDef)
    return field.valid ? 'true' : 'false'
}

function TestFieldChangeValueComponent ({fieldDef}) {
    let field = useField(fieldDef)
    
    return (
        <div>

            <input {...field.inputProps} />
            {field && field.valid && field.touched && <p>
                {field.value}
            </p>}
        </div>
    ) 
}

describe('useField', ()=>{
    it('should return object', () => {
        
        let component = mount(<TestObjectComponent/>)
        
        expect(component.text()).toBe('[object Object]')
    })

    it('should print true for valid field', () => { 
        let validator = jest.fn()
        validator.mockReturnValueOnce(true)
        let component = mount(<TestFieldValidatorComponent fieldDef={['test', validator]}/>)
        expect(component.text()).toBe('true')
    })

    it('should work also with array of validators', () => { 
        let validator = jest.fn()
        validator.mockReturnValueOnce(true)
        let component = mount(<TestFieldValidatorComponent fieldDef={['test', [validator]]}/>)
        expect(component.text()).toBe('true')
    })

    it('should print false for invalid field', () => { 
        let validator = jest.fn()
        validator.mockReturnValueOnce(false)
        let component = mount(<TestFieldValidatorComponent fieldDef={['test', validator]}/>)
        expect(component.text()).toBe('false')
    })

    it('should print value and change it',  () => { 
        const changedValue = 'changedValue';
        let component = mount(<TestFieldChangeValueComponent fieldDef={['test']} />)
        let input = component.find('input')
        input.simulate('blur')
        expect(component.text()).toBe('test')
        input.simulate('change', {target: {value: changedValue}})
        expect(component.text()).toBe(changedValue)

    })

    
})