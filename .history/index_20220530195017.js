//--------- ULTROSK --------

require("dotenv").config();
const axios = require('axios');
const tmi = require("tmi.js");
const fs = require('fs-extra');
const moment = require('moment');
const { PubSubClient } = require('twitch-pubsub-client');
const { Client } = require("tmi.js");



const options = {
  options: {
    debug: true,
  },
  connection: {
    reconnect: true,
    secure: true
  },
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN,
  },
  channels: ["zambraverso", "versogame", "potajontas", "rosk_007", "man_darinas"]
};



axios.defaults.headers.common['Client-ID'] =process.env.CLIENT_ID2;
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.ACCESS_TOKEN}`;



function numerodeseguidores() {
  
  axios.get('https://api.twitch.tv/helix/users/follows?to_id=411027471')
  .then(resp => {
    
        var se= resp.data.total
        client.say('zambraverso',`Ya somos ${se} Zambranoides BloodTrail`);
        console.log(resp.data)
    }
  )
  .catch(err => {
    console.log(err);
  })

}

function numerodeseguidoresgames() {
  
  axios.get('https://api.twitch.tv/helix/users/follows?to_id=762914283')
  .then(resp => {
    
        var se= resp.data.total
        client.say('versogame',`Ya somos ${se} Zambranoides en el VersoGame!!! BloodTrail`);
        console.log(resp.data)
    }
  )
  .catch(err => {
    console.log(err);
  })

}
function clips() {
  
  client.say(process.env.CHANNEL_NAME,`ULTIMOS 10 CLIPS DEL CANAL`);
  axios.get(`https://api.twitch.tv/kraken/clips/zambraverso&first=10`)
  .then(resp => {
    for (var j = 0; j < 10; j++) {
      var thisName = resp.data[j].url;
     


      console.log(thisName);
      client.say(process.env.CHANNEL_NAME,` ${thisName}`)


}})}
function clips2() {
  
  axios.post('https://api.twitch.tv/helix/clips?broadcaster_id=411027471')
  .then(resp => {
    
        
        console.log(resp.data);
        client.say(process.env.CHANNEL_NAME, resp.data.data.url);
    }
  )
  .catch(err => {
    console.log(err);
  })

}

function espectadores() {
  
    
  axios.get('http://tmi.twitch.tv/group/user/zambraverso/chatters')
  .then(resp => {
    
        var se= resp.data.chatter_count;
        client.say('zambraverso',`Ahora mismo hay ${se} Espectadores BloodTrail`);
        console.log(resp)
    }
  )
  .catch(err => {
    console.log(err);
  })

}
function espectadoresgames() {
  
    
  axios.get('http://tmi.twitch.tv/group/user/versogame/chatters')
  .then(resp => {
    
        var se= resp.data.chatter_count;
        client.say('versogame',`Ahora mismo hay ${se} Espectadores BloodTrail`);
        console.log(resp)
    }
  )
  .catch(err => {
    console.log(err);
  })

}
function listadeseguidores() {
  
  client.say(process.env.CHANNEL_NAME,`ULTIMOS 10 SEGUIDORES DEL CANAL`);
  axios.get(`https://api.twitch.tv/helix/users/follows?to_id=411027471&first=10`)
  .then(resp => {
    for (var j = 0; j < 10; j++) {
      var thisName = resp.data.data[j].from_name;
     


      console.log(thisName);
      client.say(process.env.CHANNEL_NAME,` ${thisName}`)

     
  }
              }
)
.catch(err => {
console.log(err);
})
}

function listadeseguidoresgames() {
  
  client.say(process.env.CHANNEL_NAME,`ULTIMOS 10 SEGUIDORES DEL CANAL`);
  axios.get(`https://api.twitch.tv/helix/users/follows?to_id=411027471&first=10`)
  .then(resp => {
    for (var j = 0; j < 10; j++) {
      var thisName = resp.data.data[j].from_name;
     


      console.log(thisName);
      client.say(process.env.CHANNEL_NAME,` ${thisName}`)

     
  }
              }
)
.catch(err => {
console.log(err);
})
}

function listadesubs() {
  
  client.say(process.env.CHANNEL_NAME,`SUBS DEL CANAL`);
  axios.get(`https://api.twitch.tv/helix/subscriptions?broadcaster_id=411027471`)
  .then(resp => {
    
     


      console.log(resp);
      client.say(process.env.CHANNEL_NAME,` ${resp}`)

     
  
              }
)
.catch(err => {
console.log(err);
})
}

 
function Tirada5(numero) {

  const sides = numero;//= 100;
  return Math.floor(Math.random() * sides) + 1;

}

function Tirada() {
  
  const sides = 100;
  return Math.floor(Math.random() * sides) + 1;

}

