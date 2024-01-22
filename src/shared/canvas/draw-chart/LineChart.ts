import { LineChartProps } from "../types/types";
import { CanvasDrawGraph } from "./CanvasDrawGraph";


export class LineChart extends CanvasDrawGraph {
  readonly colorsList: string[];

  constructor({ colorsList,  ...args }: LineChartProps) {
    super(args);
    this.colorsList = colorsList;
  }

  private getLinesCoordinate(data: number[]): { x: number; y: number }[] {
    const stepHorizont = this.gridWidth / this.rowCount;

    const points = [];

    for (let i = 0; i < data.length; i++) {
      const step = this.lgSpasing + (stepHorizont * i);
      const { currentY } = this.getCurrentY(data[i], this.maxTreshld, this.gridHeight);
      
      points.push({ x: step, y: currentY + this.smSpasing });
    }

    return points;
  }

  private drawContent() {
    for (let i = 0; i < this.lines.length; i++) {
      const points = this.getLinesCoordinate(this.lines[i]);
      this.canvasDraw.bizierCurvePath({
        points,
        border: { color: this.colorsList[i] },
      })
    }
  }

  public update() {
    this.fillTable();
    this.drawContent();
  }

}