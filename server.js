const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());

let SETTINGS = {
  phone: "2349077036454",
  bank: "SMARTCASH",
  accName: "Oyetunji Akinkunmi",
  accNum: "9077036454",
  pkgs: [["50 Billion",200],["150 Billion",500],["300 Billion",1000],["500 Billion",2000],["1 Trillion",3000]]
};

try {
  if (fs.existsSync('settings.json')) {
    SETTINGS = JSON.parse(fs.readFileSync('settings.json'));
  }
} catch(e){}

app.get('/api/settings', (req,res)=>{ res.json(SETTINGS); });

app.post('/api/settings', (req,res)=>{
  SETTINGS = req.body;
  try{ fs.writeFileSync('settings.json', JSON.stringify(SETTINGS)); }catch(e){}
  res.json({ok:true});
});

app.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, ()=> console.log('Running on '+PORT));
