# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Latest
### Changed
- Upgraded dependencies.
- Internal structure re-organisation and linting.
- String conversion will handle an unusual decode input instead of blocking input.

## [0.2.21] - 2022-12-15
### Changed
- Returned back to GitHub Pages.

## [0.2.20] - 2022-11-23
### Changed
- Switched main site (whatsth.is) from GitHub Pages to Cloudflare Pages.
- Distinguished between DNS options and other tools in DNS page.

## [0.2.19] - 2022-08-18
### Added
- WHOIS lookup added to DNS toolset.
- Geolocation details for IP addresses.

### Changed
- Upgraded dependencies.
- API version obtained from OpenAPI spec, not a bespoke endpoint.
- Loading skeleton shown when DNS check is loading, but no grid present.

### Fixed
- An empty DNS response now shows a notice message.
- API agent misconfigured for TypeScript checks on responses.

## [0.2.18] - 2022-08-15
### Changed
- Purple colour made prominant in header & PWA defs.

### Fixed
- Storage Info showing 'undefined' on iOS WebKit browsers.

## [0.2.17] - 2022-08-14
### Added
- Millisecond support for the epoch calculator (#10).

### Fixed
- Can't input a Unix time beyond the accepted bounds.

### Changed
- Home screen tiles changed for better clickability.
- Show API offline in about when the browser is disconnected.

## [0.2.16] - 2022-08-10
### Added
- Modal window on DNS inspector to show IPv4 and IPv6 addresses, if relevant.
- Modal window that unpacks UserAgent information more thoroughly.

### Changed
- Highlighted that DNS inspection is beta - unfinished and CNAME & A records show the same.
- DNS checker page is now one page - table shows on same page as input.
- IP address modal uses a Promise collection to collect both IPs simultaneously.

## [0.2.15] - 2022-07-18
### Fixed
- Cron page breaking on Morph/UBPorts browser ([#6](https://github.com/soup-bowl/whatsth.is/issues/6)).

### Added
- Can mark pages in the list as 'beta'.

### Changed
- Grid instructions changed for conversion and DNS page.
- Highlighted that site inspection is beta.

### Removed
- Removed usage stats.

## [0.2.14.1] - 2022-07-16
### Fixed
- Removed Prototype reference in error page, causing it on some browsers to also crash.

## [0.2.14] - 2022-07-15
### Fixed
- Error screen now matches system theme.

## [0.2.13] - 2022-07-10
### Added
- React WSOD Error handler to create a recoverable state for PWA users.

### Fixed
- Added limits to the UNIX Epoch calculator.

## [0.2.12] - 2022-07-08
### Added
- Page titles.

### Fixed
- Offline capable entries won't hide on the drawer when offline.
- Consolidated online check function.

## [0.2.11] - 2022-07-08
### Added
- Cron calculator segment.
- Unix epoch segment.
- SEO tags for shared links.

### Changed
- Menu and homepage grid instructions consolidated.

## [0.2.10.1] - 2022-07-06
### Fixed
- White screen on Help & About on iOS Safari/Mobile Webkit browsers.

## [0.2.10] - 2022-07-06
### Added
- Strip URL smells from an input to the DNS inspector.
- Show used local storage in about page.

### Fixed
- Crypto password box causing mobile display issues.

## [0.2.9] - 2022-07-06
### Added
- IP information of the user shown on the DNS page.
- Current page highlighted in drawer.
- Reload PWA when a new version has been deployed (untested).

### Changed
- Spurious information in the drawer now in an 'About' page.
- Inspection usage data change to reflect API change.

## [0.2.8] (pre-release) - 2022-06-29
### Fixed
- Moved CNAME to public folder, to stop the GitHub Pages deployment breaking the URL.
- GitHub 404 added to pick-up users who haven't cached the system first.
- Switched to hashed routing since GitHub web rules are not available, to help reduce 404s.

## [0.2.7] (pre-release) - 2022-06-20
### Added
- Added DNS inspection segment, in line with addition to the API.
- Help page.

### Changed
- Inspector shows visible signs of being inaccessible when offline.

### Fixed
- Hyperlink issue on Conversion page.
- 404 URLs now redirect back to the homepage.

## [0.2.5] (pre-release) - 2022-05-10
### Changed
- Encryption options.
- Icon changed to support PWA adaptive icons.

## [0.2.4] (pre-release) - 2022-04-29
### Added
- New homescreen.
- More encoding options, renamed Encoder to Converter,
- Cloud indicator to highlight if the tool is connected to the internet or not.

### Changed
- Clicking on menu items now closes the drawer.

## [0.2.3] (pre-release) - 2022-04-28
### Added
- Encoder segment.

### Changed
- Upgraded from **React 17** to **React 18**, and other dependencies.
  - Axios could not be upgraded to 0.27.0 due to "webpack < 5 used to include polyfills for node.js core modules by default".
- Website inspector now moved to a unique path to allow for expansion. Redirect for continuity for now.
- Menu now displays a drawer instead of in header to allow for more options.
- Tool given offline-working capabilities (PWA).

## [0.2.2] (pre-release) - 2022-04-19
### Added
- Browser detection.
- Report failed detection button.

### Changed
- Disabled form validation to prevent enforced URL structure (API handles this).

## [0.2.1] (pre-release) - 2022-04-10
### Added
- Generalised homepage statistics.

### Changed
- Branding changes.

## [0.2.0] (pre-release) - 2022-04-02
### Changed
- API call structure changed for backend switchover.

## [0.1.1] (pre-release) - 2022-03-24
### Added
- Validate URL input on homescreen.
- Display WordPress API content if available.

### Fixed
- Loading screen now shows, rather than an immediate error.

## [0.1.0] (pre-release) - 2022-03-14
### Added
- Everything (initial release).

[0.2.18]:   https://github.com/soup-bowl/whatsth.is/releases/tag/0.2.18
[0.2.17]:   https://github.com/soup-bowl/whatsth.is/releases/tag/0.2.17
[0.2.16]:   https://github.com/soup-bowl/whatsth.is/releases/tag/0.2.16
[0.2.15]:   https://github.com/soup-bowl/whatsth.is/releases/tag/0.2.15
[0.2.14.1]: https://github.com/soup-bowl/whatsth.is/releases/tag/0.2.14.1
[0.2.14]:   https://github.com/soup-bowl/whatsth.is/releases/tag/0.2.14
[0.2.13]:   https://github.com/soup-bowl/whatsth.is/releases/tag/0.2.13
[0.2.12]:   https://github.com/soup-bowl/whatsth.is/releases/tag/0.2.12
[0.2.11]:   https://github.com/soup-bowl/whatsth.is/releases/tag/0.2.11
[0.2.10.1]: https://github.com/soup-bowl/whatsth.is/releases/tag/0.2.10.1
[0.2.10]:   https://github.com/soup-bowl/whatsth.is/releases/tag/0.2.10
[0.2.9]:    https://github.com/soup-bowl/whatsth.is/releases/tag/0.2.9
[0.2.8]:    https://github.com/soup-bowl/whatsth.is/releases/tag/0.2.8
[0.2.7]:    https://github.com/soup-bowl/whatsth.is/releases/tag/0.2.7
[0.2.5]:    https://github.com/soup-bowl/whatsth.is/releases/tag/0.2.5
[0.2.4]:    https://github.com/soup-bowl/whatsth.is/releases/tag/0.2.4
[0.2.3]:    https://github.com/soup-bowl/whatsth.is/releases/tag/0.2.3
[0.2.2]:    https://github.com/soup-bowl/whatsth.is/releases/tag/0.2.2
[0.2.1]:    https://github.com/soup-bowl/whatsth.is/releases/tag/0.2.1
[0.2.0]:    https://github.com/soup-bowl/whatsth.is/releases/tag/0.2.0
[0.1.1]:    https://github.com/soup-bowl/whatsth.is/releases/tag/0.1.1
[0.1.0]:    https://github.com/soup-bowl/whatsth.is/releases/tag/0.1.0
