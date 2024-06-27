/* eslint-disable react/prop-types */
import { Flex, Modal } from "antd";

const MyModal = ({ children, visible, handleCloseModal }) => {
  return (
    <>
      <Modal
        visible={visible}
        onCancel={handleCloseModal}
        footer={null}
        style={{ width: "600px", textAlign: "center" }}
      >
        <Flex justify="center"  vertical>

          {children}
        </Flex>
      </Modal>
    </>
  );
};

export default MyModal;
