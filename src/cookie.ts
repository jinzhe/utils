export function getCookie(name: string): string {
  let v = "";
  if (document.cookie && document.cookie != "") {
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = String(cookies[i]).replace(/(^\s*)|(\s*$ )/g, "");
      if (cookie.substring(0, name.length + 1) == name + "=") {
        v = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return v;
}

export interface SetCookieOptions{
  expires?:number|any;
  path?:string;
  domain?:string;
  secure?:boolean;
}

export function setCookie(name: string, value: string, options:SetCookieOptions) {
  if (value === null) {
    value = "";
    options.expires = -1;
  }
  let expires = "";
  if (options.expires && (typeof options.expires == "number" || options.expires.toUTCString)) {
    var date;
    if (typeof options.expires == "number") {
      date = new Date();
      date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
    } else {
      date = options.expires;
    }
    expires = "; expires=" + date.toUTCString();
  }
  var path = options.path ? "; path=" + options.path : "";
  var domain = options.domain ? "; domain=" + options.domain : "";
  var secure = options.secure ? "; secure" : "";
  document.cookie = [name, "=", encodeURIComponent(value), expires, path, domain, secure].join("");
}
