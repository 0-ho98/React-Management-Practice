import React from "react";
import { post } from "axios"; //post 방식으로 데이터를 서버로 보낼 것이다.

class CustomerAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      userName: "",
      birthday: "",
      gender: "",
      job: "",
      fileName: "",
    };
  }
  //e는 이벤트를 받는 것
  handleFormSubmit = (e) => {
    e.preventDefault() //데이터가 서버로 전달 됨에 있어서 오류가 발생하지 않기 위해 불러옴
    this.addCustomer().then(response=>{
        console.log(response.data);
        this.props.stateRefresh();
    })
    this.setState({
      file: null,
      userName: "",
      birthday: "",
      gender: "",
      job: "",
      fileName: "",
    })
  }
  handleFileChange = (e) =>{
      //e.target은 이벤트가 발생한 인풋값 자체를 말함 
      //files[0]은 많은 파일들 중 하나를 넣겠다느 뜻
    this.setState({
        file: e.target.files[0],
        fileName: e.target.value
    });
  }

  handleValueChange = (e) =>{
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  addCustomer = () =>{
      const url = '/api/customers';
      const formData = new FormData();
      formData.append('image', this.state.file);
      formData.append('name', this.state.userName);
      formData.append('birthday', this.state.birthday);
      formData.append('gender', this.state.gender);
      formData.append('job', this.state.job);
      console.log(formData);
      const config = {
          headers:{
              'content-type': 'multipart/form-data'
              //웹 표준에 맞는 헤더를 추가 해준다. 전달 하고자 하는 데이터가 파일이 포함되어있는 경우 사용 / 파일이 포함되어있지 않으면 굳이 formData를 사용할 필요 없음
          }
      }
      return post(url, formData, config);
  }

  render(){
      return (
          <form onSubmit={this.handleFormSubmit}>
              <h1>고객 추가</h1>
              프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
              이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /><br/>
              생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
              성별: <input type="text" name="gender" value={this.state.gender}onChange={this.handleValueChange}/><br/>
              직업: <input type="text" name="job" value={this.state.job}onChange={this.handleValueChange}/><br/>
              <button type="submit">추가하기</button>
          </form>
      )
  }
}

export default CustomerAdd;
