import Spinner from "react-bootstrap/Spinner";
import styles from "./form.module.css";

function Loader2() {
  return (
    <>
      <Spinner
        animation="border"
        className="position-absolute top-100 start-50"
        id={styles["spinner2"]}
      />
    </>
  );
}

export default Loader2;
