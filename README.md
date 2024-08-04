<p align="center"><img src="https://f.subo.dev/i/whatsthis-logo.webp" /></p>
<h1 align="center"><a href="https://whatsth.is">whatsth.is</a></h1>
<p align="center">
  <a href="https://www.codefactor.io/repository/github/soup-bowl/whatsth.is"><img src="https://www.codefactor.io/repository/github/soup-bowl/whatsth.is/badge" alt="CodeFactor" /></a>
  <a href="https://gitpod.io/#https://github.com/soup-bowl/whatsth.is"><img src="https://img.shields.io/badge/open%20in-Gitpod-orange?logo=gitpod&logoColor=white" /></a>
</p>

![A computer display shows the Whats This website, with a mobile phone showing the same content in front](https://f.subo.dev/i/whatsthis-app-image.webp)

React-based [progressive web app][pwa] proof-of-concept designed to provide a toolbox of assorted helpful development tools. The current options are:

- [Website Inspector](https://whatsth.is/#/inspect) (Beta - [uses the API][api]).
- [DNS Inspector](https://whatsth.is/#/dns) (Beta - [uses the API][api]).
- [String Conversion (encode & encrypt)](https://whatsth.is/#/convert).
- [Colour Tools](https://whatsth.is/#/colour).
- [Cron Conversion](https://whatsth.is/#/cron).
- [UNIX Timestamp Converter](https://whatsth.is/#/time).

This app comprises of three components - A React frontend (this repository), an [engine library][lib], and a [C# .NET inspection API][api].

## Getting Started

### With Gitpod

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)]()

(Will clone and setup a workspace of both front and back-end code!).

### With Docker

You can quickly jump into project development using **Docker** with the **compose** script:

```bash
docker-compose up --build
```

This will start-up a **dynamically recompiling** ReactJS server on localhost:3000, but will also download the [latest edge image of the whatsth.is API server][api], and run that too. This effectively gives you the entire system on your computer to play with.

### Without Docker

**Note you will need to either [run a copy of the API server][api] (you can override with `.env.local`), or by default it will connect to production (api.whatsth.is).**

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

[site]: https://whatsth.is
[pwa]: https://web.dev/learn/pwa/progressive-web-apps/
[api]: https://github.com/soup-bowl/api.whatsth.is
[lib]: https://github.com/soup-bowl/libwhatsthis
[ext]: https://github.com/soup-bowl/whatsth.is-browser
