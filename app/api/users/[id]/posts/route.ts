import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, {params}) => {
    try {
        await connectToDatabase();
        const { id } = params;

        const prompts = await Prompt.find({ author: id }).populate("author").exec();

        return new Response(JSON.stringify(prompts), {
            status: 200,
        })

    } catch (error) {
        return new Response(JSON.stringify(error), {
            status: 500,
        })
    }
}







