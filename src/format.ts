export function formatNumber(value: number): string {
  return value.toString().replace(/(?=\B(?:\d{3})+\b)(\d{3}(?:\.\d+$)?)/g, ",$1");
}

export function formatSize(size: number): string {
  if (size < 1024) {
    return size + "B";
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + "KB";
  } else if (size < 1024 * 1024 * 1024) {
    return (size / (1024 * 1024)).toFixed(2) + "MB";
  } else {
    return (size / (1024 * 1024 * 1024)).toFixed(2) + "GB";
  }
}

export function formatSpace(value: string): string {
  return value.replace(/(\w)([\u4e00-\u9fa5])/g, "$1 $2").replace(/([\u4e00-\u9fa5])(\w)/g, "$1 $2");
}

export function formatRMB(money: string): string {
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(money)) {
    return money;
  }
  let unit = "千百拾亿千百拾万千百拾元角分";
  let str = "";
  money += "00";
  let pointIndex = money.indexOf(".");
  if (pointIndex >= 0) {
    money = money.substring(0, pointIndex) + money.substring(pointIndex + 1, 2);
  }
  unit = unit.substr(unit.length - money.length); //重置单位长度
  for (let i: number = 0; i < money.length; i++) {
    str += "零壹贰叁肆伍陆柒捌玖".charAt(parseInt(money.charAt(i))) + unit.charAt(i);
  }
  return str
    .replace(/零(千|百|拾|角)/g, "零")
    .replace(/(零)+/g, "零")
    .replace(/零(万|亿|元)/g, "$1")
    .replace(/(亿)万|壹(拾)/g, "$1$2")
    .replace(/^元零?|零分/g, "")
    .replace(/元$/g, "元整");
}
