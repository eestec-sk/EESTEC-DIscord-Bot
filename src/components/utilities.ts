import { embedLabels } from '../data/embeds.js';
import { labels } from '../data/labels.js';
import { logErrorFunctions } from '../data/logs.js';
import { logger } from '../utilities/logger.js';
import {
  type ButtonInteraction,
  channelMention,
  type ChatInputCommandInteraction,
  type Interaction,
  type UserContextMenuCommandInteraction,
} from 'discord.js';

export const truncateString = (
  string: string | null | undefined,
  length: number = 100,
) => {
  if (string === null || string === undefined) {
    return '';
  }

  return string.length > length
    ? string.slice(0, Math.max(0, length - 3)) + '...'
    : string;
};

export const getChannelMention = (interaction: Interaction) => {
  if (interaction.channel === null || interaction.channel.isDMBased()) {
    return labels.dm;
  }

  return channelMention(interaction.channel.id);
};

export const getButtonCommand = (command?: string) => {
  switch (command) {
    case undefined:
      return embedLabels.unknown;

    default:
      return command[0]?.toUpperCase() + command.slice(1);
  }
};

// eslint-disable-next-line complexity
export const getButtonInfo = (
  interaction: ButtonInteraction,
  command: string,
  args: string[],
) => {
  switch (command) {
    default:
      return {
        name: embedLabels.unknown,
        value: embedLabels.unknown,
      };
  }
};

export const fetchMessageUrl = async (
  interaction: ChatInputCommandInteraction | UserContextMenuCommandInteraction,
) => {
  if (
    interaction.channel === null ||
    !interaction.channel.isTextBased() ||
    interaction.channel.isDMBased()
  ) {
    return null;
  }

  try {
    return {
      url: (await interaction.fetchReply()).url,
    };
  } catch (error) {
    logger.warn(logErrorFunctions.messageUrlFetchError(interaction.id, error));

    return null;
  }
};