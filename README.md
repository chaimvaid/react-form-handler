# Getting Started with React forms handler

This project is inspired from angular reactive form. 

```npm i react-forms-handler```

React form handler's form was designed to work with both forms of react's components, it can be Initialized by 2 ways:

1. For class component use class form.
    ```
        new Form({login: ''})
    ```
2. For function component use hooks. 
    ```
    import {useForm} from 'react-forms-handler';

    let loginForm = useForm({login: ''})
       
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

# contribution

We have pre and post publish scripts so you need to ignore them while installation 

```npm install --ignore-scripts```