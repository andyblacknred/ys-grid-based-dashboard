import React from 'react';

type TextWidgetProps = {
  title?: string;
  text?: string;
};

const TextWidget: React.FC<TextWidgetProps> = ({ title = 'Text block', text }) => {
  return (
    <div className="widget">
      <p className="widget-title">{title}</p>
      <div className="widget-body">
        <p>{text ?? 'Some text block…'}</p>
      </div>
    </div>
  );
};

export default TextWidget;
