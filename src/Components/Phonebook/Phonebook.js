import React, { Component } from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import PropTypes from 'prop-types';
import styles from './Phonebook.module.css';

export default class Phonebook extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    if (e.target.name === 'name') {
      this.setState({
        name: e.target.value,
      });
    } else
      this.setState({
        number: e.target.value,
      });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onAddContact(this.state.name, this.state.number);
    this.setState({ name: '', number: '' });
  };

  getExsistName = () => {
    const name = this.state.name;
    const { contacts } = this.props;
    return contacts.find(contact =>
      contact.name.toLowerCase().includes(name.toLowerCase()),
    );
  };

  render() {
    const exsistName = this.getExsistName();
    const { name, number } = this.state;

    return (
      <>
        <SectionTitle title="Phonebook" />
        <form
          className={styles.wrapper}
          onSubmit={e => {
            if (exsistName === undefined) {
              this.handleSubmit(e);
            } else alert(`${exsistName.name} is already in contacts.`);
          }}
        >
          <label className="Name-label">
            Name
            <input
              className="Name-input"
              name="name"
              type="text"
              value={name}
              onChange={this.handleChange}
            />
          </label>
          <label className="Number-label">
            Number
            <input
              type="tel"
              name="phone"
              placeholder="XXX-XX-XX"
              value={number}
              onChange={this.handleChange}
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}"
            />
          </label>
          <button type="submit" className="Phonebook-button">
            Add contact
          </button>
        </form>
      </>
    );
  }
}

Phonebook.defaultProps = {
  contacts: [],
};

Phonebook.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onAddContact: PropTypes.func.isRequired,
};
