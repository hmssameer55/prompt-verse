'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Form from '@components/Form'

export default function UpdatePrompt () {
    const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  })

  const [isTagsValid, setIsTagsValid] = useState(false)

  const [submitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/prompt/${id}`)
      const data = await response.json()
      setPost({
        prompt: data.prompt,
        tag: data.tag
      })
    }
    if (id) fetchPost()
  }, [id])

  useEffect(() => {
    const tags = post.tag.split(',')
    const valid = tags.every(tag => tag.trim().startsWith('#'))
    setIsTagsValid(valid)
  }, [post.tag])

  const updatePrompt = async e => {
    e.preventDefault()

    if (!isTagsValid) {
      alert('Please format your tags correctly')
      return
    }

    if(!id) return

    setIsSubmitting(true)
    try {
      const res = await fetch(`/api/prompt/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
      })

      if (res.ok) {
        router.push('/profile')
      }
    } catch (error) {
      console.error(error)
      alert('Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form
      type={'update'}
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}
