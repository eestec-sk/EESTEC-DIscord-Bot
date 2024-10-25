import { env } from 'node:process';

export const checkEnvironmentVariables = async () => {
    const token = env['TOKEN'];
    const applicationId = env['APPLICATION_ID'];

    if (applicationId === undefined) {
        throw new Error("Could not find application ID environment variable");
    }

    if (token === undefined) {
      throw new Error("Could not find token environment variable");
    }
};
  
export const getToken = () => {
    return env['TOKEN'] as string;
};

export const getApplicationId = () => {
    return env['APPLICATION_ID'] as string;
};