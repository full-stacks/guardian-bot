import { Middleware } from 'this-is-a-package-for-draft-stuff-please-dont-use-this-one';
import { Context } from '../../context';
import { Settings } from '../../store';
import { findOrCreate } from '../../utils';

const settingsLoader: Middleware<Context> = async (ctx, next) => {
  const settings = await findOrCreate<Settings>(
    ctx.db.settings,
    { chatId: ctx.chat.id },
    { chatId: ctx.chat.id, allowLinks: true },
  );

  ctx.settings = settings;

  next();
};

export default settingsLoader;
