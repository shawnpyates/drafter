/* global describe, expect, test */
import React from 'react';
import { shallow } from 'enzyme';

import Form from '../Form';

const { titleForCreateNew, inputs: formInputs } = require('../../../formContent.json').draft;

const props = {
  formInputs,
  title: titleForCreateNew,
};

const wrapper = shallow(<Form {...props} />);

describe('<Form />', () => {
  test('Renders a styled form component', () => {
    const received = wrapper.text();
    const expected = '<styled.form />';
    expect(received).toEqual(expected);
  });
  test('Title rendered as h1', () => {
    const titleElement = wrapper.childAt(0);
    const elementType = titleElement.text();
    const elementHtml = titleElement.html();
    expect(elementType).toEqual('<styled.h1 />');
    expect(elementHtml).toContain(titleForCreateNew);
  });
  test('Text type renders text input', () => {
    const inputContainerElement = wrapper.childAt(1);
    const inputElement = inputContainerElement.childAt(0);
    const elementType = inputElement.text();
    const inputNameProp = inputElement.prop('name');
    expect(elementType).toEqual('<styled.input />');
    expect(inputNameProp).toEqual(formInputs[0].name);
  });
  test('ButtonGroup type with two options renders two buttons', () => {
    const buttonContainerElement = wrapper.childAt(2);
    const buttons = buttonContainerElement.children().filterWhere(child => (
      child.text() === '<styled.button />'
    ));
    const buttonNameProp = buttons.first().prop('name');
    expect(buttons.length).toEqual(2);
    expect(buttonNameProp).toEqual(formInputs[1].name);
  });
  test('Submit type renders submit input', () => {
    const input = wrapper.childAt(3);
    expect(input.prop('name')).toEqual(formInputs[3].name);
    expect(input.prop('type')).toEqual('submit');
  });
});
