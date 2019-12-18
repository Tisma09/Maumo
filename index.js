const Discord = require('discord.js');
var bot =  new Discord.Client();

const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQwNTA1MjY0NzIxMzc2MDUxNyIsImJvdCI6dHJ1ZSwiaWF0IjoxNTMzOTIzODM1fQ.cpF5Ua0yvLIL6dWhZYQPGg5nvlKBgf_q3_5Brt4ZDew', bot);
const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const dex = require('oakdex-pokedex')

const adapter = new fileSync('db.json')
const db = low(adapter);
const itemadapter = new fileSync('item.json')
const dbitem = low(itemadapter);
db.defaults({evolu: []}).write()
dbitem.defaults({item: []}).write()


var prefix = ("'")
var randnum = 0

dbl.on('posted', () => {
    dbl.postStats(bot.guilds.size)
    console.log('Server count posted!');
})
  
dbl.on('error', e => {
   console.log(`Oops! ${e}`);
})


bot.on('ready' , () => {
    setInterval (() => dbl.postStats(bot.guilds.size), 1800000); 
    bot.user.setActivity(`use: 'help ,${bot.guilds.size} server (^-^)`, {
        url : "https://www.twitch.tv/maumokos",
        type : "STREAMING"
    });
    console.log('bot ready !');
}); 
  

bot.login(process.env.TOKEN);


