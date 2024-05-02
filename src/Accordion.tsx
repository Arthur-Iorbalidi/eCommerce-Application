import React from 'react';

type AccordionProps = {
  title: string;
  children: React.ReactNode;
};
function Accordion(props: AccordionProps) {
  const { title, children } = props;

  return (
    <div className="accordion" style={{ height: '100vh', width: '100%' }}>
      <h3 className="accordion-title">123123</h3>
      <div className="accordion-content">fqwf</div>
    </div>
  );
}

export default Accordion;
