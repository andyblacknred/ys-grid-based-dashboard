import React from 'react';

type Props = {
  title?: string;
  text: string;
};

const TextWidget: React.FC<Props> = ({ title = 'Text block', text }) => {
  return (
    <div className="widget">
      <p className="widget-title">{title}</p>
      <div className="widget-body">
        <p className="widget-text">{text}</p>
      </div>
    </div>
  );
};

export default TextWidget;
