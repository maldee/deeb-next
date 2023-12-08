import styles from "./chatbits.module.css";


const Phrases = ({ key, item }) => {
  return (
    <div className={styles.container} >

      <table>
        <tr>
          <th>English Meaning</th>
          <th>Phrase</th>
          <th>Category</th>
          <th>Situation</th>
          <th>Language</th>
        </tr>
        {data?.map((item) => (

          <tr key={item.id}>
            <td className={styles.td}>{item.eng_p}</td>
            <td className={styles.td}>{item.phrase}</td>
            <td className={styles.td}>{item.category}</td>
            <td className={styles.td}>{item.situation}</td>
            <td className={styles.td}>{item.language}</td>
          </tr>

        ))}

      </table>
      <h1>{item.phrase}</h1>

    </div>
  );
};

export default Phrases;











