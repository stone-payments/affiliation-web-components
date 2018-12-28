import { storiesOf } from '@storybook/vue';

import merchantAddresses from './merchant-addresses.js';

const stories = storiesOf('Merchant Addresses', module);

stories
  .add('Default', () => ({
    components: { merchantAddresses },
    template: '<merchant-addresses/>',
  }));

