import { Publisher } from '../../form/publisher';
import { ErrorMsg } from '../../form/errors';
import {Field} from '../../form/field'
import { mount } from 'enzyme';
import React from 'react';

describe('Field', ()=>{
    let field;
    let baseValidator = [value=>!value, 'base_error']
    beforeAll(() => {
        field = new Field('value');
    })

    it('should have getter', () => {
        expect(field.value).toBeTruthy()
    })

    it('should have setter', () => {
        field.value = 'test'
        expect(field.value).toBe('test')
    })

    it('should have js getter called valid', () => {
        expect(field.valid).toBeTruthy()
    })

    it('should have an array of errors ', () => {
        expect(Array.isArray(field.errors)).toBe(true)
    })

    
    it('should have an array of validators ', () => {
        expect(Array.isArray(field.validators)).toBe(true)
    })

    describe('constructor', () => {
        
        it('should set value', () => {
            let f  = new Field('value')
            expect(f.value).toBe('value');
        })

        it('should set validators', () => {
            let f  = new Field('value', [baseValidator])
            expect(f.validators.length).toBe(1);
        })
        


    })


    describe('setter', () => {
        

        it('should set value', () => {
            field.value = 'value';
            expect(field.value).toBe('value');
        })
    })

    describe('getter', () => {
        it('should get value', () => {
            let value  = field.value;
            expect(value).toBe('value');
        })
    })

    
    describe('validators invalid', () => {
        let validator;
        let isValid;
        let f
        beforeAll(() => {
            validator = jest.fn();
            f  = new Field('value', [[validator, 'error']])
            
        })

        test('simple validator should return invalid error', ()=>{
            validator.mockReturnValue(false);
            expect((new Field('value', [validator])).errors).toContain(ErrorMsg.INVALID);
        })

        test('validator should be called with value', () => {
            validator.mockReturnValue(false);
            isValid = f.valid;
            expect(validator).toHaveBeenLastCalledWith('value');
        })
        test('valid should be false', () => {
            expect(isValid).toBe(false);
        })

        test('errors should contain \'error\'', () => {
            validator.mockReturnValue(false);
            expect(f.errors).toContain('error');
        })
              
    })

    describe('validators valid', () => {
        let validator;
        let isValid;
        let f
        beforeAll(() => {
            validator = jest.fn();
            f  = new Field('value', [[validator, 'error']])
            
        })
        test('validator should be called with value', () => {
            validator.mockReturnValue(true);
            isValid = f.valid;
            expect(validator).toHaveBeenLastCalledWith('value');
        })
        test('valid should be true', () => {
            expect(isValid).toBe(true);
        })

        test('errors should be empty', () => {
            validator.mockReturnValue(true);
            expect(f.errors.length).toBe(0)
        })
              
    })
    describe('multiple validators', () => {
        let validator;
        let isValid;
        let f
        beforeAll(() => {
            validator = jest.fn();
            f = new Field('value', [[validator, 'error1'], [validator, 'error2']])
            
        })
        test('validator should be called with value', () => {
            validator.mockReturnValueOnce(true).mockReturnValueOnce(false);
            isValid = f.valid;
            expect(validator).toBeCalledTimes(2);
        })
        test('valid should be true', () => {
            expect(isValid).toBe(false);
        })

        test('errors should be empty', () => {
            validator.mockReturnValueOnce(true).mockReturnValueOnce(false);
            expect(f.errors).toContain('error2');

        })
              
    })

    describe('inputProps', () => {
        let validator;
        let f;
        beforeAll(() => {
            validator = jest.fn();
            f = new Field('value', [[validator, 'error1'], [validator, 'error2']])
            
        })
        it('should be object instance', () => {
            expect(f.inputProps).toBeInstanceOf(Object)
        })
    })

    describe('stateChange', ()=>{
        it('should be instance of Publisher', () => {
            let field =  new Field('') 
            expect(field.stateChange).toBeInstanceOf(Publisher)
        })
        it('should publish field value when value is changed', () => {
            let field =  new Field('')
            let fn = jest.fn();
            field.stateChange.subscribe(fn)
            field.value = 'value' 
            field.onChange({target:{value: 'value'}}) 
            expect(fn).toBeCalledWith('value')
            expect(fn).toBeCalledTimes(2)
        })
    })

    describe('focus', ()=>{
        it('should be marked as touched after focus', () => {
            let field =  new Field('')
            let input = mount(<input {...field.inputProps} ></input>)
            input.simulate('blur')
            expect(field.touched).toBe(true)
        })
        
    })
    
})

