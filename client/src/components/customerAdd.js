import React from "react";
import { post } from "axios"; //post 방식으로 데이터를 서버로 보낼 것이다.
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  hidden:{
    display: 'none'
  }
});

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
      open: false
    };
  }
  //e는 이벤트를 받는 것
  handleFormSubmit = (e) => {
    e.preventDefault() //데이터가 서버로 전달 됨에 있어서 오류가 발생하지 않기 위해 불러옴
    this.addCustomer().then(response=>{
        console.log(response.data);
        this.props.stateRefresh(); //보여주는 부분을 새로 고침
    })
    this.setState({
      file: null,
      userName: "",
      birthday: "",
      gender: "",
      job: "",
      fileName: "",
      open:false
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
  //바인딩 처리를 하기 위해서는 화살표 함수를 써야한다.
  handleClickOpen = () => {
      this.setState({
        open: true
      })
  }

  handleClose = () => {
    this.setState({
      file: null,
      userName: "",
      birthday: "",
      gender: "",
      job: "",
      fileName: "",
      open: false
    })
  }

  render(){
      const {classes} = this.props;
      return (
        <div>
          <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
            고객 추가하기
          </Button>
          <Dialog open={this.state.open} onClose={this.handleClose}>
            <DialogTitle>고객 추가</DialogTitle>
            <DialogContent>
              {/* accept속성은 접근 가능한 것을 이야기 하는 것 */}
              <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
              <label htmlFor="raised-button-file">
                <Button variant="contained" color="primary" component="span" name="file">
                  {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                </Button>
              </label>
              <br/>
              <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /><br/>
              <TextField label="생년월일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
              <TextField label="성별" type="text" name="gender" value={this.state.gender}onChange={this.handleValueChange}/><br/>
              <TextField label="직업" type="text" name="job" value={this.state.job}onChange={this.handleValueChange}/><br/>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
              <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
            </DialogActions>
          </Dialog>
        </div>
      )
  }
}

export default withStyles(styles)(CustomerAdd);
