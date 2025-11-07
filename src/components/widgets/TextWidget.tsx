import React from 'react';
import type { TextWidgetData } from '../../types/dashboard';

type TextWidgetProps = {
  data: TextWidgetData;
};

const TextWidget: React.FC<TextWidgetProps> = ({ data }) => {
  return (
    <div className="widget">
      <p className="widget-title">{data.title}</p>
      <div className="widget-body">
        <p>{data.text}</p>
      </div>
    </div>
  );
};

export default TextWidget;
