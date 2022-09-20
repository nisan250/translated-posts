const AysncDataSkeleton = (props) => {
  if (props.hasError) {
    return (
      <section>
        <button onClick={props.tryAgainFn}>Try again</button>
      </section>
    );
  }

  if (props.isLoading) {
    return <section>Loading {props.subject}...</section>;
  }

  if (props.isEmpty) {
    return (
      <section>
        <h2>No {props.subject} found.</h2>
      </section>
    );
  }

  return (
    <section>
      <div>{props.children}</div>
    </section>
  );
};

export default AysncDataSkeleton;
