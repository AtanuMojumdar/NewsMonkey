
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


export default class App extends Component {
  apikey= process.env.REACT_APP_NEWS_API;
  constructor(){
    super()
    // console.log("App.js")
    this.state={
      mode: 'light',
      progress: 0
    }
    // console.log(this.state.mode)
  }

  toggleMode=()=>{
    if(this.state.mode === 'light'){
      this.setState({
        mode: 'dark'
      })
      document.body.style.backgroundColor = '#18122B';
    }
    else{
      this.setState({
        mode: 'light'
      })
      document.body.style.backgroundColor = 'white';
    }
    // console.log(this)
  }
  pageSize = 6;

  setProgress=(progress)=>{
    this.setState({
      progress: progress
    })
  }

  render() {
    return (
      <div>
        <Router>
        <Navbar toggleMode={this.toggleMode} mode={this.state.mode}/>
        <LoadingBar
        height= {3}
        color='#f11946'
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
      />
        <Routes>
        <Route exact path="/" element={<News setProgress= {this.setProgress} apikey={this.apikey} key="general" mode={this.state.mode} pageSize={this.pageSize} country= 'in' category='general'/>}>  </Route>
        <Route exact path="/business" element={<News setProgress= {this.setProgress} apikey={this.apikey} key="business" mode={this.state.mode} pageSize={this.pageSize} country= 'in' category='business'/>}>  </Route>
        <Route exact path="/entertainment" element={<News setProgress= {this.setProgress} apikey={this.apikey} key="entertainment" mode={this.state.mode} pageSize={this.pageSize} country= 'in' category='entertainment'/>}>  </Route>
        <Route exact path="/health" element={<News setProgress= {this.setProgress} apikey={this.apikey} key="health" mode={this.state.mode} pageSize={this.pageSize} country= 'in' category='health'/>}>  </Route>
        <Route exact path="/science" element={<News setProgress= {this.setProgress} apikey={this.apikey} key="science" mode={this.state.mode} pageSize={this.pageSize} country= 'in' category='science'/>}>  </Route>
        <Route exact path="/sports" element={<News setProgress= {this.setProgress} apikey={this.apikey} key="sports" mode={this.state.mode} pageSize={this.pageSize} country= 'in' category='sports'/>}>  </Route>
        <Route exact path="/technology" element={<News setProgress= {this.setProgress} apikey={this.apikey} key="technology" mode={this.state.mode} pageSize={this.pageSize} country= 'in' category='technology'/>}>  </Route>
        
        </Routes>
        </Router>
      </div>
    )
  }
}
