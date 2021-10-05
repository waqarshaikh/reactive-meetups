import css from "./MeetupForm.module.css";
import Card from "../ui/Card";
import { useRef } from "react";

const NewMeetupForm = (props) => {
    const titleInputRef = useRef();
    const imageInputRef = useRef();
    const descriptionInputRef = useRef();
    const addressInputRef = useRef();

    function submitHandler(event){
        event.preventDefault();

        const meetupData = {
            title: titleInputRef.current.value,
            image: imageInputRef.current.value,
            description: descriptionInputRef.current.value,
            address: addressInputRef.current.value
        }
        
        props.onNewMeetup(meetupData);
    }

  return (
    <Card>
      <form className={css.form} onSubmit={submitHandler}>
        <div className={css.control}>
          <label htmlFor="title">Meetup Title</label>
          <input type="text" required ref={titleInputRef} id="title" />
        </div>
        <div className={css.control}>
          <label htmlFor="image">Meetup Image</label>
          <input type="url" required ref={imageInputRef} id="image" />
        </div>
        <div className={css.control}>
          <label htmlFor="address">Meetup Address</label>
          <input type="text" required ref={addressInputRef} id="address" />
        </div>
        <div className={css.control}>
          <label htmlFor="address">Meetup Description</label>
          <textarea
            name="description"
            required ref={descriptionInputRef}
            id="description"
            rows="10"
          ></textarea>
        </div>
        <div className={css.actions}>
            <button>Add Meetup</button>
        </div>
      </form>
    </Card>
  );
};

export default NewMeetupForm;
