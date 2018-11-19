export class Canvas {
  drawingBorad = null;
  private containerDiv: any;
  canvasId = 'appCanvas';
  containerId = 'container';

  constructor(container) {
    this.containerDiv = container;
  }

  clearContainer(): void {
    const container = this.containerDiv;
    const canvas = document.getElementById(this.canvasId);
    if (container && canvas) {
      container.removeChild(canvas);
    }
    this.drawingBorad = null;
  }

  createCanvas(w, h): void {
    this.clearContainer();
    const parent = this.containerDiv;
    const c = document.createElement('canvas');
    c.id = this.canvasId;
    c.width = w;
    c.height = h;
    c.classList.add('canvas');
    parent.appendChild(c);
    this.drawingBorad = c;
  }

  drawline(x1: number, y1: number, x2: number, y2: number) {
    const ctx = this.drawingBorad.getContext('2d');
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  drawRect(x1: number, y1: number, x2: number, y2: number): void {
    const ctx = this.drawingBorad.getContext('2d');
    const h = x2 - x1;
    const w = y2 - y1;
    ctx.rect(x1, y1, h, w);
    ctx.stroke();
  }

  fill(x: number, y: number, color: string) {
    const ctx = this.drawingBorad.getContext('2d');
    ctx.beginPath();
    ctx.rect(0, 0, x, y);
    ctx.fillStyle = color;
    ctx.fill();
  }

  draw(cmd): string {
    const ch = cmd.charAt(0);
    let x1, y1, x2, y2;
    let code;
    switch (ch) {
      case 'C':
        cmd = cmd.split(' ');
        x1 = parseFloat(cmd[1]);
        y1 = parseFloat(cmd[2]);
        if (!isNaN(x1) && !isNaN(y1)) {
          this.createCanvas(x1, y1);
        } else {
          code = 3;
        }

        break;
      case 'L':
        if (this.drawingBorad) {
          cmd = cmd.split(' ');
          x1 = parseFloat(cmd[1]);
          y1 = parseFloat(cmd[2]);
          x2 = parseFloat(cmd[3]);
          y2 = parseFloat(cmd[4]);
          if (!isNaN(x1) && !isNaN(x2) && !isNaN(y1) && !isNaN(y2)) {
            this.drawline(x1, y1, x2, y2);
          } else {
            code = 3;
          }
        } else {
          code = 1;
        }
        break;
      case 'R':
        if (this.drawingBorad) {
          cmd = cmd.split(' ');
          x1 = parseFloat(cmd[1]);
          y1 = parseFloat(cmd[2]);
          x2 = parseFloat(cmd[3]);
          y2 = parseFloat(cmd[4]);
          if (!isNaN(x1) && !isNaN(x2) && !isNaN(y1) && !isNaN(y2)) {
            this.drawRect(x1, y1, x2, y2);
          } else {
            code = 3;
          }
        } else {
          code = 1;
        }
        break;
      case 'B':
        if (this.drawingBorad) {
          cmd = cmd.split(' ');
          x1 = parseFloat(cmd[1]);
          y1 = parseFloat(cmd[2]);
          const c = cmd[3];
          if (!isNaN(x1) && !isNaN(y1)) {
            this.fill(x1, y1, c);
          } else {
            code = 3;
          }
        } else {
          code = 1;
        }
        break;
      case 'Q':
        this.clearContainer();
        code = 2;
        break;
      default:
        code = 0;
    }
    return code;
  }
}
