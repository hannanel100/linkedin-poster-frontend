// a modal component, showing a form to edit a post

import Form from "./Form";
import styled from "styled-components";

const Modal = ({ postId }: { postId: string | undefined }) => {
  return (
    <div>
      <Form postId={postId}/>
    </div>
  );
};

export default Modal;
