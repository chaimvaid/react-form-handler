import React, { useState } from 'react';
import {Field} from './field'
export function useField (fieldParams) {
    const [field, setField] = useState(()=>{return new Field(fieldParams[0], fieldParams[1])})
    const [random, setRandom] = useState(0)
    // this part will be called each stateChange so it is important to unsubscribe
    let subscription = field.stateChange.subscribe(()=>{
        setRandom(Math.floor(Math.random() * 1000000000))
        subscription.unsubscribe();
    })
    return field;
}