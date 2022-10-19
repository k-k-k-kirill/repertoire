import React, { useState } from "react";
import { Modal } from "antd";

export default (WrappedComponent: any) => (props: any) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [nextAction, setNextAction] = useState<any>(null);

  const handleOkPress = () => {
    setModalVisible(false);
    setTitle("");
    setMessage("");
    nextAction();
  };

  const confirmAction = (
    title: string,
    message: string,
    nextActionArg: any
  ) => {
    setTitle(title);
    setMessage(message);
    setNextAction(() => () => nextActionArg());
    setModalVisible(true);
  };

  return (
    <>
      <WrappedComponent {...props} confirmAction={confirmAction} />
      <Modal
        centered
        title={title}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleOkPress}
      >
        {message}
      </Modal>
    </>
  );
};
