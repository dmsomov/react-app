import { memo } from 'react';

import { Home } from './pages/home';
import { WithStoreContext } from './context/store';

export const App = memo(() => (
  <WithStoreContext>
    <Home />
  </WithStoreContext>
));
