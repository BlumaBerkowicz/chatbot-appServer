const express=require("express")
const cors=require("cors")
require('dotenv').config(); // ודא שזה מופיע לפני כל קוד אחר שמשתמש במשתני סביבה

const {Configuration,OpenAI}=require("openai")

const openai=new OpenAI({
    apiKey:process.env.API_KEY});
const app=express()

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: "Message is required in the request body" });
        }
        
        const response = await callChatGPT(message);
        res.json({ response });
    } catch (error) {
        console.error("Error processing chat request:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(8080, () => {
    console.log("server is listening on port 8080")
});
    const chatHistory=[];

async function callChatGPT(content) {
    chatHistory.push({role:"user",content:content});
    const chatCompletion=await openai.chat.completions.create({
        model:"gpt-3.5-turbo",
        messages:chatHistory,
    });
    const resp=  chatCompletion.choices[0].message.content;
        chatHistory.push({role:"assistant",content:resp});
   return resp;
}
