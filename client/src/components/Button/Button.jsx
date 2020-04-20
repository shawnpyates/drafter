import React from 'react';
import PropTypes from 'prop-types';

import { ButtonInput, ButtonContainer } from './styledComponents';

function Button({
  value,
  clickHandler,
  shouldPositionCenter,
}) {
  return (
    <ButtonContainer>
      <ButtonInput
        type="button"
        value={value}
        onClick={clickHandler}
        isCenter={shouldPositionCenter}
      />
    </ButtonContainer>
  );
}

Button.defaultProps = {
  clickHandler: null,
  shouldPositionCenter: true,
};

Button.propTypes = {
  clickHandler: PropTypes.func,
  value: PropTypes.string.isRequired,
  shouldPositionCenter: PropTypes.bool,
};

export default Button;
