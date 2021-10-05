import { useContext } from "react";
import MeetupList from "../components/meetups/MeetupList";
import FavouritesContext from "../contexts/favourites-context";

const Favourites = (props) => {
  const favouritesContext = useContext(FavouritesContext);
  let content;

  if (favouritesContext.totalFavourites === 0) {
    content = <p className='no-favourites'>You don't have favourites yet. How about adding some ?</p>;
  } else {
    content = <MeetupList meetups={favouritesContext.favourites} />;
  }

  return (
    <section>
      <h1 className="heading">Favourites</h1>
      {content}
    </section>
  );
};

export default Favourites;
