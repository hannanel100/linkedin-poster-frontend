import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./Button";
import axios from "axios";
import styled from "styled-components";
import { TextArea } from "./TextArea";
import { ImageInput } from "./ImageInput";
import { DateInput } from "./DateInput";
import { ImagePreview } from "./ImagePreview";
const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-content: center;
  flex: 4 1 0;
`;
// a dark card with gradient background, in glassmorphism style
const StyledCard = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-content: center;
  padding: 2rem;
  background: linear-gradient(180deg, #02c7c8 0%, #bc3cc5 100%);
  border-radius: 1rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
`;
const Form = () => {
  const queryClient = useQueryClient();

  // state for text input
  const [text, setText] = useState("");
  //state for image
  const [image, setImage] = useState("");
  const [convertedImage, setConvertedImage] = useState("");
  //state for date-time input, type for date-time
  const [date, setDate] = useState("");
  // state for success message
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
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
      axios.post("http://localhost:5000/api/posts", {
        content: text,
        image: convertedImage,
        date: date,
      });
    },

    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
        setSuccess(true);
      },
      onError(error, variables, context) {
        console.log(error);
        setError(true);
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
    <StyledContainer>
      <StyledCard>
        {!success ? (
          <>
            <h1>Form</h1>
            <form onSubmit={handleOnSubmit} className="form">
              <div className="row">
                <label htmlFor="text">Text</label>
                <TextArea
                  id="text"
                  name="text"
                  value={text}
                  onChange={handleTextChange}
                />
              </div>

              <div className="row">
                <label htmlFor="image">Image</label>
                <ImageInput
                  id="imageInput"
                  name="image"
                  onChange={handleImageChange}
                  isUploaded={!!image}
                />
              </div>
              <div className="row">
                <ImagePreview image={image} />
              </div>
              <div className="row">
                <label htmlFor="date">Date</label>
                <DateInput
                  id="date"
                  name="date"
                  value={date}
                  onChange={handleDateChange}
                />
              </div>
              {/* submit and cancel buttons */}
              <div className="row">
                <Button
                  type="submit"
                  disabled={text === "" || image === "" || date === ""}
                >
                  Submit
                </Button>
                <Button type="reset" onClick={handleReset} disabled={false}>
                  Cancel
                </Button>
              </div>
            </form>
          </>
        ) : mutation.isLoading ? (
          <h1>Submitting...</h1>
        ) : (
          <h1>Success</h1>
        )}
      </StyledCard>
    </StyledContainer>
  );
};

export default Form;
