// window 坐标转 canvas 坐标
export function getCanvasPosition(canvas: HTMLCanvasElement, e: MouseEvent):{x: number, y: number} {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left * (canvas.width / rect.width),
    y: e.clientY - rect.top * (canvas.height / rect.height),
  };
}
export function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
):void {
  let min = Math.min(width, height);
  if (radius > min / 2) {
    radius = min / 2;
  }
  // 开始绘制
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

export function drawTextWatermark(text: string, width: number, height: number, deg: number = 25): string {
  if (text.trim() == "") {
    return "";
  }
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
  if (ctx) {
    ctx.rotate((deg * Math.PI) / 180);
    ctx.fillStyle = "rgba(100,100,100,.4)";
    ctx.textAlign = "center";
    ctx.font = "40px Airal";
    ctx.fillText(text, 600 / 3, 600 / 2);
  }
  return canvas.toDataURL("image/png");
}
