import { useEffect, useMemo, useRef } from "react";
import { LineChart } from "../../../shared";

type Props = {
  linesData: number[][];
  descriptionList: string[];
  chartHeight?: number;
  chartWidth?: number;
  colorGridLines?: string;
  colorsLines: string[];
}

const CanvasChartLines = (props: Props) => {
  const { descriptionList, linesData, chartHeight=300, chartWidth=600, colorGridLines='#d6d6d6', colorsLines } = props;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const getMaxNumber = (nums: number[]): number => {
    if (nums.length === 0) {
      return 0
    }
    return Math.max(...nums);
  }

  let maxCount = useMemo(() => getMaxNumber(linesData.flat()), [ linesData ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvasRef.current) return;

    const context = canvas.getContext('2d');
    if (!context) return;
    
    canvas.width = chartWidth;
    canvas.height = chartHeight;

    const drawLineGraph = new LineChart({ 
      baseContext: context,
      colorGridLines,
      rowCount: descriptionList.length - 1,
      maxCount,
      descriptionArr: descriptionList,
      lines: linesData,
      colorsList: colorsLines,
    });

    
    const anime = () => drawLineGraph.update();
    const animate = requestAnimationFrame(anime);

    return () => {
      cancelAnimationFrame(animate);
    }

  }, [ descriptionList, linesData ]);

  return (
    <canvas ref={canvasRef}></canvas>
  );
};

export { CanvasChartLines };