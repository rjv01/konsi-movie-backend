const asyncHandler = require("express-async-handler");
require("dotenv").config();
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({
  apiKey:process.env.GEMINI_API_KEY,
});

const activeAI = async (que) =>{
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash', 
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

module.exports = {
    sendQues,
};