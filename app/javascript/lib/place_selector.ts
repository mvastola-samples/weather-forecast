import { runOnReady } from "./utils";
import { APILoader } from '@googlemaps/extended-component-library/api_loader.js';
import { PlacePicker } from '@googlemaps/extended-component-library/place_picker.js';
import PlaceAutocompletePlaceSelectEvent = google.maps.places.PlaceAutocompletePlaceSelectEvent;

const autocompleteCb = async (e: PlaceAutocompletePlaceSelectEvent) => {
  const { place } = e;
  await place.fetchFields({ fields: ['displayName', 'formattedAddress', 'location', 'addressComponents'] });
  const zipComponents = place.addressComponents?.filter(ac => {
    return ac.types.includes('postal_code')
  })
  const zip = zipComponents ? zipComponents[0]?.shortText : null;
  console.log([place, zip]);
  if (zip) document.location.pathname = `/forecast/${zip}`;
}
const setupLocationAutocomplete = async () => {
  console.log('Running setupLocationAutocomplete');
  const rootElement = document.querySelector('#location-autocomplete');
  if (!rootElement) throw new Error('No #location-autocomplete found');

  const mapsLoader = new APILoader();
  // TODO: see if this is still needed in the JS
  mapsLoader.apiKey = GOOGLE_MAPS_API_KEY;
  const placesLibrary = await APILoader.importLibrary("places") as google.maps.PlacesLibrary;
  const placeAutocomplete = new google.maps.places.PlaceAutocompleteElement({});
  placeAutocomplete.addEventListener('gmp-placeselect', autocompleteCb as (e: Event) => unknown);
  rootElement.appendChild(placeAutocomplete);

  console.log('setupLocationAutocomplete complete');
};


runOnReady(setupLocationAutocomplete);


