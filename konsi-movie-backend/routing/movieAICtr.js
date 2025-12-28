const asyncHandler = require("express-async-handler");
require("dotenv").config();
const { GoogleGenAI } = require('@google/genai');

// const { OpenRouter } = require("@openrouter/sdk");
// import { OpenRouter } from '@openrouter/sdk';

// let openRouterAI; // shared instance

// const initOpenRouter = async () => {
//   if (!openRouterAI) {
//     const { OpenRouter } = await import("@openrouter/sdk");
//     openRouterAI = new OpenRouter({
//       apiKey: process.env.OPENROUTER_API,
//     });
//   }
//   return openRouterAI;
// };

// const activeAI = async (que) => {
//   try {
//     const client = await initOpenRouter();

//     const completion = await client.chat.send({
//       model: "openai/gpt-4o",
//       messages: [
//         {
//           role: "user",
//           content: que,
//         },
//       ],
//     });

//     return completion.choices[0].message.content;
//   } catch (error) {
//     // console.error("OpenRouter AI Error:", error);
//     return "AI API Error: " + error.message;
//   }
// };


const ai = new GoogleGenAI({
  apiKey:process.env.GEMINI_API_KEY,
});

const activeAI = async (que) =>{
    try {
        const response = await ai.models.generateContent({
            // model: 'gemini-2.5-flash',
            // model: 'gemini-2.0-flash',
            model: 'gemini-2.5-flash-lite', 
            contents: que,
        });
        return response.text;
        // console.log(response.text);
    } catch (error) {
        // console.error("An error occurred:", error);
        return "AI API Error "+error;
    }
}

const sendQues = asyncHandler(async(req,res)=>{
    // console.log("body: ",req.body);
    const { ques } = req.body;
    console.log("que: ",ques);
    if(!ques || !ques.trim()){
        return res.status(400).json({message:"Ques is required"});
    }

    const ans = await activeAI(ques);
    
    if(ans){
        return res.status(200).json({
            message:"AI is working",
            output:ans
        });
    }else{
        return res.status(500).json({
            message:"Internal server error"
        });
    }
});

const sendMoviesData = asyncHandler(async(req,res)=>{
    const { movieName,movieGenre } = req.body;
    console.log("movieName: ",movieName);
    console.log("movieGenre: ",movieGenre);

    //old
    // const ans = await activeAI(`
    //     Recommend Movies only top 3 based on this movie detail give me output on Title ${movieName}, genre${movieGenre} and little description !`);
    
    //new
    const ans = await activeAI(`Recommend Movies (only 3) on Title ${movieName}!Only give me Moives Name.`);
    console.log(ans);
    if(ans.substring(0,14) === "AI API Error: "){
        return res.status(500).json({
            message:"Free tier limit exceeded, please try again later!!",
        });
    }

    if(ans){
        return res.status(200).json({
            message:"Recommendation fetched",
            output:ans
        });
    }else{
        return res.status(500).json({
            message:"Internal server error",
        });
    }
    // if(movieName && movieGenre){
    //     return res.status(200).json({
    //         message:"AI is working",
    //         output:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vitae, ipsam fugit nesciunt ea quasi atque, minus perspiciatis hic eveniet quaerat? Architecto dolorum neque repudiandae iste amet inventore impedit sit maiores aliquid veritatis?"
    //     });
    // }else{
    //     return res.status(500).json({ message:"Interval server error" });
    // }
});

module.exports = {
    sendQues,
    sendMoviesData,

};