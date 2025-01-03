# README

A simple Rails app that looks up weather forecasts

# Usage Instructions

**To Launch**

_First, you must obtain the `master.key` file from the author to decrypt the Google Maps API Key_

```bash
$ bundle install
$ yarn install
$ yarn build
$ bundle exec rails test:all # to run tests 
$ bundle exec rails s
```

## Routes
```
Prefix      Verb URI Pattern                Controller#Action
root        GET  /                          redirect(301, /forecast)
search      GET  /forecast(.:format)        forecasts#index
forecast    GET  /forecast/:zip(.:format)   forecasts#show
readme      GET  /readme(.:format)          markdown#readme
```

## Models (via ActiveModel)

### `Forecast`

Relevant fields:
- `zip` (`Integer`)
- `cache_hit` (`true` or `false`)
- `update_time` (`Time`)
- `periods` (`Array` of `ForecastPeriod`)

### `ForecastPeriod`

Relevant fields:
- `number` (`Integer`) (1-based index of the `ForecastPeriod`)
- `name` (`String`) (for example: `Today` or `Tuesday Night`)
- `temperature` (`Integer`)
- `temperature_unit` (`String`)
- `probability_of_precipitation` (`Integer`)
- `wind_speed` (`String`)
- `wind_direction` (`String`) (One of `N`, `S`, `E`, `W`)
- `icon` (`String`) (URL)
- `short_forecast` (`String`)
- `detailed_forecast` (`String`)

## External APIs

- Weather.gov ([docs](https://www.weather.gov/documentation/services-web-api)) ([schema](https://editor.swagger.io/?url=https://api.weather.gov/openapi.json))
- Google Maps Places API ([docs](https://developers.google.com/maps/documentation/places/web-service/autocomplete)) ([ui component](https://github.com/googlemaps/extended-component-library))

<!-- Other relevant links
- https://developers.google.com/maps/documentation/javascript/load-maps-js-api#dynamic-library-import
- https://github.com/googlemaps/js-samples/blob/d0181aedb93364227da417c9d2765784d9333646/dist/samples/place-autocomplete-element/app/index.ts
- https://github.com/googlemaps/extended-component-library
- https://jsfiddle.net/u43pj69g/
- https://github.com/googlemaps/extended-component-library/tree/main/examples/react_sample_app/src
- https://visgl.github.io/react-google-maps/docs
- https://developers.google.com/maps/documentation/javascript/examples/rgm-college-picker
-->