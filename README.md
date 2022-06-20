<p align="center"><img src="https://user-images.githubusercontent.com/11209477/167717787-7f33f564-e975-4055-bf7b-c2b3c29e4f81.png" /></p>
<h1 align="center"><a href="https://whatsth.is">whatsth.is</a></h1>
<p align="center">
  <a href="https://www.codefactor.io/repository/github/soup-bowl/whatsth.is"><img src="https://www.codefactor.io/repository/github/soup-bowl/whatsth.is/badge" alt="CodeFactor" /></a>
  <a href="https://gitpod.io/#https://github.com/soup-bowl/whatsth.is"><img src="https://img.shields.io/badge/open%20in-Gitpod-orange?logo=gitpod&logoColor=white" /></a>
</p>

React-based [progressive web app][pwa] proof-of-concept designed to provide a toolbox of assorted helpful development tools. The current options are:

* [Website Inspector](https://whatsth.is/inspect) ([uses the API][api]).
* [String Conversion (encode & encrypt)](https://whatsth.is/convert).

This app comprises of two components - A React frontend (this repository), and a [Python inspection API][api].

[The website this powers][site] is deployed by the 'main' branch. All changes and PRs go into the 'develop' branch (see [Git Flow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)).

## Getting Started

### With GitPod

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)]()

(Will clone and setup a workspace of both front and back-end code!).

### With Docker

You can quickly jump into project development using **Docker** with the **compose** script:

```bash
docker-compose up --build
```

This will start-up a **dynamically recompiling** ReactJS server on localhost:3000, but will also download the [latest edge image of the whatsth.is API server][api], and run that too. This effectively gives you the entire system on your computer to play with.

### Without Docker

**Note you will need to either [run a copy of the API server][api], or hook up to the production one (api.whatsth.is).**

This project requires NodeJS to develop, test and compile the code. The following - run in root - will quickstart you.

```bash
npm install
npm start
```

The API the system will communicate with is defined in the appropriate `.env` file (if using `npm start`, it's `.development`).

### Testing Offline Capabilities

The PWA aspect won't kick into full effect unless it is running 'production' with full HTTPS. With these conditions met, the command `npm run buildstart` has been provided to compile a production build of the tool, and run a local instance server to preview it. 

[site]: https://whatsth.is
[pwa]:  https://web.dev/learn/pwa/progressive-web-apps/
[api]:  https://github.com/soup-bowl/api.whatsth.is
