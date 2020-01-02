import React, { Component } from 'react';
import './NewPatientPage.css';
import axios from 'axios';


//var serverURL = "https://servlet-1.herokuapp.com/"
var serverURL = "http://localhost:8080/LectureServlet/newpatient"

class NewPatientPage extends Component {

    //The state of the NewPatientPage component consists of the patient information to be uploaded into the database
    //Bind handlepost and handleupload methods to NewPatientPage
    constructor(props){
      super(props);
      this.state = {
        patientinfo:[]
      };
      this.handlePost = this.handlePost.bind(this);
      this.handleUpload = this.handleUpload.bind(this);
    }
    
    //Make POST request to server
    async handlePost(){
        let config = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
            'Access-Control-Allow-Headers': 'X-PINGOTHER, Content-Type',
            'Content-Type': 'text/plain',
            'Access-Control-Max-Age': 86400
        }
        axios.post(serverURL, this.state.patientinfo, config).then(response => {
            console.log(response.data)
        }).catch(error => {
            console.log(error.response)
        })
    }

    //Set state to information entered then make POST request
    handleUpload(e){
        const patientinfo = {
            firstname: this.refs.firstname.value,
            middlename: this.refs.middlename.value,
            surname: this.refs.surname.value,
            sex: this.refs.sex.value,
            ethnicity: this.refs.ethnicity.value,
            dob: this.refs.dob.value
        }
        this.setState({patientinfo}, () => {
            this.handlePost();
        });
    }

    render() {
        return (
            <React.Fragment>
              <div
               style={{
                  marginLeft: 64,
                  padding: '15px 20px 0 20px'
              }}>
                <div>
                    <h1>New Patient</h1>
                </div>
                <div className = "Inline">
                    <h5>First Name</h5>
                    <input className = "Input" type="text" ref="firstname" placeholder = "John"/>
                </div>
                <div className = "Inline">
                    <h5>Middle Name</h5>
                    <input className = "Input" type="text" ref="middlename" placeholder = "Richard"/>
                </div>
                <div className = "Inline">
                    <h5>Surname</h5>
                    <input className = "Input" type="text" ref="surname" placeholder = "Smith"/>
                </div>
                <div className = "Inline">
                    <h5>Sex</h5>
                    <input className = "Input" type="text" ref="sex" placeholder = "M"/>
                </div>
                <div className = "Inline">
                    <h5>Ethnicity</h5>
                    <input className = "Input" type="text" ref="ethnicity" placeholder = "Caucasian"/>
                </div>
                <div className = "Inline">
                    <h5>Date of Birth</h5>
                    <input className = "Input" type="text" ref="dob" placeholder = "1/1/1990"/>
                </div>
                <div>
                    <button className = "btn btn-info m-2" onClick={this.handleUpload}>Add Patient</button>
                </div>
              </div>
            </React.Fragment>
        );
    }
}

export default NewPatientPage;
