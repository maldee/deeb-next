import { AiOutlineCheckSquare  ,AiOutlineDown , AiFillCheckCircle ,AiFillCaretDown, AiFillCaretRight      } from "react-icons/ai";
import { MdArrowRight, MdArrowDropDown, MdEdit } from "react-icons/md";
import styles from "./methody.module.css";
// import { RxCross2 } from "react-icons/rx";

const Node = ({ node, style, dragHandle, tree }) => {
  const CustomIcon = node.data.icon;
  const iconColor = node.data.iconColor;

  return (
    <div
      className={`node-container ${node.state.isSelected ? "isSelected" : ""}`}
      style={style}
      ref={dragHandle}
    >
      <div
        className="node-content"
        onClick={() => node.isInternal && node.toggle()}
      >
        {node.isLeaf ? (
          <>
            <span className="arrow"></span>
            <span className="file-folder-icon">
              {CustomIcon ? (
                <CustomIcon color={iconColor ? iconColor : "#6bc7f6"} />
              ) : (
                <AiOutlineCheckSquare color="#00ff95" className={styles.iconLeft}  />
              )}
            </span>
          </>
        ) : (
          <>
            <span className="arrow">
              {node.isOpen ? <AiFillCaretDown   /> : <AiFillCaretRight   />}
            </span>
           
          </>
        )}
        <span className="node-text">
          {node.isEditing ? (
            <input
              type="text"
              defaultValue={node.data.name}
              onFocus={(e) => e.currentTarget.select()}
              onBlur={() => node.reset()}
              onKeyDown={(e) => {
                if (e.key === "Escape") node.reset();
                if (e.key === "Enter") node.submit(e.currentTarget.value);
              }}
              autoFocus
            />
          ) : (
            <span>{node.data.name}</span>
          )}
        </span>
      </div>

      
    </div>
  );
};

export default Node;
