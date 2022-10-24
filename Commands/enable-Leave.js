const {Message, Client, SlashCommandBuilder, PermissionFlagsBits} = require("discord.js");
const leaveSchema = require("../../Schemas/leave");
const {model, Schema} = require("mongoose");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("enable-leave")
    .setDescription("Set your leave for the member who leaves your server")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption(option => 
        option.setName("channel")
        .setDescription("Channel for leave message.")
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName("leave-message")
        .setDescription("Enter your leave message.")
        .setRequired(true)
    ),

    async execute(interaction) {
        const {channel, options} = interaction;

        const leaveChannel = options.getChannel("channel");
        const leaveMessage = options.getString("leave-message");

        if(!interaction.guild.members.me.permissions.has(PermissionFlagsBits.SendMessages)) {
            interaction.reply({content: "I don't have permissions for this.", ephemeral: true});
        }

       leaveSchema.findOne({Guild: interaction.guild.id}, async (err, data) => {
            if(!data) {
                const newleave = await leaveSchema.create({
                    Guild: interaction.guild.id,
                    Channel: leaveChannel.id,
                    Msg: leaveMessage,
                });
            }
            interaction.reply({content: 'Succesfully created a leave message', ephemeral: true});
        })
    }
}