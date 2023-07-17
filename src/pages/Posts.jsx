import React, {useEffect, useState} from "react";
import PostList from "../components/PostList";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/modal/MyModal";
import PostForm from "../components/PostForm";
import MyButton from "../components/UI/button/MyButton";
import {usePosts} from "../hooks/usePosts";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/Loader";
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../components/utils/pages";
import Pagination from "../components/UI/pagination/Pagination";

function Posts() {


    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: "", search: ""});
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    const sortedAndSearchPost = usePosts(posts, filter.sort, filter.search);


    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data);
        const totalCount = (response.headers["x-total-count"]);
        setTotalPages(getPageCount(totalCount, limit));

    })

    useEffect(() => {
        fetchPosts()
    }, [page]);


    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    };
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    };

    const editPage = (page) => {
        setPage(page)
    }


    return (
        <div className="App">
            <MyButton style={{marginTop: "30px"}} onClick={() => setModal(true)}>Создать</MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
                <hr style={{margin: "15px 0"}}/>
            </MyModal>
            < PostFilter filter={filter}
                         setFilter={setFilter}/>

            {postError && <h1>Произошла ошибка ${postError}</h1>}

            {isPostsLoading
                ? <div style={{display: "flex", justifyContent: "center", marginTop: "40px"}}><Loader/></div>
                : <PostList posts={sortedAndSearchPost}
                            fetchPosts={fetchPosts}
                            tittle={"Посты"}
                            remove={removePost}/>}:
            <Pagination
                totalPages={totalPages}
                editPage={editPage}
                page={page}
            />


        </div>


    );
}

export default Posts;