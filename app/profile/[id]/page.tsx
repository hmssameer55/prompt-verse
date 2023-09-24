'use client';

import React, { useState, useEffect } from 'react';
import Profile from '@components/Profile';
import { Post } from '@interface/types';


export default function OthersProfile({ params } : { params: { id: string } }) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (params?.id) fetchUserPosts();
  }, [params?.id]);

  return (
    <Profile
      name={posts[0]?.author?.name + "'s" || ''}
      desc="Welcome to others profile"
      data={posts || []}
    />
  );
}
