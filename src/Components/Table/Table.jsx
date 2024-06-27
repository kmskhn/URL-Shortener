/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Table, Button, Space, Input, Flex, message, Modal } from "antd";
import { CopyOutlined, QrcodeOutlined, CheckCircleTwoTone,LoadingOutlined, ExclamationCircleTwoTone } from "@ant-design/icons";


const MyTable = ({ handleEdit, handleCopyClick, handleQRShowBtn, urlExists, data }) => {

  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [tableData, setTableData] = useState(data);
  const [checkingSatusOf, setCheckingSatusOf] = useState('');

  const showModal = (id) => {
    setIsModalOpen(id);
  };

  const handleOk = () => {
    handleDelete(isModalOpen.id);
  };

  const handleCancel = () => {
    setIsModalOpen('');
  };


  useEffect(() => {
    if(urlExists){
      onSearch(urlExists)
    }
  }, [urlExists])

  const checkStatusHandler = async (id) => {

    setCheckingSatusOf(id)
    console.log("checkStatusHandler", id);

    try {

      const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/check-url-status`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"id":id}),
      });
  
      const data = await res.json();

      const updatedTableData = tableData.map(item => {
        if(item.target_url === data[0].target_url){
          return {
            ...item,
            status : data[0].status === 200 ? "OK" : "Expired"
          }
        } else{
          return item
        }
      })

      setTableData(updatedTableData);
      setCheckingSatusOf('');

    } catch (e) {

      setCheckingSatusOf('');
    }

  }



  const columns = [
    {
      title: "Full URL",
      dataIndex: "target_url",
      key: "target_url",
      width: "50%"
    },
    {
      title: "Short URL",
      dataIndex: "short_url",
      key: "short_url",
      // width: "20%",
      render: (text, record) => (
        <Flex justify="space-between">
          <p
            style={{
              // maxWidth: "50%",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              margin: "0 15px 0",
            }}
          >
            {text}
          </p>

          <Space>
          <Button
              title="Check Health"
              // type="primary"
              onClick={() => checkStatusHandler(record.id)}
              icon={
                checkingSatusOf === record.id ? <LoadingOutlined /> :
                record.status === "OK" ? 
                <CheckCircleTwoTone twoToneColor="#52c41a" /> : 
                <ExclamationCircleTwoTone twoToneColor="#eb2f96"/>}
            >
              Check Status
              </Button>
            <Button
              title="Copy Link"
              type="primary"
              onClick={() => handleCopyClick(text)}
              icon={<CopyOutlined />}
            />
            
            <Button
              type="primary"
              onClick={() => handleQRShowBtn(text)}
              style={{ marginLeft: "5px" }}
              title="Show QR TAG"
              icon={<QrcodeOutlined />}
            />
          </Space>
        </Flex>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: "30%",
      render: (record) => (
        <Space size="small">
          <Button
            size="small"
            type="primary"
            onClick={() =>
              handleEdit(tableData.find((item) => item.id === record.id))
            }
          >
            Edit
          </Button>
          <Button
            size="small"
            type="primary"
            danger
            onClick={() => showModal(record)}
            // onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleDelete = async (key) => {
    const deleteRes = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/delete-url/${key}`);
    const resmessage = await deleteRes.json()
    const newData = tableData.filter((item) => item.id!== key);
    setTableData(newData);
    message.success(resmessage.message); // Display success message
    setIsModalOpen('');
  };

  const onSearch = (value) => {
    setSearchText(value);
  };

  let filteredData = [...tableData].reverse();

  if (searchText) {
    filteredData = data.filter((item) =>
      item.target_url.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  // const handleShowStatusChange = (e) => {
  //   setShowStatusColumn(e.target.checked);
  // };

  // const displayedColumns = showStatusColumn
  //   ? columns
  //   : columns.filter((col) => col.key !== "status"); // Filter columns based on checkbox

  return (
    <>
    <Modal title="Are you sure you want to delete this record...?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <span>{isModalOpen.target_url}</span>
        {/* <span>{isModalOpen.short_url}</span> */}
        {/* <p>Some contents...</p> */}
      </Modal>
      <Flex
        style={{ marginBottom: "10px" }}
        direction="row"
        justify="start"
        align="middle"
      >
        {/* <Checkbox onChange={handleShowStatusChange}>
          Check whether the links are accessible
        </Checkbox> */}
      </Flex>
      <Input.Search
        style={{ marginBottom: 16 }}
        placeholder="Enter URL to search"
        onSearch={onSearch}
        onChange={(e)=>setSearchText(e.target.value)}
        value={searchText }
      />
      <Table
        dataSource={filteredData}
        columns={columns}
        pagination={{ pageSize: 5 }}
        style={{ overflow: "scroll" }}
      />
    </>
  );
};

export default MyTable;
