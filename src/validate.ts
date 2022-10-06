export const PATTERN:Record<string,RegExp> = {
  email: /([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9])+/i,
  id: /^[A-Za-z][A-Za-z0-9_-]{5,19}$/i,
  idNumber: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  phoneNumber: /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/i,
  fullWidth:/[\uFF00-\uFFFF]/,
  halfWidth:/[\u0000-\u00FF]/,
  chinese: /^[\u4E00-\u9FA5]+$/i,
  korean: /^[\uAC00-\uD7A3]+$/i,
  japanese: /^[\u0800-\u4e00]+$/i,
  wechat: /micromessenger/i,
  mobile: /iphone|ipad|ipod|ios|android/i,
  plateNumber: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/,
  QQNumber:/^[1-9][0-9]{4,10}$/,
  wechatNumber:/^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/i,
  url:/^(((ht|f)tps?):\/\/)?(^!@#$%^&*?.\s-?\.)+[a-z]{2,6}\/?/,
  urlWithPort:/^((ht|f)tps?:\/\/)?[\w-]+(\.[\w-]+)+:\d{1,5}\/?$/,
  ipv4:/\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b/,
  ipv6:/(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/,
  md5:/^([a-f\d]{32}|[A-F\d]{32})$/,
  mustNumberAndLetter:/^(?=.*[a-zA-Z])(?=.*\d).+$/i,
  base64:/^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*$/i,
  
};
 
/**
 * 验证身份证号码
 * @param { String } number 身份证号码
 */
export function verifyID(number: string):boolean {
  // 身份证号前两位代表区域
  const city = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江 ",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏 ",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外",
  };
  const idCardReg = /^[1-9]\d{5}(19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i; // 身份证格式正则表达式
  let isPass = true; // 身份证验证是否通过（true通过、false未通过）

  // 如果身份证不满足格式正则表达式
  if (!number) {
    isPass = false;
  } else if (!number.match(idCardReg)) {
    isPass = false;
  } else if (!Object.keys(city).includes(number.substring(0, 2))) {
    // 区域数组中不包含需验证的身份证前两位
    isPass = false;
  } else if (number.length === 18) {
    // 18位身份证需要验证最后一位校验位
    let numberArr = number.split("");
    // ∑(ai×Wi)(mod 11)
    // 加权因子
    const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    // 校验位
    const parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = 0;
    let ai = 0;
    let wi = 0;
    for (let i = 0; i < 17; i++) {
      ai = parseInt(numberArr[i]);
      wi = factor[i];
      sum += ai * wi; // 开始计算并相加
    }
    const last = parity[sum % 11]; // 求余
    if (last.toString() !== numberArr[17]) {
      isPass = false;
    }
  }
  return isPass;
}
