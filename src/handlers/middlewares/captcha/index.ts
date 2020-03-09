import { Composer } from 'this-is-a-package-for-draft-stuff-please-dont-use-this-one';
import { Context } from '../../../context';
import { onPass } from './pass';
import { onReject } from './reject';
import captchaHandler from './captcha.handler';

const captcha = new Composer<Context>();

captcha.on('new_chat_members', captchaHandler);
captcha.action(/^(no)-(\d+)$/, onPass);
captcha.action(/^(kick)-(\d+)$/, onReject);

export default captcha;
