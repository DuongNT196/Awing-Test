import React, { useEffect, useState } from "react";
import { Button, Checkbox, Table, Popconfirm } from "antd";
import styles from "./css/ContentTabChild.module.css";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { ColumnsType } from "antd/es/table";

interface ChildDiv {
  tabNumber: number;
  data: any;
  checkSubmit: boolean;
  handleStatusTabChild: (index: number, status: boolean) => void;
  handleChangeInput: (nameInput: string, qty: string, key: number) => void;
  handleAddContent: () => void;
  handleDeleteContent: (numberMutile: number) => void;
  handleChangeTitleChild: (nameTitle: string) => void;
}

interface DataType {
  key: number;
  name: string;
  qty: number;
}

const ContentTabChild: React.FC<ChildDiv> = ({
  tabNumber,
  data,
  checkSubmit,
  handleStatusTabChild,
  handleChangeInput,
  handleAddContent,
  handleDeleteContent,
  handleChangeTitleChild,
}) => {
  const [nameTitleChild, setNameTitleChild] = useState(data.nameChild);
  const [job, setJob] = useState(data.listJobs);

  const onChangeCheckBox = (e: CheckboxChangeEvent) => {
    handleStatusTabChild(tabNumber, e.target.checked);
  };

  const onChangeInput = (name: string, qty: string, key: number) => {
    handleChangeInput(name, qty, key);
    const newJob = job.map((ele: any) => {
      if (ele.key === key) {
        ele.name = name;
        ele.qty = qty;
      }
      return ele;
    });
    setJob(newJob);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Tên quảng cáo*",
      dataIndex: "nameChild",
      key: "nameChild",
      render: (text, record) => {
        if (checkSubmit && record.name === "") {
          return (
            <input
              value={record.name}
              className={styles["error-input"]}
              onChange={(e) => {
                onChangeInput(e.target.value, record.qty + "", record.key);
              }}
            />
          );
        } else {
          return (
            <input
              value={record.name}
              onChange={(e) => {
                onChangeInput(e.target.value, record.qty + "", record.key);
              }}
            />
          );
        }
      },
    },
    {
      title: "Số lượng*",
      dataIndex: "qty",
      key: "qty",
      render: (text, record) => {
        if (checkSubmit && record.qty <= 0) {
          return (
            <input
              type="number"
              value={record.qty}
              className={styles["error-input"]}
              onChange={(e) => {
                onChangeInput(record.name, e.target.value, record.key);
              }}
            />
          );
        } else {
          return (
            <input
              type="number"
              value={record.qty}
              onChange={(e) => {
                onChangeInput(record.name, e.target.value, record.key);
              }}
            />
          );
        }
      },
    },
    {
      title: "",
      key: "action",
      render: (text, record) => (
        <Button onClick={() => handleDelete(record.key)}>Xóa</Button>
      ),
    },
  ];

  const handleDelete = (key: number) => {
    const newJob = job.filter((ele: any, index: number) => {
      return ele.key !== key;
    });
    setJob(newJob);
    handleDeleteContent(key);
  };

  const addContent = () => {
    const newJob = [
      ...job,
      {
        key: job.length,
        name: "Quảng cáo " + (job.length + 1),
        qty: 0,
      },
    ];
    handleAddContent();
    setJob(newJob);
  };

  const changeTitltChild = (nameTitle: string) => {
    setNameTitleChild(nameTitle);
    handleChangeTitleChild(nameTitle);
  };

  return (
    <div className={styles["contentTabChild"]}>
      <div>
        <span>Tên chiến dịch con *</span>
        <div>
          <input
            placeholder="Tên chiến dịch con *"
            className={styles["inputTabChild"]}
            value={nameTitleChild}
            onChange={(e) => {
              changeTitltChild(e.target.value);
            }}
          />
          <Checkbox defaultChecked={true} onChange={onChangeCheckBox}>
            Đang hoạt động
          </Checkbox>
        </div>
      </div>
      <div>
        <h4>DANH SÁCH QUẢNG CÁO</h4>
        <div className={styles["btnAdd"]}>
          <Button onClick={addContent}>Thêm</Button>
        </div>
        <Table columns={columns} dataSource={job} pagination={false} />
      </div>
    </div>
  );
};

export default ContentTabChild;
