import { getHelpEmbed } from '../components/commands.js';
import { getPaginationComponents } from '../components/pagination.js';
import {
  commandDescriptions,
  commandErrors,
} from '../data/commands.js';
import { logErrorFunctions } from '../data/logs.js';
import { client } from '../utilities/client.js';
import { deleteResponse } from '../utilities/channels.js';
import { logger } from '../utilities/logger.js';
import {
  type ChatInputCommandInteraction,
  ComponentType,
  SlashCommandBuilder,
} from 'discord.js';

const name = 'help';

export const data = new SlashCommandBuilder()
  .setName(name)
  .setDescription(commandDescriptions[name]);

export const execute = async (interaction: ChatInputCommandInteraction) => {

  await client.application?.commands.fetch();

  const commands = Object.keys(commandDescriptions);

  const commandsPerPage = 8;
  const pages = Math.ceil(commands.length / commandsPerPage);
  const embed = await getHelpEmbed(commands, 0, commandsPerPage);
  const components = [
    pages === 0 || pages === 1
      ? getPaginationComponents('help')
      : getPaginationComponents('help', 'start'),
  ];
  const message = await interaction.editReply({
    components,
    embeds: [embed],
  });
  const collector = message.createMessageComponentCollector({
    componentType: ComponentType.Button,
  });

  collector.on('collect', async (buttonInteraction) => {
    if (
      buttonInteraction.user.id !==
      buttonInteraction.message.interaction?.user.id
    ) {
      const mess = await buttonInteraction.reply({
        content: commandErrors.buttonNoPermission,
        ephemeral: true,
      });
      void deleteResponse(mess);

      return;
    }

    const id = buttonInteraction.customId.split(':')[1];

    if (id === undefined) {
      return;
    }

    let buttons;
    let page =
      Number(
        buttonInteraction.message.embeds[0]?.footer?.text?.match(/\d+/gu)?.[0],
      ) - 1;

    if (id === 'first') {
      page = 0;
    } else if (id === 'last') {
      page = pages - 1;
    } else if (id === 'previous') {
      page--;
    } else if (id === 'next') {
      page++;
    }

    if (page === 0 && (pages === 0 || pages === 1)) {
      buttons = getPaginationComponents('help');
    } else if (page === 0) {
      buttons = getPaginationComponents('help', 'start');
    } else if (page === pages - 1) {
      buttons = getPaginationComponents('help', 'end');
    } else {
      buttons = getPaginationComponents('help', 'middle');
    }

    const nextEmbed = await getHelpEmbed(commands, page, commandsPerPage);

    try {
      await buttonInteraction.update({
        components: [buttons],
        embeds: [nextEmbed],
      });
    } catch (error) {
      logger.error(
        logErrorFunctions.interactionUpdateError(
          buttonInteraction.customId,
          error,
        ),
      );
    }
  });

  collector.on('end', async () => {
    try {
      await interaction.editReply({
        components: [getPaginationComponents('help')],
      });
    } catch (error) {
      logger.error(logErrorFunctions.collectorEndError(name, error));
    }
  });
};