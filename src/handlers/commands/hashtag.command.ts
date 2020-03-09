import { Middleware } from 'this-is-a-package-for-draft-stuff-please-dont-use-this-one';
import { Context } from '../../context';
import { Note } from '../../store/note';

const hashtagHandler: Middleware<Context> = async (ctx, next) => {
  const { message } = ctx;
  const messageId = message.reply_to_message?.message_id || message.message_id;

  const title = ctx.getHashtag(message.text);

  const note = await ctx.db.notes.findOne<Note>({ title });

  if (!note) {
    await ctx.reply(`${title} doesn't exist`, { reply_to_message_id: messageId });
    return;
  }

  await ctx.reply(note.title, { reply_to_message_id: messageId });
  next();
};

export default hashtagHandler;
