import React from "react";
import { Breadcrumb } from "../../types/types";
import { useDispatch } from "react-redux";
import "./Breadcrumbs.scss";
import { uiSetCurrentBranch } from "../../redux/branches/slice";

interface BreadcrumbsProps {
  items: Breadcrumb[];
  currentBranchTitle: string;
  clickable?: boolean;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  currentBranchTitle,
  clickable = true,
}) => {
  const dispatch = useDispatch();

  const onBreadcrumbClick = (branchId: string) => {
    dispatch(uiSetCurrentBranch(branchId));
  };

  return (
    <div className="breadcrumbs">
      {items.map((item, index) => {
        const isLastItem = index === items.length - 1;
        const isNonClickable = isLastItem || !clickable;
        return (
          <div
            className={`breadcrumbs__item ${
              isNonClickable ? "" : "breadcrumbs__item--clickable"
            }`}
            key={item._id}
            onClick={() =>
              isNonClickable ? null : onBreadcrumbClick(item._id)
            }
          >
            {isLastItem ? currentBranchTitle : item.label}
            {isLastItem ? null : (
              <span className="breadcrumbs__separator">/</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
