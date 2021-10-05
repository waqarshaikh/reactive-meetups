import NewMeetupForm from "../components/meetups/MeetupForm";
import { useHistory } from "react-router";

const NewMeetup = (props) => {
  const history = useHistory();

  function addMeetupHandler(meetupData) {
    fetch("https://meetup-2c9e9-default-rtdb.firebaseio.com/meetups.json", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      history.replace("/");
    });
  }

  return (
    <section>
      <h1 className="heading">New Meetups</h1>
      <NewMeetupForm onNewMeetup={addMeetupHandler} />
    </section>
  );
};

export default NewMeetup;
