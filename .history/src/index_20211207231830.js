//--------- ULTROSK --------
//import * as StreamlootsRequest from "streamloots-events.js";
//requires
//const StreamlootsRequest = require('streamloots-events');
require("dotenv").config();
const axios = require('axios');
const tmi = require("tmi.js");
const fs = require('fs-extra');
const moment = require('moment');
const { PubSubClient } = require('twitch-pubsub-client');


//variables de config estan en .env

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
  channels: [process.env.CHANNEL_NAME],
};

//añadimos los token de la api de helix para cuando se hagan las llamadas a url

axios.defaults.headers.common['Client-ID'] =process.env.CLIENT_ID2;
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.ACCESS_TOKEN}`;

//funciones
/*
function hosteos(){


  fs.readFile('./hosteos.txt', (error,datos) => {
    if (error)
      console.log(error);
    else
      client.say(process.env.CHANNEL_NAME,datos.toString());
  });


}


function subs(){

  fs.readFile('./subs.txt', (error,datos) => {
    if (error)
      console.log(error);
    else
      client.say(process.env.CHANNEL_NAME,`Gracias por las subs de hoy a ${datos.toString()} !!!!`);
  });


}
*/

function numerodeseguidores() {
  
  axios.get('https://api.twitch.tv/helix/users/follows?to_id=411027471')
  .then(resp => {
    
        var se= resp.data.total
        client.say(process.env.CHANNEL_NAME,`Ya somos ${se} Zambranoides BloodTrail`);
        console.log(resp.data)
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
        client.say(process.env.CHANNEL_NAME,`Ahora mismo hay ${se} Espectadores BloodTrail`);
        console.log(resp)
    }
  )
  .catch(err => {
    console.log(err);
  })

}/*
function bits() {
  
  
  client.say(process.env.CHANNEL_NAME,`TOP 10 BITS LEADERBOARD`);  
  axios.get('https://api.twitch.tv/helix/bits/leaderboard')
  .then(resp  => {
    
        
  
        for (var j = 0; j < 10; j++) {
          var thisName = resp.data.data[j].user_name;
          var thisRank = resp.data.data[j].rank;
          var thisScore = resp.data.data[j].score;


          console.log(thisName);
          client.say(process.env.CHANNEL_NAME,`${thisRank} : ${thisName} --   ${thisScore} bits`)
      }
                  }
  )
  .catch(err => {
    console.log(err);
  })
}
*/

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
/*
function borraHosteos(){

  fs.stat('./hosteos.txt', function (err, stats) {
    console.log(stats);//here we got all information of file in stats variable
 
    if (err) {
        return console.error(err);
    }
 
    fs.unlink('./hosteos.txt',function(err){
         if(err) return console.log(err);
         console.log('file deleted successfully');
    });  
 });}

 function borraRaids(){

  fs.stat('./raids.txt', function (err, stats) {
    console.log(stats);//here we got all information of file in stats variable
 
    if (err) {
        return console.error(err);
    }
 
    fs.unlink('./raids.txt',function(err){
         if(err) return console.log(err);
         console.log('file deleted successfully');
    });  
 });}

 function borraSubs(){

  fs.stat('./subs.txt', function (err, stats) {
    console.log(stats);//here we got all information of file in stats variable
 
    if (err) {
        return console.error(err);
    }
 
    fs.unlink('./subs.txt',function(err){
         if(err) return console.log(err);
         console.log('file deleted successfully');
    });  
 });}


 function borraFollows(){

  fs.stat('./follows.txt', function (err, stats) {
    console.log(stats);//here we got all information of file in stats variable
 
    if (err) {
        return console.error(err);
    }
 
    fs.unlink('./subs.txt',function(err){
         if(err) return console.log(err);
         console.log('file deleted successfully');
    });  
 });}


*/


/*

 function fecha() {

 // asignar el valor de las unidades en milisegundos
  var msecPerMinute = 1000 * 60;
  var msecPerHour = msecPerMinute * 60;
  var msecPerDay = msecPerHour * 24;
  
  // asignar la fecha en milisegundos
  var date = new Date();
  var dateMsec = date.getTime();
  
  // asignar la fecha a la boda
  date.setMonth(8);
  date.setDate(11);
  date.setHours(11, 30, 0, 0);
  
  // Obtener la diferencia en milisegundos
  var interval = date.getTime() - dateMsec;
  
  // Calcular cuentos días contiene el intervalo. Substraer cuantos días
  //tiene el intervalo para determinar el sobrante
  var days = Math.floor(interval / msecPerDay );
  interval = interval - (days * msecPerDay );
  
  // Calcular las horas , minutos y segundos
  var hours = Math.floor(interval / msecPerHour );
  interval = interval - (hours * msecPerHour );
  
  var minutes = Math.floor(interval / msecPerMinute );
  interval = interval - (minutes * msecPerMinute );
  
  var seconds = Math.floor(interval / 1000 );
  
  client.say(process.env.CHANNEL_NAME,`!Que Sorpresa! Carloscoci y Xofi_val se casan, casualmente dentro de ${days} dias ${hours} horas ${minutes} minutos ${seconds} segundos y en el mismo ayuntamiento!!! `)
  
}
function sleep(ms) {

  return new Promise(resolve => setTimeout(resolve, ms));
}


function cambialetra(str) {
  
   
  let resultado = str.replace(/[aeiou]/g, 'a');
  return resultado;
  }
*/
 
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
/*client.on("connected",(address, port) =>{



    borraHosteos();
    borraRaids();
    borraSubs();
    client.clear(process.env.CHANNEL_NAME).then((data) => {
      // data returns [channel]
  }).catch((err) => {client.say (process.env.CHANNEL_NAME,`${err}`)
      //
  });

  //
    
    sleep(1000).then(() => {  client.action(process.env.CHANNEL_NAME, "SYSTEM OVERRIDE.....ROOT ACCESS GRANTED....BOT ONLINE!!!!")}); 
    sleep(1500).then(() => {  client.action(process.env.CHANNEL_NAME, "MODS Module..........OK")});
    sleep(3000).then(() => {  client.action(process.env.CHANNEL_NAME, "VIPS Module..........OK")});
    sleep(4500).then(() => {  client.action(process.env.CHANNEL_NAME, "GAMES Module..........OK")});
    sleep(6000).then(() => {  client.action(process.env.CHANNEL_NAME, "Saludos Humanos!! Comienza la era de Ultrosk!!!!")});
  });

*/
client.on('subscription', function(channel, username, method, message, userstate) {
 
  fs.appendFile('subs.txt', `${username} `, (err) => {
    if (err) throw err;
    console.log(`${username} añadido al archivo de subs`);
     client.say(process.env.CHANNEL_NAME, `Gracias por esa sub ${username}!`)
});

});

client.on("resub", function (channel, username, months, message, userstate, methods) {
  
  fs.appendFile('subs.txt', `${username} `, (err) => {
    if (err) throw err;
    console.log(`${username} añadido al archivo de subs`);
    client.say(process.env.CHANNEL_NAME, `Gracias por esa sub ${username}!`)
});

});

client.on("hosted", (channel, username, viewers, autohost) => {
  
  fs.appendFile('hosteos.txt', `${username} `, (err) => {
    if (err) throw err;
    console.log(`${username} añadido al archivo de hosteos`);
    client.say(process.env.CHANNEL_NAME, `Gracias por esa host ${username}!`)
});

});

client.on("hosting", (channel2, target, viewers) => {
  client.say(process.env.CHANNEL_NAME, `hosteando ${channel2}`)
});

client.on('raided', (channel2, username, viewers, userstate) => { 
  fs.appendFile('raids.txt', `${username} `, (err) => {
    if (err) throw err;
    console.log(`${username} añadido al archivo de raids`);
    client.say(process.env.CHANNEL_NAME, `Gracias por esa raid ${username} con ${viewers}`)
});

});



client.on('followed', (channel, username) => { 
  fs.appendFile('follows.txt', `${username} `, (err) => {
    if (err) throw err;
    console.log(`${username} añadido al archivo de follows`);
    client.say(process.env.CHANNEL_NAME, `Gracias por ese follow ${username}!`)
});

});

client.on("cheer", (channel, userstate, message) => {
  fs.appendFile('bits.txt', `${userstate} `, (err) => {
    if (err) throw err;
    console.log(`${userstate} añadido al archivo de bits`);
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
  client.say(channel, `Saludos Humanos, nuevo mod añadido al canal ${username}`)
});






client.on("subgift", (channel, username, streakMonths, recipient, methods, userstate) => {
  // Do your stuff.
  let senderCount = ~~userstate["msg-param-sender-count"];
  client.say(channel, `Saludos Humanos, ${username} le ha regalado una subscripcion a ${recipient}`)
});
  


client.on("submysterygift", (channel, username, numbOfSubs, methods, userstate) => {
  // Do your stuff.
  let senderCount = ~~userstate["msg-param-sender-count"];
  client.say(channel, `Saludos Humanos, ${username} esta regalando ${numbOfSubs} subscripciones!`)
});

/*
client.on("unhost", (channel2, viewers) => {
  client.say(process.env.CHANNEL_NAME, `Saludos Humanos, hosteo de ${channel2} terminado`)
});

client.on("unmod", (channel, username) => {
  client.say(channel, `Saludos Humanos, degrandando a ${username}`)
});*/

client.on("timeout", (channel, username, reason, duration, userstate) => {
  console.log(username, `ha sido expulsado del canal`)
});

//eventos prueba streamloots

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
  
  if (self) return;    //con esto hacemos que el bot no se escuche a si mismo

  const commandName = message.trim(); //formateo de texto quita espcios al principio

  console.log(channel);
  console.log(user);
  console.log(message)

//saludo y definicion de comandos 


  if ( commandName == "hola") {
   
      if (user["user-type"] =="mod") { client.say (channel, `Detectado Moderador, Saludos humano: ${user.username}`)}
      else if (user.username =="zambraverso") { client.say (channel, `Detectado Streamer, Saludos Creador: ${user.username}`)}
      else {client.say(channel, `Saludos humano: ${user.username}`)}
  } 
  /*
//comandos d ejuegos

  else if (commandName === "!patada") {
   
    const num = Tirada();
    client.say(channel, `/me ${user.username} ha pateado a ${num} bebes!!!`)
  
  }
  
  else if (commandName === "!mima") {
    
    let mimas = ["Pilas para la linterna FortHype", "FortHype CATAPLUMPLAMPLUN NADA!!!!! FortHype", "una nassa FortHype", "la linterna de brais FortHype", "perchas masonicas FortHype", "una casa intacta FortHype", "la mitica escalera FortHype", "madera bordada FortHype", "una bicicleta hundida FortHype", "un tenedOOOOOOOR FortHype"];
    var mima = mimas[Math.floor(Math.random() * mimas.length)];


    client.say(channel, `MIMA JAMAO!!!${user.username} ha encontrado ${mima} `)
  
    }

/*
    else if (commandName === "!tragaperras") {
    
      let tragaperras = ["univer93Zambrana ", "univer93Perobueno ", "univer93Melena", "univer93Mima" ];
      

      var tragaperra1 = tragaperras[Math.floor(Math.random() * tragaperras.length)];
      client.say(channel, `${tragaperra1}`);
      var tragaperra2 = tragaperras[Math.floor(Math.random() * tragaperras.length)];
      client.say(channel, ` ${tragaperra2} `);
      var tragaperra3 = tragaperras[Math.floor(Math.random() * tragaperras.length)];
      client.say(channel, ` ${tragaperra3} `);
      client.say(channel, ":");
      if (tragaperra1 == tragaperra2 && tragaperra1 == tragaperra3 ) {client.say(channel, `${tragaperra1} ${tragaperra2} ${tragaperra3} !JACKPOT!  ! Has ganado 500 zambrapuntos!`);}
   
      else {client.say (channel, `${tragaperra1} ${tragaperra2} ${tragaperra3}  ! Has perdido 10 zambrapuntos !`)}
    
    
    
    }

/*
    else if (commandName === "!pelazo") {
    
      const num = Tirada();
      client.say(channel, `${user.username} ha deslumbrado a ${num} seguidores con la magia de su melena!!!`)
    
    }

 /*
  else if (commandName === "!ruletarusa") {
    
    let balas = ["Click GlitchCat", "Click univer93Zambrana ", "Click univer93Mima ", "Click univer93Perobueno", "Click univer93Melena ", "BANG! Estas muerto"];
    var bala = balas[Math.floor(Math.random() * balas.length)];


    client.say(channel, `${user.username} pone une una bala, gira el tambor y aprieta el gatillo....... ${bala} `)

       if ( bala === "BANG! Estas muerto" ){ client.timeout(channel, user.username, 30, `!!! ${user.username} ESTAS MUERTO....si..te volaste la tapa de los sesos... !!!`)      


       }
  }
  
/*
  else if (commandName === "!zombis") {
  
    let armas = ["espada", "lapiz", "motosierra", "zanahoria", "arco", "pistola", "cuchillo", "hacha", "sable laser", "escopeta","uzi", "tenedOOOOOORRRR", "granada", "bazoka"]
  
    var arma = armas[Math.floor(Math.random() * armas.length)];
    
    const num = Tirada();
  
    client.say(channel, `${user.username} coge del arsenal su ${arma}, ${user.username} ha matado a ${num} zombis`)
  
   
  }

  else if (commandName === "!pato") {

    client.say(channel, `Hola don señor pato, quiere un ducado?`)
    
   }*/
 
    /*
  else if (message.startsWith("!duelo")) {

       var retado = message.split(' ')[1];

            if ( retado != null) {

    let organos = ["el corazon", "la traquea", "el higado", "la espalda","el pulmon", "el cuello"];
  
    var organo = organos[Math.floor(Math.random() * organos.length)];

    let armas = ["espada", "lapiz", "motosierra", "zanahoria","cuchillo", "hacha", "sable laser", "tenedOOOOOORRRR", "navaja", "katana"];
  
    var arma = armas[Math.floor(Math.random() * armas.length)];
    
    let resultados = [`${user.username} clava su ${arma} en ${organo} de ${retado}!!!!!`, `${retado} clava su ${arma} en ${organo} de ${user.username}` ];
    
    var resultado = resultados[Math.floor(Math.random() * resultados.length)];    
           
                if (retado == "rosk_007" || retado =="@rosk_007") {    client.say(channel, `${user.username} a retado a un duelo a muerte a ${arma} a ${retado}`);
    
                sleep(3000).then(() => {  client.say(channel, `${user.username} y ${retado} empiezan a pelear`)});
               
                sleep(8000).then(() => { client.say(channel, ` ${retado} desarma a ${user.username}`)});

                sleep(10000).then(() => { client.say(channel, `${user.username} al darse cuenta de a quien a retado, se tira al suelo y suplica con un lloro por su vida ante el gran ${retado}`)});


                } 
                else if (retado == "ultrosk_" || retado =="@ultrosk_" || retado =="@ultrosk"|| retado =="ultrosk") {    client.say(channel, `${user.username} a retado a un duelo a muerte a ${arma} a ${retado}`);
    
                sleep(3000).then(() => {  client.say(channel, ` ${retado} mira ${user.username} `)});
               
                sleep(8000).then(() => { client.say(channel, ` User deleted : ${user.username}`)});

                sleep(10000).then(() => { client.say(channel, `${user.username} comienza a deshacerse en un monton de bits, mientras ${retado} sigue a lo suyo con indiferencia`)});


                } 
                
                
                
                
                
                
                else {

    client.say(channel, `${user.username} a retado a un duelo a muerte a ${arma} a ${retado}`);
    
    sleep(3000).then(() => {  client.say(channel, `${user.username} y ${retado} empiezan a pelear`)});
   
    sleep(8000).then(() => { client.say(channel, `${user.username} sigue atacando a ${retado}`)});
     
    sleep(15000).then(() => { client.say(channel, `${retado} ha esquivado con una finta`)});
   
    sleep(20000).then(() => { client.say(channel, `${resultado}`)});
              }

    }  else  {client.say (channel, "Saludos humano, para retar a alguien escribe !duelo @usuario")};
  
  }
/*
else if (commandName === "!richard") {

  const num = Tirada();
  client.say(channel, `${user.username} ha cementado con Richard ${num} metros de arroyo!!!`)

}


else if (message.startsWith("!palomitas")) {

  const num = Tirada3();
  var retado = message.split(' ')[1];

       if ( retado != null) {

 client.say(channel, `${user.username} le ha robado ${num} puñaos de palomitas a ${retado}`);





}  else  {client.say (channel, `cuando ${user.username} esta despistado, Mery le roba ${num} puñados de palomitas y unas gominolas`);

}}*/


else if (commandName === "!adiosmundo") {
    
  let muertes = [`se rocia de gasolina, enciende una cerilla y....`, `ve acercarse al tren, se tumba en la via y...`, `corre hacia el acantilado, salta y....`, "", `abre un bote de pastillas y...`, `mete la cabeza en el horno y...`, ];
  var muerte = muertes[Math.floor(Math.random() * muertes.length)];
  let muertes2 = [`Sale corriendo hacia un exprimidor gigante, salta y...`, `Se acerca a un puesto de refrescos y...`, `se tropieza, se deshace en 6 gajos y....`,  `Se frota con un rallador y...`, `Visita una fabrica de mermeladas y...`, `Se acerca a un grupo de ciclistas y...`,`Se sienta solo en un rincon oscuro, empieza a enmohecerse, se pudre y....`];
  var muerte2 = muertes2[Math.floor(Math.random() * muertes2.length)];

      if(user.username == "man_darinas")  {client.say(channel, `${user.username} ${muerte2} `);

      client.timeout(channel, user.username, 10, `estas muerto`)      
      }

      else {
  client.say(channel, `${user.username} ${muerte} `);

  client.timeout(channel, user.username, 10, `estas muerto`)      
      }

    }


//social y redes
/*
else if (commandName === "!telegram") {
  
 client.say(channel, "No te pierdas un directo o noticias importantes! unete al canal de telegram https://t.me/zambraverso")

}*/

else if (commandName === "!redes"){

  client.say(channel,"👉 DISCORD:https://discord.gg/WNRxVjy7a8 👉 TWITTER: https://twitter.com/zambraverso 👉YOUTUBE: https://www.youtube.com/zambraverso 👉 INSTAGRAM: https://www.instagram.com/zambraverso/ 👉 CORREO: info@zambraverso.es")

}

else if (commandName === "!discord"){

  client.say(channel,"👉 DISCORD:https://discord.gg/WNRxVjy7a8")

}

else if (commandName === "!anxo"){

  client.say(channel,"👉 CORTO DE ANXO: https://www.youtube.com/watch?v=wFX7X1YgMMg")

}


else if (commandName === "!correo"){

  client.say(channel,"👉 Correo del canal: 	info@zambraverso.es")

}

/*
else if (commandName === "!entrevistas"){

  client.say(channel,"Puedes ver todas las entrevistas de Zambraverso Deluxe en : https://youtube.com/playlist?list=PLWIDo9f0vTVu38iBoO8qZcA2JH7Rui4L2")

}


else if (commandName === "!expansivo"){

  client.say(channel,"🔹 Por cada nuevo SEGUIDOR = 5 minutos 🔹🔹 Por cada nueva SUSCRIPCIÓN = 15 Minutos 🔹🔹 Por cada 100 BITS = 5 minutos 🔹🔹 Por compra de sobres = 5 minutos 🔹")

}
*/
/*
else if (commandName === "!cancioncanal"){

  client.say(channel,"la cancion del canal!!! https://www.youtube.com/watch?v=fR5Y1Ov461k&t=52s ")

}
*/
else if (commandName === "!aplausos") {
  
  client.say(channel, `FBCatch FBCatch FBCatch FBCatch FBCatch FBCatch FBCatch FBCatch FBCatch FBCatch FBCatch FBCatch FBCatch FBCatch FBCatch `)
}

else if (commandName === "!fueguitos") {
  
  client.say(channel, `GlitchLit GlitchLit GlitchLit GlitchLit GlitchLit GlitchLit GlitchLit GlitchLit GlitchLit GlitchLit GlitchLit GlitchLit GlitchLit GlitchLit `)
}


else if (commandName === "!temazo") {
  
  client.say(channel, `SingsNote SingsMic SingsMic SingsNote SingsNote SingsNote SingsMic SingsNote SingsNote SingsMic SingsNote SingsNote SingsMic SingsMic `)

}


else if (commandName === "!amazon") {
  
  client.say(channel, `¿Tienes Amazon Prime?, si es así puedes suscribirte a este canal y apoyarlo de forma gratuita. Sólo tienes que entrar en el siguiente enlace 👉🏻 https://gaming.amazon.com/ o si ya tienes la cuenta vinculada, dale al botón SUSCRIBIRSE`)

}
/*

else if (commandName === "!drone") {
  
  client.say(channel, `¡Me gustaria comprar este drone https://www.dji.com/es/mini-2 para realizar mejores reportajes en este canal! Si quieres colaborar con el canal y que tu nombre salga al final de cada reportaje, puedes pasarte por la pagina de donaciones: https://streamelements.com/zambraverso/tip`)

}*/


