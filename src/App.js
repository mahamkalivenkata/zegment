import React, { Component } from 'react';  
import JsonEditor from './JsonEditor';  
import DynamicFormClass from './DynamicForm';  
import ErrorBoundary from './ErrorBoundary';  
import './App.css'; // Import Tailwind CSS if using a separate CSS file  

class App extends Component {  
  constructor(props) {  
    super(props);  
    this.state = {  
      jsonSchema: '',  
      errorMessage: '',  
    };  
  }  

  handleJsonChange = (json) => {  
    try {  
      const parsedJson = JSON.parse(json);  
      this.setState({ jsonSchema: parsedJson, errorMessage: '' });  
    } catch (error) {  
      this.setState({ errorMessage: 'Invalid JSON format' });  
    }  
  };  

  render() {  
    return (  
      <div className="flex flex-col md:flex-row h-screen m-8">  
        <div className="w-full md:w-1/2 p-4">  
          <h2 className="text-xl font-bold">JSON Editor</h2>  
          <JsonEditor onChange={this.handleJsonChange} />  
          {this.state.errorMessage && (  
            <div className="text-red-500">{this.state.errorMessage}</div>  
          )}  
        </div>  
        <div className="w-full md:w-1/2 p-4">  
          <h2 className="text-xl font-bold">Form Preview</h2>  
          <ErrorBoundary>  
            <DynamicFormClass schema={this.state.jsonSchema} />  
          </ErrorBoundary>  
        </div>  
      </div>  
    );  
  }  
}  

export default App;