bot.on('message', message => {
if (message.author.bot.valueOf() === true){
        //console.log("Bip, Boup, Bip ?")
}else{


    if (message.content === prefix + "ping"){
        message.channel.send(`${message.client.emojis.find("name", "MGP")}pong`);
        console.log('ping pong');
    }
 
    if (!message.content.startsWith(prefix))return;
    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()){
        case "info":
        var info =new Discord.RichEmbed()
                .setColor('D99801')
                .setTitle(`__${message.client.user.tag}__`, true)
                .setThumbnail(message.client.user.avatarURL, true)
                .addField("ID", "405052647213760517", true)
                .addField("Version", "1.10", true)
                .addField(`Owner`, `${message.client.users.find("id","323878494188601344" ).tag}`, true)
                .addField("Library", "Discord.js", true)
                message.channel.send(info)
        break;

        case "help":
            var u = "`"
            var help_embed = new Discord.RichEmbed()
                .setColor('1D8376')
                .setTitle("__Bot Command__\n\n", true)
                .setDescription("Préfixe : '\n**'ping** : answer pong\n**'help** : Shows a Bot Command !\n**'info** : A info on Maumokos**inviteme** : Give a link for invited me\n**'support** : Give a link for join suppport server", true)
                .addField(`${message.client.emojis.find("name", "Banned")}Moderator command:`, "**'ban** `member to ban`: Ban a member\n**'kick** `member to kick`: Kick a member\n**'mute** `member to mute`\n**'unmute** `member to unmute`: unmute a member\n**'purge** `number of message to delete`: deleted messages", true)
                .addField(`:robot:Utile:`, "**'serverinfo**: Show a information about this server\n**'userinfo** `user`: Show information about a user\n**'wiki** `research`: Give a wiki link to your search", true)
                .addField(`${message.client.emojis.find("name", "Link")}Fun:`, "**'avatar** `user`: Stow avatar of user\n**'say** `message`: Reapet your message\n**'yesorno** `Question`: Answer Yes or No\n**'choose** `choice1` / `choice2`: Chose one of the two choices\n**'pokefusion** : Show a random pokefusion\n**'roulette** `a thing` : Say a winner of this ting\n**'meme** : Show a random meme\n**'love** `user1` `user2`: Calculating love between userr1 and user2", true)
                .addField(`${message.client.emojis.find("name", "Greninja")}Pokemon command${message.client.emojis.find("name", "Ball")}:`, "**'dex** `Pokemon name`: Shows information on a Pokémon.\n**'megadex** `Pokemon name` : Shows information on a Mega Pokémon.\n**'randpoke** : Shows information on a random Pokémon.\n**'move** `move name` : Shows information on a move\n**'ability** `ability name` : Shows information on an ability\n**'item** `item name` : Shows information on an item\n**'nat** `nature name` : Shows information on a nature\n**'shiny** `pokemon name` : Shows a Pokemon in shiny\n**'type** : Shows a  Type chart", true)
                .setThumbnail(`${bot.user.avatarURL}`, true)
                .setFooter(`Create by ${message.client.users.find("id","323878494188601344" ).tag}`, message.client.users.find("id","323878494188601344" ).avatarURL, true)
                message.author.send(help_embed);
                message.channel.send("Check your DM")
            console.log("commande help demander");
        break;

    
      case "kick" :
        if (!message.channel.permissionsFor(message.member).hasPermission("KICK_MEMBERS")){
             message.reply("You have no right")
        }else{
             var memberkick = message.mentions.users.first();
             if(!memberkick){
                 message.reply("user doesen't exist");
             }else{
                 if(!message.guild.member(memberkick).kickable){
                     message.reply("user impossible to kick");
                }else{
                     message.guild.member(memberkick).kick().then((member) => {
                     message.channel.send(`${member.displayName} was kicked`);
                }).catch(() => {
                     message.channel.send("kick refusé")
                })
            }
        }
        }
        break;
        case "ban" :
        if (!message.channel.permissionsFor(message.member).hasPermission("BAN_MEMBERS")){
             message.reply("You have no right")
        }else{
             var memberban = message.mentions.users.first();
            if(!memberban){
               message.reply("user doesen't exist");
            }else{
                 if(!message.guild.member(memberban).bannable){
                     message.reply("user impossible to ban");
                }else{
                     message.guild.member(memberban).ban().then((member) => {
                     message.channel.send(`${member.displayName} was banned`);
                }).catch(() => {
                     message.channel.send("ban refusé")
                })
            }
        }
        }
        break;
        case "mute" : 
        if (!message.channel.permissionsFor(message.member).hasPermission("MANAGE_MESSAGES")){
            message.reply("You have no right")
        }else{
            var membermute = message.mentions.users.first();
            if(!membermute){
                message.reply("user doesen't exist");
            }else{
                message.channel.overwritePermissions(membermute, {
                    SEND_MESSAGES: false
                })
                message.channel.send(`${membermute} is now mute`)
                console.log(`${membermute} est mute`)
            }
        }
        break;
        case "unmute":
        if (!message.channel.permissionsFor(message.member).hasPermission("MANAGE_MESSAGES")){
            message.reply("You have no right")
        }else{
            var memberunmute = message.mentions.users.first();
            if(!memberunmute){
                message.reply("user doesen't exist");
            }else{
                var memberunmuteid = message.mentions.users.first().id;
                message.channel.permissionOverwrites.find("id", `${memberunmuteid}`).delete()
            }
        }
        break;

        case "purge":
        if (!message.channel.permissionsFor(message.member).hasPermission("MANAGE_MESSAGES")){
            message.reply("You have no right")
        }else{
            var ADelet = message.content.substr(7);
            message.channel.bulkDelete(ADelet)
                .then(messages => console.log(`Bulk deleted ${messages.size} messages`))
                .catch(console.error);
        }
        break;
///////////////////////////////////////////////////////

        

        case "userinfo":
        console.log("userinfo demander")
        //message.guild.member()
        if (!message.mentions.users.first()){
            var userinfo =new Discord.RichEmbed()
                .setColor('D99801')
                .setTitle(`Info about ${message.author.tag}`, true)
                .setThumbnail(message.author.avatarURL, true)
                .addField("ID", message.author.id, true)
                .addField("Account created", message.author.createdAt, true)
                .addField("Nickname", message.member.nickname, true)
                .addField(`Role(${message.member.roles.size})`, `Highest Role: ${message.member.highestRole.name}`, true)
                .addField("Join this Guild", message.member.joinedAt, true)
                message.channel.send(userinfo)
        }else{
            var userinfo =new Discord.RichEmbed()
                .setColor('D99801')
                .setTitle(`Info about ${message.mentions.users.first().tag}`, true)
                .setThumbnail(message.mentions.users.first().avatarURL, true)
                .addField("ID", message.mentions.users.first().id, true)
                .addField("Account created", message.mentions.users.first().createdAt, true)
                .addField("Nickname", message.guild.member(message.mentions.users.first()).nickname, true)
                .addField(`Role(${message.guild.member(message.mentions.users.first()).roles.size})`, `Highest Role: ${message.guild.member(message.mentions.users.first()).highestRole.name}`, true)
                .addField("Join this Guild", message.guild.member(message.mentions.users.first()).joinedAt, true)
                message.channel.send(userinfo)
        }
        break;
        case "serverinfo":
        var servinfo =new Discord.RichEmbed()
                .setColor('D99801')
                .setTitle(message.guild.name, true)
                .setThumbnail(message.guild.iconURL, true)
                .addField("Region", message.guild.region, true)
                .addField("Owner", message.guild.owner.user.tag, true)
                .addField("Created at", message.guild.createdAt, true)
                .addField("Other information", `Member: ${message.guild.memberCount}\nRole: ${message.guild.roles.size}\nEmoji: ${message.guild.emojis.size}\nChannel: ${message.guild.channels.size}(category including)`, true)
                message.channel.send(servinfo)
        break;
        
        case "say" :
        message.delete()
               .then(msg => console.log(`Deleted message from ${msg.author}`))
               .catch(console.error);
        var rep = message.content.substr(5);//dans les () de .substr il faut mettre le chiffre ou commence ce qu'il faut enrengistrer/rèpèter
        console.log(`${rep} a été répéter`)
            message.channel.send(`${rep}`)
        break;
        case "avatar" :
        var memberavatar = message.mentions.users.first();
           if(!memberavatar){
                var avat = new Discord.RichEmbed()
                    .setColor('F37A01')
                    .setTitle("Your Avatar")
                    .setImage(message.author.avatarURL)
                    message.channel.send(avat);
           }else{
                var avat = new Discord.RichEmbed()
                    .setColor('F37A01')
                    .setTitle(`Avatar of ${message.mentions.users.first().username}`)
                    .setImage(message.mentions.users.first().avatarURL)
                    message.channel.send(avat);
            }
        break;
        case "wiki":
        var cherche = message.content.substr(6)
        var maj = (cherche.charAt(0).toUpperCase() + cherche.substring(1).toLowerCase());
        var debutdeuz = maj.indexOf(" ")
        var mot1 = maj.substr(0, debutdeuz)
        var mot2 = "_"+(maj.charAt(debutdeuz+1).toUpperCase() + maj.substring(debutdeuz+2).toLowerCase());
        var tout = mot1+mot2
        message.channel.send(`https://en.wikipedia.org/wiki/${tout}`)
        break;
        case "pokefusion":
        randfusion()
        var poke1 = randnum
        randfusion()
        var poke2 = randnum
        var fusion = new Discord.RichEmbed()
                    .setColor('C10101')
                    .setImage(`http://images.alexonsager.net/pokemon/fused/${poke1}/${poke1}.${poke2}.png`)
                    message.channel.send(fusion);
        break;
        case "yesorno":
        console.log('yesorno')
        random();
        console.log(randnum);
        if (randnum == 1){
            message.reply("Yes ! ;)");
        }else{
            message.reply("No ! '-'");
        }
        break;
        case "choose":
        var choose = message.content.substr(8)
        var fin = choose.indexOf("/")
        var choose1 = choose.substr(0, fin-1)
        var choose2 = choose.substr(fin+1)
        console.log('choose')
        random();
        if (randnum == 1){
            message.reply(choose1);
        }else{
            message.reply(choose2);
        }
        break;
        case "inviteme":
        message.channel.send(`https://discordapp.com/oauth2/authorize?client_id=405052647213760517&permissions=15448&scope=bot`)
        break;
        case "support":
        message.channel.send(`https://discord.gg/9P8gvER`)
        break;
        case "roulette":
        var dit = message.content.substr(10)
        var win = message.guild.members.random()
        message.channel.send(`The winner of ${dit} is ${win} !`)
        break;
        case "meme":
        memenumber()
        var meme = new Discord.RichEmbed()
                    .setColor('9EED01')
                    .setImage(`http://images.memes.com/meme/${randnum}.jpg`)
                    message.channel.send(`A meme ! ;)`, meme);
        break;
        case "love":
        var mention1 = message.mentions.users.first()
        var mention2 = message.mentions.users.last()
        if (!mention1 | !mention2){
            console.log(hum)
        }else{
            var a1 = message.mentions.users.first().id
            var a2 = message.mentions.users.last().id
            var a1number = a1.substr(16)
            var a2number = a2.substr(16)
            var love1 = 1*a1number+1*a2number
            console.log(love1)
            var love = Math.round(love1)
            console.log(love)
            var u = "`"
            if(love > 100){
                var love21 = a2number/2+a1number/2 
                var love2 = Math.round(love21)
                if(love2>=20 & love2<40){
                    message.channel.send(`The calculator indicates\n${u}${mention1.username}${u} :cupid: ${u}${mention2.username}${u}\n           .....................................\n${love2}% |:hearts::hearts::black_heart::black_heart::black_heart:| (°v°)`)
                }else{
                    if(love2>=40 & love2<60){
                        message.channel.send(`The calculator indicates\n${u}${mention1.username}${u} :cupid: ${u}${mention2.username}${u}\n           .....................................\n${love2}% |:hearts::hearts::hearts::black_heart::black_heart:| (°v°)`)
                    }else{
                        if(love2>=60 & love2<80){
                            message.channel.send(`The calculator indicates\n${u}${mention1.username}${u} :cupid: ${u}${mention2.username}${u}\n           .....................................\n${love2}% |:hearts::hearts::hearts::heartpulse::black_heart:| (°v°)`)
                        }else{
                            if(love2>80){
                                message.channel.send(`The calculator indicates\n${u}${mention1.username}${u} :cupid: ${u}${mention2.username}${u}\n           .....................................\n${love2}% |:hearts::hearts::hearts::heartpulse::heartpulse:| (°v°)`)
                            }else{
                                message.channel.send(`The calculator indicates\n${u}${mention1.username}${u} :cupid: ${u}${mention2.username}${u}\n           .....................................\n${love2}% |:hearts::black_heart::black_heart::black_heart::black_heart:| (°v°)`)
                            }
                        }
                    }
                }
            }else{
                if(love>=20 & love<40){
                    message.channel.send(`The calculator indicates\n${u}${mention1.username}${u} :cupid: ${u}${mention2.username}${u}\n           .....................................\n${love}% |:hearts::hearts::black_heart::black_heart::black_heart:| (°v°)`)
                }else{
                    if(love>=40 & love<60){
                        message.channel.send(`The calculator indicates\n${u}${mention1.username}${u} :cupid: ${u}${mention2.username}${u}\n           .....................................\n${love}% |:hearts::hearts::hearts::black_heart::black_heart:| (°v°)`)
                    }else{
                        if(love>=60 & love<80){
                            message.channel.send(`The calculator indicates\n${u}${mention1.username}${u} :cupid: ${u}${mention2.username}${u}\n           .....................................\n${love}% |:hearts::hearts::hearts::heartpulse::black_heart:| (°v°)`)
                        }else{
                            if(love>80){
                                message.channel.send(`The calculator indicates\n${u}${mention1.username}${u} :cupid: ${u}${mention2.username}${u}\n           .....................................\n${love}% |:hearts::hearts::hearts::heartpulse::heartpulse:| (°v°)`)
                            }else{
                                message.channel.send(`The calculator indicates\n${u}${mention1.username}${u} :cupid: ${u}${mention2.username}${u}\n           .....................................\n${love}% |:hearts::black_heart::black_heart::black_heart::black_heart:| (°v°)`)
                            }
                        }
                    }
                }
            }
        }
        break;
        case"servernumber":
        if (message.author.id != 323878494188601344){
            console.log("x)")
        }else{
            var number = message.client.guilds.first(+150)
            message.channel.send(number)
        }
        break;
        case "colorole":
        if(message.guild.id == 513043089066033153){
            var maumorole = message.guild.roles.find("name", 'Maumokos').position
            console.log(maumorole)
            var pos = maumorole-1
            console.log(pos)
            if(!message.guild.roles.find("name", "color")){
                message.guild.createRole({
                    name : "color",
                    position : pos
                })
                bot.on("roleCreate", role => {
                    var msgauthor = message.author.id;
                    let role_ajout= message.guild.roles.find("name", "color");
                    message.guild.member(msgauthor).addRole(role_ajout)
                    setTimeout(c1, 1000)
                })
            }else{
                var msgauthor = message.author
                message.guild.member(msgauthor).addRoles(message.guild.roles.find("name", "color"))
            }
        }
        break;
        case "color":
        if(message.guild.id == 513043089066033153){
            c1()
        }
        break;
            
        function c1(){
            message.guild.roles.find("name", "color").edit({
                color: '8A008E'
            })
            setTimeout(c2, 10000)
        }
        function c2(){
            message.guild.roles.find("name", "color").edit({
                color: '080ED1'
            })
            setTimeout(c3, 10000)
        }
        function c3(){
            message.guild.roles.find("name", "color").edit({
                color: '01B3DF'
            })
            setTimeout(c4, 10000)
        }
        function c4(){
            message.guild.roles.find("name", "color").edit({
                color: '6CE601'
            })
            setTimeout(c5, 10000)
        }
        function c5(){
            message.guild.roles.find("name", "color").edit({
                color: 'E88B01'
            })
            setTimeout(c6, 10000)
        }
        function c6(){
            message.guild.roles.find("name", "color").edit({
                color: '831f18'
            })
            setTimeout(c1, 10000)
        }
        
    }
}
})

