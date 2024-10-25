import 'dotenv/config';
import { client } from './utilities/client.js'
import { registerCommands } from './utilities/commands.js';
import { checkEnvironmentVariables, getToken } from './utilities/config.js';
import { attachEventListeners } from './utilities/events.js';
import { logErrorFunctions } from './data/logs.js';

/* Initialization Procedures */

// Register commands and attach event listeners
await checkEnvironmentVariables();
await registerCommands();
await attachEventListeners();

// Log in to discord application
try {
    await client.login(getToken());
} catch (error) {
    throw new Error(logErrorFunctions.loginFailed(error));
}