import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Phonebook from './Components/Phonebook/Phonebook';
import ContactList from './Components/ContactsList/ContactsList';
import SectionTitle from './Components/SectionTitle/SectionTitle';
import Filter from './Components/Filter/Filter';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = (name, number) => {
    const uuid = uuidv4();
    const contact = {
      id: uuid,
      name,
      number,
    };
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, contact],
      };
    });
  };

  changeFilter = filter => {
    this.setState({ filter });
  };

  getVisiableContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  removeContact = contactId => {
    this.setState(prev => {
      return { contacts: prev.contacts.filter(({ id }) => id !== contactId) };
    });
  };

  render() {
    const { contacts } = this.state;
    const { filter } = this.state;
    const visiableContact = this.getVisiableContacts();

    return (
      <>
        <Phonebook onAddContact={this.addContact} contacts={contacts} />
        <SectionTitle title="Contacts" />
        {contacts.length > 1 && (
          <Filter value={filter} onChangeFilter={this.changeFilter} />
        )}
        {visiableContact.length > 0 ? (
          <ContactList
            contacts={visiableContact}
            onRemoveContact={this.removeContact}
          />
        ) : (
          <ContactList
            contacts={contacts}
            onRemoveContact={this.removeContact}
          />
        )}
      </>
    );
  }
}
