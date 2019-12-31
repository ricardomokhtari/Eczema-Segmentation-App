import React, { Component } from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import './SideNav.css';
// import Tabs from 'react-bootstrap/Tabs'
// import Tab from 'react-bootstrap/Tab'
import Record from './Record'
import Records from './Records'
import axios from 'axios';

var serverURL = "http://localhost:8080/LectureServlet/viewpage"

class ViewPage extends Component {

    constructor(props) {
        super(props);
        this.state={
            expanded: false,
            key: 'headnneck',
            records:[]};
        this.handlePost = this.handlePost.bind(this);  
      }
    
    componentDidMount(){
        this.handlePost();
    }

    async handlePost(){
        this.setState({records:[]});
        axios.post(serverURL,this.state.key).then(response => {

            var lines = []
            var record = []
            var list = []

            if(Object.prototype.toString.call(response.data)=="[object String]"){
                lines = response.data.split("\n");
                for(var i=0;i<lines.length-1;i++){
                    record = JSON.parse(lines[i]);
                    list.push(record);
                } 
            } else if(Object.prototype.toString.call(response.data)=="[object Object]"){
                lines.push(JSON.stringify(response.data));
                record = JSON.parse(lines[0]);
                list.push(record);
            }

            for(var i=0;i<list.length;i++){
                const newRecord = {id: list[i].id, date: list[i].date, erythemascore: list[i].erythemascore, edemascore: list[i].edemascore, exclorationscore: list[i].exclorationscore, lichenificationscore: list[i].lichenificationscore, areascore:list[i].areascore, totalscore:list[i].totalscore, comments:list[i].comments};
                const records = [...this.state.records, newRecord];
                this.setState({records});
            }

            }).catch(error => {
                console.log(error.response)
            })
    }

    onToggle = (expanded) => {
        this.setState({ expanded: expanded });
    };

    render(){
        const {expanded} = this.state;
        return (
            <React.Fragment>
                <div
                    style={{
                        marginLeft: expanded ? 240 : 64,
                        padding: '15px 20px 0 20px'
                    }}>
                    <div>
                        <h1>
                            regions
                        </h1>
                    </div>

                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" onClick = {() => {this.setState({key:'headnneck'},()=>{this.handlePost()}); }} className="btn btn-primary">head/neck</button>
                        <button type="button" onClick = {() => {this.setState({key:'trunk'},()=>{this.handlePost()}); }} className="btn btn-primary">trunk</button>
                        <button type="button" onClick = {() => {this.setState({key:'lowerlimb'},()=>{this.handlePost()}); }} className="btn btn-primary">l. extremities</button>
                        <button type="button" onClick = {() => {this.setState({key:'upperlimb'},()=>{this.handlePost()}); }}className="btn btn-primary">u. extremities</button>
                    </div>

                    <Records records={this.state.records}/>
    
                    <SideNav onToggle = {this.onToggle}>
                        <SideNav.Toggle />
                        <SideNav.Nav defaultSelected="home">
                            <NavItem eventKey="home">
                                <NavIcon>
                                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    Records
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="charts">
                                <NavIcon>
                                    <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    Upload
                                </NavText>
                            </NavItem>
                        </SideNav.Nav>
                    </SideNav>
                </div>
            </React.Fragment>
        );
    }
}

export default ViewPage;
