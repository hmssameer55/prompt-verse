'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Form from '@components/Form'

export default function CreatePrompt () {
  const router = useRouter()
  const { data: session } = useSession()

  const [submitting, setIsSubmitting] = useState(false)
  const [post, setPost] = useState({ prompt: '', tag: '' })

  const [isTagsValid, setIsTagsValid] = useState(false)

  useEffect(() => {
    const tags = post.tag.split(',')
    const valid = tags.every(tag => tag.trim().startsWith('#'))
    setIsTagsValid(valid)
  }, [post.tag])

  const createPrompt = async e => {
    e.preventDefault()

    if (!isTagsValid) {
      alert('Please format your tags correctly')
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/prompt/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...post, author: session.user.id })
      })

      if (res.ok) {
        router.push('/')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}
