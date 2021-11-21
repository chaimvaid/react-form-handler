import React from 'react';
import {Form} from '../../form/form'


class SimpleForm extends React.Component {
loginForm;
constructor(props){
    super(props)
    this.loginForm = props.form;
}

render(){
    return (
     <div>
         <input id="login" {...this.loginForm.fields.login.inputProps}/>
         <input id="password" {...this.loginForm.fields.password.inputProps}/>
     </div>
    );
}
};

export default SimpleForm;