const { EmbedBuilder } = require("discord.js");
const { GuildMember, Embed, InteractionCollector } = require("discord.js");
const Schema = require("../../Schemas/leave");

module.exports = {
  name: "guildMemberLeave",
  async execute(member) {
    Schema.findOne({ Guild: member.guild.id }, async (err, data) => {
      if (!data) return;
      let channel = data.Channel;
      let Msg = data.Msg || " ";

      const { user, guild } = member;
      const leaveChannel = member.guild.channels.cache.get(data.Channel);

      const welcomeEmbed = new EmbedBuilder()
        .setTitle("**Member Left**")
        .setDescription(data.Msg)
        .setColor(0x037821)
        .addFields({ name: "Total members", value: `${guild.memberCount}` })
        .setTimestamp();

      leaveChannel.send({ embeds: [welcomeEmbed] });
    });
  },
};
