import styles from "./css/Content.module.css";
import { useState, useReducer } from "react";
import TabChild from "./TabChild";
import ContentTabChild from "./ContentTabChild";
import { Button } from "antd";

type State = {
  data: any;
};

type Action = {
  type: string;
  numberTab: number;
  changeName: string;
  columnsChange: number;
  checkAdd: string;
  numberMutile: number;
  checkEditNameTitle: boolean;
  nameTitle: string;
  qty: number;
};

const reducerTab = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD":
      const newState = {
        data: [
          ...state.data,
          {
            nameChild: "Chiến dịch con " + (state.data.length + 1),
            numberJob: 0,
            listJobs: [
              {
                key: 0,
                name: "Quảng cáo 1",
                qty: 0,
              },
            ],
          },
        ],
      };
      return newState;
    case "CHANGE":
      const newArr = [...state.data].map((ele, index) => {
        if (index === action.numberTab) {
          ele.listJobs = ele.listJobs.map((ele: any, index: number) => {
            if (action.columnsChange === ele.key) {
              ele.name = action.changeName;
              ele.qty = action.qty;
            }
            return ele;
          });
          if (action.checkAdd === "add") {
            ele.listJobs.push({
              key: ele.listJobs.length,
              name: "Quảng cáo " + (ele.listJobs.length + 1),
              qty: 0,
            });
          }
          if (action.checkAdd === "mutile") {
            ele.listJobs = ele.listJobs.filter((ele: any) => {
              return ele.key !== action.numberMutile;
            });
          }
          ele.numberJob = ele.listJobs.reduce(
            (accumulator: number, currentValue: any) =>
              accumulator + currentValue.qty,
            0
          );
        }
        return ele;
      });
      return { data: newArr };
    case "CHANGECHILD":
      const newArrChild = [...state.data].map((ele, index) => {
        if (index === action.numberTab) {
          if (action.checkEditNameTitle) {
            ele.nameChild = action.nameTitle;
          }
        }
        return ele;
      });
      return { data: newArrChild };
    default:
      return state;
  }
};

const initialState: State = {
  data: [
    {
      nameChild: "Chiến dịch con 1",
      numberJob: 0,
      status: true,
      listJobs: [
        {
          key: 0,
          name: "Quảng cáo 1",
          qty: 0,
        },
      ],
    },
  ],
};

