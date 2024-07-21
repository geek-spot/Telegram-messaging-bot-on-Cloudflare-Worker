# Telegram-messaging-bot-on-Cloudflare-Worker

### English
#### Telegram Messanger Bot on Cloudflare Workers
Run a Telegram messaging bot on Cloudflare Worker. 🚀

#### Setup:

1. **Get your new bot token** from @BotFather: [BotFather](https://t.me/BotFather) 🤖
2. **Sign up to Cloudflare Workers**: [Cloudflare Workers](https://dash.cloudflare.com/sign-up) ☁️
3. In the Cloudflare Dashboard, go to **"Workers & Pages"** and then click **"Create"**.
4. Click **"Create Worker"** to create the worker.
5. Choose a name and click **"Deploy"** to deploy worker.
6. Click on **"Edit code"** to change the source code of your new worker.
7. Copy and paste the code from `bot.js` into the editor.
8. Replace the `TOKEN` variable in the code with your token from @BotFather.
9. Replace the `ADMIN` variable in the code with your Chat ID from @chatIDrobot.
10. Click on **"Deploy"**.
11. In the middle panel, append `/registerWebhook` to the URL. For example: `https://name.username.workers.dev/registerWebhook`.
12. Click **"Send"**. In the right panel, you should see "Ok". If "401 Unauthorized" appears, you may have used the wrong bot token.
13. Alright, it's done! Now you can use the messaging bot. 🎉


### فارسی
#### ربات پیامرسان تلگرام در Cloudflare Workers
ربات پیام رسان تلگرام را در Cloudflare Worker اجرا کنید. 🚀

#### آموزش اجرا:
۱. توکن جدید ربات خود را از @BotFather دریافت کنید: [BotFather](https://t.me/BotFather) 🤖
۲. در Cloudflare Workers ثبت نام کنید: [Cloudflare Workers](https://dash.cloudflare.com/sign-up) ☁️
۳. در داشبورد Cloudflare، به قسمت "Workers & Pages" بروید و سپس روی "Create" کلیک کنید.
۴. روی "Create Worker" کلیک کنید تا ورکر جدیدی ایجاد شود.
۵. یک نام انتخاب کنید و روی "Deploy" کلیک کنید تا ورکر مستقر شود.
۶. روی "Edit code" کلیک کنید تا کد منبع ورکر جدید خود را تغییر دهید.
۷. کد موجود در فایل bot.js را کپی کرده و در ویرایشگر وارد کنید.
۸. متغیر TOKEN در کد را با توکن خود از @BotFather جایگزین کنید.
۹. متغیر ADMIN در کد را با شناسه چت خود از @chatIDrobot جایگزین کنید.
۱۰. روی "Deploy" کلیک کنید.
۱۱. در پنل وسط، /registerWebhook را به انتهای URL اضافه کنید. به عنوان مثال: https://name.username.workers.dev/registerWebhook.
۱۲. روی "Send" کلیک کنید. در پنل سمت راست، باید "Ok" را ببینید. اگر "401 Unauthorized" ظاهر شد، ممکن است توکن ربات را اشتباه وارد کرده باشید.
۱۳. عالی، کار تمام شد! حالا می‌توانید از ربات پیام‌رسان استفاده کنید. 🎉
