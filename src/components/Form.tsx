import { useEffect, useState } from "react";
import * as dayjs from "dayjs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import image icon form fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TextArea } from "./TextArea";
import { ImageInput } from "./ImageInput";
import { DateInput } from "./DateInput";
import { ImagePreview } from "./ImagePreview";
import { useUserQuery } from "../hooks/useUserQuery";
import { usePostQuery } from "../hooks/usePostQuery";
import { Post } from "../pages/Posts";
import LoadingSpinner from "./LoadingSpinner";
const StyledContainer = styled.div`
  width: 100%;
  /* height: 100%; */
  flex: 4 1 0;
  /* mobile media query */
  @media (max-width: 768px) {
    flex: 1 1 0;
    width: 90vw;
    margin: 0 auto;
  }
`;
// a dark card with gradient background, in glassmorphism style
const StyledCard = styled.div`
  width: 50vw;
  /* height: 100%;
  padding: 2rem; */
  background: var(--gradient);
  border-radius: 1rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  /* width: 100%; */
  /* max-width: 400px; */
  margin: 0 auto;
  gap: 1rem;
`;
const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 90%;
  &:last-of-type {
    padding-bottom: 1rem;
  }
`;
const StyledLabel = styled.label`
  font-size: 1.5rem;
  flex: 1 1 0;
`;
const StyledImageIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;
const StyledTitle = styled.h1`
  padding-left: 1rem;
`;
// type for setState function

const Form = ({
  postId,
  setPostId,
}: {
  postId: string | undefined;
  setPostId:
    | React.Dispatch<React.SetStateAction<string | undefined>>
    | undefined;
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, addUserQuery } = useUserQuery();
  const { postQuery, posts } = usePostQuery();
  // state for text input
  const [text, setText] = useState("");
  //state for image
  const [image, setImage] = useState("");
  // type of converted image is string or
  const [convertedImage, setConvertedImage] = useState<string | undefined>(
    undefined
  );
  //state for date-time input, type for date-time
  const [date, setDate] = useState("");
  // state for success message
  const [success, setSuccess] = useState(false);
  const [showImage, setShowImage] = useState(false);
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
    console.log(e.target.value);
    // setDate(dayjs(e.target.value).format("YYYY-MM-DD HH:mm"));
    setDate(e.target.value);
  };
  const body: Post = {
    content: text,
    image: convertedImage,
    date: date,
    id: addUserQuery.data?.id,
    isPosted: false,
  };
  const mutation = useMutation(
    async (postId: string | undefined) => {
      if (postId) {
        console.log("in if(postId");
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/posts/${postId}`,
          body
        );
      } else {
        console.log("in else");
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/posts`, body);
      }
    },

    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
        setSuccess(true);
        // set timer for 3 seconds then navigate to view posts
        setTimeout(() => {
          setSuccess(false);
          setPostId && setPostId(undefined);
          navigate("/posts");
        }, 3000);
      },
      onError(error, variables, context) {
        console.log(error);
        setError(true);
      },
    }
  );
  // type for event is React.FormEvent<HTMLFormElement>
  const handleOnSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    postId: string | undefined
  ) => {
    e.preventDefault();
    console.log(text, image, date);
    mutation.mutate(postId);
  };
  // handle reset button
  const handleReset = () => {
    setText("");
    setImage("");
    setDate("");
  };

  useEffect(() => {
    if (postId) {
      console.log(postQuery.data);
      const post = postQuery.data.posts.find(
        (post: Post) => post._id === postId
      );
      if (post) {
        setText(post.content);
        setImage(post.image);
        setDate(post.date);
      }
    }
  }, [postId, postQuery.data]);
  return (
    <StyledContainer>
      <StyledCard>
        {!success ? (
          <>
            <StyledTitle>
              {postId ? "Edit your post" : "Write your post..."}
            </StyledTitle>
            <StyledForm onSubmit={(e) => handleOnSubmit(e, postId)}>
              <StyledRow>
                <StyledLabel htmlFor="text">Text</StyledLabel>
                <TextArea
                  id="text"
                  name="text"
                  value={text}
                  onChange={handleTextChange}
                />
              </StyledRow>
              <StyledRow>
                <StyledImageIcon
                  icon={faImage as IconProp}
                  size="2x"
                  onClick={() => setShowImage(!showImage)}
                />
              </StyledRow>
              {showImage && (
                <StyledRow>
                  <StyledLabel htmlFor="image">Image</StyledLabel>
                  <ImageInput
                    id="imageInput"
                    name="image"
                    onChange={handleImageChange}
                    isUploaded={!!image}
                  />
                </StyledRow>
              )}
              {!!image && (
                <StyledRow>
                  <ImagePreview image={image} />
                </StyledRow>
              )}
              <StyledRow>
                <StyledLabel htmlFor="date">Date</StyledLabel>
                <DateInput
                  id="date"
                  name="date"
                  value={date}
                  onChange={handleDateChange}
                />
              </StyledRow>
              {/* submit and cancel buttons */}
              <StyledRow>
                <Button type="submit" disabled={text === "" || date === ""}>
                  {postId ? "Edit" : "Submit"}
                </Button>
                <Button type="reset" onClick={handleReset} disabled={false}>
                  Cancel
                </Button>
              </StyledRow>
            </StyledForm>
          </>
        ) : mutation.isLoading ? (
          <LoadingSpinner width="8" height="8" />
        ) : (
          <h1>Success</h1>
        )}
      </StyledCard>
    </StyledContainer>
  );
};

export default Form;