const Content = () => {
  const [cssTab1, setCssTab1] = useState("tabAction");
  const [cssTab2, setCssTab2] = useState("tabNonAction");
  const [disTabInfo, setDisTabInfo] = useState("tab-imformation");
  const [disTabChild, setDisTabChild] = useState("none-tabChild");
  const [numberTabChildContent, setNumberTabChildContent] = useState(0);
  const [inputNameInfor, setInputNameInfor] = useState("");
  const [inputNameInforDep, setInputNameInforDep] = useState("");
  const [errorInput, setErrorInput] = useState("none-error");
  const [checkSubmit, setCheckSubmit] = useState(false);
  const [tabChild, setTabChild] = useState([
    {
      nameChild: "Chiến dịch con 1",
      numberJob: 0,
      status: true,
    },
  ]);

  const [state, dispatch] = useReducer(reducerTab, initialState);

  const handleSwitching = (key: string) => {
    if (key === "tab1") {
      setCssTab1("tabAction");
      setCssTab2("tabNonAction");
      setDisTabInfo("tab-imformation");
      setDisTabChild("none-tabChild");
    }
    if (key === "tab2") {
      setCssTab1("tabNonAction");
      setCssTab2("tabAction");
      setDisTabInfo("tab-none-imformation");
      setDisTabChild("tabChild");
    }
  };

  const handleAddTabChild = () => {
    const newTabChild = {
      nameChild: "Chiến dịch con " + (tabChild.length + 1),
      numberJob: 0,
      status: true,
      active: false,
    };
    setNumberTabChildContent(tabChild.length);
    setTabChild([...tabChild, newTabChild]);
    dispatch({
      type: "ADD",
      numberTab: 0,
      changeName: "",
      columnsChange: -1,
      checkAdd: "",
      numberMutile: 0,
      checkEditNameTitle: false,
      nameTitle: "",
      qty: 0,
    });
  };

  const handleClickTabChild = (data: number) => {
    setNumberTabChildContent(data);
  };

  const handleStatusTabChild = (indexChild: number, status: boolean) => {
    const newTabChild = tabChild.map((ele, index) => {
      if (index === indexChild) {
        ele.status = status;
      }
      return ele;
    });
    setTabChild(newTabChild);
  };

  const handleChangeInput = (name: string, qty: string, key: number) => {
    dispatch({
      type: "CHANGE",
      numberTab: numberTabChildContent,
      changeName: name,
      columnsChange: key,
      checkAdd: "",
      numberMutile: 0,
      checkEditNameTitle: false,
      nameTitle: "",
      qty: Number(qty),
    });

    setTabChild(state.data);
  };

  const handleAddContent = () => {
    dispatch({
      type: "CHANGE",
      numberTab: numberTabChildContent,
      changeName: "",
      columnsChange: -1,
      checkAdd: "add",
      numberMutile: 0,
      checkEditNameTitle: false,
      nameTitle: "",
      qty: 0,
    });
  };

  const handleDeleteContent = (numberMutile: number) => {
    dispatch({
      type: "CHANGE",
      numberTab: numberTabChildContent,
      changeName: "",
      columnsChange: -1,
      checkAdd: "mutile",
      numberMutile: numberMutile,
      checkEditNameTitle: false,
      nameTitle: "",
      qty: 0,
    });
  };

  const handleChangeTitleChild = (nameTitle: string) => {
    dispatch({
      type: "CHANGECHILD",
      numberTab: numberTabChildContent,
      changeName: "",
      columnsChange: -1,
      checkAdd: "mutile",
      numberMutile: 0,
      checkEditNameTitle: true,
      nameTitle: nameTitle,
      qty: 0,
    });

    const newListTabChild = tabChild.map((ele: any, index) => {
      if (index === numberTabChildContent) {
        ele.nameChild = nameTitle;
      }
      return ele;
    });
    setTabChild(newListTabChild);
  };

  const renderTabChild = tabChild.map((ele, index) => {
    if (index === numberTabChildContent) {
      return (
        <TabChild
          keyChild={index}
          nameChild={ele.nameChild}
          numberJob={ele.numberJob}
          status={ele.status}
          active={true}
          checkSubmit={checkSubmit}
          onChildDataChange={handleClickTabChild}
        />
      );
    }
    return (
      <TabChild
        keyChild={index}
        nameChild={ele.nameChild}
        numberJob={ele.numberJob}
        status={ele.status}
        active={false}
        checkSubmit={checkSubmit}
        onChildDataChange={handleClickTabChild}
      />
    );
  });

  const rederContentTabChild = state.data.map((ele: any, index: number) => {
    if (index === numberTabChildContent) {
      return (
        <ContentTabChild
          tabNumber={numberTabChildContent}
          data={ele}
          checkSubmit={checkSubmit}
          handleStatusTabChild={handleStatusTabChild}
          handleChangeInput={handleChangeInput}
          handleAddContent={handleAddContent}
          handleDeleteContent={handleDeleteContent}
          handleChangeTitleChild={handleChangeTitleChild}
        />
      );
    }
    return null;
  });
  console.log("state:", state.data);

  const handleSubmit = () => {
    const checkValidate = state.data.filter((ele: any) => {
      let check = false;
      if (ele.numberJob <= 0 || ele.nameChild === "") {
        check = true;
      }
      const validateChild = ele.listJobs.filter((ele: any) => {
        return ele.qty <= 0 || ele.nameChild === "";
      });
      if (validateChild.length > 0) {
        check = true;
      }
      return check;
    });
    if (inputNameInfor === "" || checkValidate.length > 0) {
      alert("Vui lòng điều đủ thông tin");
      if (inputNameInfor === "") {
        setErrorInput("error-input");
      } else {
        setErrorInput("none-error");
      }
      setCheckSubmit(true);
    } else {
      setErrorInput("none-error");
      alert(
        "Tên chiến dịch: " +
          inputNameInfor +
          " - " +
          "Mô tả: " +
          inputNameInforDep +
          ".........."
      );
    }
  };

  return (
    <div>
      <div className={styles["header"]}>
        <Button
          type="primary"
          className={styles["btn-submit-deader"]}
          onClick={handleSubmit}
          size="large"
        >
          SUBMIT
        </Button>
      </div>
      <div className={`${styles.content}`}>
        <div className={styles["tab-content"]}>
          <div
            className={`${styles.tab} ${styles[cssTab1]}`}
            onClick={() => handleSwitching("tab1")}
          >
            <h3>THÔNG TIN</h3>
          </div>
          <div
            className={`${styles.tab} ${styles[cssTab2]}`}
            onClick={() => handleSwitching("tab2")}
          >
            <h3>CHIẾN DỊCH CON</h3>
          </div>
        </div>
        <div className={styles["tab-general"]}>
          {/* Tab thông tin */}
          <div className={styles[disTabInfo]}>
            <div>
              <h4>Tên chiến dịch</h4>
              <input
                placeholder="Tên chiến dịch *"
                value={inputNameInfor}
                className={styles[errorInput]}
                onChange={(e) => {
                  setInputNameInfor(e.target.value);
                }}
              />
            </div>
            <div>
              <h4>Mô tả</h4>
              <input
                placeholder="Mô tả"
                value={inputNameInforDep}
                onChange={(e) => {
                  setInputNameInforDep(e.target.value);
                }}
              />
            </div>
          </div>

          {/* Tab chiến dịch con */}
          <div className={styles[disTabChild]}>
            <div className={styles["tabAddChild"]}>
              <div className={styles["addChild"]} onClick={handleAddTabChild}>
                <h4>+</h4>
              </div>
              {renderTabChild}
            </div>
            {rederContentTabChild}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
