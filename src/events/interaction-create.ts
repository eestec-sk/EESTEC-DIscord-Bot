import {
    handleButton,
    handleChatInputCommand,
    handleUserContextMenuCommand,
  } from '../interactions/handlers.js';
  import { logErrorFunctions } from '../data/logs.js';
  import { logger } from '../utilities/logger.js';
  import { type ClientEvents, Events } from 'discord.js';
  
  export const name = Events.InteractionCreate;
  
  export const execute = async (...[interaction]: ClientEvents[typeof name]) => {
    if (interaction.isChatInputCommand()) {
      await handleChatInputCommand(interaction);
    } else if (interaction.isButton()) {
      await handleButton(interaction);
    } else if (interaction.isUserContextMenuCommand()) {
      await handleUserContextMenuCommand(interaction);
    } else {
      logger.warn(logErrorFunctions.unknownInteractionError(interaction.user.id));
    }
  };