import css from './ContactList.module.css';
import Contact from '../Contact/Contact';
import { useSelector } from "react-redux";
import { selectFilteredContacts } from '../../redux/contactsSlice';

const ContactList = () => {
    const filteredContacts = useSelector(selectFilteredContacts);    
    return (
        <ul className={css.list}>
            {filteredContacts.map(contact => (
                <li key={contact.id} className={css.listItem}>
                    <Contact contact={contact} /> 
                </li>
            ))}
        </ul>
    );
};

export default ContactList;
