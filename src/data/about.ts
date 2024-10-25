import { userMention } from 'discord.js';

export const botName = 'EESTEC Discord Бот';

export const aboutMessage = (helpCommand: string) =>
  `Овој бот е развиен од ${userMention(
    '117727454625267720',
  )} како и ${userMention(
    '432636625147920385',
  )} за потребите на Discord серверот на членовите на EESTEC LC Skopje.
  \n\nНапишете ${helpCommand} за да ги видите сите достапни команди.\n
  Ако имате било какви прашања, предлози или проблеми, контактирајте нè.`;