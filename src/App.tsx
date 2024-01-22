import { CanvasChartLines } from "./widget"


function App() {

  const linesData = [[100, 600, 300, 1000, 400, 0, 500], [300, 200, 500, 800, 300, 550, 500]];
  const linesColors = ['#1375AD', 'orange', 'green', 'blue'];
  const linesDescription = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  return (
    <>
    <div style={{paddingLeft: 50, paddingTop: 50}}>
     <CanvasChartLines 
     descriptionList={linesDescription}
     linesData={linesData}
     chartWidth={800}
     chartHeight={250}
     colorsLines={linesColors}
     />
     </div>
    </>
  )
}

export { App }
