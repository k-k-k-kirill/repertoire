import React, { useState } from "react";

// Styles
import "./EditableTiitle.scss";

// Components
import { Typography, Input } from "antd";
import { EditOutlined, CheckOutlined } from "@ant-design/icons";

const { Title } = Typography;

interface EditableTitleProps {
  title: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onEditingComplete: () => void;
}

const EditableTitle: React.FC<EditableTitleProps> = ({
  title,
  onChange,
  onEditingComplete,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const onOkayClick = () => {
    setIsEditing(false);
    onEditingComplete();
  };

  return (
    <div className="editable-title">
      {isEditing ? (
        <div className="editable-title__input">
          <Input
            value={title}
            onChange={onChange}
            bordered={false}
            placeholder="Accelerated London system"
          />
          <CheckOutlined onClick={onOkayClick} />
        </div>
      ) : (
        <div
          className="editable-title__title"
          onClick={() => setIsEditing(true)}
        >
          <Title level={4}>{title}</Title>
          <EditOutlined height={"2rem"} />
        </div>
      )}
    </div>
  );
};

export default EditableTitle;