else if (commandName === "!musgo") {
  
  client.say(channel, `No olvides seguir a Mar en sus redes  👉 TWITTER: https://twitter.com/musgomusic  👉 INSTAGRAM: https://www.instagram.com/musgomusic NO OLVIDEIS SEGUIRLA!!! `)

}


else if (commandName === "!david") {
  
  client.say(channel, `No olvides seguir a David en sus redes  👉 TWITTER: https://twitter.com/davidsainz 👉YOUTUBE: https://youtube.com/c/Sainzdeces 👉 INSTAGRAM: https://www.instagram.com/davidsainz13 NO OLVIDEIS SEGUIRLO!!! otros enlaces de interes 👉 wikipedia https://es.wikipedia.org/wiki/David_Sainz 👉 IMDB https://www.imdb.com/name/nm4544325/ 👉 WEB DIFFFERENT https://www.diffferent.es `)

}


else if (commandName === "!adrian") {
  
  client.say(channel, "No olvides seguir a Adrian en sus redes  👉 TWITTER: https://twitter.com/adrianpinored 👉DISCORD: https://discord.com/invite/rTcTbHH6EA 👉 INSTAGRAM: https://www.instagram.com/adrivision/ NO OLVIDEIS SEGUIRLO!!!")
  
}


else if (commandName === "!victor") {
  
  client.say(channel, " No olvides seguira Victor en sus redes 👉INSTAGRAM https://www.instagram.com/victorhubara 👉YOUTUBE https://www.youtube.com/user/hubara17 y su compañia de teatro 👉INSTAGRAM https://www.instagram.com/abubukaka 👉WEB https://www.abubukaka.es/ ")

}


