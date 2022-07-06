import Spinner from "react-bootstrap/Spinner";
import styles from "./form.module.css";

function Loader() {
  return (
    <>
      <Spinner
        animation="border"
        className="position-absolute top-100 start-50"
        id={styles["spinner1"]}
      />
    </>
  );
}

export default Loader;
