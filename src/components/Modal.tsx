// a modal component, showing a form to edit a post

import Form from "./Form";
import styled from "styled-components";
import { useEffect } from "react";

const Modal = ({
  postId,
  setPostId,
  setOpenModal,
}: {
  postId: string | undefined;
  setPostId: React.Dispatch<React.SetStateAction<string | undefined>> | undefined;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    !postId && setOpenModal(false);
  }, [postId, setOpenModal]);
  return (
    <div>
      <Form postId={postId} setPostId={setPostId} />
    </div>
  );
};

export default Modal;