function Tirada2() {

  const sides = 1000;
  return Math.floor(Math.random() * sides) + 1;

}


function Tirada3() {
  
  const sides = 10;
  return Math.floor(Math.random() * sides) + 1;

}


function Tirada4() {

  const sides = 121;
  return Math.floor(Math.random() * sides) + 1900;

}
//EVENTOS

const client = new tmi.client(options);


client.connect().catch(console.error) 

client.on('subscription', function(channel, username, method, message, userstate) {
 
  fs.appendFile('subs.txt', `${username} `, (err) => {
    if (err) throw err;
    console.log(`${username} a??adido al archivo de subs`);
     client.say(process.env.CHANNEL_NAME, `Gracias por esa sub ${username}!`)
});

});

client.on("resub", function (channel, username, months, message, userstate, methods) {
  
  fs.appendFile('subs.txt', `${username} `, (err) => {
    if (err) throw err;
    console.log(`${username} a??adido al archivo de subs`);
    client.say(process.env.CHANNEL_NAME, `Gracias por esa sub ${username}!`)
});

});

client.on("hosted", (channel, username, viewers, autohost) => {
  
  fs.appendFile('hosteos.txt', `${username} `, (err) => {
    if (err) throw err;
    console.log(`${username} a??adido al archivo de hosteos`);
    client.say(process.env.CHANNEL_NAME, `Gracias por esa host ${username}!`)
});

});

/*client.on("hosting", (channel2, target, viewers) => {
  client.say(process.env.CHANNEL_NAME, `hosteando ${channel2}`)
});
*/
client.on('raided', (channel2, username, viewers, userstate) => { 
  fs.appendFile('raids.txt', `${username} `, (err) => {
    if (err) throw err;
    console.log(`${username} a??adido al archivo de raids`);
    client.say(process.env.CHANNEL_NAME, `Gracias por esa raid ${username} con ${viewers}`)
});

});



client.on('followed', (channel, username) => { 
  fs.appendFile('follows.txt', `${username} `, (err) => {
    if (err) throw err;
    console.log(`${username} a??adido al archivo de follows`);
    client.say(process.env.CHANNEL_NAME, `Gracias por ese follow ${username}!`)
});

});

client.on("cheer", (channel, userstate, message) => {
  fs.appendFile('bits.txt', `${userstate} `, (err) => {
    if (err) throw err;
    console.log(`${userstate} a??adido al archivo de bits`);
    client.say(process.env.CHANNEL_NAME, `Gracias por esos bits!`)
});
});

client.on("emoteonly", (channel, enabled) => {
  client.say(channel, `Cambiando Modo Solo Emotes`)
});


client.on("followersonly", (channel, enabled, length) => {
  client.say(channel, `Cambiando Modo Solo Seguidores`)
});
client.on("slowmode", (channel, enabled, length) => {
 
  client.say(channel, `Cambiando Modo Slow`)

});

client.on("subscribers", (channel, enabled) => {
  client.say(channel, `Cambiando Modo Solo Subscriptores `)
});



client.on("join", (channel, username, self) => {
  console.log(username,`se ha conectado al canal`)
});
client.on("leave", (channel, username, self) => {
  console.log(username, `se fue del canal`)
});

client.on("mod", (channel, username) => {
  client.say(channel, `Nuevo mod a??adido al canal ${username}`)
});






client.on("subgift", (channel, username, streakMonths, recipient, methods, userstate) => {
  
  let senderCount = ~~userstate["msg-param-sender-count"];
  client.say(channel, `Saludos Humanos, ${username} le ha regalado una subscripcion a ${recipient}`)
});
  


client.on("submysterygift", (channel, username, numbOfSubs, methods, userstate) => {

  let senderCount = ~~userstate["msg-param-sender-count"];
  client.say(channel, `Saludos Humanos, ${username} esta regalando ${numbOfSubs} subscripciones!`)
});

client.on("timeout", (channel, username, reason, duration, userstate) => {
  console.log(username, `ha sido expulsado del canal`)
});


client.on('gift', (giftObj) => {
  console.log(giftObj.toString());
});

client.on('purchase', (purchaseObj) => {
  console.log(purchaseObj.toString());
});
client.on('redemption', (cardObj )=> {
  console.log(cardObj.toString());
});






