import React, { Component } from 'react';  

class JsonEditor extends Component {  
  constructor(props) {  
    super(props);  
    this.state = {  
      json: '',  
    };  
  }  

  handleChange = (event) => {  
    const json = event.target.value;  
    this.setState({ json });  
    this.props.onChange(json);  
  };  

  render() {  
    return (  
      <textarea  
        className="w-full h-64 p-2 border border-gray-300 rounded"  
        value={this.state.json}  
        onChange={this.handleChange}  
        placeholder="Enter JSON schema here..."  
      />  
    );  
  }  
}  

export default JsonEditor;