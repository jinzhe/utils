export function base64Encode(s: string): string {
  return btoa(encodeURIComponent(s));
}

export function base64Decode(s: string): string {
  return decodeURIComponent(atob(s));
}

export function base64ToBlob(base64: string): Blob | boolean {
  if (base64 == "" || !base64) return false;
  const arr = base64.split(",");
  if (!arr) {
    return false;
  }
  const matches = arr[0].match(/:(.*?);/);
  if (!matches) {
    return false;
  }
  const mime = matches[1];
  const data = atob(arr[1]);
  let len = data.length;
  const u8arr = new Uint8Array(len);
  while (len--) {
    u8arr[len] = data.charCodeAt(len);
  }
  return new Blob([u8arr], { type: mime });
}

export function base64ToFile(base64: string, filename: string): File | boolean {
  if (base64 == "" || !base64 || filename == "" || !filename) return false;
  const arr = base64.split(",");
  if (!arr) {
    return false;
  }
  const matches = arr[0].match(/:(.*?);/);
  if (!matches) {
    return false;
  }
  const mime = matches[1];
  const suffix = mime.split("/")[1];
  const data = atob(arr[1]);
  let len = data.length;
  let u8arr = new Uint8Array(len);
  while (len--) {
    u8arr[len] = data.charCodeAt(len);
  }
  return new File([u8arr], `${filename}.${suffix}`, { type: mime });
}

export function fileToBase64(file: File, callback: (result: string) => string): void {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function (e: any) {
    callback(e.target.result);
  };
}
