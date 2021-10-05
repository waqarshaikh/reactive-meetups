import MeetupItem from "./MeetupItem";
import css from "./MeetupList.module.css";

const MeetupList = (props) => {
  return (
    <ul className={css.list}>
      {props.meetups.map((meetup) => (
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          title={meetup.title}
          image={meetup.image}
          address={meetup.address}
          description={meetup.description}
        />
      ))}
    </ul>
  );
};

export default MeetupList;
