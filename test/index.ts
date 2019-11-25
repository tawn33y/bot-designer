import { Superbot } from '../src';
import { routes } from './routes';

const superbot = Superbot(routes, []);

superbot.setupWhatsapp('whatsapp:+14155238886', 'AC1d8f5cd7cbef961c76cbe728f28461f3',
  '5086b2b6e7d34111f29dfa425f586700');

superbot.setupTelegram('820530445:AAHVfl2S89L3kVNji9s93qUjxRba2myyKVo');

superbot.onHistory((h) => {
  console.log(h)
});
