import Button from "../general/Button";
import classes from "./PostsThumbs.module.css";

const PostsThumbs = (props) => {
  return (
    <div className={classes.thumbs}>
      <Button onClick={props.voteUp}>UP</Button>
      <button onClick={props.voteUp}></button>
      <span>{props.vote}</span>
      <Button onClick={props.voteDown}>Down</Button>
    </div>
  );
};

export default PostsThumbs;
