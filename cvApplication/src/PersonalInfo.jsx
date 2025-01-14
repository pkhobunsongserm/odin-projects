import { useState } from 'react'
import './App.css'
import ButtonFactory from './Button.jsx'

function PersonalInfo() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({...prevFormData, [name]: value}));
  };

  const handleSave = (event) => {
    event.preventDefault();
    alert(JSON.stringify(formData));
  }
  return (
    <div className='inputForm'>
      <h2>Enter your personal information:</h2>
      <form id="personalInfoFormContainer">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}/>

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}/>

        <label htmlFor="phoneNumber">Phone Number:</label>
        <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}/>

        <ButtonFactory text="Save" className="button-save" clickEvent={(event) => handleSave(event)}/>

      </form>
    </div>
  )
}

export default PersonalInfo