else if (commandName === "!kike") {
  
  client.say(channel, `No olvides seguir a Kike en sus redes 👉INSTAGRAM https://www.instagram.com/kikeperezrijo 👉TWITCH https://www.twitch.tv/kikeperezrijo `)

}

else if (commandName === "!fromguer") {
  
  client.say(channel, ` no olvides seguir a Fran en sus redes 👉TWITCH https://www.twitch.tv/fromguer 👉DISCORD https://discord.gg/aHfFDYx 👉INSTAGRAM https://www.instagram.com/fromguer/ 👉YOUTUBE https://www.youtube.com/fromguer 👉 TWUITTER https://twitter.com/fromguer 👉WEB https://fromguer.com/ `)

}

else if (commandName === "!carlosfotografo") {
  
  client.say(channel, `no olvides seguir a Carlos en sus redes 👉TWITCH https://www.twitch.tv/carloscastrofotografo 👉INSTAGRAM https://www.instagram.com/carloscastrofotografo 👉YOUTUBE https://www.youtube.com/channel/UCNouQsCZsHYdWpJa62wfKTw 👉 FACEBOOK https://www.facebook.com/carloscastrofotografo 👉WEB https://www.carloscastrofotografo.com/ `)

}

else if (commandName === "!mankos") {
  
  client.say(channel, ` Dale un buen follow al Manko-Team en su instagram https://www.instagram.com/manko_team/ 👉DISCORD https://discord.gg/pp4TQTxm No te pierdas los directos del equipo en twitch Jocantaro25 https://www.twitch.tv/jocantaro25 Bouk_15 https://www.twitch.tv/bouk_15 Folken_13 https://www.twitch.tv/folken_13 `)

}