client.on("chat", (channel, user, message, self) => {
  
  if (self) return;    
  const commandName = message.trim(); 

  console.log(channel);
  console.log(user);
  console.log(message)


  if ( commandName == "hola") {
   
      if (user["user-type"] =="mod") { client.say (channel, `Detectado Moderador, Saludos humano: ${user.username}`)}
      else if (user.username =="zambraverso") { client.say (channel, `Detectado Streamer, Saludos Creador: ${user.username}`)}
      else {client.say(channel, `Saludos humano: ${user.username}`)}
  } 



else if (message =="!clip") {

  clips();



}
else if (message =="!clip2") {

  clips2();



}

else if (commandName === "!anxo"){

  client.say(channel,"???? CORTO DE ANXO: https://www.youtube.com/watch?v=wFX7X1YgMMg")

}


else if (commandName === "!correo"){

  client.say(channel,"???? Correo del canal: 	info@zambraverso.es")

}
 


else if (commandName === "!entrevistas"){

  client.say(channel,"Puedes ver todas las entrevistas de Zambraverso Deluxe en : https://youtube.com/playlist?list=PLWIDo9f0vTVu38iBoO8qZcA2JH7Rui4L2")

}



else if (commandName === "!cancioncanal"){

  client.say(channel,"la cancion del canal!!! https://www.youtube.com/watch?v=fR5Y1Ov461k&t=52s ")

}

else if (commandName === "!donacion") {
  
  client.say(channel, `Si quieres apoyar al canal con una donacion, puedes hacerlo desde aqui https://streamelements.com/zambraversoa/tip `)
}
else if (commandName === "!mo??acos") {
  
  client.say(channel, `Pagina de los mo??acos!!!!! https://server.streamavatars.com/viewer.html?channel_id=411027471&platform=twitch `)

}

else if (commandName === "!canicas") {
  
  client.say(channel, `univer93Canica univer93Canica univer93Canica univer93Canica univer93Canica univer93Canica univer93Canica univer93Canica univer93Canica univer93Canica univer93Canica univer93Canica univer93Canica univer93Canica univer93Canica`)

}

else if (commandName === "!obscure") {
  
  client.say(channel, `Puedes ver los capitulos emitidos de Obscure en ???? YOUTUBE:https://www.youtube.com/playlist?list=PLWIDo9f0vTVsOE8TmH-kmzY0LuVmNwDMg  `)

}

//info canal

if (commandName == "!seguidores" || commandName == "!Seguidores") {
    
  let canal = channel.slice(1);
  console.log(canal);
  let output = "";
  switch (canal) {
    case "zambraverso":
      numerodeseguidores();   
    output = ``;
      break;

    case "versogame":
    numerodeseguidoresgames(); 
    output = ``;
      break;


  }
  if (output) client.say(channel, output);
}

if (commandName == "!espectadores" || commandName == "!Espectadores") {
    
  let canal = channel.slice(1);
  console.log(canal);
  let output = "";
  switch (canal) {
    case "zambraverso":
      espectadores();   
    output = ``;
      break;

    case "versogame":
    espectadoresgames();
    output = ``;
      break;


  }
  if (output) client.say(channel, output);
}

else if (commandName === "!listaseg") 
{
  listadeseguidores();

}
//comandos comunes
else if (commandName === "!redes"){

  client.say(channel,"???? DISCORD:https://discord.gg/WNRxVjy7a8 ???? TWITTER: https://twitter.com/zambraverso ????YOUTUBE: https://www.youtube.com/channel/UCfF1geTl95QYlNTI2Fskx-Q ???? INSTAGRAM: https://www.instagram.com/zambraverso/ ???? CORREO: info@zambraverso.es")

}

else if (commandName === "!discord"){

  client.say(channel,"???? DISCORD:https://discord.gg/8JKNyh6xUE")

}

else if (commandName === "!aplausos") {
  
  client.say(channel, `FBCatch FBCatch FBCatch FBCatch FBCatch FBCatch FBCatch FBCatch FBCatch FBCatch FBCatch FBCatch FBCatch FBCatch FBCatch `)
}

else if (commandName === "!fueguitos") {
  
  client.say(channel, `GlitchLit GlitchLit GlitchLit GlitchLit GlitchLit GlitchLit GlitchLit GlitchLit GlitchLit GlitchLit GlitchLit GlitchLit GlitchLit GlitchLit `)
}

else if (commandName === "!zambra") {
  
  client.say(channel, `GlitchLit univer93Zambrana  GlitchLit univer93Zambrana GlitchLit univer93Zambrana GlitchLit univer93Zambrana  GlitchLit univer93Zambrana GlitchLit univer93Zambrana   GlitchLit univer93Zambrana GlitchLit univer93Zambrana  GlitchLit univer93Zambrana GlitchLit univer93Zambrana   GlitchLit univer93Zambrana GlitchLit univer93Zambrana GlitchLit univer93Zambrana GlitchLit `)
}
else if (commandName === "!temazo") {
  
  client.say(channel, `SingsNote SingsMic SingsMic SingsNote SingsNote SingsNote SingsMic SingsNote SingsNote SingsMic SingsNote SingsNote SingsMic SingsMic `)

}
else if (commandName === "!expansivo"){

  client.say(channel,"???? Por cada nuevo SEGUIDOR = 5 minutos ???????? Por cada nueva SUSCRIPCI??N = 15 Minutos ???????? Por cada 100 BITS = 5 minutos minutos ????")

}
else if (commandName === "!olmoose") {
  
  client.say(channel, " No olvides seguir a Olmoose en sus redes ????SPOTIFY https://open.spotify.com/artist/3pplWqjHniI4wrhjvBTLXa ????WEB https://www.olmoose.com/  ????TWITCH https://www.twitch.tv/olmoose ")

}

else if (commandName === "!amazon") {
  
  client.say(channel, `??Tienes Amazon Prime?, si es as?? puedes suscribirte a este canal y apoyarlo de forma gratuita. S??lo tienes que entrar en el siguiente enlace ???????? https://gaming.amazon.com/ o si ya tienes la cuenta vinculada, dale al bot??n SUSCRIBIRSE`)

}

else if (commandName === "!musgo") {
  
  client.say(channel, `No olvides seguir a Mar en sus redes  ???? TWITTER: https://twitter.com/musgomusic  ???? INSTAGRAM: https://www.instagram.com/musgomusic NO OLVIDEIS SEGUIRLA!!! `)

}


else if (commandName === "!david") {
  
  client.say(channel, `No olvides seguir a David en sus redes  ???? TWITTER: https://twitter.com/davidsainz ????YOUTUBE: https://youtube.com/c/Sainzdeces ???? INSTAGRAM: https://www.instagram.com/davidsainz13 NO OLVIDEIS SEGUIRLO!!! otros enlaces de interes ???? wikipedia https://es.wikipedia.org/wiki/David_Sainz ???? IMDB https://www.imdb.com/name/nm4544325/ ???? WEB DIFFFERENT https://www.diffferent.es `)

}


else if (commandName === "!adrian") {
  
  client.say(channel, "No olvides seguir a Adrian en sus redes  ???? TWITTER: https://twitter.com/adrianpinored ????DISCORD: https://discord.com/invite/rTcTbHH6EA ???? INSTAGRAM: https://www.instagram.com/adrivision/ NO OLVIDEIS SEGUIRLO!!!")
  
}


else if (commandName === "!victor") {
  
  client.say(channel, " No olvides seguira Victor en sus redes ????INSTAGRAM https://www.instagram.com/victorhubara ????YOUTUBE https://www.youtube.com/user/hubara17 y su compa??ia de teatro ????INSTAGRAM https://www.instagram.com/abubukaka ????WEB https://www.abubukaka.es/ ")

}


else if (commandName === "!fe") {
  
  client.say(channel, `??chale un me gusta a los vecinos de Zambrana, la FeRecords ????YOUTUBE https://www.youtube.com/channel/UC1iA4-8P4FdveTOIS8KmxKg INSTAGRAM https://www.instagram.com/laferecords.es/ `)

}
else if (commandName === "!kike") {
  
  client.say(channel, `No olvides seguir a Kike en sus redes ????INSTAGRAM https://www.instagram.com/kikeperezrijo ????TWITCH https://www.twitch.tv/kikeperezrijo `)

}
else if (commandName === "!lista") {
  
  client.say(channel, `LISTADO DE LAS CANCIONES: 
  1- Bella Ciao
  2- Voy al gimnasio mas que tu
  3- Stevia
  4- La oruga profesionaria
  5- Millon dolas chorizo
  6- No te creo
  7- Cuando compres jamon
  8- No me cambies por u vivrador
  9- Vamos juntos al Zara
  10- Sin mascarilla
  11- Ay papa
  12- Se ha meado fuera
  13- Hey, soy streamer
  14- invisible
  15- Si huele a pene
  16- No me van a detener
  17- Hazme la colada
  18- Imagina ( traitor??s song)
  19- En el ba??o de mi casa
  20- Al punto de sal
  21- Sotana Suelta
  22- Robarte Bien
  23- He pasado el omicron
  24- Frio Amor
  25- El omicron
  26- Mi comunidad
  27- Muy pesados los de vodafone
  28- Caca en el ohio
  29- Malamente
  30- No puedo cagar
  31- Pelitos y machotes
  32- No mas lentejas
  34- La berrea
  35- La cancion de Carmen
  36- Streaming de rico
  37- Como yo strimeo
  38- ya he cagado
  `)

}



else if (commandName === "!fromguer") {
  
  client.say(channel, ` no olvides seguir a Fran en sus redes ????TWITCH https://www.twitch.tv/fromguer ????DISCORD https://discord.gg/aHfFDYx ????INSTAGRAM https://www.instagram.com/fromguer/ ????YOUTUBE https://www.youtube.com/fromguer ???? TWUITTER https://twitter.com/fromguer ????WEB https://fromguer.com/ `)

}

else if (commandName === "!carlosfotografo") {
  
  client.say(channel, `no olvides seguir a Carlos en sus redes ????TWITCH https://www.twitch.tv/carloscastrofotografo ????INSTAGRAM https://www.instagram.com/carloscastrofotografo ????YOUTUBE https://www.youtube.com/channel/UCNouQsCZsHYdWpJa62wfKTw ???? FACEBOOK https://www.facebook.com/carloscastrofotografo ????WEB https://www.carloscastrofotografo.com/ `)

}

else if (commandName === "!mankos") {
  
  client.say(channel, ` Dale un buen follow al Manko-Team en su instagram https://www.instagram.com/manko_team/ ????DISCORD https://discord.gg/pp4TQTxm No te pierdas los directos del equipo en twitch Jocantaro25 https://www.twitch.tv/jocantaro25 Bouk_15 https://www.twitch.tv/bouk_15 Folken_13 https://www.twitch.tv/folken_13 `)

}


else if (commandName === "!yoalucino") {
  
  client.say(channel, `no olvides seguir a Yoalucino en sus redes ????TWITCH https://www.twitch.tv/yoalucino ????DISCORD https://discord.gg/6ZcAVr6Zx7 ????INSTAGRAM https://www.instagram.com/yoalucinoconfeisbuk ????FACEBOOK https://www.facebook.com/yoalucinoconfeisbuk4/ ???? TWUITTER https://twitter.com/yacfeisbuk ????WEB https://www.alucinoconfeisbuk.com/  `)

}

else if (commandName === "!rey") {
  
  client.say(channel, `no olvides seguir al Rey Insomne en sus redes ????TWITCH https://www.twitch.tv/reyinsomne ????DISCORD https://discord.gg/ZgkDMfj ????INSTAGRAM https://www.instagram.com/reyinsomne ????SPOTIFY https://open.spotify.com/album/0Rjq1L9lKVHwk26B2kc0yT ???? TWUITTER https://www.twitter.com/reyinsomne ????YOUTUBE https://www.youtube.com/channel/UCV0ozssyJA5MEHsr2bKwduA   `)

}

else if (commandName === "!weed") {
  
  client.say(channel, `No olvides seguir a streamingweed en sus redes ????TWITCH https://www.twitch.tv/streamingweed ???? DISCORD: https://discord.gg/EYQwvjxx ???? INSTAGRAM: https://instagram.com/streamingweed NO OLVIDEIS SEGUIRLO!!! `)

}


else if (commandName === "!terror") {
  
  client.say(channel, `No olvides darle un vistazo al canal de noches de terror ????TWITCH https://www.twitch.tv/nochesdeterror ????DISCORD https://discord.gg/M2MzcdfD ????INSTAGRAM https://www.instagram.com/nochesdeterrorclubfans/ ????TWITTER https://twitter.com/ndt_oficial `)

}

else if (commandName === "!dedos") {
  
  client.say(channel, `No olvides darle un vistazo al canal de Dedos frios twitch ????TWITCH https://www.twitch.tv/dedosfriostwitch ????DISCORD https://discord.com/invite/NYbCHPW43e ????YOUTUBE https://www.youtube.com/channel/UCUjRyps3OIy_ETcQ-2wirbA ????TWITTER https://twitter.com/dedos_frios `)

}

else if (commandName === "!bata") {
  
  client.say(channel, `No olvides seguir a untipoenbata en sus redes ????TWITCH https://www.twitch.tv/untipoenbata ???? DISCORD: https://discord.gg/PxUHjcn87R ???? INSTAGRAM: https://instagram.com/untipoenbata ????YOUTUBE https://www.youtube.com/channel/UCM7HD705PJuSyjZUFp9Cd4Q  NO OLVIDEIS SEGUIRLO!!! `)

}
else if (commandName === "!rincon") {
  
  client.say(channel, `No olvides seguir al rincon de Daniel en sus redes ????TWITCH https://www.twitch.tv/rincondedaniel ???? DISCORD: https://discord.com/invite/eeKudAXUtX ???? INSTAGRAM: https://www.instagram.com/daniel_pose/ ????TWITTER https://twitter.com/RCD_Daniel  NO OLVIDEIS SEGUIRLO!!! `)

}
else if (commandName === "!kiri") {
  
  client.say(channel, `No olvides seguir a Kirillajons en sus redes ????TWITCH https://www.twitch.tv/kirillajons/ ???? https://discord.com/invite/TNHaMuCxmU ???? INSTAGRAM: https://instagram.com/kirillajons ???? https://www.instagram.com/carol_y_tu/ NO OLVIDEIS SEGUIRLA!!! `)

}
else if (commandName === "!ceciliaorson") {
  
  client.say(channel, `No olvides seguir a Cecilia Orson en sus redes ????TWITCH https://www.twitch.tv/ceciliaorson  ???? INSTAGRAM: https://www.instagram.com/ceciliaorsonok  NO OLVIDEIS SEGUIRLA!!! `)

}
else if (commandName === "!ayllon") {
  
  client.say(channel, `No olvides seguir a AyllonMusic ???? YOUTUBE: https://www.youtube.com/user/Musicoenterapia ???? SPOTIFY: https://open.spotify.com/artist/3X6Ziq4TUUnwp0tfnLzHEM   NO OLVIDEIS SEGUIRLO!!! `)

}
else if (commandName === "!sera") {
  
  client.say(channel, ` video de la cancion sera de ayllonmusic https://www.youtube.com/watch?v=JFuHJCc2IAE`)

}
else if (commandName === "!anasa??iz") {
  
  client.say(channel, `No olvides seguir a Ana Sa??iz en sus redes ???? WEB https://www.anasa??iz.com  ???? INSTAGRAM: https://www.instagram.com/anasanniz/  NO OLVIDEIS SEGUIRLA!!! `)

}

else if (commandName === "!ghostzone") {
  
  client.say(channel, `Pod??is apoyar a Ghost Zone aqu??, denle su buen like https://www.youtube.com/channel/UCYGS9pxYygi5EvacIeFTbHA`)

}

else if (commandName === "!juanesb") {
  
  client.say(channel, `No olvides seguir a Juan Escalante en sus redes ???? INSTAGRAM https://www.instagram.com/juanesbe0 ???? TWITTER: https://twitter.com/juanesbe `)

}
else if (commandName === "!marshall") {
  
  client.say(channel, `No olvides seguir a Miguel A??ngel en sus redes ???? INSTAGRAM https://www.instagram.com/marshallflashmusic/ ???? TWITTER https://twitter.com/Marshall_Flash ???? YOUTUBE https://www.youtube.com/channel/UCdhPLVRL3Ujmy62r_Ezm0CQ `)

}

else if (commandName === "!uebazos") {
  
  client.say(channel, `No le perdais la pista a LOS PARANORMALES, dales un buen follow en YouTube https://www.youtube.com/channel/UC4GCUC3W4_wZWpdRuahvjTQ`)

}
else if (commandName === "!mornings") {
  
  client.say(channel, `No le perdais la pista a LOS PARANORMALES, dales un buen follow en YouTube  https://www.youtube.com/channel/UC4GCUC3W4_wZWpdRuahvjTQ`)

}
else if (commandName === "!test3") {
  
  client.say(channel, `No le perdais la pista a LOS PARANORMALES, dales un buen follow en YouTube https://www.youtube.com/channel/UC4GCUC3W4_wZWpdRuahvjTQ`)

}
else if (commandName === "!caca"){

  client.say(channel,"univer93Kaka univer93Kaka univer93Kaka univer93Kaka univer93Kaka univer93Kaka univer93Kaka univer93Kaka univer93Kaka univer93Kaka")

}
else if (commandName === "!Leo") {
  
  client.say(channel, `No olvides seguir a Leo Susana  en sus redes ????  FACEBOOK https://www.facebook.com/leosusana   ???? INSTAGRAM https://www.instagram.com/leo_susana/ ???? YOUTUBE https://www.youtube.com/LeoSusana  ???? TWITTER https://twitter.com/leosusana ???? SPOTIFY https://open.spotify.com/artist/5dMQC3AxuR45o3jlLbVkuB  NO OLVIDEIS SEGUIRLO!!! `)

}
else if (message.startsWith("!zambri") && (user.username == "rosk_007" || user.username == "potajontas" || user.username == "mandarinas" || user.username == "zambraverso" || user.username == "versogame"  )) 
{
 
    
  client.host ('rosk_007','zambraverso')
  .then((data) => {
    
  }).catch((err) => {console.log(`${err}`)
      //
  });
  client.host ('ultrosk_','zambraverso')
  .then((data) => {
    
  }).catch((err) => {console.log(`${err}`)
      //
  });
  client.host ('versogame','zambraverso')
  .then((data) => {
    
  }).catch((err) => {console.log(`${err}`)
      //
  });
  client.host ('potajontas','zambraverso')
  .then((data) => {
    
  }).catch((err) => {console.log(`${err}`)
      //
  });
  client.host ('man_darinas','zambraverso')
  .then((data) => {
    
  }).catch((err) => {console.log(`${err}`)
      //
  });

}



else if (message.startsWith("!dfrios") && (user.username == "rosk_007" || user.username == "potajontas" || user.username == "mandarinas" || user.username == "zambraverso" || user.username == "versogame"  )) {
 
    
  client.host ('rosk_007','dedosfriostwitch')
  .then((data) => {
    
  }).catch((err) => {console.log(`${err}`)
      //
  });
  client.host ('ultrosk_','dedosfriostwitch')
  .then((data) => {
    
  }).catch((err) => {console.log(`${err}`)
      //
  });
  client.host ('versogame','dedosfriostwitch')
  .then((data) => {
    
  }).catch((err) => {console.log(`${err}`)
      //
  });
  client.host ('potajontas','dedosfriostwitch')
  .then((data) => {
    
  }).catch((err) => {console.log(`${err}`)
      //
  });
  client.host ('man_darinas','dedosfriostwitch')
  .then((data) => {
    
  }).catch((err) => {console.log(`${err}`)
      //
  });

}

else if (message.startsWith("!verso") && (user.username == "rosk_007" || user.username == "potajontas" || user.username == "mandarinas" || user.username == "zambraverso" || user.username == "versogame" )) {
 
    
  client.host ('rosk_007','versogame')
  .then((data) => {
    
  }).catch((err) => {console.log(`${err}`)
      //
  });
  client.host ('ultrosk_','versogame')
  .then((data) => {
    
  }).catch((err) => {console.log(`${err}`)
      //
  });
  client.host ('zambraverso','versogame')
  .then((data) => {
    
  }).catch((err) => {console.log(`${err}`)
      //
  });
  client.host ('potajontas','versogame')
  .then((data) => {
    
  }).catch((err) => {console.log(`${err}`)
      //
  });
  client.host ('man_darinas','versogame')
  .then((data) => {
    
  }).catch((err) => {console.log(`${err}`)
      //
  });

}

else if (message.startsWith("!alucina") && (user.username == "rosk_007" || user.username == "potajontas" || user.username == "mandarinas"  || user.username == "zambraverso" || user.username == "versogame")) {
 
    
  client.host ('rosk_007','yoalucino')
  .then((data) => {
    
  }).catch((err) => {console.log(`${err}`)
      //
  }); client.host ('ultrosk_','yoalucino')
  .then((data) => {
    
  }).catch((err) => {console.log(`${err}`)
      //
  });
  client.host ('zambraverso','yoalucino')
  .then((data) => {
    
  }).catch((err) => {console.log(`${err}`)
      //
  });client.host ('versogame','yoalucino')
  .then((data) => {
    
  }).catch((err) => {console.log(`${err}`)
      //
  });
  client.host ('potajontas','yoalucino')
  .then((data) => {
    
  }).catch((err) => {console.log(`${err}`)
      //
  });
  client.host ('man_darinas','yoalucino')
  .then((data) => {
    
  }).catch((err) => {console.log(`${err}`)
      //
  });

}

else if (message.startsWith("!alce") && (user.username == "rosk_007" || user.username == "potajontas" || user.username == "mandarinas" || user.username == "zambraverso" || user.username == "versogame" )) {
 
    
  client.host ('rosk_007','olmoose')
  .then((data) => {
    
  }).catch((err) => {console.log(`${err}`)
      //
  }); client.host ('ultrosk_','olmoosse')
  .then((data) => {
    
  }).catch((err) => {console.log(`${err}`)
      //
  });
  client.host ('zambraverso','olmoose')
  .then((data) => {
    
  }).catch((err) => {console.log(`${err}`)
      //
  });
  client.host ('versogame','olmoose')
  .then((data) => {
    
  }).catch((err) => {console.log(`${err}`)
      //
  });
  client.host ('potajontas','olmoose')
  .then((data) => {
    
  }).catch((err) => {console.log(`${err}`)
      //
  });
  client.host ('man_darinas','olmoose')
  .then((data) => {
    
  }).catch((err) => {console.log(`${err}`)
      //
  });

}

else if (message.startsWith("!pino") && (user.username == "rosk_007" || user.username == "potajontas" || user.username == "mandarinas" || user.username == "zambraverso" || user.username == "versogame" )) {
 
    
  client.host ('rosk_007','adrivision')
  .then((data) => {
    
  }).catch((err) => {console.log(`${err}`)
      //
  }); client.host ('ultrosk_','adrivision')
  .then((data) => {
    
  }).catch((err) => {console.log(`${err}`)
      //
  });
  client.host ('zambraverso','adrivision')
  .then((data) => {
    
  }).catch((err) => {console.log(`${err}`)
      //
  });
  client.host ('versogame','adrivision')
  .then((data) => {
    
  }).catch((err) => {console.log(`${err}`)
      //
  });
  client.host ('potajontas','adrivision')
  .then((data) => {
    
  }).catch((err) => {console.log(`${err}`)
      //
  });
  client.host ('man_darinas','adrivision')
  .then((data) => {
    
  }).catch((err) => {console.log(`${err}`)
      //
  });

}


else if (message.startsWith("!clear")) {
  
  
  client.clear(channel)
.then((data) => {
    // data returns [channel]
}).catch((err) => {console.log(`${err}`)
    //
});
}


else if (message.startsWith("!mods")) {
 
  client.mods(channel)
  .then((data) => {

    mods = String(data);
    let moderadores = mods.replace(/[,]/g, ', ')

      client.say(channel,`Saludos humano, los moderadores del canal son: ${moderadores}`)
      // data returns [moderators]
  }).catch((err) => {console.log(`${err}`)
      //
  });

}


else if (message.startsWith("!so")) {

  var retado = message.split(' ')[1];
  var reta = message.split('@')[1];
       if ( reta != null) {

 client.say(channel, `Si quieres puedes pasarte por el canal de ${reta} y darle un buen follow en https://www.twitch.tv/${reta}`);


 }   else  {client.say (channel, `Si quieres puedes pasarte por el canal de ${retado} y darle un buen follow en https://www.twitch.tv/${retado}`)};

   
} 



else if (message.startsWith("!mslow")) {

  client.slow(channel, 300)
.then((data) => {
    // data returns [channel]
}).catch((err) => {console.log(`${err}`)
    //
});

}


else if (message.startsWith("!msubs")) {
 
  
  client.subscribers (channel)
  .then((data) => {
      // data returns [channel]
  }).catch((err) => { console.log(`${err}`)
      //
  });


}


else if (message.startsWith("!miconos")) {
 
  
  client.emoteonly(channel)
.then((data) => {
    // data returns [channel]
}).catch((err) => {console.log(`${err}`)
    //
});


}



else if (message.startsWith("!mseg")) {
 
  client.followersonly(channel, 60)
  .then((data) => {
      // data returns [channel, minutes]
  }).catch((err) => {console.log(`${err}`)
      //
  });

}



else if (message.startsWith("!join")) {
  var canal = message.split(' ')[1];


  client.join(canal)
.then((data) => {
  client.say(canal, `Saludos humanos`)
}).catch((err) => {console.log(`${err}`)
    //
});

}



else if (message.startsWith("!normal")) {

  client.slowoff(channel)
.then((data) => {
    // data returns [channel]
}).catch((err) => {console.log(`${err}`)
    //
}); 

client.subscribersoff(channel)
.then((data) => {
    // data returns [channel]
}).catch((err) => {console.log(`${err}`)
    //
});

client.emoteonlyoff(channel)
.then((data) => {
    // data returns [channel]
}).catch((err) => {console.log(`${err}`)
    //
});

client.followersonlyoff(channel)
.then((data) => {
    // data returns [channel]
}).catch((err) => {console.log(`${err}`)
    //
});

client.say(channel, `Saludos Humano, reestableciendo parametros del canal`)
}


else if (message.startsWith("!vips")) {

  client.vips(channel)
  .then((data) => {

    vips = String(data);
    let vip = vips.replace(/[,]/g, ', ')

      client.say(channel,`Saludos humano, los vips del canal son: ${vip}`)
     
  }).catch((err) => {console.log(`${err}`)
      //
  });

}


else if (message.startsWith("!ban")) {
 
  var personas = message.split(' ')[1];
  var persona  = message.split('@')[1];

  client.ban(channel, persona, "reason")
  .then((data) => {
      // data returns [channel, username, reason]
  }).catch((err) => {console.log(`${err}`)
      //
  });

}



else if (message.startsWith("!unban")) {
 
  var personas = message.split(' ')[1];
  var persona  = message.split('@')[1];

  client.unban(channel, persona,300, "Saludos humano bienvenido de nuevo al universo")
  .then((data) => {
      // data returns [channel, username, reason]
  }).catch((err) => {console.log(`${err}`)
      //
  });

}


else if (message.startsWith("!timeout")) {
 
  var personas = message.split(' ')[1];
  var persona  = message.split('@')[1];

  client.timeout(channel, user.username, 60, "reason")
.then((data) => {
    // data returns [channel, username, seconds, reason]
}).catch((err) => {console.log(`${err}`)
    //
});

}


else if (commandName === "!floripondio") {

  
   client.say(channel, `floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio `)

}


})