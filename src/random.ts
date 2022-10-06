export function randomWithMath(): string {
  return Math.random().toString(32).substring(2);
}

export function randomWithChars(len: number = 32): string {
  /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  const chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
  const max = chars.length;
  let char = "";
  for (let i = 0; i < len; i++) {
    char += chars.charAt(Math.floor(Math.random() * max));
  }
  return char;
}

export function randomWithNumber(len: number = 6): string {
  const numbers = "0123456789";
  const max = numbers.length;
  let char = "";
  for (let i = 0; i < len; i++) {
    char += numbers.charAt(Math.floor(Math.random() * max));
  }
  return char;
}

export function randomWithColor(): string {
  return Math.floor(Math.random() * 16777215).toString(16);
}
