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



# contribution

We have pre and post publish scripts so you need to ignore them while installation 

```npm install --ignore-scripts```