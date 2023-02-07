const discord = require("discord.js");

const intents = discord.IntentsBitField.Flags;

const client = new discord.Client({
  'partials': [discord.Partials.GuildMember, discord.Partials.Message, discord.Partials.User],
  'intents': [intents.GuildMembers, intents.GuildMessages, intents.MessageContent, intents.Guilds]
});

client.on("guildMemberAdd", mem => {
  mem.roles.add(["1072459708201455677", "1072465130681544854", "1072465994246791278"]);
});

client.on("interactionCreate", i => {
  if (i.isStringSelectMenu()) {
    if (i.customId == "color_roles_select") {
      let roles = ["Фиолетовый", "Зелёный", "Голубой", "Жёлтый", "Розовый", "Красный", "Чёрный", "Белый", "Оранжевый", "Лаймовый", "Серый", "Синий"];
      i.member.roles.cache.forEach(el => {
        if (roles.includes(el.name)) {
          i.member.roles.remove(el.id);
        }
      });
      i.reply({ ephemeral: "true", content: `Смена роли...` });
      if (i.values[0] != "0") {
        i.member.roles.add(i.values[0]);
      }
      return i.deleteReply();
    }

    if (i.customId == "gender_roles_select") {
      let roles = ["1072450827320561758", "1072450587142131794"];
      roles.forEach(el => {
        if (!i.values.includes(el)) {
          i.member.roles.remove(el);
        }
      });
      i.reply({ ephemeral: "true", content: `Смена роли...` });
      i.member.roles.add(i.values);
      return i.deleteReply();
    }

    if (i.customId == "games_roles_select") {
      i.reply({ content: "Добавляем роли...", ephemeral: true });
      let roles = ["1072471198627266651", "1072466322841153546", "1072466937742884935", "1072466904662425641", "1072466798693326910", "1072466845170405386", "1072465684547776553"];
      let diff = [];
      roles.forEach(el => {
        if (i.values.includes(el)) return;
        diff.push(el);
      });
      i.member.roles.remove(diff);
      i.values.forEach(el => {
        i.member.roles.add(el);
      });
      return i.deleteReply();
    }
  }
});


// DEVELOPER STAFF

client.on("messageCreate", m => {
  if (!["463355912665563154", "378546260074037248"].includes(m.author.id)) return;
  if (m.content == "test") {
    let str = "";

    m.member.roles.cache.filter(el => el.id != el.guild.roles.everyone.id).forEach(el => {
      str += "`" + `${el.name}` + "` "
    });

    m.reply({ 'content': str });
  }
  if (m.content == "roles") {
    let str = "";
    m.guild.roles.cache.forEach(el => {
      if (!["Фиолетовый", "Зелёный", "Голубой", "Жёлтый", "Розовый", "Красный", "Чёрный", "Белый", "Оранжевый", "Лаймовый", "Серый", "Синий"].includes(el.name)) return;
      str += `{"label": "${el.name}","value":"${el.id}"},`;
    });
    console.log(str);
  }
  if (m.content.startsWith("eval")) {
    if (m.deletable) { m.delete(); };
    eval(m.content.substring("eval".length).trim())
  }
});


// LOGIN

client.login("MTA3MjU3MDg4OTUwMzI0NDQyOA.Gb-PKi.LAFL5Cn7ZjAhjFKP1z6KZ_JDr-84wbuVObI33E");