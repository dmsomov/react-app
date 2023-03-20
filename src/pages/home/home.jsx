import { memo } from 'react';

import { StoreWidget } from '../../components/store-widget';
import { Wrapper } from './home.styles';

export const Home = memo(() => (
  <Wrapper>
    <StoreWidget />
    <StoreWidget />
  </Wrapper>
));
