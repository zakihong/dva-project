//set session
export function setSen(k, val) {
  if (typeof val === 'string') {
    sessionStorage.setItem(k, val);
    return val;
  }
  sessionStorage.setItem(k, JSON.stringify(val));
  return val;
}

//get session
export function getSen(k) {
  let uu = sessionStorage.getItem(k);

  try {
    if (typeof JSON.parse(uu) !== 'number') {
      uu = JSON.parse(uu);
    }
  } catch (e) {}
  return uu;
}

export const isLogin = () => {
  return getSen('user_session');
};
