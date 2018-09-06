export const convertFahrenheitToCelsius = fTemperature => {
  var cTemperature = (fTemperature - 32) / 1.8;
  if (typeof cTemperature !== 'undefined') {
    return Math.round(cTemperature);
  } else {
    return 'celsius not defined';
  }
}

export const unixTimeToDate = unixTime => {
  let date = new Date(unixTime * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  return hours + ':' + minutes.substr(-2);

}

export const getDay = time => {
  let date = new Date(time * 1000);
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getDay()];
}