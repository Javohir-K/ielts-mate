import React from "react";
import PostCard from "./PostCard";

function SearchList({ filteredPosts }) {
  const posts = filteredPosts.map((title) => (
    <PostCard key={title.id} _id={title?.id} {...title.data} />
  ));
  return posts;
}

export default SearchList;
