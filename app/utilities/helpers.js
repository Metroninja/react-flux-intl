
/**
 * Calculates the users current timezone and returns a formatted string
 * containg the offset
 */
export function calculateTimezone() {
  let date = Date().split(' ');
  let zone = date[date.length -1].slice(1, -1);
  let offset = date[date.length -2].slice(3);
  return `${zone} (GMT ${offset})`;
}

export function getWindowWidth(){
  let innerWidth = window.innerWidth;
  if(innerWidth >= 1180) {
    return 1180;
  }  else if(innerWidth >= 960) {
    return 960;
  } else if(innerWidth >= 768) {
    return 768;
  } else {
    //account for scrollbar and padding
    return innerWidth - 60;
  }
}

export function getCookies(){
  let cookies = {};
  for (let cookie of document.cookie.split('; ')) {
    let [name, value] = cookie.split("=");
    cookies[name] = decodeURIComponent(value);
  }
  return cookies;
}

export function deleteCookie(key){
  document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 UTC`;
}

export function getFileSize(type, count){
  //default set size in MB based on a 50k (max) result set  adjust accordingly.
  const downloads = {csv: 10.9, xls: 17.7};
  //so technically the pct should be divided by 50k, but for ceil to work properly we need
  //to multiply it by 10, ceiling, then divide by 10.  so instead we just reduce the count
  //to 5k to achieve the same effect.
  const pct = count / 5000;
  const base = type === 'csv' ? downloads.csv : downloads.xls;
  return `${Math.ceil(base * pct)/10} MB`;
}