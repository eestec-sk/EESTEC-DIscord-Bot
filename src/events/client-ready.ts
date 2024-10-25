import { logger } from '../utilities/logger.js';
import { logMessageFunctions } from '../data/logs.js';
import { client as bot } from '../utilities/client.js';
import { type ClientEvents, Events } from 'discord.js';

export const name = Events.ClientReady;
export const once = true;

export const execute = async (...[client]: ClientEvents[typeof name]) => {
    await client.application?.commands.fetch();
    logger.info(logMessageFunctions.loggedIn(bot.user?.tag));
};
