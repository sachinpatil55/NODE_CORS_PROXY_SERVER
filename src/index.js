import React, {Component} from "react";
import ReactDOM from "react-dom";
import SearchApi from './SearchApi'
import './index.css';
 
class HelloMessage extends Component {
    render() {
        return <div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <SearchApi/>
            </div>
        </div>
    }
}

let App = document.getElementById("app");

ReactDOM.render(<HelloMessage name="Sachin" />, App);