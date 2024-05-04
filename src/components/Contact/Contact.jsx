import css from "./Contact.module.css";
import { FaUser, FaPhone } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteContact, fetchContacts } from '../../redux/contacts/operations';


const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  
  const handleDelete = (id) => {
    dispatch(deleteContact(id))
    .unwrap()
      .then(() => {
        dispatch(fetchContacts());
      });
  };

  return (
    <div className={css.card}>
      <div className={css.wrapper}>
        <p className={css.field}>
          <FaUser size={14} /> {contact.name}
        </p>
        <p className={css.field}>
          <FaPhone  size={14} /> {contact.number}
        </p>
      </div>
      <button className={css.button} onClick={() => handleDelete(contact.id)}>
        Delete
      </button>
    </div>
  );
};

export default Contact;
