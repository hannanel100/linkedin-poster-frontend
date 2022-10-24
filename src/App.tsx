import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  // state for text input
  const [text, setText] = useState("");
  //state for image
  const [image, setImage] = useState("");
  //state for date-time input, type for date-time
  const [date, setDate] = useState("");

  // define type for event is React.ChangeEvent<HTMLInputElement> or React.ChangeEvent<HTMLTextAreaElement>
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };
  // type for event is React.FormEvent<HTMLFormElement>
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(text, image, date);
  };
  // handle reset button
  const handleReset = () => {
    setText("");
    setImage("");
    setDate("");
  };
  return (
    <div className="App">
      <div className="container">
        <h1>Form</h1>
        <form onSubmit={handleOnSubmit}>
          <div>
            <label htmlFor="text">Text</label>
            <textarea
              id="text"
              name="text"
              value={text}
              onChange={handleTextChange}
            />
          </div>

          <div>
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
            />
            <img src={image} alt="" />
          </div>

          <div>
            <label htmlFor="date">Date</label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={date}
              onChange={handleDateChange}
            />
          </div>
          {/* submit and cancel buttons */}
          <div>
            <button type="submit">Submit</button>
            <button type="reset" onClick={handleReset}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;

// Path: src/App.css
// .App {
//   text-align: center;
// }

// .App-logo {
//   height: 40vmin;
//   pointer-events: none;
// }

// @media (prefers-reduced-motion: no-preference) {
//   .App-logo {
//     animation: App-logo-spin infinite 20s linear;
//   }
// }

// .App-header {
//   background-color: #282c34;
//   min-height: 100vh;
