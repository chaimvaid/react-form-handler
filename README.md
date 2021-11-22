# Getting Started with React forms handler

This project is inspired from angular reactive form. 

Important note! all samples in this Doc weren't tested. syntax can be wrong.

```npm i react-forms-handler```

React form handler's form was designed to work with both forms of react's components, it can be Initialized by 2 ways:

1. For class component use class form.
    ```new Form({login: ''})```
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

# Hooks usage

    ```
        import {useForm} from 'react-forms-handler'
        import validator from 'validator';
        import React, { useState, useEffect } from 'react';

        function LoginComponent() {

            /*
            *  We can destruct from . 
            *  despite of form.valid and form.value you can get all the field by their name
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
                
                <form className="offset-sm-1 col-sm-10 d-flex flex-column">
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

# contribution

We have pre and post publish scripts so you need to ignore them while installation 

    ```
    npm install --ignore-scripts
    
    ```