import React from "react";
import 'assets/css/SearchBar.css';

export default class SearchBar extends React.Component{

    render(){
        return (
        <input 
            type="text" 
            id="searchBar" 
            value={this.props.value}
            onChange={this.props.action}
            placeholder="Search for names.." 
            title="Type in a name"
        />
        );
    }
}
