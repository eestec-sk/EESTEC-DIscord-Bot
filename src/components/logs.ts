import { embedLabels } from '../data/embeds.js';
import {
  fetchMessageUrl,
  getButtonCommand,
  getButtonInfo,
  getChannelMention,
} from './utilities.js';
import {
  type AutocompleteInteraction,
  type ButtonInteraction,
  type ChatInputCommandInteraction,
  EmbedBuilder,
  inlineCode,
  type UserContextMenuCommandInteraction,
  userMention,
} from 'discord.js';

export const getChatInputCommandEmbed = async (
  interaction: ChatInputCommandInteraction,
) => {
  return new EmbedBuilder()
    .setColor('#E50200')
    .setTitle(embedLabels.chatInputInteraction)
    .setAuthor({
      iconURL: interaction.user.displayAvatarURL(),
      name: interaction.user.tag,
      ...(await fetchMessageUrl(interaction)),
    })
    .addFields(
      {
        inline: true,
        name: embedLabels.author,
        value: userMention(interaction.user.id),
      },
      {
        inline: true,
        name: embedLabels.channel,
        value: getChannelMention(interaction),
      },
      {
        inline: true,
        name: embedLabels.command,
        value: inlineCode(
          interaction.toString().length > 300
            ? interaction.toString().slice(0, 300)
            : interaction.toString(),
        ),
      },
    )
    .setFooter({
      text: interaction.id,
    })
    .setTimestamp();
};

export const getUserContextMenuCommandEmbed = async (
  interaction: UserContextMenuCommandInteraction,
) => {
  return new EmbedBuilder()
    .setColor('#E50200')
    .setTitle(embedLabels.userContextMenuInteraction)
    .setAuthor({
      iconURL: interaction.user.displayAvatarURL(),
      name: interaction.user.tag,
      ...(await fetchMessageUrl(interaction)),
    })
    .addFields(
      {
        name: embedLabels.author,
        value: userMention(interaction.user.id),
      },
      {
        name: embedLabels.channel,
        value: getChannelMention(interaction),
      },
      {
        name: embedLabels.command,
        value: inlineCode(interaction.commandName),
      },
      {
        name: embedLabels.target,
        value: userMention(interaction.targetUser.id),
      },
    )
    .setFooter({
      text: interaction.id,
    })
    .setTimestamp();
};

export const getButtonEmbed = (
  interaction: ButtonInteraction,
  command: string = 'unknown',
  args: string[] = [],
) => {
  return new EmbedBuilder()
    .setColor('#E50200')
    .setTitle(embedLabels.buttonInteraction)
    .setAuthor({
      iconURL: interaction.user.displayAvatarURL(),
      name: interaction.user.tag,
    })
    .addFields(
      {
        inline: true,
        name: embedLabels.author,
        value: userMention(interaction.user.id),
      },
      {
        inline: true,
        name: embedLabels.channel,
        value: getChannelMention(interaction),
      },
      {
        inline: true,
        name: embedLabels.command,
        value: getButtonCommand(command),
      },
      {
        inline: true,
        ...getButtonInfo(interaction, command, args),
      },
    )
    .setFooter({
      text: interaction.id,
    })
    .setTimestamp();
};

export const getAutocompleteEmbed = (interaction: AutocompleteInteraction) => {
  const focused = interaction.options.getFocused(true);

  return new EmbedBuilder()
    .setColor('#E50200')
    .setTitle(embedLabels.autocompleteInteraction)
    .setAuthor({
      iconURL: interaction.user.displayAvatarURL(),
      name: interaction.user.tag,
    })
    .addFields(
      {
        inline: true,
        name: embedLabels.author,
        value: userMention(interaction.user.id),
      },
      {
        inline: true,
        name: embedLabels.channel,
        value: getChannelMention(interaction),
      },
      {
        inline: true,
        name: embedLabels.command,
        value: inlineCode(focused.name),
      },
      {
        inline: true,
        name: embedLabels.value,
        value:
          focused.value === '' ? embedLabels.empty : inlineCode(focused.value),
      },
    )
    .setFooter({
      text: interaction.id,
    })
    .setTimestamp();
};