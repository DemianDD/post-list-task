import { ChangeEvent, useContext } from 'react';
import './NavMenu.css'
import { PostContext } from '../../contexts/data_context';
import React from 'react';
import {ReactComponent as SearchIcon} from '../../icons/search.svg'

export const NavMenu = () => {

    const { search, suggestions, resetSearch } = useContext(PostContext);
    const [query, setQuery] = React.useState("");

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        search(event.target.value);
        setQuery(event.target.value);
    };

    const displayNotification = () => {
        alert(`Search submitted: ${query}`);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setQuery(suggestion);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (query.trim() !== '') {
            displayNotification();
            resetSearch();
            setQuery('');
        }
    };

    return(
        <header>
            <div className="row-style nav-menu centered">
                <div>
                    <form onSubmit={handleSubmit}>
                        <input 
                        id="searchInput"
                        value={query}
                        placeholder="Search for post"
                        onChange={handleSearch}/>
                        <SearchIcon className='icon' onClick={handleSubmit}/>
                    </form>
                    
                    <div className="suggestions-container">
                        {suggestions.map(post => (
                            <span key={post.id} 
                            className='suggestions-item'
                            onClick={() => handleSuggestionClick(post.title)}>
                                {post.title}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    )
}