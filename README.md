<p align="center"><img src="https://f.subo.dev/i/whatsthis-logo.webp" /></p>
<h1 align="center"><a href="https://whatsthis.pages.dev">whatsth.is</a></h1>
<p align="center">
  <a href="https://www.codefactor.io/repository/github/soup-bowl/whatsth.is"><img src="https://www.codefactor.io/repository/github/soup-bowl/whatsth.is/badge" alt="CodeFactor" /></a>
</p>

![A computer display shows the Whats This website, with a mobile phone showing the same content in front](https://f.subo.dev/i/whatsthis-app-image.webp)

> [!WARNING]  
> After **4 years**, this has now been **discontinued**. If you wish to keep using it, it will be available at [whatsthis.pages.dev](https://whatsthis.pages.dev/) past the domain expiration.

React-based [progressive web app][pwa] proof-of-concept designed to provide a toolbox of assorted helpful development tools. The current options are:

- [String Conversion (encode & encrypt)](https://whatsthis.pages.dev/#/convert).
- [Colour Tools](https://whatsthis.pages.dev/#/colour).
- [Cron Conversion](https://whatsthis.pages.dev/#/cron).
- [UNIX Timestamp Converter](https://whatsthis.pages.dev/#/time).

## Getting Started

### With Docker

You can quickly jump into project development using **Docker** with the **compose** script:

```bash
docker-compose up --build
```

This will start-up a **dynamically recompiling** ReactJS server on localhost:3000.

### Without Docker

This project requires NodeJS to develop, test and compile the code. The following will quickstart you.

```bash
npm install
npm start
```

The API the system will communicate with is defined in the appropriate `.env`.

### Testing Offline Capabilities

If you want to test the PWA functionality locally, you can add the following to the `VitePWA()` segment in `vite.config.ts`:

```js
devOptions: {
	enabled: true
},
```

[site]: https://whatsthis.pages.dev
[pwa]: https://web.dev/learn/pwa/progressive-web-apps/
[lib]: https://github.com/soup-bowl/libwhatsthis
[ext]: https://github.com/soup-bowl/whatsth.is-browser
