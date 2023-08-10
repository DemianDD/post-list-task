import React from "react";
import { useContext } from "react";
import { NavMenu } from "../components/navmenu/NavMenu"
import { Post } from "../components/postCard/Post"
import { PostContext } from "../contexts/data_context";

export const Home = () => {
    const { posts } = useContext(PostContext);

    const postsPerPage = 10;
    const totalPages = Math.ceil(posts.length / postsPerPage);

    const [currentPage, setCurrentPage] = React.useState(1);
    
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const postsToShow = posts.slice(startIndex, endIndex);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    React.useEffect(() => {
        setCurrentPage(1);
    }, [posts]);

    return(
        <div className="container-page">
            <div><NavMenu/></div>

            <div><Post posts={postsToShow}/></div>

            <footer>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous Page</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next Page</button>
            </footer>
        </div>
    )
}