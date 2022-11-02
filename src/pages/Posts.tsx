import React, { useEffect } from "react";
import { useReactTable, createColumnHelper } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
export interface Posts {
  message: string;
  posts: Post[];
}

export interface Post {
  __v: number;
  _id: string;
  content: string;
  date: string;
  image: string;
}
const fetchPosts = async () => {
  const res = await axios.get("http://localhost:5000/api/posts");
  return res.data;
};
const StyledDiv = styled.div`
  width: 85%;
  height: 100%;
  display: grid;
  place-content: center;
  flex: 4 2 0;
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
  border: 1px solid black;
  border-radius: 1rem;
  color: black;
  background-color: #f5f5f5;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  transition: all 0.5s ease-in-out;
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
  }
`;
const StyledImage = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 1rem;
`;
const StyledX = styled.span`
  color: red;
  font-size: 2rem;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  &:hover {
    transform: scale(1.2);
  }
`;
const Posts = () => {
  const query = useQuery(["posts"], fetchPosts);
  const deletePostHandler = async (id: string) => {
    console.log(id);
    await axios.delete(`http://localhost:5000/api/posts/${id}`);
    query.refetch();
  };
  return (
    <StyledDiv>
      {/* display posts as a list */}
      <ul>
        {query.data?.posts.map((post: Post) => (
          <StyledLi key={post._id}>
            <p>{post.content}</p>
            <p>{post.date}</p>
            <StyledImage src={post.image} alt="post" />
            <StyledX onClick={() => deletePostHandler(post._id)}>X</StyledX>
          </StyledLi>
        ))}
      </ul>
    </StyledDiv>
  );
};

export default Posts;
