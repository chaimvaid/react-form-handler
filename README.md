# Getting Started with React forms handler

This library provides form object that can be used by React's hooks and class components

* Lightweight library.
* Zero dependencies.
* Inspired from angular reactive form.


```
npm i react-forms-handler
```

React form handler's form was designed to work with both forms of react's components, it can be Initialized by 2 ways:

1. For class component use class form.
    ```
    new Form({login: ''})
    ```
2. For function component use hooks. 

    ```
    import {useForm} from 'react-forms-handler';

    let loginForm = useForm({login: ''});

    ```

react-forms-handler has three entities that can be initialized separately

```
import {
    Form
    Field,
    Fields,
} from 'react-forms-handler';

// be aware! validation package should be installed . 
// it isn't one of current package dependencies.
import validator from 'validator';

let field = new Field('', validator.isEmail);

let fields = new Fields('value_1', 'value_2');

let form = new Form({
    'email': ['',validator.isEmail],
    'password': ['', validator.isStrongPassword]
})
```

Each field has field.valid property 

```
 const form = new Form({username: ''})
 
 <button  type="submit"  disabled={!form.fields.username.valid}>Submit</button>
```


# Hooks usage

```
    import {useForm} from 'react-forms-handler'
    import validator from 'validator';
    import React, { useState, useEffect } from 'react';

    function LoginComponent() {

        /*
        *  We can destruct from . 
        *  In addition to form.valid and form.value you can get all the field by their name
        *  Be aware! validator isn't part of our package . you can use your favorite
        *  validation package 
        */

        const {valid, value, username, password} = useForm({
                username: ['', validator.isEmail],
                password: ['', validator.isStrongPassword]
            });
        
        return (
            
            /*
            *  field.inputProps contain onChange function and defaultValue props that 
            *  bound to the form . onBlur also bound to detect filed.touched  
            */
            
            <form >
                <label htmlFor="email" >Email</label>
                <input type="text"  id="email" {...username.inputProps} />
                {!username.valid && <div id="email-error">
                    Should be valid email!
                </div>}
                <label htmlFor="inputPassword" >Password</label>
                <input type="password" id="password" {...password.inputProps}/>
                {!password.valid && <div id="password-error" >
                    Length should be 8, password should contain at least Letters, Capital, symbol and number!
                </div>}
                <button  type="submit"  disabled={!valid}>Submit</button>
            </form>
        
        )
    }

    export default LoginComponent;
```

useField

Sometimes you have just one field . in such cases you don't need to use entire form Object. 

```
import {useField} from 'react-forms-handler'
import validator from 'validator';

function NameComponent () {
    let email = useField(['', validator.isEmail])  
    return (
        <div>
            <input {...email.inputProps} />
            {email && email.valid && email.touched && <p>
                {email.value}
            </p>}
        </div>
    ) 
}

export default NameComponent;

```

# Class usage

```
    import {Form} from 'react-forms-handler'
    import validator from 'validator';
    import React from 'react';

    Class LoginComponent extends React.Component {{

        constructor(){
            this.form = new Form({
                username: ['', validator.isEmail],
                password: ['', validator.isStrongPassword]
            });

            this.state = {
                formValid = this.form.valid
            }
        }

        componentDidMount() {
            this.form.stateChange.subscribe(()=>{
                this.setState({
                    formValid = this.form.valid
                })
            })
        }



        
        render() {

            return (
                <form >
                    <label htmlFor="email" >Email</label>
                    <input type="text"  id="email" {...this.form.fields.username.inputProps} />
                    {!this.form.fields.username.valid && <div id="email-error">
                        Should be valid email!
                    </div>}
                    <label htmlFor="inputPassword" >Password</label>
                    <input type="password" id="password" {...this.form.fields.password.inputProps}/>
                    {!this.form.fields.password.valid && <div id="password-error" >
                        Length should be 8, password should contain at least Letters, Capital, symbol and number!
                    </div>}
                    <button  type="submit"  disabled={!this.state.formValid}>Submit</button>
                </form>
            
            )
        }
    }
        

    export default LoginComponent;
```
# clearAllFields

you can call clearAllFields in this way this function will clear all form's fields value to empty string

```
form.clearAllFields()
```

# stateChange

you can subscribe to changes in the values of single Field Array of Fields or to Entire form

```
form.stateChange.subscribe((currentValue, prevValue) => {
    //do something
})
```


**_NOTE:_** Inside Function component you should wrap the subscriber by useEffect!


# contribution

This library is fully tested contribution must be supported by Unit test.  

We have pre and post publish scripts so you need to ignore them while installation 

```
npm install --ignore-scripts

```