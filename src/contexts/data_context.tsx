import React, { createContext, ReactNode } from 'react';
import { fetchAllData } from '../data/data';
import { IPost } from '../data/IPost';

interface PostProviderProps {
    children: ReactNode;
}

interface PostContextProps {
    posts: IPost[];
    suggestions: IPost[];
    setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
    data: IPost[];
    search: (query: string) => void;
    resetSearch: () => void;
}

export const PostContext = createContext<PostContextProps>({
    posts: [],
    suggestions: [],
    setPosts: () => {},
    data: [],
    search: () => {},
    resetSearch: () => {},
});

export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
    const [posts, setPosts] = React.useState<IPost[]>([]);
    const [searchQuery, setSearchQuery] = React.useState<IPost[]>([]);
    const [suggestions, setSuggestions] = React.useState<IPost[]>([]);

    const data = fetchAllData().sort((a, b) => {
        if (a.title && b.title) {
          return a.title.localeCompare(b.title);
        }
        return 0; 
    });

    React.useEffect(() => {
        setPosts(data);
        setSearchQuery(data);
    }, [data]);

    const search = (query: string) => {
        if (query.trim() !== '') {
            const filteredPosts = searchQuery.filter((post) => {
                return post.title?.toLowerCase().includes(query.toLowerCase());
            });

            setPosts(filteredPosts);
            setSuggestions(filteredPosts);
        } else {
            setSuggestions([]);
            setPosts(searchQuery);
        }
    };

    const resetSearch = () => {
        setSuggestions([]);
        setPosts(searchQuery);
    };

    return (
        <PostContext.Provider value={{ 
            posts,
            suggestions,
            setPosts,
            search,
            resetSearch,
            data,
        }}>
            {children}
        </PostContext.Provider>
    );
};