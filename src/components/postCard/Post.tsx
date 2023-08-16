import React from 'react';
import { IPost } from '../../data/IPost';
import './Post.css'

interface IProps {
  posts: IPost[];
}

export const Post = React.memo((props: IProps)=> {

  const viewPosts = props.posts.map((p, index) => {
    return(
      <div className='post-container centered column-style' key={index}>
        <div>
          <h3><b>{p.title}</b></h3>
        </div>
        <div>
          <i>{p.author}</i>
        </div>
        <div className="post-text">
          {p.text}
        </div>
        <div>
          <strong><sup>{p.date_of_public}</sup></strong>
        </div>
      </div>
    )
  })

  console.log("Post rendered")

  return(
    <div className="post-list">
      {viewPosts} 
    </div>
  )
});

