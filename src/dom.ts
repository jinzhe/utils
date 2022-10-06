import { base64Encode } from "./encoding";

export function loadScript(url: string, callback: () => void): void {
  const name = "_" + base64Encode(url);
  const tag = document.getElementById(name);
  const head: HTMLHeadElement | null = document.getElementsByTagName("head").item(0);
  if (tag && head) head.removeChild(tag);
  const script: any = document.createElement("script");
  script.onload = script["onreadystatechange"] = function () {
    if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
      if (callback != undefined) {
        callback();
      }
      script.onload = script.onreadystatechange = null;
    }
  };
  script.type = "text/javascript";
  script.src = url;
  script.id = name;
  head && head.appendChild(script);
}

export function loadStyle(url: string): void {
  const name = "_" + base64Encode(url);
  const tag = document.getElementById(name);
  const head: HTMLHeadElement | null = document.getElementsByTagName("head").item(0);
  if (tag && head) head.removeChild(tag);
  const css = document.createElement("link");
  css.href = url;
  css.rel = "stylesheet";
  css.type = "text/css";
  css.id = name;
  head && head.appendChild(css);
}

// document.onscroll = throttle(function () {
//   console.log(Date.now());
// }, 200);
export function throttle(fn: () => void, delay: number):() => void {
  let lastTime = 0;
  return function (this: any) {
    var nowTime = Date.now();
    if (nowTime - lastTime > delay) {
      fn.call(this);
      lastTime = nowTime;
    }
  };
}
// document.getElementById('btn').onclick = debounce(function () {
//   console.log('按钮被点击了' + Date.now());
// }, 1000);
export function debounce(fn: () => void, delay: number):() => void {
  let timer: any = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(function (this: any) {
      fn.apply(this);
    }, delay);
  };
}

export function getQueryString(key: string):string {
  const regexp = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
  const result = location.search.substring(1).match(regexp);
  if (result != null) {
    return decodeURIComponent(result[2]);
  }
  return '';
}
