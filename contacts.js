const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve(__dirname + '/db/contacts.json');

function listContacts() {
  fs.readFile(contactsPath)
    .then(contacts => JSON.parse(contacts))
    .then(contacts => console.table(contacts))
    .catch(error => console.error(error))
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then(contacts => JSON.parse(contacts))
    .then(contacts => contacts.find(contact => Number(contactId) === contact.id))
    .then(findedContact => findedContact
      ? console.table([findedContact])
      : console.warn(`Contact with id ${contactId} not found`))
    .catch(error => console.error(error))
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then(contacts => JSON.parse(contacts))
    .then(contacts => contacts.filter(contact => Number(contactId) !== contact.id))
    .then(contacts => fs.writeFile(contactsPath, JSON.stringify(contacts), 'utf-8'))
    .catch(error => console.error(error))
  console.log(`contact with id ${contactId} has been deleted`)
}

function addContact(name, email, phone) {
  const newContact = {
    name,
    email,
    phone
  }
  fs.readFile(contactsPath)
    .then(contacts => JSON.parse(contacts))
    .then(contacts => [...contacts, newContact])
    .then(contacts => fs.writeFile(contactsPath, JSON.stringify(contacts), 'utf-8'))
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
}