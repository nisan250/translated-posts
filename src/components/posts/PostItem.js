import DateLabel from "../ui/DateLabel";
import classes from "./PostItem.module.css";

const PostItem = (props) => {
  return (
    <div className={classes["article-wrapper"]}>
      {props?.leftSide}
      <article className={classes.article}>
        <div className={classes.top}>
          <h2>{props.title}</h2>
          <DateLabel date={props.date} />
        </div>
        <p>{props.body}</p>
      </article>
      {props?.rightSide}
    </div>
  );
};

export default PostItem;
