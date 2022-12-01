import React from "react";
import { Card, Typography } from "antd";
import "./CommentBox.scss";

const { Title } = Typography;

interface CommentBoxProps {
  comment: string;
}

const CommentBox: React.FC<CommentBoxProps> = ({ comment }) => {
  return (
    <Card className="comment-box">
      <Title level={5}>Position comment</Title>
      {comment}
    </Card>
  );
};

export default CommentBox;
