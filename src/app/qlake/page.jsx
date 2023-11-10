import styles from "./qlake.module.css";
import QlakeList from "../../components/qlakeList/QlakeList";

export default function Qlake({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;

  return (
    <div className={styles.container}>

            <QlakeList page={page} />

          </div>
  );
}
