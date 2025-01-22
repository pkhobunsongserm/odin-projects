import { useState } from "react";
import "./App.css";
import ButtonFactory from "./Button.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Education() {
  const [formData, setFormData] = useState([
    {
      school: "",
      degree: "",
      eduStarted: new Date(),
      eduCompleted: new Date(),
    },
  ]);

  const handleChange = (index, event) => {
    let newFormData = [...formData];
    const { name, value } = event.target;
    newFormData[index][name] = value;
    setFormData(newFormData);
  };

  const handleChangeStarted = (index, date) => {
    let newFormData = [...formData];
    newFormData[index]["eduStarted"] = date;
    setFormData(newFormData);
  };
  const handleChangeCompleted = (index, date) => {
    let newFormData = [...formData];
    newFormData[index]["eduCompleted"] = date;
    setFormData(newFormData);
  };

  const handleSave = (event) => {
    event.preventDefault();
    alert(JSON.stringify(formData));
  };

  const addFormFields = (event) => {
    event.preventDefault();
    setFormData((prevFormData) => [
      ...prevFormData,
      {
        school: "",
        degree: "",
        eduStarted: new Date(),
        eduCompleted: new Date(),
      },
    ]);
  };

  const removeFormFields = (index) => {
    let newFormData = [...formData];
    newFormData.splice(index, 1);
    setFormData(newFormData);
  };

  return (
    <div className="inputForm">
      <h2>Enter your Education information:</h2>
      <form id="educationFormContainer">
        {formData.map((element, index) => (
          <div className="form-fields" key={index}>
            <label htmlFor="school">School Name:</label>
            <input
              type="text"
              id="school"
              name="school"
              value={element.school || ""}
              onChange={(event) => handleChange(index, event)}
            />

            <label htmlFor="degree">Degree Name: </label>
            <input
              type="text"
              id="degree"
              name="degree"
              value={element.degree || ""}
              onChange={(event) => handleChange(index, event)}
            />

            <label htmlFor="eduStarted">Date Started: </label>
            <DatePicker
              showIcon
              id="eduStarted"
              selected={element.eduStarted}
              onChange={(date) => handleChangeStarted(index, date)}
            />

            <label htmlFor="eduCompleted">Date Completed: </label>
            <DatePicker
              showIcon
              id="eduCompleted"
              selected={element.eduCompleted}
              onChange={(date) => handleChangeCompleted(index, date)}
            />

            {index ? (
              <ButtonFactory
                text="Remove Field"
                className="button-removeField"
                clickEvent={() => removeFormFields(index)}
              />
            ) : null}
          </div>
        ))}
        <div className="button-section">
          <ButtonFactory
            text="Add Field"
            className="button-addField"
            clickEvent={(event) => addFormFields(event)}
          />
          <ButtonFactory
            text="Save"
            className="button-save"
            clickEvent={(event) => handleSave(event)}
          />
        </div>
      </form>
    </div>
  );
}

export default Education;
