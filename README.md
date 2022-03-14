# [whatsth.is][site]

Simple technology scanner designed to inspect the content of websites and attempt to determine what CMS and other technologies they have used.

This app comprises of two components - A React frontend (this repository), and a [Python inspection API][api].

[The website this powers][site] is deployed by the 'main' branch. All changes and PRs go into the 'develop' branch (see [Git Flow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)).

## Getting Started

This project requires NodeJS to develop, test and compile the code. The following - run in root - will quickstart you.

```
npm install
npm start
```

And you're off! A Docker method is coming soon, I promise.

The API the system will communicate with is defined in the appropriate `.env` file (if using `npm start`, it's `.development`).

[site]: https://whatsth.is
[api]:  https://github.com/soup-bowl/api.whatsth.is
