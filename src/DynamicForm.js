import React, { Component } from 'react';  
import { useForm } from 'react-hook-form';  

class DynamicFormClass extends Component {  
  render() {  
    const { schema } = this.props;  

    if (!schema || !schema.fields) {  
      return <div>Please provide a valid JSON schema.</div>;  
    }  

    return (  
      <FormComponent schema={schema} />  
    );  
  }  
}  

const FormComponent = ({ schema }) => {  
  const { register, handleSubmit, formState: { errors } } = useForm();  
  const onSubmit = (data) => {  
    console.log(data);  
    alert('Form submitted successfully!');  
  };  

  return (  
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">  
      <h3 className="text-lg font-semibold">{schema.formTitle}</h3>  
      <p>{schema.formDescription}</p>  
      {schema.fields.map((field) => {  
        switch (field.type) {  
          case 'text':  
          case 'email':  
          case 'textarea':  
            return (  
              <div key={field.id}>  
                <label className="block">{field.label}</label>  
                <input  
                  type={field.type}  
                  placeholder={field.placeholder}  
                  {...register(field.id, { required: field.required })}  
                  className="w-full border border-gray-300 rounded p-2"  
                />  
                {errors[field.id] && <span className="text-red-500">{field.label} is required</span>}  
              </div>  
            );  
          case 'select':  
            return (  
              <div key={field.id}>  
                <label className="block">{field.label}</label>  
                <select {...register(field.id, { required: field.required })} className="w-full border border-gray-300 rounded p-2">  
                  {field.options.map(option => (  
                    <option key={option.value} value={option.value}>{option.label}</option>  
                  ))}  
                </select>  
                {errors[field.id] && <span className="text-red-500">{field.label} is required</span>}  
              </div>  
            );  
          case 'radio':  
            return (  
              <div key={field.id}>  
                <label className="block">{field.label}</label>  
                {field.options.map(option => (  
                  <div key={option.value}>  
                    <input type="radio" value={option.value} {...register(field.id, { required: field.required })} />  
                    <label>{option.label}</label>  
                  </div>  
                ))}  
                {errors[field.id] && <span className="text-red-500">{field.label} is required</span>}  
              </div>  
            );  
          default:  
            return null;  
        }  
      })}  
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>  
    </form>  
  );  
};  

export default DynamicFormClass;