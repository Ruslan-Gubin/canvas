import { CanvasDraw } from "../service/CanvasDraw";
import { CanvasDrawGraphProps } from "../types/types";


class CanvasDrawGraph {
  readonly baseContext;
  readonly colorGridLines: string;
  readonly rowCount: number;
  readonly width: number;
  readonly height: number;
  readonly maxCount: number;
  readonly gridHeight: number;
  readonly gridWidth: number;
  readonly maxTreshld: number;
  public canvasDraw: CanvasDraw;
  private columnLine = 6;
  readonly lgSpasing = 30;
  readonly smSpasing = 6;
  readonly descriptionArr: string[];
  readonly lines: number[][];

  constructor({
    baseContext,
    colorGridLines,
    rowCount,
    maxCount,
    descriptionArr,
    lines,
  }: CanvasDrawGraphProps) {
    this.baseContext = baseContext;
    this.canvasDraw = new CanvasDraw(baseContext);
    this.width = this.baseContext.canvas.width;
    this.height = this.baseContext.canvas.height;
    this.colorGridLines = colorGridLines;
    this.rowCount = rowCount;
    this.maxCount = maxCount;
    this.gridHeight = this.height - this.lgSpasing - this.smSpasing;
    this.gridWidth = this.width - this.lgSpasing - this.smSpasing;
    this.descriptionArr = descriptionArr;
    this.lines = lines;
    this.maxTreshld = this.calculeMaxTreshld(this.maxCount);
  }

  protected drawCenterGrid() {
    const gridCoordinate = {
      startX: this.lgSpasing,
      endX: this.gridWidth + this.lgSpasing,
      startY: this.smSpasing,
      endY: this.gridHeight,
    };

    const stepHorizont = gridCoordinate.endY / 5;
    const stepVertical = this.gridWidth / this.rowCount;

    for (let i = 0; i < this.columnLine; i++) {
      const currentLineStartY = gridCoordinate.startY + i * stepHorizont;
      this.canvasDraw.straightLine({
        startLine: { x: gridCoordinate.startX, y: currentLineStartY },
        lines: [gridCoordinate.endX, currentLineStartY],
        border: { color: this.colorGridLines, width: 1 },
      });
    }

    if (this.rowCount <= 30 && (this.rowCount < 10 || this.gridWidth > 1000)) {
      for (let i = 0; i < this.rowCount + 1; i++) {
        const currentLineStartX = gridCoordinate.startX + i * stepVertical;
        this.canvasDraw.straightLine({
          startLine: { x: currentLineStartX, y: gridCoordinate.startY },
          lines: [currentLineStartX, gridCoordinate.endY + this.smSpasing],
          border: { color: this.colorGridLines, width: 0 },
        });
      }
    }
  }

  private calculeMaxTreshld(maxCount: number): number {
    const thresholds = [
      5, 10, 20, 50, 100, 500, 1000, 5000, 10_000, 20_000, 50_000, 100_000,
      500_000, 1000_000_000,
    ];
    let maxValue = 0;
    for (let i = 0; i < thresholds.length; i++) {
      if (maxCount <= thresholds[i]) {
        maxValue = thresholds[i];
        break;
      }
    }
    return maxValue;
  }

  protected drawLeftSideNumbers() {
    const stepNumber = Math.ceil(this.maxTreshld / 5);
    const stepHeight = this.gridHeight / 5;

    for (let i = 0; i < 6; i++) {
      const coordinateNumberY = this.gridHeight - stepHeight * i;
      const count = stepNumber * i;
      this.canvasDraw.text({
        text: `${count}`,
        x: this.lgSpasing - 5,
        y: coordinateNumberY,
        textAling: "end",
        fontSize: "30",
        maxWidth: 25,
        baseline: "top",
      });
    }
  }

  protected drawDescription() {
    const stepVertical = this.gridWidth / this.rowCount;
    for (let i = 0; i < this.descriptionArr.length; i++) {
      const stepX = this.lgSpasing + stepVertical * i;

      this.canvasDraw.text({
        text: `${this.descriptionArr[i]}`,
        x: stepX,
        y: this.gridHeight + this.smSpasing + this.lgSpasing / 2,
        textAling: "center",
        fontSize: "30",
        maxWidth: stepVertical / 2,
        baseline: "top",
      });
    }
  }

  protected getCurrentProcent(value: number, totalSum: number): number {
    return (value / totalSum) * 100;
  }

  protected getCurrenttHeightY(height: number, remains: number): number {
    const percentage = (remains / 100) * height;
    return height - percentage;
  }

  protected getCurrentY(
    count: number,
    maxValue: number,
    totalHeight: number
  ): { currentY: number } {
    const procent = this.getCurrentProcent(count, maxValue);
    const remains = 100 - procent;
    const currentY = this.getCurrenttHeightY(totalHeight, remains);
    return { currentY: totalHeight - currentY };
  }

  protected fillTable() {
    this.drawCenterGrid();
    this.drawLeftSideNumbers();
  

    if (this.rowCount <= 30 && (this.rowCount < 10 || this.gridWidth > 1000)) {
      this.drawDescription();
    }
  }
}

export { CanvasDrawGraph };
