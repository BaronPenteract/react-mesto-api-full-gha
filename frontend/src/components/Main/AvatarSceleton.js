import React from 'react';
import ContentLoader from 'react-content-loader';

const AvatarSceleton = (props) => (
  <ContentLoader
    speed={2}
    width={120}
    height={120}
    viewBox="0 0 120 120"
    backgroundColor="#2a2a2a"
    foregroundColor="#545454"
    {...props}
  >
    <circle cx="60" cy="60" r="60" />
  </ContentLoader>
);

export default AvatarSceleton;
