export function getSimpleAddressFromObject(ad = {}) {
  console.log(ad);
  let addressFull = "";
  if (ad.country) {
    addressFull += ad.country;
  }
  if (ad.areas && ad.areas.length) {
    addressFull += ", " + ad.areas.reduce((ac, i) => ", " + i);
  }
  if (ad.locales) {
    addressFull += ", " + ad.locales;
  }
  if (ad.street) {
    addressFull += ", " + ad.street;
  }
  if (ad.premise) {
    addressFull += ", " + ad.premise;
  }
  if (ad.premiseNumber) {
    addressFull += ", " + ad.premiseNumber;
  }
  return addressFull;
}
