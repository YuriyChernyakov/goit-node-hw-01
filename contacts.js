const fs = require('fs/promises');
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts () {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data)
}

async function getContactById (contactId) {
    const contacts = await listContacts();
    const result = contacts.find((contact) => contact.id === contactId.toString());
    return result || null;
}

async function removeContact (contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return result;
}

async function addContact (name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
}

module.exports = {
    listContacts,
    removeContact,
    getContactById,
    addContact
}