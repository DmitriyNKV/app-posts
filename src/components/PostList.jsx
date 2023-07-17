import React from 'react';
import PostItem from "./PostItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const PostList = ({posts, tittle, remove, fetchPosts}) => {
    if (!posts.length && fetchPosts) {
        return (
            <h2 style={{textAlign: "center"}}>
                Посты не найдены</h2>)
    }
    return (
        <div>
            <h1 style={{textAlign: "center"}}>{tittle}</h1>
            <TransitionGroup>
                {posts.map((post, i) =>
                    <CSSTransition
                        key={post.id}
                        timeout={500}
                        classNames="post"
                    >
                        <PostItem number={i + 1} post={post} remove={remove}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default PostList;