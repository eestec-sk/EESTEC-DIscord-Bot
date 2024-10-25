import {
    getButtonEmbed,
    getChatInputCommandEmbed,
    getUserContextMenuCommandEmbed,
  } from '../components/logs.js';
  import { commandErrors } from '../data/commands.js';
  import { logErrorFunctions, logShortStrings } from '../data/logs.js';
  import { deleteResponse, logEmbed } from '../utilities/channels.js';
  import { getCommand } from '../utilities/commands.js';
  import { logger } from '../utilities/logger.js';
  import {
    type ButtonInteraction,
    type ChatInputCommandInteraction,
    type UserContextMenuCommandInteraction,
  } from 'discord.js';
  
  const ignoredButtons = ['help', 'polls', 'exp'];
  
  export const handleChatInputCommand = async (
    interaction: ChatInputCommandInteraction,
  ) => {
    try {
      await interaction.deferReply();
    } catch (error) {
      logger.error(
        logErrorFunctions.chatInputInteractionDeferError(interaction, error),
      );
      await interaction.reply(commandErrors.commandError);
  
      return;
    }
  
    const command = await getCommand(interaction.commandName);
  
    logger.info(
      `${logShortStrings.chat} ${interaction.user.tag}: ${interaction} [${
        interaction.channel === null || interaction.channel.isDMBased()
          ? logShortStrings.dm
          : logShortStrings.guild
      }]`,
    );
    await logEmbed(
      await getChatInputCommandEmbed(interaction),
      interaction,
      'commands',
    );
  
    if (command === undefined) {
      logger.warn(logErrorFunctions.commandNotFound(interaction.id));
      await interaction.editReply(commandErrors.commandNotFound);
  
      return;
    }
    
    try {
      await command.execute(interaction);
    } catch (error) {
      logger.error(
        logErrorFunctions.chatInputInteractionError(interaction, error),
      );
    }
  };
  
  export const handleUserContextMenuCommand = async (
    interaction: UserContextMenuCommandInteraction,
  ) => {
    try {
      await interaction.deferReply();
    } catch (error) {
      logger.error(
        logErrorFunctions.userContextMenuInteractionDeferError(
          interaction,
          error,
        ),
      );
      await interaction.reply(commandErrors.commandError);
  
      return;
    }
  
    const command = await getCommand(interaction.commandName);
  
    logger.info(
      `${logShortStrings.user} ${interaction.user.tag}: ${
        interaction.commandName
      } [${
        interaction.channel === null || interaction.channel.isDMBased()
          ? logShortStrings.dm
          : logShortStrings.guild
      }]`,
    );
    await logEmbed(
      await getUserContextMenuCommandEmbed(interaction),
      interaction,
      'commands',
    );
  
    if (command === undefined) {
      logger.warn(logErrorFunctions.commandNotFound(interaction.id));
  
      return;
    }
  
    try {
      await command.execute(interaction);
    } catch (error) {
      logger.error(
        logErrorFunctions.userContextMenuInteractionError(interaction, error),
      );
    }
  };
  
  const buttonInteractionHandlers = {
  };
  const ephemeralResponseButtons = [''];
  
  export const handleButton = async (interaction: ButtonInteraction) => {
    const [command, ...args] = interaction.customId.split(':');
  
    logger.info(
      `${logShortStrings.button} ${interaction.user.tag}: ${
        interaction.customId
      } [${
        interaction.channel === null || interaction.channel.isDMBased()
          ? logShortStrings.dm
          : logShortStrings.guild
      }]`,
    );
    await logEmbed(
      getButtonEmbed(interaction, command, args),
      interaction,
      'commands',
    );
  
    if (command === undefined) {
      logger.warn(logErrorFunctions.commandNotFound(interaction.id));
  
      return;
    }
  
    if (ephemeralResponseButtons.includes(command)) {
      try {
        const mess = await interaction.deferReply({
          ephemeral: true,
        });
        void deleteResponse(mess, 10_000);
      } catch (error) {
        logger.error(
          logErrorFunctions.buttonInteractionDeferError(interaction, error),
        );
      }
    }
  
    if (Object.keys(buttonInteractionHandlers).includes(command)) {
    //   await buttonInteractionHandlers[
    //     command as keyof typeof buttonInteractionHandlers
    //   ](interaction, args);
    } else if (ignoredButtons.includes(command)) {
      // Do nothing
    } else {
      logger.warn(logErrorFunctions.commandNotFound(interaction.id));
    }
  };