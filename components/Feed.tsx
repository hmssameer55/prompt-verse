'use client';

import { useState, useEffect } from 'react';
import PromptCard from '@components/PromptCard';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Post } from '@interface/types';

interface PromptCardListProps {
  data: Post[];
  handleTagClick: (tag: string) => void;
  handleProfileClick: (authorId: string) => void;
}

const PromptCardList = ({ data, handleTagClick, handleProfileClick }:PromptCardListProps) => {
  return (
    <div className="mt-12 prompt_layout">
      {data?.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleProfileClick={handleProfileClick}
        />
      ))}
    </div>
  );
};

export default function Feed() {

  const { data: session } = useSession();
  const router = useRouter();

  const [allPosts, setAllPosts] = useState<Post[]>([]);

  // Search states
  const [searchText, setSearchText] = useState<string>('');

  const [searchedResults, setSearchedResults] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/prompt');
        const posts = await response.json();
        setAllPosts(posts);
      } catch (error) {
        console.log(error);
        setAllPosts([]);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const findResults = () => {
      if (searchText.length > 0) {

        let searchTextInLowerCase:string = searchText.toLowerCase();

        const filteredPosts = allPosts?.filter((post) => {
          return (
            post.prompt.toLowerCase().includes(searchTextInLowerCase) ||
            post.tag.toLowerCase().includes(searchTextInLowerCase) ||
            post.author.name.toLowerCase().includes(searchTextInLowerCase)
          );
        });
        setSearchedResults(filteredPosts);
      } else {
        setSearchedResults([]);
      }
    };

    const clearTimer = setTimeout(findResults, 500);

    return () => clearTimeout(clearTimer);
  }, [searchText]);

  const handleSearchChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleTagClick = (tag: string) => {
    setSearchText(tag);
  };

  const handleProfileClick = (authorId: string) => {
    if (authorId === session?.user?.id) {
      router.push('/profile');
    } else {
      router.push(`/profile/${authorId}`);
    }
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
          handleProfileClick={handleProfileClick}
        />
      ) : (
        <PromptCardList
          data={allPosts}
          handleTagClick={handleTagClick}
          handleProfileClick={handleProfileClick}
        />
      )}
    </section>
  );
}
