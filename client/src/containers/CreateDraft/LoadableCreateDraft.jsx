import React, { lazy, Suspense } from 'react';

import { LoadingIndicator } from '../../components';

const LoadableComponent = lazy(() => import('./CreateDraft'));

function LoadableCreateDraft() {
  return (
    <div>
      <Suspense fallback={<LoadingIndicator />}>
        <LoadableComponent />
      </Suspense>
    </div>
  );
}

export default LoadableCreateDraft;
