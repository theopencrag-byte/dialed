DIALED - install as a phone app
===============================

This folder is a Progressive Web App (PWA). Once it is hosted at an https
address, you open it on your phone and add it to the home screen. It then
opens full screen like an app and works without signal after the first visit.

Files
  index.html            the whole calculator
  manifest.webmanifest  name, colors and icons for the home screen
  sw.js                 saves the app on your phone for offline use
  icons/                app icons

STEP 1: Put the folder online (any one of these, all have free options)
  - Netlify Drop: go to app.netlify.com/drop and drag this whole folder onto the page.
  - GitHub Pages: make a repository, upload these files to it, then turn on
    Pages in the repository settings.
  - Cloudflare Pages: create a project and upload the folder.
You need https, which all three give you. Opening index.html straight from
your files will not install as an app.

STEP 2: Install it on your phone
  iPhone (use Safari): open the address, tap Share, then Add to Home Screen.
  Android (use Chrome): open the address, tap the menu, then Install app
  (or Add to Home screen).

STEP 3: Open it once with signal
  Open the app once while you have signal so it can save itself. After that
  it opens with no signal.

Live weather
  Under Conditions, "Look up a starting point" finds a place by name or postal
  code, or uses your phone's location, and fills in temperature, pressure,
  humidity, elevation, latitude and wind. It works once the app is hosted at
  its own https address (the preview page inside Claude blocks these requests).
  Allow location access when your phone asks if you use the GPS button.
  - The data comes from Open-Meteo, a model estimate for your area, not a
    reading at your firing line. A weather meter at the range is more accurate.
  - Open-Meteo is free for non-commercial use without a key. If you ever
    sell or publicly release the app commercially, check their terms first.
  - It needs signal. With none, the app says so and keeps your values.

Sharing with friends
  Send them the same https address. They open it on their phone and add it to
  the home screen (steps are inside the app under "Install and share"). The
  "Share with a friend" button in that section sends the link from a phone.
  Friends need no account, nothing is installed from an app store, and each
  person's saved loads stay on their own phone. If you change the app later,
  update the hosted files and everyone gets the new copy the next time they
  open it with signal.

Notice for users
  The first time someone opens the app they see a short notice that results
  are estimates, that they are responsible for every shot, and that the app is
  provided as is with no warranty. They tap "I understand" to continue. The
  "About and limits" section repeats this and can reopen the notice. Have a
  lawyer read the wording if you plan to share the app beyond close friends.

Good to know
  - Saved loads, the table column choice and the theme are stored on the
    phone, separately for each browser and for the installed app. Loads you
    saved in a browser tab will not appear in the installed app.
  - To publish a changed index.html, change VERSION in sw.js (for example
    dialed-v1 to dialed-v2) so phones fetch the new copy.
  - Bullet data comes from the MIT-licensed ammolytics/projectiles dataset
    (2018 manufacturer specs). Check your bullet's current BC.
