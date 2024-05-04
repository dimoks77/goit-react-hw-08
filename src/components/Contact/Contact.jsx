import css from "./Contact.module.css";
import { FaUser, FaPhone } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editContact, deleteContact, fetchContacts } from "../../redux/contacts/operations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const contactScheme = Yup.object().shape({
    name: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("This is a required field"),
    number: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("This is a required field"),
  });

  const handleDelete = (id) => {
    dispatch(deleteContact(id))
      .unwrap()
      .then(() => {
        dispatch(fetchContacts());
      });
  };

  const handleEdit = (values) => {
    console.log(values);
    dispatch(editContact({ contactId: contact.id, data: values }))
      .unwrap()
      .then(() => {
        dispatch(fetchContacts());
        setIsModalOpen(false);
      });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.card}>
      <div className={css.wrapper}>
        <p className={css.field}>
          <FaUser size={14} /> {contact.name}
        </p>
        <p className={css.field}>
          <FaPhone size={14} /> {contact.number}
        </p>
      </div>
      <button className={css.button} onClick={() => handleDelete(contact.id)}>
        Delete
      </button>
      <button className={css.button} onClick={openModal}>
        Edit
      </button>

      {isModalOpen && (
        <div className={css.modal}>
          <div className={css.modalContent}>
            <span className={css.close} onClick={closeModal}>
              <IoMdCloseCircleOutline />
            </span>
            <Formik
              initialValues={{
                name: contact.name,
                number: contact.number,
              }}
              validationSchema={contactScheme}
              onSubmit={(values, actions) => {
                handleEdit(values);
                actions.resetForm();
              }}
            >
              <Form className={css.form}>
                <div className={css.formGroup}>
                  <div className={css.formWrapper}>
                    <label htmlFor="name">New name:</label>
                    <Field className={css.field} type="text" name="name" />
                  </div>
                  <ErrorMessage name="name" className={css.error} component="div" />
                </div>
                <div className={css.formGroup}>
                  <div className={css.formWrapper}>
                    <label htmlFor="number">New number:</label>
                    <Field className={css.field} type="text" name="number" />
                  </div>
                  <ErrorMessage name="number" className={css.error} component="div" />
                </div>
                <button className={css.button} type="submit">
                  Edit
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
