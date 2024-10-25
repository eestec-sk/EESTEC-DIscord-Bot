import { aboutMessage, botName } from '../data/about.js';
import { boardInfoMessages } from '../data/boardinfo.js';
import { commandDescriptions } from '../data/commands.js';
import { commandMention } from '../utilities/commands.js';
import { embedMessages } from '../data/embeds.js';
import { paginationStringFunctions } from '../data/pagination.js';
import { constants } from '../data/constants.js';
import {
    ColorResolvable,
    EmbedBuilder,
  } from 'discord.js';

export const getAboutEmbed = async () => {
    return new EmbedBuilder()
      .setTitle(botName)
      .setColor(constants.eestecRed as ColorResolvable)
      .setDescription(
        aboutMessage(commandMention('help')),
      )
      .setTimestamp();
  };

  export const getCurrentBoardInfoEmbed = async () => {
    return new EmbedBuilder()
      .setTitle("Информации за тековниот борд")
      .setColor(constants.eestecRed as ColorResolvable)
      .setDescription(
        boardInfoMessages.currentBoard
      )
      .setTimestamp();
  };

export const getHelpEmbed = async (
    commands: string[],
    page: number,
    commandsPerPage: number = 8,
  ) => {
    return new EmbedBuilder()
      .setTitle('Команди')
      .setColor(constants.eestecRed as ColorResolvable)
      .setDescription(embedMessages.allCommands)
      .addFields(
        ...commands
          .slice(commandsPerPage * page, commandsPerPage * (page + 1))
          .map((command) => ({
            name: commandMention(command),
            value:
              commandDescriptions[command as keyof typeof commandDescriptions],
          })),
      )
      .setFooter({
        text: paginationStringFunctions.commandPage(
          page + 1,
          Math.max(1, Math.ceil(commands.length / commandsPerPage)),
          commands.length,
        ),
      })
      .setTimestamp();
  };

