import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import axios from 'axios';
class LoginForm extends React.Component {
    constructor(props) {  //构造函数
        super(props);
        this.state = {
            user:'',
            password:'',
        }
        this.userChange = this.userChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    userChange(e){
        this.setState({ user : e.target.value })
    }

    passwordChange(e){
        this.setState({ password : e.target.value })
    }

    submit(){
        console.log(JSON.stringify(this.state.user));
        console.log(JSON.stringify(this.state.password));
        axios({
            method:'post',
            url:'http://kingofdinner.realsun.me:8099/api/Account/Login',
            headers: {
                'Content-Type': 'application/json'
            },
            data:{
                Code: this.state.user,
                Password:this.state.password
            }
        }).then((res)=>{
            console.log(res.data);
            if(res.data.OpResult==='N'){
                window.alert("密码错误，请重新输入")
            }
            else{
                localStorage.setItem("token",res.data.AccessToken);
                this.props.history.push('/UserPage') 
               // window.location.href = '/UserPage';
            }           
        })
    }

    render(){
        return(
            <div className='login-form'>
            <style>{`
              body > div,
              body > div > div,
              body > div > div > div.login-form {
                height: 100%;
              }
            `}</style>
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                  <Image src='/logo.png' /> Log-in to your account
                </Header>
                <Form size='large'>
                  <Segment stacked>
                    <Form.Input id='user' fluid icon='user' iconPosition='left' placeholder='E-mail address' onChange={this.userChange} />
                    <Form.Input
                      id='password' 
                      fluid
                      icon='lock'
                      iconPosition='left'
                      placeholder='Password'
                      type='password'
                      onChange={this.passwordChange}
                    />       
                    <Button color='teal' fluid size='large' onClick={this.submit}>
                      Login
                    </Button>
                  </Segment>
                </Form>
                <Message>
                  demo1 123456
                </Message>
              </Grid.Column>
            </Grid>
          </div>
    )
    }
}

export default LoginForm