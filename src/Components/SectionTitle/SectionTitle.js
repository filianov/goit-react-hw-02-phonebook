import React from 'react';
import PropTypes from 'prop-types';

const SectionTitle = ({ title }) => <h2>{title}</h2>;

export default SectionTitle;

SectionTitle.defaultProps = {
  title: '',
};

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
