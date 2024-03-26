import { Tree } from "react-arborist";
import useSWR from "swr";
import Node from "./Node";
import styles from "./methody.module.css";
import React, { useState, useEffect ,useRef} from 'react';


const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }
  return data;
};

const Methody = () => {

  const [term, setTerm] = useState("");
  const treeRef = useRef(null);
  const [methodyData, setData] = useState();

  const { data, mutate, isLoading } = useSWR(
    `/api/methody`,
    fetcher
  );

  const methodies = data;

  return (
    <div className="methodyContainer">
      <input
        type="text"
        placeholder="Search sloving methods..."
        className={styles.searchTree}
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />

      {methodies?.length > 0 ? (
        methodies?.map((item) => (
          <div key={item.id}>
          <Tree
            className="Tree"
            initialData={item.tree}
            openByDefault={false}
            ref={treeRef}
            searchTerm={term}
            searchMatch={(node, term) =>
              node.data['name'].toLowerCase().includes(term.toLowerCase())
            }
            >
             {Node}
            </Tree>
            </div>
            )
        )) : (
        null
      )}
    </div>
  );
}

export default Methody;


