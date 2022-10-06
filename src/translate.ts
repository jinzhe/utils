
export function rgb2hex(r: number, g: number, b: number): string {
    return ((r << 16) | (g << 8) | b).toString(16);
}

export function hexToRgba(hex: string, opacity: number): string {
    return (
        "rgba(" +
        parseInt("0x" + hex.slice(1, 3)) +
        "," +
        parseInt("0x" + hex.slice(3, 5)) +
        "," +
        parseInt("0x" + hex.slice(5, 7)) +
        "," +
        opacity +
        ")"
    );
}
export function movePrev<T>(target: T[], index: number): void {
    if (index == 0) {
        return;
    }
    target[index - 1] = target.splice(index, 1, target[index - 1])[0];
}

export function moveNext<T>(target: T[], index: number): void {
    if (index == target.length - 1) {
        return;
    }
    target[index + 1] = target.splice(index, 1, target[index + 1])[0];
}

export function shuffle<T>(array: T[]): T[] {
    let m: number = array.length;
    let t: T;
    let i: number;
    while (m) {
        i = Math.floor(Math.random() * m--); // 选择一个剩余的元素
        t = array[m]; // 并用当前元素交换
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}
 
export function getUrls(content: string): string[] {
    const pattern: RegExp = /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/gi;
    let urls: string[] = [];
    let found: RegExpExecArray | null;
    while ((found = pattern.exec(content)) != null) {
        urls.push(found[0]);
    }
    return urls;
}

// 计算区域内中心点
// @param positions number[][] eg:[[1.2323,1.2323],[2.32332,4.232323]]
export function calcPositionsCenter(positions:number[][]):number[]{
    const total = positions.length;
    let [x,y,z]=[0,0,0];
    positions.forEach((position:number[])=>{
      let lng = position[0] * Math.PI / 180;
      let lat = position[1] * Math.PI / 180;
      x += Math.cos(lat) * Math.cos(lng);
      y += Math.cos(lat) * Math.sin(lng);
      z += Math.sin(lat);
    });
    x = x/total;
    y = y/total;
    z = z/total;
    let longitude = Math.atan2(y,x);
    let latitude = Math.atan2(z,Math.sqrt(x*x + y*y));
    return [longitude*180/Math.PI,latitude*180/Math.PI];
  }