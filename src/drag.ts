export type Vector = [number, number];

export type VectorRange = [number, number, number, number];

interface Options {
  outerElement?: HTMLElement;
  innerElement?: HTMLElement;
  onDragStart?: (v: Vector) => void;
  onDragMove?: (v: Vector) => void;
  onDragEnd?: (v: Vector) => void;
}

const drag = (element: HTMLElement, options?: Options) => {
  let canTouch = "ontouchstart" in window;
  let { outerElement, innerElement, onDragStart, onDragMove, onDragEnd } = options ?? {};
  // 元素的transform属性值，getComputedStyle返回值为matrix3d形式
  let startTransform = window.getComputedStyle(element).transform;
  // 拖拽开始时的鼠标位置
  let startPosition: Vector | null = null;
  // 拖拽结束时的鼠标位置
  let endPosition: Vector | null = null;
  // 拖拽位移向量范围
  let draggingMoveVectorRange: VectorRange | null = null;
  // 元素位移向量（拖拽后修改）
  let draggedMoveVector: Vector = [0, 0];
  // 元素位移向量（拖拽时修改）
  let draggingMoveVector: Vector = [0, 0];
  // 拖拽范围元素
  outerElement = outerElement ?? document.body;
  // 拖拽的元素
  element = element;
  // 拖拽图标元素
  innerElement = innerElement ?? element;

  const addVector = (v1: Vector, v2: Vector): Vector => {
    const x = v1[0] + v2[0];
    const y = v1[1] + v2[1];
    return [x, y];
  };
   
  const diffVector = (v1: Vector, v2: Vector): Vector => {
    const x = v2[0] - v1[0];
    const y = v2[1] - v1[1];
    return [x, y];
  };
   
  const limitVector = (vector: Vector, range: number[]): Vector => {
    let x = vector[0];
    let y = vector[1];
    x = Math.max(x, range[2]);
    x = Math.min(x, range[3]);
    y = Math.max(y, range[0]);
    y = Math.min(y, range[1]);
    return [x, y];
  };
   
  const formatTranslate = (transform: string,vector: Vector): string => {
    return `translate3d(${vector[0]}px, ${vector[1]}px, 0px) ${transform.replace("none","")}`;
  };

  const onBegin= () => {
    if (outerElement && element && innerElement) {
      // 记录拖拽位移向量范围
      const outerElementRect = outerElement.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      draggingMoveVectorRange = [
        outerElementRect.top - elementRect.top,
        outerElementRect.bottom - elementRect.bottom,
        outerElementRect.left - elementRect.left,
        outerElementRect.right - elementRect.right,
      ];
    }
    typeof onDragStart === "function" && onDragStart(draggedMoveVector);
  };
  const onMove = (x:number,y:number) => {
    if (startPosition && draggingMoveVectorRange) {
      endPosition = [x, y];
      // 本次的拖拽位移向量
      const currentMoveVector = limitVector(
        diffVector(startPosition, endPosition),
        draggingMoveVectorRange
      );
      // 之前的拖拽位移向量+本次的拖拽位移向量
      draggingMoveVector = addVector(draggedMoveVector, currentMoveVector);
      element.style.transform = formatTranslate(
        startTransform,
        draggingMoveVector
      );
      typeof onDragMove === "function" && onDragMove(draggingMoveVector);
    }
  };
  const onEnd = () => {
    if (startPosition && draggingMoveVectorRange) {
      draggedMoveVector = draggingMoveVector;
      typeof onDragEnd === "function" && onDragEnd(draggedMoveVector);
    }
    startPosition = null;
  };

  const onMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    startPosition = [e.pageX, e.pageY];
    onBegin();
  };
  const onTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const target = e?.targetTouches[0];
    // 记录当前鼠标位置
    startPosition = [target.pageX, target.pageY];
    onBegin();
  };
  const onMouseMove = (e: MouseEvent) => {
    onMove(e.pageX, e.pageY);
  };
  const onTouchMove = (e: TouchEvent) => {
    const target = e?.targetTouches[0];
    onMove(target.pageX, target.pageY);
  };

 
  const addEvent = () => {
    if (innerElement) {
      if (canTouch) {
        innerElement.addEventListener("touchstart", onTouchStart,{passive:false});
        document.addEventListener("touchmove", onTouchMove);
        document.addEventListener("touchend", onEnd);
      }else{
        innerElement.addEventListener("mousedown", onMouseDown);
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onEnd);
      }

    }
  };
  const removeEvent = () => {
    if (innerElement) {
      if (canTouch) {
        innerElement.removeEventListener("touchstart", onTouchStart);
        document.removeEventListener("touchmove", onTouchMove);
        document.removeEventListener("touchend", onEnd);
      }else{
        innerElement.removeEventListener("mousedown", onMouseDown);
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onEnd);
      }

    }
  };
  addEvent();
  return removeEvent;
};
export default drag;