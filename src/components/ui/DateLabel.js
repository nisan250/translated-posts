import classes from "./DateLabel.module.css";

const DateLabel = (props) => {
  const milTime = Date.parse(props.date);
  const localTime = new Date(milTime);
  // console.log('month', localTime.getMonth());
  // console.log('day',localTime.getDate());
  // console.log('year',localTime.getFullYear());

  return (
    <div className={classes.date}>
      <span>{localTime.getDate()}</span>
      <span>{localTime.getMonth()}</span>
      <span>{localTime.getFullYear()}</span>
    </div>
  );
};

export default DateLabel;
