import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./History.scss";
import { Card, Typography, Tooltip, Dropdown, Menu, Modal, Input } from "antd";
import {
  CloseCircleOutlined,
  CommentOutlined,
  BranchesOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  uiAddBranch,
  getCurrentBranch,
  getChildrenForCurrentBranch,
  uiSetCurrentBranch,
  uiDeleteBranch,
  uiModifyBranch,
} from "../../redux/branches/slice";
import { BranchState } from "../../redux/branches/types";
import { Branch, ModifyActions, PositionComment } from "../../types/types";
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
const { TextArea } = Input;

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
  const [positionCommentModalVisible, setPositionCommentModalVisible] =
    useState<boolean>(false);
  const [positionComment, setPositionComment] = useState<string>("");
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

  const handlePositionCommentModalOpen = () => {
    const previousComment = currentBranch.comments.find(
      (comment: any) => comment.position === currentPositionFen
    )?.comment;

    setPositionComment(previousComment ?? "");
    setPositionCommentModalVisible(true);
  };

  const handleSavePositionCommentClick = () => {
    let updatedComments =
      currentBranch?.comments.filter(
        (comment: PositionComment) => comment.position !== currentPositionFen
      ) || [];

    updatedComments.push({
      position: currentPositionFen,
      comment: positionComment,
    });

    dispatch(
      uiModifyBranch({
        ...currentBranch,
        actionType: ModifyActions.EditComments,
        comments: updatedComments,
      })
    );
    setPositionCommentModalVisible(false);
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

              <Tooltip placement="top" title="Move comment">
                <CommentOutlined onClick={handlePositionCommentModalOpen} />
              </Tooltip>

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
                                `Remove branch ${branch.title}`,
                                `Are you sure you want to remove branch ${branch.title}?`,
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

          <Modal
            centered
            title="Edit move comment"
            visible={positionCommentModalVisible}
            onCancel={() => setPositionCommentModalVisible(false)}
            onOk={handleSavePositionCommentClick}
          >
            <TextArea
              placeholder="Comment"
              value={positionComment}
              onChange={(e) => setPositionComment(e.target.value)}
            />
          </Modal>
        </div>
      ))}
    </Card>
  );
};

export default withConfirmationDialog(History);
