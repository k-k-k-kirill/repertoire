import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./History.scss";
import { Card, Typography, Tooltip, Dropdown, Menu, Modal, Input } from "antd";
import {
  CloseCircleOutlined,
  BranchesOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  uiAddBranch,
  getCurrentBranch,
  getChildrenForCurrentBranch,
  uiSetCurrentBranch,
} from "../../redux/branches/slice";
import { BranchState } from "../../redux/branches/types";
import { Branch } from "../../types/types";
import { Link } from "react-router-dom";

interface HistoryProps {
  history: string[];
  title: string;
  onUndo: () => void;
  chess: any;
  onBoardEnabledChange: (boardEnabledState: boolean) => void;
}

const { Title } = Typography;

const History: React.FC<HistoryProps> = ({
  history,
  title,
  onUndo,
  chess,
  onBoardEnabledChange,
}) => {
  const dispatch = useDispatch();
  const currentBranch = useSelector((state: { branches: BranchState }) =>
    getCurrentBranch(state)
  );
  const childBranches = useSelector((state: { branches: BranchState }) =>
    getChildrenForCurrentBranch(state)
  );
  const childBranchesForCurrentPosition = childBranches.filter(
    (branch: Branch) => {
      return branch.startPosition === chess?.fen();
    }
  );

  useEffect(() => {
    if (childBranchesForCurrentPosition.length > 0) {
      onBoardEnabledChange(false);
    } else {
      onBoardEnabledChange(true);
    }
  }, [childBranchesForCurrentPosition]);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [newBranchName, setNewBranchName] = useState<string>("");

  const handleAddBranchClick = useCallback(() => {
    setModalVisible(false);

    dispatch(
      uiAddBranch({
        title: newBranchName,
        mainLine: history,
        startPosition: chess?.fen(),
        endPosition: chess?.fen(),
        parent: currentBranch._id,
        owner: null,
      })
    );
  }, [dispatch, newBranchName, chess, history, currentBranch]);

  const onBranchMenuItemClick = (branchId: string) => {
    dispatch(uiSetCurrentBranch(branchId));
  };

  return (
    <Card className="history">
      <Title level={5}>{title}</Title>
      {history.map((item, index) => (
        <div className="history__move" key={item}>
          <span>{item}</span>
          {index === history.length - 1 && (
            <>
              <Tooltip placement="top" title="Undo move">
                <CloseCircleOutlined onClick={onUndo} />
              </Tooltip>
              <Tooltip placement="top" title="Branches">
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item onClick={() => setModalVisible(true)}>
                        <PlusOutlined />
                        {"  "}Add branch
                      </Menu.Item>
                      {childBranchesForCurrentPosition.map((branch: Branch) => (
                        <Link
                          to={`/openings/edit`}
                          state={{ branchId: branch._id }}
                        >
                          <Menu.Item
                            key={`branch-${branch._id}`}
                            onClick={() =>
                              onBranchMenuItemClick(
                                branch._id || currentBranch._id
                              )
                            }
                          >
                            {branch.title}
                          </Menu.Item>
                        </Link>
                      ))}
                    </Menu>
                  }
                  placement="bottomLeft"
                  trigger={["click"]}
                >
                  <BranchesOutlined />
                </Dropdown>
              </Tooltip>
            </>
          )}
          <Modal
            centered
            title="Add new branch"
            visible={modalVisible}
            onCancel={() => setModalVisible(false)}
            onOk={handleAddBranchClick}
          >
            <Input
              placeholder="Branch name"
              value={newBranchName}
              onChange={(e) => setNewBranchName(e.target.value)}
            />
          </Modal>
        </div>
      ))}
    </Card>
  );
};

export default History;
