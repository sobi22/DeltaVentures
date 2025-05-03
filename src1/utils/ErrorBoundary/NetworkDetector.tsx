import { useEffect, useState } from 'react';

import ErrorIllustrations from '../ErrorIllustrations';
import { checkNetworkConnection } from 'utils';

const NetworkDetector = (props: { error: Error }) => {
  const [isDisconnected, updateIsDisconnected] = useState(true);

  useEffect(() => {
    checkNetworkConnection().then((connection: boolean) => {
      if (connection) {
        updateIsDisconnected(false);
      } else if (!isDisconnected) updateIsDisconnected(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isDisconnected) return <ErrorIllustrations type="network" />;
  return <ErrorIllustrations type="serverUnreachable" />;
};

export default NetworkDetector;
