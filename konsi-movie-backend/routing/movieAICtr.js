const asyncHandler = require("express-async-handler");
require("dotenv").config();
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({
  apiKey:process.env.GEMINI_API_KEY,
});

const activeAI = async (que) =>{
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            // model: 'gemini-2.5-flash',
            // model: 'gemini-2.5-flash-lite', 
            contents: que,
        });
        return response.text;
        // console.log(response.text);
    } catch (error) {
        console.error("An error occurred:", error);
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

    // const ans = await activeAI(`
    //     Recommend Movies only top 3 based on this movie detail give me output on Title ${movieName}, genre${movieGenre} and little description !`);

    // if(ans){
    //     return res.status(200).json({
    //         message:"Recommendation fetched",
    //         output:ans
    //     });
    // }else{
    //     return res.status(500).json({
    //         message:"Internal server error"
    //     });
    // }
    if(movieName && movieName){
        return res.status(200).json({
            message:"AI is working",
            output:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vitae, ipsam fugit nesciunt ea quasi atque, minus perspiciatis hic eveniet quaerat? Architecto dolorum neque repudiandae iste amet inventore impedit sit maiores aliquid veritatis?"
        });
    }else{
        return res.status(500).json({ message:"Interval server error" });
    }
})

module.exports = {
    sendQues,
    sendMoviesData,

};