import { connectToDatabase } from '@utils/database'
import Prompt from '@models/prompt'

export const GET = async (req, { params }) => {
  const { id } = params

  try {
    await connectToDatabase()
    const prompt = await Prompt.findById(id).populate('author').exec()

    if (!prompt) {
      return new Response(JSON.stringify({ message: 'Prompt not found' }), {
        status: 404
      })
    }

    return new Response(JSON.stringify(prompt), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify(error), { status: 500 })
  }
}

export const PATCH = async (req, { params }) => {
  const { id } = params
  const { prompt, tag } = await req.json()

  try {
    await connectToDatabase()
    const updatedPrompt = await Prompt.findByIdAndUpdate(
      id,
      { prompt, tag }
    ).exec()
    return new Response(JSON.stringify(updatedPrompt), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify(error), { status: 500 })
  }
}

export const DELETE = async (req, { params }) => {
  const { id } = params
  try {
    await connectToDatabase()
    await Prompt.findByIdAndDelete(id).exec()
    return new Response('Prompt deleted successfully', { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify(error), { status: 500 })
  }
}
