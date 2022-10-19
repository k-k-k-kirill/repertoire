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
  uiDeleteBranch,
} from "../../redux/branches/slice";
import { BranchState } from "../../redux/branches/types";
import { Branch } from "../../types/types";
import withConfirmationDialog from "../../hoc/withConfirmationDialog";

interface HistoryProps {
  history: string[];
  title: string;
  onUndo: () => void;
  currentPositionFen: string | undefined;
  onBoardEnabledChange: (boardEnabledState: boolean) => void;
  confirmAction: any;
}

const { Title } = Typography;

const History: React.FC<HistoryProps> = ({
  history,
  title,
  onUndo,
  currentPositionFen,
  onBoardEnabledChange,
  confirmAction,
}) => {
  const dispatch = useDispatch();

  const currentBranch = useSelector((state: { branches: BranchState }) =>
    getCurrentBranch(state)
  );
  const childBranches = useSelector((state: { branches: BranchState }) =>
    getChildrenForCurrentBranch(state)
  );
  const [displayedChildBranches, setDisplayedChildBranches] = useState<
    Branch[]
  >([]);

  const [showUndoButton, setShowUndoButton] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [newBranchName, setNewBranchName] = useState<string>("");

  useEffect(() => {
    if (currentBranch) {
      setShowUndoButton(currentBranch.startPosition !== currentPositionFen);

      if (childBranches) {
        const branchesToDisplay = getDisplayedChildBranches(
          childBranches,
          currentPositionFen
        );

        setDisplayedChildBranches(branchesToDisplay);
      }
    }
  }, [currentBranch?._id, currentPositionFen, childBranches?.length]);

  useEffect(() => {
    if (displayedChildBranches.length > 0) {
      onBoardEnabledChange(false);
    } else {
      onBoardEnabledChange(true);
    }
  }, [displayedChildBranches]);

  const handleAddBranchClick = useCallback(() => {
    setModalVisible(false);

    dispatch(
      uiAddBranch({
        title: newBranchName,
        mainLine: history,
        startPosition: currentPositionFen,
        endPosition: currentPositionFen,
        parent: currentBranch._id,
        owner: null,
      })
    );
  }, [dispatch, newBranchName, history, currentBranch]);

  const getDisplayedChildBranches = useCallback(
    (allBranchs: Branch[], fenOfCurrentPosition: string | undefined) => {
      return allBranchs.filter(
        (branch) => branch.startPosition === fenOfCurrentPosition
      );
    },
    [currentPositionFen, currentBranch?._id]
  );

  const onBranchMenuItemClick = (branchId: string) => {
    dispatch(uiSetCurrentBranch(branchId));
  };

  return (
    <Card className="history">
      <Title level={5}>{title}</Title>

      {history.map((item, index) => (
        <div
          className={`history__move ${
            (index + 1) % 2 > 0 ? "" : "history__move--black"
          }`}
          key={item}
        >
          <span>
            {index + 1}. {item}
          </span>
          {index === history.length - 1 && (
            <>
              {showUndoButton && (
                <Tooltip placement="top" title="Undo move">
                  <CloseCircleOutlined onClick={onUndo} />
                </Tooltip>
              )}

              <Tooltip placement="top" title="Branches">
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item
                        key="service"
                        onClick={() => setModalVisible(true)}
                      >
                        <PlusOutlined />
                        {"  "}Add branch
                      </Menu.Item>
                      {displayedChildBranches.map((branch: Branch) => (
                        <Menu.Item
                          className="history__child-branch"
                          key={`branch-${branch._id}`}
                        >
                          <div
                            onClick={() => {
                              onBranchMenuItemClick(
                                branch._id || currentBranch._id
                              );
                            }}
                          >
                            {branch.title}
                          </div>

                          <CloseCircleOutlined
                            onClick={() =>
                              confirmAction(
                                "Delete branch",
                                "Are you sure?",
                                () => dispatch(uiDeleteBranch(branch._id || ""))
                              )
                            }
                          />
                        </Menu.Item>
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

export default withConfirmationDialog(History);