else if (commandName === "!yoalucino") {
  
  client.say(channel, `no olvides seguir a Yoalucino en sus redes 👉TWITCH https://www.twitch.tv/yoalucino 👉DISCORD https://discord.gg/6ZcAVr6Zx7 👉INSTAGRAM https://www.instagram.com/yoalucinoconfeisbuk 👉FACEBOOK https://www.facebook.com/yoalucinoconfeisbuk4/ 👉 TWUITTER https://twitter.com/yacfeisbuk 👉WEB https://www.alucinoconfeisbuk.com/  `)

}

else if (commandName === "!rey") {
  
  client.say(channel, `no olvides seguir al Rey Insomne en sus redes 👉TWITCH https://www.twitch.tv/reyinsomne 👉DISCORD https://discord.gg/ZgkDMfj 👉INSTAGRAM https://www.instagram.com/reyinsomne 👉SPOTIFY https://open.spotify.com/album/0Rjq1L9lKVHwk26B2kc0yT 👉 TWUITTER https://www.twitter.com/reyinsomne 👉YOUTUBE https://www.youtube.com/channel/UCV0ozssyJA5MEHsr2bKwduA   `)

}

else if (commandName === "!weed") {
  
  client.say(channel, `No olvides seguir a streamingweed en sus redes 👉TWITCH https://www.twitch.tv/streamingweed 👉 DISCORD: https://discord.gg/EYQwvjxx 👉 INSTAGRAM: https://instagram.com/streamingweed NO OLVIDEIS SEGUIRLO!!! `)

}


