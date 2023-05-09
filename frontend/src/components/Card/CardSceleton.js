import React from 'react';
import ContentLoader from 'react-content-loader';

const CardSceleton = (props) => (
  <ContentLoader
    className="cards__item"
    speed={2}
    width={282}
    height={360}
    viewBox="0 0 282 360"
    backgroundColor="#2a2a2a"
    foregroundColor="#545454"
    {...props}
  >
    <rect x="0" y="0" rx="12" ry="12" width="282" height="360" />
  </ContentLoader>
);

export default CardSceleton;
