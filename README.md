# Weather Fetcher

**A minimal weather app: type a city, get the current conditions — with IP-based location fallback.**

**[Live page](https://anastacodes.github.io/WeatherFetcher/)** · *Note: the hosted page ships without API keys, so data fetching only works when you run it locally with your own keys (see below).*

## Features

- Search current weather for any city
- Auto-detects your location via browser geolocation, falling back to IP lookup
- Shows temperature, conditions and a weather icon
- Built with vanilla HTML, CSS and JavaScript (ES modules)

## Run locally

1. Clone the repository and create an `apikey.js` file **in the project root** (it is deliberately git-ignored):

```javascript
export const apiOpenweathermap = 'YOUR_OPENWEATHERMAP_API_KEY_HERE';
export const apiGeo = 'YOUR_IPIFY_API_KEY_HERE';
```

2. Serve the folder (ES modules don't load from `file://`):

```bash
npx serve .
```

## Security note

API keys are kept out of the repository and its entire git history. The follow-up projects [AdvancedWeatherFetcher](https://github.com/AnastaCodes/AdvancedWeatherFetcher) + [WeatherProxyServer](https://github.com/AnastaCodes/WeatherProxyServer) solve this properly: the keys move to a server-side PHP proxy so the client never sees them.

## Acknowledgments

- Weather data by [OpenWeatherMap](https://openweathermap.org/), IP lookup by [ipify](https://www.ipify.org/).
