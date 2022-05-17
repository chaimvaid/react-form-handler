import React, { useState } from 'react';
import {Form} from './form'
export function useForm (formParams) {
    const [form, setForm] = useState(()=>{return new Form(formParams)})
    const [random, setRandom] = useState(0)
    // this part will be called each stateChange so it is important to unsubscribe
    let subscription = form.stateChange.subscribe(()=>{
        setRandom(Math.floor(Math.random() * 1000000000))
        subscription.unsubscribe();
    })
    let formProps = {form , valid: form.valid, value: form.value}
    return Object.keys(form.fields).reduce((o, k)=>Object.assign(o, {[k]: form.fields[k]}),formProps)
}