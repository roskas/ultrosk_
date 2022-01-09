module.exports = {
 
 numerodeseguidores:  function() {
   
  const axios = require('axios'); 
  axios.defaults.headers.common['Client-ID'] =process.env.CLIENT_ID2;
  axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.ACCESS_TOKEN}`;

  axios.get('https://api.twitch.tv/helix/users/follows?to_id=411027471&first=100')
  .then(resp => {
    
        var se= resp.data.total
   //     client.say("universozambrana",`Ya somos ${se} Zambranoides BloodTrail`);
        console.log(resp.data)
    }
  )
  .catch(err => {
    console.log(err);
  })

},

bits:function() {
  
  const axios = require('axios');
  axios.defaults.headers.common['Client-ID'] =process.env.CLIENT_ID2;
  axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.ACCESS_TOKEN}`;
   
  axios.get('https://api.twitch.tv/helix/bits/leaderboard')
  .then(resp => {
    
        var se= resp.data.total
        client.say("universozambrana",`Ya somos ${se} Zambranoides BloodTrail`);
        console.log(resp.data)
    }
  )
  .catch(err => {
    console.log(err);
  })

},


numerodesubs:function() {
  const axios = require('axios');
  axios.defaults.headers.common['Client-ID'] =process.env.CLIENT_ID2;
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.ACCESS_TOKEN}`;

    
  axios.get('https://api.twitch.tv/helix/subscriptions?broadcaster_id=411027471&first=100')
  .then(resp => {
    
        var se= resp.data.total
        client.say("universozambrana",`Ya somos ${se} Zambranoides BloodTrail`);
        console.log(resp.data)
    }
  )
  .catch(err => {
    console.log(err);
  })

},


sleep:function(ms) {

  return new Promise(resolve => setTimeout(resolve, ms));
},

cambialetra:function(str) {
  
   
  let resultado = str.replace(/[aeiou]/g, 'a')
  return resultado;
  },

 
Tirada:function() {

  const sides = 100;
  return Math.floor(Math.random() * sides) + 1;

},


Tirada2:function() {

  const sides = 1000;
  return Math.floor(Math.random() * sides) + 1;

},


Tirada3:function() {
  
  const sides = 10;
  return Math.floor(Math.random() * sides) + 1;

},


Tirada4:function() {

  const sides = 121;
  return Math.floor(Math.random() * sides) + 1900;

},






  }