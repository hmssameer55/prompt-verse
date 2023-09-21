"use client"

import React, {useState,useEffect} from 'react'
import Profile from '@components/Profile'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'

export default function MyProfile() {

    const { data: session } = useSession();

    const router = useRouter()

    const [posts,setPosts] = useState([])


    useEffect(() => {
        const fetchUserPosts = async () => {
            const response = await fetch(`/api/users/${session?.user?.id}/posts`)
            const data = await response.json()
            setPosts(data)
        }
       if(session?.user?.id) fetchUserPosts()
    }, [session?.user?.id])


    const handleEdit = (post) => { 
        router.push(`/update-prompt/?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const response = await fetch(`/api/prompt/${post._id}`,{
            method: 'DELETE'
        })
        if(response.ok) {
            setPosts(posts.filter(p => p._id !== post._id))
        }
     }


  return (
    <Profile
        name="My"
        desc="Welcome to your profile"
        data={posts || []}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}
