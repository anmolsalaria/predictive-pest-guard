declare module 'react-plotly.js' {
  interface PlotParams {
    data: any[];
    layout: any;
    useResizeHandler?: boolean;
    style?: React.CSSProperties;
  }

  const Plot: React.FC<PlotParams>;
  export default Plot;
} 