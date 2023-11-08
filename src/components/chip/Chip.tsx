import styles from "./chip.module.css";

const Chip = ({ key, item }) => {

    const chip = item.split(',');

    return (
        <div className={styles.chipContainer}>
            {chip.map((tag) => (
                <div className={styles.chip}>
                    <span className={styles.tag}>{tag}
                    </span>
                </div>
            ))}

        </div>
    );
};

export default Chip;