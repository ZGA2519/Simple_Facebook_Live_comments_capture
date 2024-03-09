const axios = require("axios");
const app = require("express")();
const bodyParser = require("body-parser");
const fs = require("fs");
const code = "ok";
const fileLogPath = "comment.csv";
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Facebook access token
const videoId = process.env.FACEBOOK_VIDEO_ID;
const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;


// Function to fetch comments from Facebook Live video
const fetchComments = async () => {
  try {
    return await axios.get(
      `https://graph.facebook.com/${videoId}/comments?access_token=${accessToken}`
    ).then((response) => {
      return response.data.data;
    });
  } catch (error) {
    throw error;
  }
};

function dropDuplicate(oldComment,newComment){
  return new Promise((resolve,reject)=>{
      newComment.map((val,index)=>{
          if(oldComment.find(oldRows=>oldRows.id==val.id)==undefined){
              writeMemberFile(val);
          }
      });
      resolve(newComment)
  })
}

function writeMemberFile(memberData){
 try {
  console.log(memberData);
  if(String(memberData.message).substring(0,code.length).toLowerCase()==code.toLowerCase()){
      let row = memberData.from.id+","+memberData.from.name+","+memberData.message+","+memberData.created_time+"\n";
      fs.appendFileSync(fileLogPath,row,"utf8");
  }
 } catch (e) {
     console.log("write file error--->",e);
 }
}

function main(){
  let firstRound = true;
  let tempComment = [];
  setInterval(async ()=>{
      if(!firstRound){
          let newComment = await fetchComments();
          tempComment = await dropDuplicate(tempComment,newComment);
      }else{
          fs.writeFileSync(fileLogPath,"\ufeffThis ไอดีคอมเม้น,ชื่อโปรไฟล์,รหัส,เวลา\n","utf8");
          tempComment  = await fetchComments();
          tempComment.map((val,index)=>{
              writeMemberFile(val);
          });
          firstRound = false;
      }
  },10000);
}

app.get("/", async (req, res) => {
  try {
    main();
  } catch (error) {
    console.error("Error fetching comments:", error.response.data.error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});
module.exports = app;