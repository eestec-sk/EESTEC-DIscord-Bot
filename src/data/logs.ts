import {
    type ButtonInteraction,
    type ChatInputCommandInteraction,
    type UserContextMenuCommandInteraction,
  } from 'discord.js';
  
  export const logShortStrings = {
    auto: '[Auto]',
    button: '[Button]',
    chat: '[Chat]',
    dm: 'DM',
    guild: 'Guild',
    user: '[User]',
  };
  
  export const logMessages = {
    channelsInitialized: 'Channels initialized',
    commandsRegistered: 'Commands registered',
    rolesInitialized: 'Roles initialized',
  };
  
  export const logMessageFunctions = {
    loggedIn: (username: string | undefined) =>
    `Logged in as ${username ?? 'an unknown user'}`,
  };
  
  export const logErrorFunctions = {
    addReactionError: (error: unknown) => `Failed adding reaction\n${error}`,
  
    antoCreateError: (error: unknown) => `Failed creating Anto fact\n${error}`,
  
    antoDeleteError: (error: unknown) => `Failed deleting Anto fact\n${error}`,
  
    antoRandomGetError: (error: unknown) =>
      `Failed getting random Anto fact\n${error}`,
  
    antosCreateError: (error: unknown) => `Failed creating Anto facts\n${error}`,
  
    antosParseError: (error: unknown) => `Failed parsing Anto facts\n${error}`,
  
    autocompleteResponseError: (userTag: string, error: unknown) =>
      `Failed responding to autocomplete interaction by ${userTag}\n${error}`,
  
    buttonInteractionDeferError: (
      interaction: ButtonInteraction,
      error: unknown,
    ) => `Failed deferring button interaction ${interaction.customId}\n${error}`,
  
    buttonInteractionOutsideGuildError: (customId: string) =>
      `Received button interaction ${customId} outside of a guild`,
  
    buttonInteractionPollOrOptionNotFoundError: (customId: string) =>
      `Received button interaction ${customId} for a poll that does not exist`,
  
    buttonInteractionResponseError: (error: unknown) =>
      `Failed responding to button interaction\n${error}`,
  
    buttonInteractionRoleError: (customId: string) =>
      `Received button interaction ${customId} for a role that does not exist`,
  
    chatInputInteractionDeferError: (
      interaction: ChatInputCommandInteraction,
      error: unknown,
    ) => `Failed deferring chat input interaction ${interaction}\n${error}`,
  
    chatInputInteractionError: (
      interaction: ChatInputCommandInteraction,
      error: unknown,
    ) => `Failed handling chat input interaction ${interaction}\n${error}`,
  
    collectorEndError: (command: string, error: unknown) =>
      `Failed ending ${command} collector\n${error}`,
  
    commandNotFound: (interactionId: string) =>
      `Command for interaction ${interactionId} not found`,
  
    commandsRegistrationError: (error: unknown) =>
      `Failed registering application commands\n${error}`,
  
    configSetError: (error: unknown) => `Failed setting config\n${error}`,
  
    crosspostError: (channelId: string, error: unknown) =>
      `Failed crossposting message in channel ${channelId}\n${error}`,
  
    embedSendError: (error: unknown) => `Failed sending embed\n${error}`,
  
    interactionLogError: (interactionId: string, error: unknown) =>
      `Failed logging interaction ${interactionId}\n${error}`,
  
    interactionUpdateError: (command: string, error: unknown) =>
      `Failed updating ${command} interaction\n${error}`,
  
    invalidButtonInteractionError: (customId: string) =>
      `Invalid button interaction ${customId}`,
  
    linkSendError: (error: unknown) => `Failed sending link\n${error}`,
  
    linksParseError: (error: unknown) => `Failed parsing links\n${error}`,
  
    loginFailed: (error: unknown) => `Failed logging in\n${error}`,
  
    messageUrlFetchError: (interactionId: string, error: unknown) =>
      `Failed fetching message URL for ${interactionId}\n${error}`,
  
    removeReactionError: (error: unknown) => `Failed removing reaction\n${error}`,
  
    responseDeleteError: (messageId: string, error: unknown) =>
      `Failed deleting message ${messageId}\n${error}`,
  
    scriptExecutionError: (error: unknown) => `Failed executing script\n${error}`,
  
    unknownInteractionError: (userId: string) =>
      `Unknown interaction from ${userId}`,
  
    userContextMenuInteractionDeferError: (
      interaction: UserContextMenuCommandInteraction,
      error: unknown,
    ) =>
      `Failed deferring user context menu interaction ${interaction.commandName}\n${error}`,
  
    userContextMenuInteractionError: (
      interaction: UserContextMenuCommandInteraction,
      error: unknown,
    ) =>
      `Failed handling user context menu interaction ${interaction.commandName}\n${error}`,
  };