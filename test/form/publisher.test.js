import React from 'react';
import { Publisher } from '../../form/publisher'

describe('Publisher',()=>{
    it('should have subscribers array', ()=>{
        let p = new Publisher();
        expect(p.subscribers).toMatchObject({})
    })

    it('should insert callback into subscribers array', ()=>{
        let p = new Publisher();
        let fn = jest.fn()
        p.subscribe(fn);
        expect(Object.keys(p.subscribers).length).toBe(1)
    })

    test('subscriber should be able to unsubscribe ', ()=>{
        let p = new Publisher();
        let fn = jest.fn()
        let subscription = p.subscribe(fn);
        subscription.unsubscribe();
        expect(Object.keys(p.subscribers).length).toBe(0)
    })

    it('should call callback when publish is called', ()=>{
        let p = new Publisher();
        let fn = jest.fn()
        let subscription = p.subscribe(fn);
        p.subscribe(fn);
        p.subscribe(fn);
        let value = 'test'
        subscription.unsubscribe()
        p.publish(value)
        expect(fn).toHaveBeenCalledWith(value, undefined)
        expect(fn).toHaveBeenCalledTimes(2)
    })

    it('should call callback when publish is called with prev and current value', ()=>{
        let p = new Publisher();
        let fn = jest.fn()
        let subscription = p.subscribe(fn);
        p.subscribe(fn);
        p.subscribe(fn);
        let currentValue = 'current value'
        let prevValue = 'prev value'
        subscription.unsubscribe()
        p.publish(currentValue, prevValue)
        expect(fn).toHaveBeenCalledWith(currentValue, prevValue)
        expect(fn).toHaveBeenCalledTimes(2)
    })
})