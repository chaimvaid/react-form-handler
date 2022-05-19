import { Form } from '../../form/form'
import { ErrorMsg } from '../../form/errors'
import { Fields } from '../../form/fields'
import { Field } from '../../form/field';
import React from 'react';
import renderer from 'react-test-renderer';
import SimpleForm from './simple-form';
import { Publisher } from '../../form/publisher';

describe('Form',()=>{
    it('should implement valid getter set to true by default', ()=>{
        let f = new Form({});
        expect(f.valid).toBeTruthy()
    })

    it('should have fields property', ()=>{
        let f = new Form({});
        expect(f.hasOwnProperty('fields')).toBeTruthy()
    })

    it('should call valueChange publish when form.add is called', ()=>{
        let f = new Form({});
        jest.spyOn(f.stateChange, 'publish')
        f.add('test');
        expect(f.stateChange.publish).toHaveBeenCalledWith(f.value)
    })


    describe('constructor', ()=>{
        it('should throw error if fields isn\'t object', ()=>{
            let f = () => {
                new Form('string')
            }
            expect(f).toThrow(Error)
            expect(f).toThrow(ErrorMsg.MUST_BE_OBJECT)
        })

        it('should set fields', ()=>{
            
            let f = new Form({
                'field1': 'value1',
                'field2': 'value2'
            })
            expect(f.fields.field1.value).toBe('value1')
            expect(f.fields.field2.value).toBe('value2')
            
        })

        it('should set fields for Array', ()=>{
            
            let f = new Form({
                'field1': ['value1'],
                'field2': ['value2']
            })
            expect(f.fields.field1.value).toBe('value1')
            expect(f.fields.field2.value).toBe('value2')
            
        })

        it('should set validator to field', ()=>{
            let validator = jest.fn();
            validator.mockReturnValueOnce(true).mockReturnValueOnce(false)
            let f = new Form({
                'field1': ['value1',validator],
                'field2': ['value2', validator]
            })
            expect(f.fields.field1.valid).toBe(true)
            expect(f.fields.field2.valid).toBe(false)
            
        })

        it('should set Fields instance as it is ', ()=>{
            let validator = jest.fn();
            validator.mockReturnValueOnce(true).mockReturnValueOnce(false)
            let f = new Form({
                'field1': ['value1'],
                'field2': new Fields(['value2'])
            })
            
            expect(f.fields.field1.value).toBe('value1')
            expect(f.fields.field2).toBeInstanceOf(Fields)
            
        })

        it('should set nested field as form  ', ()=>{
            let formObj = {
                'nested': {
                    'field': 'value'
                },
    
            };
            let f = new Form(formObj)
            
            expect(f.fields.nested.fields.field.value).toBe('value')
            expect(f.fields.nested).toBeInstanceOf(Form)
            expect(f.value).toMatchObject(formObj);
            
        })
        describe('changeFieldName', () => {
            it('should be able to change field name dynamically  ', ()=>{
                
                let formObj = {
                    'nested': {
                        'field': 'value'
                    },
        
                };
                let f = new Form(formObj)
                f.changeFieldName('nested', 'newName')
                expect(f.fields.newName.fields.field.value).toBe('value')
                expect(f.value).not.toMatchObject(formObj);
                
            })
        })
        // it('should pass validators into fields', ()=>{
        //     let validator = jest.fn();
        //     validator.mockReturnValue(false);
        //     let f = new Fields(['string1', 'string2'],[[validator, 'error']])
        //     expect(f.fields[0].valid).toBe(false)
            
        // })
        

    })
    describe('add', ()=>{
        test('if param is string value should be null', ()=>{
            let f = new Form({})
            f.add('field1');
            expect(f.fields.field1.value).toBe(null)
        })

        test('if param is object value is object\'s value', ()=>{
            let f = new Form({})
            f.add({field1: 'value1'});
            expect(f.fields.field1.value).toBe('value1')
        })

        test('if param is object value is object\'s value even if value is an Array', ()=>{
            let f = new Form({})
            f.add({field1: ['value1']});
            expect(f.fields.field1.value).toBe('value1')
        })

        test('case wne param value is Fields instance', ()=>{
            let f = new Form({})
            f.add({field1: new Fields(['value1, value2'])});
            expect(f.fields.field1).toBeInstanceOf(Fields)
        })

        
    })

    describe('removeField', ()=>{
        test('remove correct item ', ()=>{
            let f = new Form({
                'field1': 'value1',
                'field2': 'value2'
            })
            f.remove('field2');
            expect(Object.keys(f.fields).length).toBe(1)
            expect(f.fields.field2).toBe(undefined)
            
        })
    })
    
    describe('Valid', ()=>{
        it('should be invalid if one Field is invalid', ()=>{
            let validator = jest.fn();
            validator.mockReturnValueOnce(true).mockReturnValueOnce(false)
            let f = new Form({
                'field1': ['value1',validator],
                'field2': ['value2', validator]
            })
            expect(f.valid).toBe(false)
        })

        it('should be invalid if one Field is invalid also for Fields', ()=>{
            let validator = jest.fn();
            validator.mockReturnValueOnce(true).mockReturnValueOnce(false)
            let f = new Form({
                'field1': ['value1',validator],
                'field2': new Fields(['value2', 'value3'], validator)
            })
            expect(f.valid).toBe(false)
        })

        it('should be valid if all Validators are valid ', ()=>{
            let validator = jest.fn();
            validator.mockReturnValue(true)
            let f = new Form({
                'field1': ['value1',validator],
                'field2': new Fields(['value2', 'value3'], validator)
            })
            expect(f.valid).toBe(true)
        })

    })

    describe('value', () => {
        it('should compose all values for simple object', ()=>{
            let validator = jest.fn();
            validator.mockReturnValueOnce(true).mockReturnValueOnce(false)
            let f = new Form({
                'field1': 'value1',
                'field2': 'value2',
                'fields': new Fields(['value3', 'value4'])
            })
            
            expect(f.value).toMatchObject({
                'field1': 'value1',
                'field2': 'value2',
                'fields': ['value3', 'value4'],
            })
            
            
        })
    })
     
    describe('inputProps', () => {
        
        // it('should pass form value to input value', () => {
        //     let form = new Form({
        //         login: 'login',
        //         password: 'password',
        //     })
        //     const component = renderer.create(
        //         <SimpleForm
        //             form={form}
        //         >
        //         </SimpleForm>,
        //       );
        //     const instance = component.root;
        //     let loginField = instance.findAllByType("input")[0];
        //     let passwordField = instance.findAllByType("input")[1];
        //     expect(loginField.props.value).toBe('login')
        //     expect(passwordField.props.value).toBe('password')
        // })

        it('should change form value when input value has been changed', () => {
            let form = new Form({
                login: '',
                password: '',
            })
            const component = renderer.create(
                <SimpleForm
                    form={form}
                >
                </SimpleForm>,
              );
            const instance = component.root;
            let loginField = instance.findAllByType("input")[0];
            loginField.props.onChange({
                target: { value: 'login' }
            });
            // loginField.dispatchEvent(ev);
            expect(form.fields.login.value).toBe('login')

        })
    })
    describe('stateChange', ()=>{
        it('should be instance of Publisher', () => {
            let form =  new Form({
                login: '',
                password: '',
            }) 
            expect(form.stateChange).toBeInstanceOf(Publisher)
        })
        it('should publish field value when value is changed', () => {
            let f = new Form({
                'field1': 'value1',
                'field2': 'value2',
                'fields': new Fields(['value3', 'value4'])
            })
            
            
            let fn = jest.fn();
            f.stateChange.subscribe(fn)
            f.fields.field1.value = 'value1' 
            f.fields.field2.value = 'value2' 
            f.fields.fields.fields[0].value = 'value3' 
            expect(fn).toBeCalledWith({
                'field1': 'value1',
                'field2': 'value2',
                'fields': ['value3', 'value4'],
            })
            expect(fn).toBeCalledTimes(3)
        })
    })
})