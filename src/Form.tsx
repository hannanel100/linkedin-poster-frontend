import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
const Form = () => {
  const queryClient = useQueryClient();

  // state for text input
  const [text, setText] = useState("");
  //state for image
  const [image, setImage] = useState("");
  const [convertedImage, setConvertedImage] = useState("");
  //state for date-time input, type for date-time
  const [date, setDate] = useState("");

  // define type for event is React.ChangeEvent<HTMLInputElement> or React.ChangeEvent<HTMLTextAreaElement>
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      const file = e.target.files[0];
      const convertedFile = await convertToBase64(file);
      setConvertedImage(convertedFile);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
    });
  };
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };
  const mutation = useMutation(
    async () => {
      axios.post("http://localhost:3000/api/posts", {
        content: text,
        image: convertedImage,
        date: date,
      });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );
  // type for event is React.FormEvent<HTMLFormElement>
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(text, image, date);
    mutation.mutate();
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
        <form onSubmit={handleOnSubmit} className="form">
          <div className="row">
            <label htmlFor="text">Text</label>
            <textarea
              id="text"
              name="text"
              value={text}
              onChange={handleTextChange}
              className="input"
            />
          </div>

          <div className="row">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="imageInput"
              name="image"
              className="imageInput input"
              onChange={handleImageChange}
            />
          </div>
          <div className="row">
            <img src={image} alt="" className="imagePreview" />
          </div>
          <div className="row">
            <label htmlFor="date">Date</label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={date}
              onChange={handleDateChange}
              className="input"
            />
          </div>
          {/* submit and cancel buttons */}
          <div className="row">
            <button type="submit">Submit</button>
            <button type="reset" onClick={handleReset}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
