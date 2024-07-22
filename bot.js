const TOKEN = '1234567:AAIl0ma6OH0r9PhwHmysRkUFsd0FctUNqtE'; // از ربات  @BotFather  بگیر
const ADMIN = 12345678; // آیدی عددی شما @chatIDrobot

addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.pathname === '/endpoint') {
    event.respondWith(handleWebhook(event));
  } else if (url.pathname === '/registerWebhook') {
    event.respondWith(registerWebhook(event, url, '/endpoint', 'QUEVEDO_BZRP_Music_Sessions_52'));
  } else if (url.pathname === '/unRegisterWebhook') {
    event.respondWith(unRegisterWebhook(event));
  } else {
    event.respondWith(new Response('No handler for this request'));
  }
});

async function handleWebhook(event) {
  if (event.request.headers.get('X-Telegram-Bot-Api-Secret-Token') !== 'QUEVEDO_BZRP_Music_Sessions_52') {
    return new Response('Unauthorized', { status: 403 });
  }

  const update = await event.request.json();
  event.waitUntil(onUpdate(update));

  return new Response('Ok');
}

async function onUpdate(update) {
  if ('callback_query' in update) {
    await onCallbackQuery(update.callback_query);
  }
  if ('message' in update) {
    await onMessage(update.message);
  }
}

async function onCallbackQuery(callback) {
  return (await fetch(apiUrl('answerCallbackQuery', {
    callback_query_id: callback.id,
    text: "@Neitheruser",
  }))).json();
}

async function onMessage(message) {
  if (message.chat.type === "private") {
    if (message.text === "/start") {
      await fetch(apiUrl('sendMessage', {
        chat_id: message.chat.id,
        text: "پیام خودتون ارسال کنید تا به سازندم برسونم:)",
        reply_to_message_id: message.message_id
      }));
      await setMessageReaction(message, '❤️'); // ری‌اکشن قلب برای پیام استارت
    } else {
      if (message.from.id !== ADMIN) {
        const last_name = message.chat.last_name || "هیچی";
        const replymarkup23 = JSON.stringify({
          inline_keyboard: [
            [
              {
                text: message.chat.first_name,
                callback_data: `${message.chat.id}:${message.message_id}`
              },
              {
                text: "اسم طرف",
                callback_data: `${message.chat.id}:${message.message_id}`
              }
            ],
            [
              {
                text: last_name,
                callback_data: `${message.chat.id}:${message.message_id}`
              },
              {
                text: "فامیل طرف",
                callback_data: `${message.chat.id}:${message.message_id}`
              }
            ],
            [
              {
                text: message.chat.id,
                callback_data: `${message.chat.id}:${message.message_id}`
              },
              {
                text: "ایدی عددی طرف",
                callback_data: `${message.chat.id}:${message.message_id}`
              }
            ],
            [
              {
                text: "یوزرنیم",
                url: `https://t.me/${message.chat.username}`
              },
              {
                text: "پیوی",
                url: `tg://openmessage?user_id=${message.chat.id}`
              }
            ],
          ]
        });

        let reply;
        if ('reply_to_message' in message) {
          if (message.reply_to_message.from.id !== message.from.id && !('reply_markup' in message.reply_to_message)) {
            await fetch(apiUrl('copyMessage', {
              from_chat_id: message.chat.id,
              message_id: message.message_id,
              chat_id: ADMIN,
              reply_markup: replymarkup23
            }));
          } else {
            if (message.reply_to_message.from.id === message.from.id) {
              reply = message.reply_to_message.message_id + 1;
            } else {
              reply = message.reply_to_message.reply_markup.inline_keyboard[0][0].callback_data;
            }
            await fetch(apiUrl('copyMessage', {
              from_chat_id: message.chat.id,
              message_id: message.message_id,
              chat_id: ADMIN,
              reply_to_message_id: reply,
              reply_markup: replymarkup23
            }));
          }
        } else {
          await fetch(apiUrl('copyMessage', {
            from_chat_id: message.chat.id,
            message_id: message.message_id,
            chat_id: ADMIN,
            reply_markup: replymarkup23
          }));
        }

        const sendMessageResponse = await fetch(apiUrl('sendMessage', {
          chat_id: message.chat.id,
          text: "",
          reply_to_message_id: message.message_id
        }));

        const sendMessageData = await sendMessageResponse.json();
        if (sendMessageData.ok) {
          await setMessageReaction(message, '👎'); // ری‌اکشن لایک برای پیام ارسال شده
        } else {
          await setMessageReaction(message, '👍'); // ری‌اکشن دیسلایک برای پیام ارسال نشده
        }
      } else {
        if (message.reply_to_message.from.id !== message.from.id) {
          const id23 = message.reply_to_message.reply_markup.inline_keyboard[0][0].callback_data.split(":");
          const id223 = await fetch(apiUrl('copyMessage', {
            from_chat_id: message.chat.id,
            message_id: message.message_id,
            chat_id: id23[0],
            reply_to_message_id: id23[1],
            reply_markup: JSON.stringify({
              inline_keyboard: [
                [
                  {
                    text: message.reply_to_message.from.first_name,
                    callback_data: message.message_id
                  }
                ]
              ]
            })
          }));
          const response23 = await id223.json();
          if (response23.ok) {
            await setMessageReaction(message, '👎'); // ری‌اکشن دیسلایک برای پیام ارسال نشده
            return await fetch(apiUrl('sendMessage', {
              chat_id: message.chat.id,
              text: "ارسال نشد کاربر ربات مسدود کرده است",
              reply_to_message_id: message.message_id
            })).json();
          }
          await setMessageReaction(message, '👍'); // ری‌اکشن لایک برای پیام ارسال شده
          return await fetch(apiUrl('sendMessage', {
            chat_id: message.chat.id,
            text: "", 
            reply_to_message_id: message.message_id
          })).json();
        }
      }
    }
  }
}

async function setMessageReaction(message, emoji) {
  const reaction = [{
    type: 'emoji',
    emoji: emoji
  }];

  await fetch(apiUrl('sendChatAction', {
    chat_id: message.chat.id,
    action: 'TYPING'
  }));
  await delay(100); 

  
    await fetch(apiUrl('setMessageReaction', {
      chat_id: message.chat.id,
      message_id: message.message_id,
      reaction: JSON.stringify(reaction)
    }));
  }
  

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function registerWebhook(event, requestUrl, suffix, secret) {
  // https://core.telegram.org/bots/api#setwebhook
  const webhookUrl = `${requestUrl.protocol}//${requestUrl.hostname}${suffix}`;
  const r = await (await fetch(apiUrl('setWebhook', { url: webhookUrl, secret_token: secret }))).json();
  return new Response('ok' in r && r.ok ? 'Ok' : JSON.stringify(r, null, 2));
}

async function unRegisterWebhook(event) {
  const r = await (await fetch(apiUrl('setWebhook', { url: '' }))).json();
  return new Response('ok' in r && r.ok ? 'Ok' : JSON.stringify(r, null, 2));
}

function apiUrl(methodName, params = null) {
  let query = '';
  if (params) {
    query = '?' + new URLSearchParams(params).toString();
  }
  return `https://api.telegram.org/bot${TOKEN}/${methodName}${query}`;
}





//Geek_Spot.t.me
