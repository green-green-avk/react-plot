import { max, min } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import React, { useReducer } from 'react';

import { PlotContext, DispatchContext } from './hooks';
import type { PlotProps, PlotState, ReducerActions } from './types';
import { splitChildren } from './utils';

interface State {
  series: PlotState[];
}

function reducer(state: State, action: ReducerActions): State {
  switch (action.type) {
    case 'newData': {
      const { series } = state;
      const serieItem = action.value;
      return {
        series: [...series, serieItem],
      };
    }
    case 'removeData': {
      const { id } = action.value;
      const seriesFiltered = state.series.filter((series) => series.id !== id);
      return { series: seriesFiltered };
    }
    default: {
      throw new Error();
    }
  }
}

export default function Plot({ width, height, margin, children }: PlotProps) {
  const [state, dispatch] = useReducer(reducer, { series: [] }, undefined);

  const xMin = min(state.series, (d) => d.xMin);
  const xMax = max(state.series, (d) => d.xMax);
  const yMin = min(state.series, (d) => d.yMin);
  const yMax = max(state.series, (d) => d.yMax);

  // Set scales
  const xScale = ![xMin, xMax].includes(undefined)
    ? scaleLinear()
        .domain([xMin, xMax])
        .range([margin?.left || 0, width - (margin?.right || 0)])
    : null;
  const yScale = ![yMin, yMax].includes(undefined)
    ? scaleLinear()
        .domain([yMin, yMax])
        .range([height - (margin?.bottom || 0), margin?.top || 0])
    : null;

  const { invalidChild, lineSeries, axis, heading } = splitChildren(children);
  if (invalidChild) {
    throw new Error('Only compound components of Plot are displayed');
  }
  return (
    <PlotContext.Provider value={{ xScale, yScale, width, height, margin }}>
      <DispatchContext.Provider value={{ dispatch }}>
        <svg width={width} height={height}>
          {heading}
          {lineSeries}
          {axis.x}
          {axis.y}
        </svg>
      </DispatchContext.Provider>
    </PlotContext.Provider>
  );
}
