const discord = require("discord.js");

const intents = discord.IntentsBitField.Flags;

const client = new discord.Client({
  'partials': [discord.Partials.GuildMember, discord.Partials.Message, discord.Partials.User],
  'intents': [intents.GuildMembers, intents.GuildMessages, intents.MessageContent, intents.Guilds]
});

client.on("guildMemberAdd", mem => {
  mem.roles.add(["1072459708201455677", "1072465130681544854", "1072465994246791278"]);
});

client.on("interactionCreate", async i => {

  // if (!["463355912665563154"].includes(i.user.id)) return i.reply({ ephemeral: true, content: "Извините, в данный момент работа бота ограничена." })

  try {
    if (i.isStringSelectMenu()) {
      i.reply({ ephemeral: true, content: "Идёт обработка запроса..." });
      if (i.customId == "color_roles_select") {
        let roles = ["1072568101822021702", "1072568097032130570", "1072568099255111833", "1072568105575919726", "1072568103461998765", "1072568095979352064", "1072568082700173362", "1072567020865994802", "1072568106611900517", "1072568100404334712", "1072568098164592701", "1072568104619614318"];

        roles = await (i.member.roles.cache.filter(el => roles.includes(el.id)))

        if (i.values.length != 0) {
          if (!i.member.roles.cache.has("1073278486317379604")) {
            await i.member.roles.add("1073278486317379604");
          }
          await i.member.roles.add(i.values);
        } else if (i.member.roles.cache.has("1073278486317379604")) {
          await i.member.roles.remove("1073278486317379604")
        }

        await i.member.roles.remove(roles);

        return await i.deleteReply();
      }

      if (i.customId == "gender_roles_select") {
        let roles = ["1072450827320561758", "1072450587142131794"];
        roles = roles.filter(el => el != i.values[0]);
        await (roles.forEach(async el => {
          if (i.member.roles.cache.has(el)) {
            await i.member.roles.remove(el);
          }
        }));
        if (i.values[0] != undefined) {
          await i.member.roles.add(i.values[0])
        }
        i.deleteReply();
      }

      if (i.customId == "games_roles_select") {
        let roles = ["1072471198627266651", "1072466322841153546", "1072466937742884935", "1072466904662425641", "1072466798693326910", "1072466845170405386", "1072465684547776553", "1072627973460603003"];
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
  } catch (err) {
    console.log(err);
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
    try {
      if (m.deletable) { m.delete(); };
      eval(m.content.substring("eval".length).trim())
    } catch (err) {
      console.log(err);
    }
  }
});

// LOGIN

client.login(process.env.BOT_TOKEN);