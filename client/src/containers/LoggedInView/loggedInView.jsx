import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MainMenu from '../MainMenu/mainMenu.jsx';
import CreateDraft from '../CreateDraft/createDraft.jsx';

const mapStateToProps = (state) => {
  const { view } = state.ui;
  return { view };
};

const LoggedInView = ({ view }) => (
  <div>
    {view === 'mainMenu' && <MainMenu />}
    {view === 'createDraft' && <CreateDraft />}
  </div>
);

LoggedInView.defaultProps = {
  view: 'mainMenu',
};

LoggedInView.propTypes = {
  view: PropTypes.string,
};

export default connect(mapStateToProps)(LoggedInView);
