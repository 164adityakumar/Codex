function DisplayCourse(props) {
  return (
    <div>
      <h1>Course Name: {props.name}</h1>
      <h2>Course Price: {props.price}</h2>
    </div>
  );
}
export default DisplayCourse;