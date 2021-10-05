import { useContext } from "react";
import FavouritesContext from "../../contexts/favourites-context";
import Card from "../ui/Card";
import css from "./MeetupItem.module.css";

const MeetupItem = (props) => {
  const favouritesContext = useContext(FavouritesContext);
  const itemIsFavourite = favouritesContext.itemIsFavourite(props.id);

  function toggleFavouriteStatusHandler() {
    if (itemIsFavourite) {
      favouritesContext.removeFavourite(props.id);
    } else {
      favouritesContext.addFavourite({
        id: props.id,
        title: props.title,
        image: props.image,
        address: props.address,
        description: props.description,
      });
    }
  }

  return (
    <Card>
      <li className={css.item}>
        <div className={css.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={css.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
          <p>{props.description}</p>
        </div>
        <div className={css.actions}>
          <button onClick={toggleFavouriteStatusHandler}>
            {itemIsFavourite ? "Remove from Favourites" : "To Favourites"}
          </button>
        </div>
      </li>
    </Card>
  );
};

export default MeetupItem;
