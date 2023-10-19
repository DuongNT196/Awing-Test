import React, { useState } from "react";
import styles from "./css/TabChild.module.css";

interface ChildDiv {
  keyChild: number;
  nameChild: string;
  numberJob: number;
  status: boolean;
  active: boolean;
  checkSubmit: boolean;
  onChildDataChange: (data: number) => void;
}

const TabChild: React.FC<ChildDiv> = ({
  keyChild,
  nameChild,
  numberJob,
  status,
  active,
  checkSubmit,
  onChildDataChange,
}) => {
  //const [tabActive, setTabActive] = useState(active);
  let tabActive = "tabChild";
  let ticker = "";
  if (status) {
    ticker = "greenTicker";
  } else {
    ticker = "grayTicker";
  }

  const handleOnClick = () => {
    onChildDataChange(keyChild);
  };
  if (active) {
    tabActive = "tabChildActive";
  } else {
    tabActive = "tabChild";
  }

  if (checkSubmit && nameChild === "") {
    tabActive = "tabChildError";
  }
  return (
    <div className={styles[tabActive]} onClick={handleOnClick}>
      <div className={styles["tabChildDiv"]}>
        <h2>{nameChild} </h2>
        <div className={styles[ticker]}></div>
      </div>
      <h2> {numberJob} </h2>
    </div>
  );
};

export default TabChild;
