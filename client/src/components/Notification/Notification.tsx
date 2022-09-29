import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getNotification,
  uiSetNotification,
} from "../../redux/notification/slice";
import { notification } from "antd";

interface WithNotificationStateProps {
  message: string;
}

interface WithNotificationDispatchProps {
  uiSetNotification: typeof uiSetNotification;
}

interface WithNotificationOwnProps {
  children: JSX.Element;
}

type WithNotificationProps = WithNotificationOwnProps &
  WithNotificationStateProps &
  WithNotificationDispatchProps;

const WithNotification: React.FC<WithNotificationProps> = ({
  children,
  message,
  uiSetNotification,
}) => {
  useEffect(() => {
    if (message && message !== "") {
      notification.open({
        message,
        duration: 4,
        onClose: () => uiSetNotification(""),
      });
    }
  }, [message]);

  return <div>{children}</div>;
};

const mapStateToProps = (state: any) => ({
  message: getNotification(state),
});

const mapDispatchToProps = {
  uiSetNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(WithNotification);
