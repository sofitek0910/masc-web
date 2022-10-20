import React from 'react';
import { BaseLayout } from 'layouts/Base';
import { useParams } from 'react-router-dom';
import Helmet from 'react-helmet';
import useUserInfo from 'components/UserInfo';
import img from 'assets/images/miditrack-image.png';

export default () => {
  const { id } = useParams();
  const { user } = useUserInfo();

  return (
    <BaseLayout>
      <Helmet>
        <meta property="og:title" content="Title" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content={img} />
        <meta property="og:description" content="Description" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <div>
        <p>
          Guid: {id}
        </p>
        <p>
          User: {user?.username ?? 'anonymous'}
        </p>
        <img alt="track" src={img} className="img-fluid" />
      </div>
    </BaseLayout>
  );
};
