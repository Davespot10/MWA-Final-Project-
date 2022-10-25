import { environment } from './environments/environment';
let LAF_URL = '';
if (environment.production) {
  LAF_URL = 'https://lost-and-found-mwa.herokuapp.com/';
} else {
  LAF_URL = 'http://localhost:3000/';
}
export const AppSettings = Object.freeze({
  BASE_URL: LAF_URL,
});
