const request = require("request");

exports.run = async (client, msg, [search, resultNum]) => {
  const baseUrl = "http://api.urbandictionary.com/v0/define?term=";
  const theUrl = baseUrl + search;
  request({
    url: theUrl,
    json: true,
  }, (error, response, body) => {
    if (!resultNum) {
      resultNum = 0;
    } else if (resultNum > 1) {
      resultNum -= 1;
    }
    const result = body.list[resultNum];
    if (result) {
      const definition = [
        `**Word:** ${search}`,
        "",
        `**Definition:** ${resultNum += 1} out of ${body.list.length}\n_${result.definition}_`,
        "",
        `**Example:**\n${result.example}`,
        `<${result.permalink}>`,
      ];
      msg.channel.sendMessage(definition).catch(err => client.funcs.log(err.stack, "error"));
    } else {
      msg.channel.sendMessage("No entry found.").catch(err => client.funcs.log(err.stack, "error"));
    }
  });
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text", "dm"],
  aliases: ["df", "urbandic"],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "urban",
  description: "Searches the Urban Dictionary library for a definition to the search term.",
  usage: "<search:str> [resultNum:int]",
  usageDelim: ", ",
  extendedHelp: "",
};