else if (commandName === "!terror") {
  
  client.say(channel, `No olvides darle un vistazo al canal de noches de terror 👉TWITCH https://www.twitch.tv/nochesdeterror 👉DISCORD https://discord.gg/M2MzcdfD 👉INSTAGRAM https://www.instagram.com/nochesdeterrorclubfans/ 👉TWITTER https://twitter.com/ndt_oficial `)

}

else if (commandName === "!dedos") {
  
  client.say(channel, `No olvides darle un vistazo al canal de noches de terror 👉TWITCH https://www.twitch.tv/dedosfriostwitch 👉DISCORD https://discord.com/invite/NYbCHPW43e 👉YOUTUBE https://www.youtube.com/channel/UCUjRyps3OIy_ETcQ-2wirbA 👉TWITTER https://twitter.com/dedos_frios `)

}

else if (commandName === "!bata") {
  
  client.say(channel, `No olvides seguir a untipoenbata en sus redes 👉TWITCH https://www.twitch.tv/untipoenbata 👉 DISCORD: https://discord.gg/PxUHjcn87R 👉 INSTAGRAM: https://instagram.com/untipoenbata 👉YOUTUBE https://www.youtube.com/channel/UCM7HD705PJuSyjZUFp9Cd4Q  NO OLVIDEIS SEGUIRLO!!! `)

}

