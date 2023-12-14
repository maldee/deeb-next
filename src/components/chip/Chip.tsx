import styles from "./chip.module.css";

const Chip = ({ item, key }) => {

    const chip = item.split(',');

    return (
        <div className={styles.chipContainer}>
            {chip.map((tag) => (
                <div key={item.id} className={styles.chip}>
                    <span className={styles.tag}>{tag}
                    </span>
                </div>
            ))}

        </div>
    );
};

export default Chip;