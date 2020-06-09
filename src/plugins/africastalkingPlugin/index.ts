import { Request, Response, Application } from 'express';
import { MessageCallback } from '../../main/render.types';
import { Credentials } from './index.types';
import { Chat } from './requests';

const MessageHandler = (chat: any, credentials: Credentials, cb: MessageCallback) => (
  req: Request, res: Response,
): void => {
  res.json({ ok: true });

  const { Body: rawText, From: sender } = req.body;
  const formattedText = rawText.trim() || 'start';
  const to = sender && sender.split('whatsapp:')[1];

  const channel = 'WhatsApp';

  cb({
    from: (credentials as any)[channel.toLowerCase()].channelNumber,
    text: formattedText,
    channel,
    onSendMessage: (text) => chat.sendMessage(channel, to, text),
    onSendPhoto: (url) => chat.sendMedia(channel, to, 'Image', url),
    onSendAudio: (url) => chat.sendMedia(channel, to, 'Audio', url),
    onSendVideo: (url) => chat.sendMedia(channel, to, 'Video', url),
    onSendDocument: (url) => chat.sendMedia(channel, to, 'Document', url),
    onSendLocation: (latitude, longitude) => chat.sendLocation(channel, to, latitude, longitude),
  });
};

export const africastalkingPlugin = (credentials: Credentials) => (
  app: Application, cb: MessageCallback,
): void => {
  const chat = Chat(credentials);


  app.post('/webhook/africastalking/messages', MessageHandler(chat, credentials, cb));
};
