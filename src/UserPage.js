import React from 'react'
import axios from 'axios';
import { Button, Form, Grid} from 'semantic-ui-react'
class UserPage extends React.Component {
  constructor(props) {  //构造函数
    super(props);
    this.state = {
        resId:'',
        bodyData:'',
        text:''
    }
    //绑定
    this.resIdChange = this.resIdChange.bind(this);
    this.bodyDataChange = this.bodyDataChange.bind(this);
    this.inQuery = this.inQuery.bind(this);
    this.saveData = this.saveData.bind(this);
    this.saveText = this.saveText.bind(this);
  }
  // resIdChange(e){
  //   this.setState({ resId : e.target.value })
  // }
  resIdChange = (e) => {
    this.setState({ resId : e.target.value })
  };
  bodyDataChange = (e) => {
    this.setState({ bodyData : e.target.value })
  };
  saveText = (e) => {
    this.setState({ text : e })
  };
  // bodyDataChange(e){
  //   this.setState({ bodyData : e.target.value })
  // }
  // saveText(e){
  //   this.setState({ text : e.target.value })
  // }
    inQuery(){//查询
      console.log(this.state.resId);
      axios({
        method:'get',
        url:'http://kingofdinner.realsun.me:8099/api/100/table/Retrieve?resid='+this.state.resId,
        headers: {
            'Content-Type': 'application/json',
            'userCode':'demo1',
            'accessToken':localStorage.getItem("token")
        },
        // data:{
        //   resid: resId,
        //   data:data;
        // }
    }).then((res)=>{
        if(!res){
            window.alert("查询失败")
        }
        else{
          console.log(res);
          this.saveText(JSON.stringify(res.data.data))
        }           
    })
    }
    /*
    resid：575807167879
    data："[{\"C3_575807181969\":\"AABA\",\"REC_ID\":575807398744,\"_state\":\"added\",\"_id\":1}]"
     */
    saveData(){
      console.log(this.state.resId);
      console.log(this.state.bodyData);
      axios({
        method:'post',
        url:'http://kingofdinner.realsun.me:8099/api/100/table/Save',
        headers: {
            'Content-Type': 'application/json',
            'userCode':'demo1',
            'accessToken':localStorage.getItem("token")
        },
        data:{
          resid: this.state.resId,
          data:this.state.bodyData
        }
    }).then((res)=>{
        if(!res){
            window.alert("查询失败")
        }
        else{
          console.log(res);
          this.saveText(JSON.stringify(res.data.data["0"]))
          console.log(this.state.text);
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
    <Form>
    <Form.Input id='resid' fluid  iconPosition='left' placeholder='必须输入resid' onChange={this.resIdChange} />
    <Button color='teal' onClick={this.inQuery}>发送</Button>
    <Form.Input id='bodydata' fluid  iconPosition='right'placeholder='输入转义压缩字符'  onChange={this.bodyDataChange} />
    <Button color='teal' onClick={this.saveData}>保存</Button></Form>
    <form class="ui form"><textarea rows="5" placeholder={this.state.text}onChange={this.saveData}>{this.state.text}</textarea></form>
    </Grid.Column>
            </Grid>
          </div>
    )}
}

export default UserPage