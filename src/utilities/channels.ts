import { logger } from './logger.js';
import { logErrorFunctions } from '../data/logs.js';
import { ChannelName } from '../types/channel-name.js';
import {
    type EmbedBuilder,
    type GuildTextBasedChannel,
    type Interaction,
    type InteractionResponse,
    type Message,
  } from 'discord.js';

const channels: Partial<Record<ChannelName, GuildTextBasedChannel | undefined>> = {};

export const deleteResponse = async (
    message: InteractionResponse | Message,
    interval?: number,
  ) => {  
    interval = interval ?? 5;

    await setTimeout(async () => {
        try {
            await message.delete();
        } catch (error) {
            logger.error(logErrorFunctions.responseDeleteError(message.id, error));
        }
    });
  };

export const logEmbed = async (
    embed: EmbedBuilder,
    interaction: Interaction,
    type: ChannelName,
  ) => {
    const channel = channels[type];
  
    if (channel === undefined || !channel.isTextBased()) {
      return;
    }
  
    try {
      await channel.send({
        embeds: [embed],
      });
    } catch (error) {
      logger.error(logErrorFunctions.interactionLogError(interaction.id, error));
    }
  };