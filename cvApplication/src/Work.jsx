import { useState } from 'react'
import './App.css'
import ButtonFactory from './Button.jsx'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Work() {
    const [formData, setFormData] = useState([{
        company: "",
        position: "",
        description: "",
        workStarted: new Date(),
        workCompleted: new Date()
      }]);

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        let newFormData = [...formData];
        newFormData[index][name] = value;
        setFormData(newFormData);
    };

    const handleChangeStarted = (index, date) => {
        let newFormData = [...formData];
        newFormData[index]["workStarted"] = date;
        setFormData(newFormData);
    }
    const handleChangeCompleted = (index, date) => {
        let newFormData = [...formData];
        newFormData[index]["workCompleted"] = date;
        setFormData(newFormData);
    }


    const handleSave = (event) => {
        event.preventDefault();
        alert(JSON.stringify(formData));
    }

    const addFormFields = (event) => {
        event.preventDefault();
        setFormData((prevFormData) => [...prevFormData, {company: "", position: "", description: ""}])
    }
    

    const removeFormFields = (index) => {
        let newFormData = [...formData];
        newFormData.splice(index,1);
        setFormData(newFormData)
    }

    return (
        <div className='inputForm'>
          <h2>Enter your Work Experience:</h2>
          <form id="educationFormContainer">
            {formData.map((element, index) => (
                <div className='form-fields' key={index}>
                    <label htmlFor="company">Company Name:</label>
                    <input type="text" id="company" name="company" value={element.company || ""} onChange={(event) => handleChange(index,event)}/>

                    <label htmlFor="position">Position Name: </label>
                    <input type="text" id="position" name="position" value={element.position || ""} onChange={(event) => handleChange(index,event)}/>

                    <label htmlFor="jobDescription">Job description: </label>
                    <input type="text" id="description" name="description" value={element.description || ""} onChange={(event) => handleChange(index,event)}/>

                    <label htmlFor="workStarted">Date Started: </label>
                    <DatePicker showIcon id="workStarted" selected={element.workStarted} onChange={(date) => handleChangeStarted(index,date)} />
                    
                    <label htmlFor="workCompleted">Date Completed: </label>
                    <DatePicker showIcon id="workCompleted" selected={element.workCompleted} onChange={(date) => handleChangeCompleted(index,date)} />
                    
                    {
                        index ? 
                        <ButtonFactory text="Remove Field" className="button-removeField" clickEvent={() => removeFormFields(index)} />
                        : null
                    }
                </div>
            ))}
            <div className='button-section'>
                <ButtonFactory text="Add Field" className="button-addField" clickEvent={(event) => addFormFields(event)} />
                <ButtonFactory text="Save" className="button-save" clickEvent={(event) => handleSave(event)} />
            </div>
          </form>
        </div>
      )
}

export default Work