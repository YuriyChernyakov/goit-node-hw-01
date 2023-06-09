const { program } = require("commander");
const contacts = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();
const argv = program.opts();

async function invokeAction ({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allCont = await contacts.listContacts();
      console.table(allCont);
        break;

    case "get":
      const oneCont = await contacts.getContactById(id);
      console.table(oneCont);
        break;

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      console.table(newContact);
      break;

    case "remove":
      const deleteCont = await contacts.removeContact(id);
      console.table(deleteCont);
        break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);