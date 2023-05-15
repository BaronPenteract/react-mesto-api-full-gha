import React from 'react';
import ContentLoader from 'react-content-loader';

const ProfileInfoSceleton = (props) => (
  <ContentLoader
    speed={2}
    width={260}
    height={79}
    viewBox="0 0 354 79"
    backgroundColor="#2a2a2a"
    foregroundColor="#545454"
    {...props}
  >
    <rect x="0" y="0" rx="12" ry="12" width="354" height="79" />
  </ContentLoader>
);

export default ProfileInfoSceleton;
