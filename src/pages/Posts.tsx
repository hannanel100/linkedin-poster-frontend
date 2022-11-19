import React, { useState } from "react";
import { useReactTable, createColumnHelper } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { useUserQuery } from "../hooks/useUserQuery";
import axios from "axios";
import dayjs from "dayjs";
import styled from "styled-components/macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faEdit } from "@fortawesome/free-solid-svg-icons";
import Modal from "../components/Modal";
import { usePostQuery } from "../hooks/usePostQuery";
import LoadingSpinner from "../components/LoadingSpinner";
export interface Posts {
  message: string;
  posts: Post[];
}

export interface Post {
  __v?: number;
  _id?: string;
  id: string;
  content: string;
  date: string | undefined;
  image: string | undefined;
  isPosted: boolean;
}

const StyledDiv = styled.div`
  width: 85%;
  height: 100%;
  display: grid;
  place-content: center;
  flex: 4 2 0;
  /* media query for mobile */
  @media (max-width: 768px) {
    width: 100%;
    flex: 1 1 0;
  }
`;
const StyledCard = styled.div`
  width: 50vw;
  height: 100%;
  padding: 2rem;
  background: var(--gradient);
  border-radius: 1rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: space-around;
  transition: all 0.5s ease-in-out;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
  }
  @media (max-width: 768px) {
    width: 100%;
    flex: 1 1 0;
  }
`;
const StyledUl = styled.ul`
  margin: 0;
  padding: 0;
`;
const StyledLi = styled.li`
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  gap: 1rem;
  margin: 1rem;
  padding: 1rem;
  /* border: 1px solid black; */
  border-radius: 1rem;
  /* color: black;
  background-color: #f5f5f5;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2); */
  /* transition: all 0.5s ease-in-out;
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
  } */
`;
const StyledImage = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 1rem;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  /* change color according to icon props */
  color: ${(props) => (props.icon === faEdit ? "white" : "red")};
  /* color: red; */
  font-size: 2rem;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  &:hover {
    transform: scale(1.2);
  }
`;
const Posts = () => {
  const { postQuery, posts } = usePostQuery();
  const localPosts: Post[] = postQuery?.data?.posts.sort((a: Post, b: Post) =>
    // sort posts by date using dayjs
    dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1
  );

  const [openModal, setOpenModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<string | undefined>(
    undefined
  );
  const deletePostHandler = async (_id: string | undefined) => {
    console.log(_id);
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${_id}`);
    postQuery.refetch();
  };
  const editPostHandler = async (_id: string | undefined) => {
    // open modal with form to edit post
    setSelectedPost(_id);
    setOpenModal(true);
  };
  return (
    <StyledDiv>
      {!openModal ? (
        <StyledUl>
          {postQuery.isLoading ? (
            <LoadingSpinner />
          ) : (
            localPosts.map(
              (post: Post) =>
                !post.isPosted && (
                  <StyledLi key={post._id}>
                    <StyledCard>
                      <p>{post.content}</p>
                      <p>{dayjs(post.date).format("DD/MM/YYYY HH:mm")}</p>
                      {post.image && <StyledImage src={post.image} />}
                      <StyledFontAwesomeIcon
                        icon={faEdit}
                        onClick={() => editPostHandler(post._id)}
                      />
                      <StyledFontAwesomeIcon
                        icon={faXmark}
                        onClick={() => deletePostHandler(post._id)}
                      />
                    </StyledCard>
                  </StyledLi>
                )
            )
          )}
        </StyledUl>
      ) : (
        <Modal
          postId={selectedPost}
          setPostId={setSelectedPost}
          setOpenModal={setOpenModal}
        />
      )}
    </StyledDiv>
  );
};

export default Posts;
