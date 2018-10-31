import React from 'react';
import resumeData from '../assets/resumeData';

const Resume = props => {
  const { firstname, lastname, email, github, twitter } = resumeData;
  const experiences = resumeData.experiences
    .map(d => {
      const to = Date.parse(d.to);
      return {
        ...d,
        from: Date.parse(d.from),
        to: isNaN(to) ? new Date().getTime() : to
      };
    })
    .sort((a, b) => {
      if (a.from > b.from) {
        return 1;
      }
      if (a.from <= b.from) {
        return -1;
      }
      return 0;
    });
  return <div className="App" />;
};

export default Resume;