function random(min,max) {
  min = Math.ceil(0);
  max = Math.floor(1);
  randnum = Math.floor(Math.random() * (max - min +1) + min);

}
function randfusion(min,max) {
    min = Math.ceil(0);
    max = Math.floor(151);
    randnum = Math.floor(Math.random() * (max - min +1) + min);
  
}
function memenumber(min,max) {
    min = Math.ceil(1);
    max = Math.floor(32999);
    randnum = Math.floor(Math.random() * (max - min +1) + min);
  
}
function img20(min,max) {
    min = Math.ceil(0);
    max = Math.floor(19);
    randnum = Math.floor(Math.random() * (max - min +1) + min);
}
function img16(min,max) {
    min = Math.ceil(0);
    max = Math.floor(15);
    randnum = Math.floor(Math.random() * (max - min +1) + min);
}






















bot.on('message', message => {
if (message.author.bot.valueOf() === true){
        //console.log("Bip, Boup, Bip ?")
}else{

    if (!message.content.startsWith(prefix))return;
    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()){
        
        case "randpoke" :
        poke_random();
        console.log(randnum);
        dex.findPokemon(`${randnum}`, function(p){
                var colortype = p.types[0]
                dex.findType(`${colortype}`, function(t) {
                    var colorembed = t.color
            if (!p.evolutions[0] && p.evolution_from === null){
                var pokenumber = db.get('evolu').size().value();
                var evol = `${p.names.en}`
                db.get('evolu')
                    .push({evol, pokenumber})
                    .write();
            }else{
                if (!p.evolutions[0]){
                    var pokevol = p.evolution_from
                    var pokenumber = db.get('evolu').size().value();
                    dex.findPokemon(`${pokevol}`, function(p){
                        if(!p.evolution_from){
                            var evol = `${p.names.en}> ${p.evolutions[0].to}`
                            db.get('evolu')
                                .push({evol, pokenumber})
                                .write();
                        }else{
                            var evol = `${p.evolution_from}> ${p.names.en}> ${p.evolutions[0].to}`
                            db.get('evolu')
                                .push({evol, pokenumber})
                                .write();
                        }
                    })
                }else{
                    if (p.evolution_from === null){
                        var pokevol = p.evolutions[0].to
                        var pokenumber = db.get('evolu').size().value();
                        dex.findPokemon(`${pokevol}`, function(p){
                            if (!p.evolutions[0]){
                                var evol = `${p.evolution_from}> ${p.names.en}`
                                db.get('evolu')
                                    .push({evol, pokenumber})
                                    .write();
                            }else{
                                var evol = `${p.evolution_from}> ${p.names.en}>  ${p.evolutions[0].to}`
                                db.get('evolu')
                                    .push({evol, pokenumber})
                                    .write();
                        }
                    });
                    }else{
                        var pokenumber = db.get('evolu').size().value();
                        var evol = `${p.evolution_from}> ${p.names.en}>  ${p.evolutions[0].to}`
                            db.get('evolu')
                                .push({evol, pokenumber})
                                .write();
                    }
                }
            }
            if (p.pokedex_entries.Sun === undefined){
                var des = p.pokedex_entries.X.en
            }else{
                var des = p.pokedex_entries.Sun.en
            }
            if(!p.abilities[1]){
                var pokeabi = p.abilities[0].name
            }else{
                if(!p.abilities[2]){
                    var pokeabi = `${p.abilities[0].name}, ${p.abilities[1].name}`
                }else{
                    var pokeabi = `${p.abilities[0].name}, ${p.abilities[1].name}, ${p.abilities[2].name}`
            }
            }
            var pokevalue = db.get(`evolu[${pokenumber}].evol`).toString().value();
            var u = "`"
            var pokem = new Discord.RichEmbed()
                    .setColor(`${colorembed}`)
                    .setTitle(`__${p.names.en}__/${p.names.fr} #${p.national_id}`, true)
                    .addField(`Feature :`, `Type : ${p.types} \nAbilities : ${pokeabi}\nEgg Groupe : ${p.egg_groups}`, true)
                    .addField(`Stats :`, `${u}HP : ${p.base_stats.hp}${u}    ${u}ATK : ${p.base_stats.atk}${u}\n${u}DEF : ${p.base_stats.def}${u}   ${u}SPA : ${p.base_stats.sp_atk}${u}\n${u}SPD : ${p.base_stats.sp_def}${u}   ${u}SPE : ${p.base_stats.speed}${u}`, true)
                    .addField("Description :", `${des}`, true)
                    .addField("Other", `Height : ${p.height_eu}\nWeight : ${p.weight_eu}\nFamily : ${pokevalue}`, true)
                    .setImage(`http://pokestrat.com/fiche-pokemon/img_3ds/${p.national_id}.gif`, true)
                    .setFooter(`#${bot.user.username}`, `${bot.user.avatarURL}`, true)
                    message.channel.send(pokem)
                });
        });
        break;
        
        case "dex": 
        var pokedit = message.content.substr(5);
        console.log(`demande pokemon : ${pokedit}`)
        var infodex = (pokedit.charAt(0).toUpperCase() + pokedit.substring(1).toLowerCase());
        dex.findPokemon(`${infodex}`, function(p){
            if (p === null){
                console.log("indetermined")
                message.channel.send("check spelling pliz")
            }else{
                var colortype = p.types[0]
                dex.findType(`${colortype}`, function(t) {
                    var colorembed = t.color
            if (!p.evolutions[0] && p.evolution_from === null){
                var pokenumber = db.get('evolu').size().value();
                var evol = `${p.names.en}`
                db.get('evolu')
                    .push({evol, pokenumber})
                    .write();
            }else{
                if (!p.evolutions[0]){
                    var pokevol = p.evolution_from
                    var pokenumber = db.get('evolu').size().value();
                    dex.findPokemon(`${pokevol}`, function(p){
                        if(!p.evolution_from){
                            var evol = `${p.names.en}> ${p.evolutions[0].to}`
                            db.get('evolu')
                                .push({evol, pokenumber})
                                .write();
                        }else{
                            var evol = `${p.evolution_from}> ${p.names.en}> ${p.evolutions[0].to}`
                            db.get('evolu')
                                .push({evol, pokenumber})
                                .write();
                        }
                    })
                }else{
                    if (p.evolution_from === null){
                        var pokevol = p.evolutions[0].to
                        var pokenumber = db.get('evolu').size().value();
                        dex.findPokemon(`${pokevol}`, function(p){
                            if (!p.evolutions[0]){
                                var evol = `${p.evolution_from}> ${p.names.en}`
                                db.get('evolu')
                                    .push({evol, pokenumber})
                                    .write();
                            }else{
                                var evol = `${p.evolution_from}> ${p.names.en}>  ${p.evolutions[0].to}`
                                db.get('evolu')
                                    .push({evol, pokenumber})
                                    .write();
                        }
                    });
                    }else{
                        var pokenumber = db.get('evolu').size().value();
                        var evol = `${p.evolution_from}> ${p.names.en}>  ${p.evolutions[0].to}`
                            db.get('evolu')
                                .push({evol, pokenumber})
                                .write();
                    }
                }
            }
            if (p.pokedex_entries.Sun === undefined){
                var des = p.pokedex_entries.X.en
            }else{
                var des = p.pokedex_entries.Sun.en
            }
            if(!p.abilities[1]){
                var pokeabi = p.abilities[0].name
            }else{
                if(!p.abilities[2]){
                    var pokeabi = `${p.abilities[0].name}, ${p.abilities[1].name}`
                }else{
                    var pokeabi = `${p.abilities[0].name}, ${p.abilities[1].name}, ${p.abilities[2].name}`
            }
            }
            var pokevalue = db.get(`evolu[${pokenumber}].evol`).toString().value();
            var u = "`"
            var pokem = new Discord.RichEmbed()
                    .setColor(`${colorembed}`)
                    .setTitle(`__${p.names.en}__/${p.names.fr} #${p.national_id}`, true)
                    .addField(`Feature :`, `Type : ${p.types} \nAbilities : ${pokeabi}\nEgg Groupe : ${p.egg_groups}`, true)
                    .addField(`Stats :`, `${u}HP : ${p.base_stats.hp}${u}    ${u}ATK : ${p.base_stats.atk}${u}\n${u}DEF : ${p.base_stats.def}${u}   ${u}SPA : ${p.base_stats.sp_atk}${u}\n${u}SPD : ${p.base_stats.sp_def}${u}   ${u}SPE : ${p.base_stats.speed}${u}`, true)
                    .addField("Description :", `${des}`, true)
                    .addField("Other", `Height : ${p.height_eu}\nWeight : ${p.weight_eu}\nFamily : ${pokevalue}`, true)
                    .setImage(`http://pokestrat.com/fiche-pokemon/img_3ds/${p.national_id}.gif`, true)
                    .setFooter(`#${bot.user.username}`, `${bot.user.avatarURL}`, true)
                    message.channel.send(pokem)
                });
            }
        });
        break;

        case "megadex": 
        var pokedit = message.content.substr(9);
        console.log(`demande mega ${pokedit}`)
        var infodex = (pokedit.charAt(0).toUpperCase() + pokedit.substring(1).toLowerCase());
        var imagedex = (pokedit.substring(0).toLowerCase());
        dex.findPokemon(`${infodex}`, function(p){
        if (p === null){
            console.log("indetermined")
            message.channel.send("check spelling pliz")
        }else{
            var colortype = p.types[0]
                dex.findType(`${colortype}`, function(t) {
                    var colorembed = t.color
            if (p.pokedex_entries.Sun === undefined){
                var des = p.pokedex_entries.X.en
            }else{
                var des = p.pokedex_entries.Sun.en
            }
            var u = "`"
            var pokem = new Discord.RichEmbed()
                    .setColor(`${colorembed}`)
                    .setTitle(`__${p.names.en}__/${p.names.fr} #${p.national_id}`, true)
                    .addField(`Feature :`, `Type : ${p.mega_evolutions[0].types} \nAbilities : ${p.mega_evolutions[0].ability}\nEgg Groupe : ${p.egg_groups}`, true)
                    .addField(`Stats :`, `${u}HP : ${p.mega_evolutions[0].base_stats.hp}${u}   ${u}ATK : ${p.mega_evolutions[0].base_stats.atk}${u}\n${u}DEF : ${p.mega_evolutions[0].base_stats.def}${u}   ${u}SPA : ${p.mega_evolutions[0].base_stats.sp_atk}${u}\n${u}SPD : ${p.mega_evolutions[0].base_stats.sp_def}${u}   ${u}SPE : ${p.mega_evolutions[0].base_stats.speed}${u}`, true)
                    .addField("Other", `Height : ${p.mega_evolutions[0].height_eu}\nWeight : ${p.mega_evolutions[0].weight_eu}`, true)
                    .addField("Description :", `${des}`, true)
                    .setImage(`https://play.pokemonshowdown.com/sprites/xyani/${imagedex}-mega.gif`, true)
                    .setFooter(`#${bot.user.username}`, `${bot.user.avatarURL}`, true)
                    message.channel.send(pokem)
                });
            }
        });
        break;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        case "move":
        var movedit = message.content.substr(6);
        console.log(`demande move : ${movedit}`)
        var movedex = (movedit.charAt(0).toUpperCase() + movedit.substring(1).toLowerCase());
        var debutDeusième = movedex.indexOf(" ")
        var debuttroisième = movedex.indexOf("-")
        if (debuttroisième === -1){
            var prems = movedex.substring(0, debutDeusième)
            var deusieme_mot = movedex.charAt(debutDeusième)+movedex.charAt(debutDeusième+1).toUpperCase()+movedex.substring(debutDeusième+2).toLowerCase();
            var move_dex = prems + deusieme_mot 
        }else{
            if(debutDeusième === -1){
                debutDeusième = movedex.indexOf("-")
                var prems = movedex.substring(0, debutDeusième)
                var deusieme_mot = movedex.charAt(debutDeusième)+movedex.charAt(debutDeusième+1).toUpperCase()+movedex.substring(debutDeusième+2).toLowerCase();
                var move_dex = prems + deusieme_mot 
            }else{
                var debutDeusième = movedex.indexOf("-")
                var debuttroisième = movedex.indexOf(" ")
                var prems = movedex.substring(0, debutDeusième)
                var deusieme_mot = movedex.charAt(debutDeusième)+movedex.charAt(debutDeusième+1).toUpperCase()+movedex.substring(debutDeusième+2, debuttroisième).toLowerCase();
                var troisième_mot = movedex.charAt(debuttroisième)+movedex.charAt(debuttroisième+1).toUpperCase()+movedex.substring(debuttroisième+2).toLowerCase();
                var move_dex = prems + deusieme_mot + troisième_mot
            }
        }
        //j'ai modifié u-turn, v-creat, trick-or-treat et will-o-wisp pour que ca fonctionne
        dex.findMove(`${move_dex}`, function(m){
            if (m === null){
                console.log("indetermined")
                message.channel.send("check spelling of move pliz")
            }else{
                var cate = (m.category.charAt(0).toUpperCase() + m.category.substring(1).toLowerCase());
                var colortype = m.type
                var u = "`"
                dex.findType(`${colortype}`, function(t) {
                    var colorembed = t.color
                    var movem = new Discord.RichEmbed()
                    .setColor(`${colorembed}`)
                    .setTitle(`__${m.names.en}__/${m.names.fr}`, true)
                    .addField("Stats", `Type : ${u}${m.type}${u}   Category : ${u}${cate}${u} \nPower : ${m.power}   Accuracy : ${m.accuracy}   Max PP : ${m.max_pp}`, true)
                    .addField("Description :", `${m.descriptions.en}`, true)
                    .setThumbnail(`https://cdn.discordapp.com/attachments/407126924889161739/420612540721004546/123.PNG`)
                    .setFooter(`#${bot.user.username}`, `${bot.user.avatarURL}`, true)
                    message.channel.send(movem)
            });
        }
        });
        break;

        case "ability":
        var movedit = message.content.substr(9);
        console.log(`demande ability : ${movedit}`)
        var movedex = (movedit.charAt(0).toUpperCase() + movedit.substring(1).toLowerCase());
        var debutDeusième = movedex.indexOf(" ")
        var prems = movedex.substring(0, debutDeusième)
        var deusieme_mot = movedex.charAt(debutDeusième)+movedex.charAt(debutDeusième+1).toUpperCase()+movedex.substring(debutDeusième+2).toLowerCase();
        var move_dex = prems + deusieme_mot 
        //console.log(move_dex)
        dex.findAbility(`${move_dex}`, function(a){
            if (a === null){
                console.log("indetermined")
                message.channel.send("check spelling pliz")
            }else{
                    var movem = new Discord.RichEmbed()
                        .setColor(`01B6B6`)
                        .setTitle(`__${a.names.en}__/${a.names.fr}`, true)
                        .addField("Description :", `${a.descriptions.en}`, true)
                        .setThumbnail("https://cdn1.iconfinder.com/data/icons/smashicons-movies-yellow/57/63_-Pokemon-_Yellow-512.png")
                        .setFooter(`#${bot.user.username}`, `${bot.user.avatarURL}`, true)
                        message.channel.send(movem)
        }
        });
        break;

        case "item":
        var itemdit = message.content.substr(6)
        console.log(itemdit)
        var itemdex = (itemdit.charAt(0).toUpperCase() + itemdit.substring(1).toLowerCase());
        var debutDeusième = itemdex.indexOf(" ")
        var prems = itemdex.substring(0, debutDeusième)
        var deusieme_mot = itemdex.charAt(debutDeusième)+itemdex.charAt(debutDeusième+1).toUpperCase()+itemdex.substring(debutDeusième+2).toLowerCase();
        var itemenvoi = prems + deusieme_mot
        var item = dbitem.get(`item[0].${itemenvoi}`).toString().value();
        //img 
        var premsimg = itemdit.substring(0, debutDeusième).toLowerCase();
        var deusieme_mot_img = itemdit.substring(debutDeusième+1).toLowerCase();
        var itemimg = premsimg + deusieme_mot_img
        console.log(item)
        console.log(itemimg)
        if (!item){
            console.log("indetermined")
            message.channel.send("check spelling pliz")
        }else{
            var movem = new Discord.RichEmbed()
                .setColor(`01B6B6`)
                .setTitle(`__${itemenvoi}__`, true)
                .addField("Description :", `${item}`, true)
                .setThumbnail(`https://www.serebii.net/itemdex/sprites/pgl/${itemimg}.png`)
                .setFooter(`#${bot.user.username}`, `${bot.user.avatarURL}`, true)
                message.channel.send(movem)
        }
        break;

        case "nat":
        var natdit = message.content.substr(5);
        console.log(`demande nature : ${natdit}`)
        var infonat = (natdit.charAt(0).toUpperCase() + natdit.substr(1).toLowerCase());
        dex.findNature(`${infonat}`, function(n){
            if (n === null){
                console.log("indetermined")
                message.channel.send("check spelling pliz")
            }else{
                var movem = new Discord.RichEmbed()
                .setColor(`01B6B6`)
                .setTitle(`__${n.names.en}__`, true)
                .addField("Increase and Decreased Stat:", `Increase(+) : ${n.increased_stat}\nDecreased(-) : ${n.decreased_stat}`, true)
                .addField("Flavor:", `Fovorite : ${n.favorite_flavor} \nDisliked : ${n.disliked_flavor}`)
                .setThumbnail("https://cdn1.iconfinder.com/data/icons/smashicons-movies-yellow/57/63_-Pokemon-_Yellow-512.png")
                .setFooter(`#${bot.user.username}`, `${bot.user.avatarURL}`, true)
                message.channel.send(movem)
            }
        });
        break;

        case "type":
        console.log("type demander")
        var chart = new Discord.RichEmbed()
            .setColor('1D8376')
            .setTitle("Typ Chart")
            .setImage("https://d1k5w7mbrh6vq5.cloudfront.net/images/cache/62/21/f5/6221f5322f4ab077b8e692acc8d7ffb4.png")
            message.channel.send(chart)
        break;
        case"set":
        break;

        case "shiny":
        var shinydit = message.content.substr(7);
        console.log(`${shinydit} shiny`)
        var shinydex = (shinydit.charAt(0).toUpperCase() + shinydit.substring(1).toLowerCase());
        var pokeshiny = new Discord.RichEmbed()
                  .setColor('1D8376')
                  .setImage(`http://play.pokemonshowdown.com/sprites/xyani-shiny/${shinydex}.gif`)
                  message.channel.sendEmbed(pokeshiny);
        break;
    }

}
})
function poke_random(min,max) {
    min = Math.ceil(0);
    max = Math.floor(802);
    randnum = Math.floor(Math.random() * (max - min +1) + min);

}