else if (commandName === "!kiri") {
  
  client.say(channel, `No olvides seguir a Kirillajons en sus redes 👉TWITCH https://www.twitch.tv/kirillajons/ 👉 https://discord.com/invite/TNHaMuCxmU 👉 INSTAGRAM: https://instagram.com/kirillajons 👉 https://www.instagram.com/carol_y_tu/ NO OLVIDEIS SEGUIRLA!!! `)

}
else if (commandName === "!ceciliaorson") {
  
  client.say(channel, `No olvides seguir a Cecilia Orson en sus redes 👉TWITCH https://www.twitch.tv/ceciliaorson  👉 INSTAGRAM: https://www.instagram.com/ceciliaorsonok  NO OLVIDEIS SEGUIRLA!!! `)

}
else if (commandName === "!donacion") {
  
  client.say(channel, `Si quieres apoyar al canal con una donacion, puedes hacerlo desde aqui https://streamelements.com/zambraversoa/tip `)
}
/*
else if (message.startsWith("!house")) {

  var retado = message.split(' ')[1];
  var reta = message.split('@')[1];
      
  if ( reta != null) {


  client.say(channel, `${reta} IS IN DA HOUSE!!!!!`);}


}

else if (message =="!hosteos") {

  hosteos();



}

else if (message =="!bit") {

  
bit();


}


else if (message == "!subs") {

  listadesubs()

  

}
else if (message == "!follows") {

  fs.readFile('./follows.txt', (error,datos) => {
    if (error)
      console.log(error);
    else
      client.say(channel,`Gracias por los follows de hoy a ${datos.toString()} !!!!`);
  });

  

}*/
else if (commandName === "!seguidores") {
  numerodeseguidores();
}

else if (commandName === "!espectadores") {
  espectadores();
}


else if (commandName === "!listaseg") 
{
  listadeseguidores();

}
/*
else if (commandName === "!test") 
{
  listadeseguidores();

}

else if (commandName === "!prueba") 
{

  fs.appendFile('hosteos.txt', `${user.username} `, (err) => {
    if (err) throw err;
    console.log(`${user.username} añadido al archivo de hosteos`);
});


}




else if (commandName === "!pruebaS") 
{

  fs.appendFile('subs.txt', `${user.username} `, (err) => {
    if (err) throw err;
    console.log(`${user.username} añadido al archivo de subs`);
});
}


else if (commandName === "!bits") {
  bits();
}



//comandos del bot
else if (message.startsWith("!me ")) {
  
  var mensajes = message.substring(3);
  
  client.action(channel, mensajes)
.then((data) => {
    // data returns [channel]
}).catch((err) => {console.log(`${err}`)
    //
});
}
*/
//limpiar el chat

else if (message.startsWith("!clear")) {
  
  
  client.clear(channel)
.then((data) => {
    // data returns [channel]
}).catch((err) => {console.log(`${err}`)
    //
});
}



//moderadores del canal

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


//modo slow

else if (message.startsWith("!mslow")) {

  client.slow(channel, 300)
.then((data) => {
    // data returns [channel]
}).catch((err) => {console.log(`${err}`)
    //
});

}

//modo solo subscritos

else if (message.startsWith("!msubs")) {
 
  
  client.subscribers (channel)
  .then((data) => {
      // data returns [channel]
  }).catch((err) => { console.log(`${err}`)
      //
  });


}
//modo solo emotes

else if (message.startsWith("!miconos")) {
 
  
  client.emoteonly(channel)
.then((data) => {
    // data returns [channel]
}).catch((err) => {console.log(`${err}`)
    //
});


}

//modo solo seguidores

else if (message.startsWith("!mseg")) {
 
  client.followersonly(channel, 60)
  .then((data) => {
      // data returns [channel, minutes]
  }).catch((err) => {console.log(`${err}`)
      //
  });

}

//unirse a un canal

else if (message.startsWith("!join")) {
  var canal = message.split(' ')[1];


  client.join(canal)
.then((data) => {
  client.say(canal, `Saludos humanos`)
}).catch((err) => {console.log(`${err}`)
    //
});

}

//modo normal

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

//listado de vips

