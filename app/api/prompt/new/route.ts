import { connectToDatabase } from "@utils/database"
import Prompt from "@models/prompt"

export const POST = async (req) => {

    const { author, prompt, tag } = await req.json()

    try {
        await connectToDatabase()

        const newPrompt = new Prompt({
            author,
            prompt,
            tag,
        })

        await newPrompt.save()

        return new Response(JSON.stringify(newPrompt), {
            status: 200,
        })
    } catch (error) {
        return new Response(JSON.stringify(error), {
            status: 500,
        })
    } 
}