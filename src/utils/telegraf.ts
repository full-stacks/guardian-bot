import { Middleware } from 'telegraf-ts';
import { Context } from '../context';

const msgAlreadyDeleted = 'Bad Request: message to delete not found';
export const monkeyPatch: Middleware<Context> = (ctx, next) => {
  const originalDeleteMessage = ctx.deleteMessage;

  ctx.deleteMessage = async (...args) => {
    try {
      return await originalDeleteMessage(...args);
    } catch (err) {
      if (err.description === msgAlreadyDeleted) {
        return null;
      }

      throw err;
    }
  };

  return next();
};