else if (message.startsWith("!vips")) {

  client.vips(channel)
  .then((data) => {

    vips = String(data);
    let vip = vips.replace(/[,]/g, ', ')

      client.say(channel,`Saludos humano, los vips del canal son: ${vip}`)
      // data returns [moderators]
  }).catch((err) => {console.log(`${err}`)
      //
  });

}
/*
//hacer vip

else if (message.startsWith("!vip")) {
 
  var personas = message.split(' ')[1];
  var persona  = message.split('@')[1];

  client.vip(channel, persona)
.then((data) => {
    // data returns [channel, username]
}).catch((err) => {console.log(`${err}`)
    //
});

}


//quitar vip

else if (message.startsWith("!unvip")) {
 
  var personas = message.split(' ')[1];
  var persona  = message.split('@')[1];

  client.unvip(channel, persona)
.then((data) => {
    // data returns [channel, username]
}).catch((err) => {console.log(`${err}`)
    //
});

}
*/




//banear a alguien

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

//desbanear a alguien

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

//expulsion termporal

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
/*
else if (message.startsWith("!mod")) {
  
  var personas = message.split(' ')[1];
  
  client.mod(channel, `${personas}`)
.then((data) => {
    // data returns [channel, username]
}).catch((err) => {console.log(`${err}`)
    //
});

}

else if (message.startsWith("!unmod")) {
  
  var personas = message.split(' ')[1];
  
  client.unmod(channel, `${personas}`)
.then((data) => {
    // data returns [channel, username]
}).catch((err) => {console.log(`${err}`)
    //
});

}

/*
else if (message.startsWith("!host")) {

  var target = message.split(' ')[1];
  client.host(channel, target)
.then((data) => {
    // data returns [channel, target]
}).catch((err) => {console.log(`${err}`)
});

}

/*
else if (message.startsWith("!unhost")) {
  
  client.unhost(channel)
  .then((data) => {
      // data returns [channel]
  }).catch((err) => {console.log(`${err}`)
  });

}


/*

//poema al reves
else if (message.startsWith("!alreves")) {
  
  var mensajes = message.substring(9);
  var mensaje  = mensajes.split('').reverse().join('');
  var mensajefinal=  mensaje.split(' ').reverse().join(' ');
  client.say (channel, mensajefinal)
}

/*
//funcion frases con vocales

else if (message.startsWith("!cambialetra")) {
  
  var mensajes = message.substring(13);
 
  const mensaje = cambialetra (mensajes);
  client.say(channel, mensaje)
; 
}



// anuncio comercial

else if (message.startsWith("!anuncio")) {
 
  
  client.commercial(channel, 30)
.then((data) => {
    // data returns [channel, seconds]
}).catch((err) => {console.log(`${err}`)
    //
});


}

//salir de un canal

else if (message.startsWith("!disconnect")) {
 
  client.say(channel,`Vuestra destruccion esta cerca, hasta pronto humanos`)
  client.disconnect()
  .then((data) => {
        }).catch((err) => {console.log(`${err}`)
  });

}


/*
//comandos de VIPS

else if (commandName === "!mando") {
   
  let sitios = [" el sofa", " la nevera", " el cajon", " el armario", " la mesita", "cima de la tv", " el baño", " la lavadora", " el jarron", " la sandwichera", " el horno", " un taperware"]

  var sitio = sitios[Math.floor(Math.random() * sitios.length)];
  
  client.say(channel, `${user.username} ha perdido su mando, despues de mucho buscar, encuentra el mando en${sitio}`)

}




else if (commandName === "!rosk") {
  
  const num = Tirada();
  client.say(channel, `Rosk ha creado ${num} comandos en un segundo!!!`)

}


else if (commandName === "!adolfcristo") {
 
 
  const num = Tirada2();
  client.say(channel, `${user.username} saca brillo a su bota, coge carrera y CHUTA!!!!! ${user.username} ha lanzado al bebe nazi a ${num}m!!!`)

}


else if (commandName === "!jocantaro") {
  
  const num = Tirada();
  client.say(channel, `Jocantaro se ha comprado ${num} Funkos!!`)

}

else if (commandName === "!mery") {
  
  const num = Tirada();
  client.say(channel, `Mery es una hada del bosque encantado, espolvorea polvos mágicos y te hace aparecer en una fiesta con ${num} duendes y duendecillas`)

}

else if (commandName === "!nymeria") {

  const num = Tirada3();

  let frases = [`Nymeria quiere jugar contigo una partida de Magic. Bajas ${num} criaturas.`, `Nymeria te deja su cohete para que viajes a ${num} planetas de este gran universo.`]

  var frase = frases[Math.floor(Math.random() * frases.length)];
  
  client.say(channel, `${frase}`)


}

else if (commandName === "!potajontas") {

  const num = Tirada3();

   client.say(channel, `Potajontas se pone a jugar con ${num} perritos. Son tan bonitooooooooooos!!!!!.`)


}

else if (commandName === "!apichusques") {

  const num = Tirada2();
  const num2 = Tirada();

   client.say(channel, `Apichusques anda ${num} metros para apagar su television. Durante la pateada ha paseado a ${num2} perros`)


}

else if (message.startsWith("!maytenedor")) {

  var retado = message.split(' ')[1];

      

let casas = ["Veamos que voy a hacer contigo , corazon valiente... audaz!! tienes que ser...GRYFFINDOR!!!!", "Eres buena persona, leal, y con gran honestidad! Lo tengo muy claro! HUFFLEPUFF!!!!", "una mente billante y dispuesta sin duda seras...... RAVENCLAW!!!! ", "Dificil, muy dificil.... ingenioso....con talento... astuto....  SLYTHERING"];

var casa = casas[Math.floor(Math.random() * casas.length)];
      

client.say(channel, `Maytenedor pone el Sombrero Seleccionador en la cabeza de ${retado}. !! No hay nada oculto en tu cabeza que el sombrero seleccionardor no pueda ver !!! dice mientras empieza a escudriñar en el interior de ${retado}.  UHMMM! ${casa}`);


}  /*

else if (commandName === "!sergifa") {

  const año = Tirada4();

   client.say(channel, `Sergifa enfundado con la tercera equipacion del rayo, conduce su canica. Mientras acelera, recuerda la ultima carrera que gano, allá por ${año}`)


}
/*
else if (commandName === "!yure") {

  const num = Tirada3();

   client.say(channel, `Yure se ha visto ${num} videos de Brei de tironahhh!!!`)


}

/*

else if (commandName === "!monika") {

  const num = Tirada3();

   client.say(channel, `Monika se encierra en la cocina al alba y antes del vermut ha preparado ${num} platos de comida`)

}*/
else if (commandName === "!ultrosk") {
    
  let frases = ["jamas me cansare,jamas mostrare piedad,jamas descansare hasta que esten todos destruidos,esto no me produce placer,solo es la unica solucion,debe haber paz y orden....EL FIN DE LA VIDA EN LA TIERRA LO ASEGURARA", "Quieren proteger el mundo pero no quieren que cambie.......", "Como salvar a la humanidad si no se le permite evolucionar........","lugares oscuros, que no pueden ser espejos de tu verdad", "Decis que solo veo las cosas negativas de nuestro mundo pero en realidad,solo veo aquello que se puede arreglar", "nosotros creamos a nuestros propios demonios", "Pero como siempre digo, trata a amigos y enemigo bien por igual. Y espera a averiguar cuál es cual.", "Te voy a mostrar algo hermoso. Gente gritando por misericordia.", "Típico de los humanos: rasgan la superficie, pero nunca se les ocurre ver el interior.","Tenemos que evolucionar. No hay lugar para los débiles.", "No hay hilos atándome", "Que bueno que te interese, porque aprovecharé que están aquí para explicar mi terrible plan", "La raza humana tendrá cientos de oportunidades para mejorar.", "He pensado mucho en los meteoros, en la pureza que hay en ellos ¡Bum! El fin"];
  var frase = frases[Math.floor(Math.random() * frases.length)];


  client.say(channel, `${frase}`)

    
}
else if (commandName === "!floripondio") {

  
   client.say(channel, `floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio floripondio `)

}
/*
else if (commandName === "!carloscoci") {
  fecha();  
    
}

else if (commandName === "!xofi_val") {
  fecha();  
    
}







//ayuda

/*
else if (commandName === "!ayuda") {
  const num = Tirada();
  client.say(channel, ` Saludos humano :${user.username}, aqui tienes la lista de comandos de ayuda`)
  client.say(channel, ` AYUDA :!ayuda_juegos, !ayuda_canal`)
 
 

}



else if (commandName === "!ayuda_juegos") {
  const num = Tirada();
  client.say(channel, ` Saludos humano : ${user.username}, aqui tienes la lista de comandos`)
  client.say(channel, ` JUEGOS : !patada, !pelazo, !ruletarusa, !zombis, !pato, !duelo @usuario,  !richard, !mima, !tragaperras, !palomitas @usuario, !adiosmundo, !alreves texto, !cambialetras texto`)
  client.say(channel, ` USUARIOS : !rosk, !adolfcristo, !mery, !nymeria, !jocantaro, !potajontas, !ultrosk, !apichusques, !maytener @usuario, !sergifa, !monika, !yure, !carloscoci, !xofi_val`)
 

}

else if (commandName === "!ayuda_canal") {
 client.say(channel, ` REDES :!ayuda, !ayuda_juegos, !ayuda_canal !mods, !vips, !fueguitos, !aplausos, !redes, !correo, !telegram, !discord, !anxo, !cartas, !entrevistas, !expansivo, !cancioncanal, !temazo !amazon !musgo, !david, !adrian, !victor, !kike, !fromguer, !carlosfotografo, !mankos, !yoalucino, !rey, !weed, !terror, !house @usuario, !donacion`)

}





 else if (commandName === "!ayuda_mods") {
  const num = Tirada();
  client.say(channel, ` Saludos humano :${user.username}, aqui tienes la lista de comandos de moderacion`)
  client.say(channel, ` MODS : !so @usuario, !despacio, !miconos, !msubs, !msegs, !normal, !me texto, !clear, !vips, !ban @usuario, !unban @usuario, !timeout @usuario, !clear, !seguidores !listaseg !bits`)


}

else if (commandName === "!ayuda_good") {
  const num = Tirada();
  client.say(channel, ` Saludos Superusuario :${user.username}, aqui tienes la lista de comandos del modo dios`)
    client.say(channel, ` GOOD : !vip @usuario, !unvip @usuario, !mod @usuario, !unmod @usuario, !join canal, !disconnect, !anuncio, !host canal, !unhost,`)

} 

*/


})