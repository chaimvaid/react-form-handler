import {Fields} from '../../form/fields'
import {ErrorMsg} from '../../form/errors'
import { Field } from '../../form/field';
import { Publisher } from '../../form/publisher';
import React from 'react';
import { Form } from '../../form/form';
 
describe('Fields',()=>{
    it('should implement valid getter set to true by default', ()=>{
        let f = new Fields([]);
        expect(f.valid).toBeTruthy()
    })

    it('should have fields property', ()=>{
        let f = new Fields([]);
        expect(f.hasOwnProperty('fields')).toBeTruthy()
    })

    describe('constructor', ()=>{
        it('should throw error if none array value specify', ()=>{
            let f = () => {
                new Fields('string')
            }
            expect(f).toThrow(Error)
            expect(f).toThrow(ErrorMsg.MUST_BE_ARRAY)
        })

        it('should set fields', ()=>{
            
            let f = new Fields(['string1', 'string2'])
            expect(f.fields[0].value).toBe('string1')
            expect(f.fields[1].value).toBe('string2')
            
        })

        it('should init Form fo object fields', ()=>{
            
            let f = new Fields([{test: 'test'}])
            expect(f.fields[0]).toBeInstanceOf(Form)
            
            
        })
        it('should pass validators into fields', ()=>{
            let validator = jest.fn();
            validator.mockReturnValue(false);
            let f = new Fields(['string1', 'string2'],[[validator, 'error']])
            expect(f.fields[0].valid).toBe(false)
            
        })
        

    })
    describe('add', ()=>{
        it('should add item to fields', ()=>{
            let f = new Fields(['string1', 'string2'])
            f.add('string2');
            expect(f.fields.length).toBe(3)
        })

        test('added item should be Field', ()=>{
            let f = new Fields(['string1', 'string2'])
            f.add('string2');
            expect(f.fields[2]).toBeInstanceOf(Field)
        })

        test('added item should be Form for object', ()=>{
            let f = new Fields([{test: 'test'}])
            f.add({test: 'test'});
            expect(f.fields[1]).toBeInstanceOf(Form)
        })

        test('added item should get validator', ()=>{
            let validator = jest.fn();
            validator.mockReturnValue(false);
            let f = new Fields(['string1', 'string2'],[[validator, 'error']])
            f.add('string2');
            expect(f.fields[2].valid).toBe(false)
        })

    })

    describe('removeField', ()=>{
        test('remove correct item ', ()=>{
            let f = new Fields(['string1', 'string2', 'string3'])
            f.removeAt(2);
            expect(f.fields.length).toBe(2)
            expect(f.fields[1].value).toBe('string3')
        })
    })
    
    describe('Valid', ()=>{
        it('should be invalid if one Field is invalid', ()=>{
            let validator = value=>!!value;
            let f = new Fields(['string1', '', 'string3'],[[validator, 'error']])
            expect(f.valid).toBe(false)
        })
    
        it('should be valid if all Fields are valid', ()=>{
            let validator = value=>!!value;
            let f = new Fields(['string1', 'string2', 'string3'],[[validator, 'error']])
            expect(f.valid).toBe(true)
        })

    })

    describe('stateChange', ()=>{
        it('should be instance of Publisher', () => {
            let fields =  new Fields([]) 
            expect(fields.stateChange).toBeInstanceOf(Publisher)
        })
        it('should publish field value when value is changed', () => {
            let fields =  new Fields(['string1', 'string2', 'string3'])
            let fn = jest.fn();
            fields.stateChange.subscribe(fn)
            fields.fields[0].value = 'value1' 
            fields.fields[1].value = 'value2' 
            expect(fn).toBeCalledWith(['value1', 'value2', 'string3'])
            expect(fn).toBeCalledTimes(2)
        })
    })
})