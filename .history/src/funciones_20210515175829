module.exports = {
 
  function numerodeseguidores() {
   
    
  axios.get('https://api.twitch.tv/helix/users/follows?to_id=411027471&first=100')
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

function bits() {
  
  
    
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


function numerodesubs() {
  
  
    
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


function sleep(ms) {

  return new Promise(resolve => setTimeout(resolve, ms));
},

function cambialetra(str) {
  
   
  let resultado = str.replace(/[aeiou]/g, 'a')
  return resultado;
  },

 
function Tirada() {

  const sides = 100;
  return Math.floor(Math.random() * sides) + 1;

},


function Tirada2() {

  const sides = 1000;
  return Math.floor(Math.random() * sides) + 1;

},


function Tirada3() {
  
  const sides = 10;
  return Math.floor(Math.random() * sides) + 1;

},


function Tirada4() {

  const sides = 121;
  return Math.floor(Math.random() * sides) + 1900;

},





  }