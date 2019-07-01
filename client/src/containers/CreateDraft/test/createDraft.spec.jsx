/* global describe, expect, test */
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import CreateDraft from '../createDraft';
import Form from '../../../components/Form/form';

const mockStore = configureStore([thunk]);

const store = {
  user: {
    currentUser: { uuid: 'abc123' },
  },
};

const wrapper = shallow(<CreateDraft store={mockStore(store)} />);

describe('<CreateDraft />', () => {
  test('should render a <CreateDraft /> component', () => {
    const received = wrapper.text();
    const expected = '<CreateDraft />';
    expect(received).toEqual(expected);
  });
  test('should render a <Form /> component as child if form not submitted yet', () => {
    const deepWrapper = wrapper.dive();
    deepWrapper.setState({ isSubmitComplete: false });
    const formLength = deepWrapper.find(Form).length;
    expect(formLength).toEqual(1);
  });
  test('should not render <Form /> component as child if form submitted', () => {
    const deepWrapper = wrapper.dive();
    deepWrapper.setState({ isSubmitComplete: true });
    const formLength = deepWrapper.find(Form).length;
    expect(formLength).toEqual(0);
  });
});
