import "./App.css";
import { useEffect, useState } from "react";
import {
  HomeFilled,
  LinkOutlined,
  CopyOutlined,
  QrcodeOutlined,
  WarningOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import {
  Menu,
  Card,
  Input,
  Alert,
  Space,
  Spin,
  Tag,
  Button,
  QRCode,
  Layout,
  Flex,
  message,
} from "antd";
import MyModal from "./Components/Modal/Modal";
// import GeoLocationComponent from "./Components/Geolocation/geolocation";
import MyTable from "./Components/Table/Table";
import ReportPage from "./Components/ReportPage/ReportPage";
import PerLinkStat from "./Components/PerLinkStat/PerLinkStat";
import copy from "copy-to-clipboard";
import Header from "./Components/Header";
import Footer from "./Components/Footer/Footer";

const { Search } = Input;

const items = [
  {
    label: "Home",
    key: "home",
    icon: <HomeFilled />,
  },
  {
    label: "Per Link Stats",
    key: "per_link_stats",
    icon: <RiseOutlined />,
  },
  {
    label: "Report Link",
    key: "report",
    icon: <WarningOutlined />,
  },
];

const { Content } = Layout;

function App() {
  return (
    <LayoutComponent />
  );
}

const LayoutComponent = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const testParam = urlSearchParams.get("menu");

  const [current, setCurrent] = useState(!testParam ? "home" : testParam);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);
  const [response, setResponse] = useState(false);
  const [HTTPError, setHTTPError] = useState(200);
  const [urlValue, setUrlValue] = useState("");
  const [urlExists, setUrlExists] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [QRcodeURL, setQRcodeURL] = useState("");
  const [editing, setEditing] = useState(false);
  const [modalvisible, setModalVisible] = useState(false); 
  const [invalidURLError, setInvalidURLError] = useState(false); 
  const [data, setData] = useState([]);

  const fetchData = async () => {
    console.log("fetching data");
    setFetchingData(true);
    const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/list-all-urls`);
    const data = await res.json();
    console.log("data", data);
    setFetchingData(false);
    console.log("fetched ", data);
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, [response]);

  const handleCloseModal = () => {
    setModalVisible(false);
    setInvalidURLError(false);
  };

  const handleEdit = (slectedItem) => {
    console.log("handleEDIT", slectedItem);
    setUrlValue(slectedItem.target_url);
    setEditing(true);
  };

  const handleQRShowBtn = (QRcodeURL) => {
    // setShowQR(!showQR);
    console.log("QRcodeURL", QRcodeURL);
    setQRcodeURL(QRcodeURL);
    setModalVisible(true);
  };

  const handleReset = () => {
    setUrlValue("");
    setEditing(false);
  };

  const handleCopyClick = (urlToCopy) => {
    console.log("urlToCopy", urlToCopy);
    if (copy(urlToCopy)) {
      // setCopied(true);
      message.success("Record copied to clipboard!");
    }
  };

  const urlAlreadyExists = (url) => {
    return data.find(function (item) {
      return item.target_url === url;
    });
  };

  const isValidUrl = (url) => {
    return /https?:\/\/([a-zA-Z0-9-]+\.)?dm\.gov\.ae(?:\/|$)/.test(url);
};



  const onSubmit = async () => {
    if (urlAlreadyExists(urlValue)) {
      setUrlExists(urlValue);
    } else if (!isValidUrl(urlValue)) {
      setModalVisible(true);
      setInvalidURLError(true);
      // setUrlValue("");
    } else {
      console.log("onSubmit before", urlValue, import.meta.env.VITE_REACT_APP_API_URL);
      setResponse(() => false);
      setHTTPError(200);
      try {
        setLoading(true);

        const headers = {
          "Content-Type": "application/json",
        };

        const res = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/create/shortenurl`,
          {
            method: "POST",
            headers,
            body: JSON.stringify({
              url: urlValue,
              custom_hash: "",
            }),
          }
        );

        console.log("response", res);

        if (res?.status === 200) {
          setLoading(false);
          const data = await res.json();

          console.log("data", data);

          setResponse(true);
          setShortURL(data.shorturl);
          console.log("before fetching");
        } else {
          setResponse(false);
        }
      } catch (error) {
        console.log("ERRORR", error);
        if (error.response.status === 400) {
          setLoading(false);
          setHTTPError(400);
        } else if (error.response.status === 403) {
          setLoading(false);
          setHTTPError(403);
        }
      }
    }
  };

  const onClick = (e) => {
    if (e.key === "github") {
      setCurrent(current);
    } else {
      setResponse(() => false);
      setHTTPError(200);
      setCurrent(e.key);
    }
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        marginTop: "10px",
      }}
      className="layout-back"
    >
      <Header/>
      {modalvisible === true ? (
        <MyModal visible={modalvisible} handleCloseModal={handleCloseModal}>
          {!invalidURLError ? (
            <div id="myqrcode">
              <h2>Scan QR Code</h2>

              <QRCode
                value={QRcodeURL}
                bgColor="#fff"
                style={{
                  marginBottom: 15,
                  marginTop: 15,
                }}
              />
              <p style={{ fontSize: "12px" }}>{QRcodeURL}</p>
            </div>
          ) : (
            <h2 style={{ padding: "10px" }}>
              URL Shortner available for DM addresses
            </h2>
          )}
        </MyModal>
      ) : null}
      <Content style={{ flex: "1" }}>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          theme="light"
          mode="horizontal"
          style={{ justifyContent: "center", minHeight: "50px" }}
          items={items}
        />

        {current === "home" ? (
          <div>
            <Card
              style={{
                margin: "15px",
                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div>
                <div>
                  {/* <GeoLocationComponent/> */}
                  <h1>Welcome DM Admin</h1>
                  {/* <ClickCounter/> */}
                </div>
                <Flex>
                  <Search
                    style={{}}
                    placeholder="Enter your URL here.."
                    allowClear
                    value={urlValue}
                    onChange={(e) => {
                      setUrlValue(e.target.value);
                      if (urlValue === "") {
                        setUrlExists(false);
                      }
                    }}
                    prefix={<LinkOutlined />}
                    enterButton="Submit"
                    size="large"
                    onSearch={onSubmit}
                  />

                  {editing && (
                    <Button
                      style={{ marginLeft: "10px" }}
                      type="primary"
                      size="large"
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                  )}
                </Flex>
                {urlExists && <p>URL Already Exists</p>}
                <br />
                {loading === true ? (
                  <Space>
                    <Spin tip="Short URL Generating..." size="medium">
                      <div className="content" />
                    </Spin>
                  </Space>
                ) : null}

                {response === true && shortURL !== "" && urlValue ? (
                  <>
                    <Alert
                      message={
                        <>
                          <Flex
                            style={{ marginTop: "10px" }}
                            vertical
                            justify="start"
                            align="start"
                            gap="10px"
                          >
                            <div>
                              <Tag color="#108ee9">
                                <b>Original URL : </b>
                              </Tag>
                              <a
                                href={urlValue}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {urlValue}
                              </a>
                            </div>
                            <div>
                              <Tag color="#108ee9">
                                <b>Short URL : </b>
                              </Tag>
                              <a
                                href={shortURL}
                                target="_blank"
                                rel="noreferrer"
                                style={{ marginRight: "10px" }}
                              >
                                {shortURL}{" "}
                              </a>
                              <Space>
                                <Button
                                  title="Copy Link"
                                  type="primary"
                                  onClick={() => handleCopyClick(shortURL)}
                                  icon={<CopyOutlined />}
                                />
                                <Button
                                  type="primary"
                                  onClick={() => handleQRShowBtn(shortURL)}
                                  style={{ marginLeft: "5px" }}
                                  title="Show QR TAG"
                                  icon={<QrcodeOutlined />}
                                ></Button>
                              </Space>
                            </div>
                          </Flex>
                        </>
                      }
                      type="success"
                      style={{ textAlign: "center" }}
                      closable
                    />
                  </>
                ) : HTTPError === 400 ? (
                  <Alert
                    message={
                      <>
                        <p>
                          Only HTTPS Links are allowed, Make sure your link
                          starts with https://
                          <br />
                          Or entered URL is not a valid URL
                        </p>
                      </>
                    }
                    type="error"
                    style={{ textAlign: "center", maxWidth: "95%" }}
                  />
                ) : HTTPError === 403 ? (
                  <Alert
                    message={
                      <>
                        <p>
                          This URL is Blacklisted, Try another URL
                          <br />
                          You think it is a mistake?{" "}
                          <a href="?menu=contact">Contact us</a>
                        </p>
                      </>
                    }
                    type="error"
                    style={{ textAlign: "center", maxWidth: "95%" }}
                    showIcon
                    closable
                  />
                ) : null}
              </div>
            </Card>
            <Card
              style={{
                // width: "85%",
                justifyItems: "center",
                margin: "15px",
                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              {fetchingData !== true && data?.length > 0 && (
                <MyTable
                  data={data}
                  handleEdit={handleEdit}
                  handleCopyClick={handleCopyClick}
                  handleQRShowBtn={handleQRShowBtn}
                  urlExists={urlExists}
                />
              )}

              {fetchingData === true ? (
                <Space>
                  <Spin tip="Fetching Data..." size="medium">
                    <div className="content" />
                  </Spin>
                </Space>
              ) : null}
            </Card>
          </div>
        ) : current === "report" ? (
          <div>
            <Card
              style={{
                justifyItems: "center",
                margin: "15px",
                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <ReportPage />
            </Card>
          </div>
        ) : current === "per_link_stats" ? (
          <div>
            <Card
              style={{
                justifyItems: "center",
                margin: "15px",
                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <PerLinkStat />
            </Card>
          </div>
        ) : null}
      </Content>
      <Footer/>
    </Layout>
  );
};

export default App;
