import { Meta } from '@storybook/react';

import { AnnotationPolygonProps, Annotation } from '../../src';

import { AnnotationPlot } from './annotation.data';

export default {
  title: 'API/Annotations',
  component: Annotation.Polygon,
  args: {
    points: [
      { x: 1000, y: 40 },
      { x: 1500, y: 80 },
      { x: '20', y: '70' },
      { x: 2000, y: 8 },
      { x: 3000, y: 80 },
    ],
    color: 'red',
  },
} as Meta<AnnotationPolygonProps>;

export function AnnotationPolygon(props: AnnotationPolygonProps) {
  return (
    <AnnotationPlot>
      <Annotation.Polygon {...props} />
    </AnnotationPlot>
  );
}

AnnotationPolygon.storyName = 'Annotation.Polygon';
