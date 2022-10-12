import React from "react";
import { Breadcrumb } from "../../views/OpeningEditor/types";
import { useDispatch } from "react-redux";
import "./Breadcrumbs.scss";
import { uiSetCurrentBranch } from "../../redux/branches/slice";

interface BreadcrumbsProps {
  items: Breadcrumb[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const dispatch = useDispatch();

  const onBreadcrumbClick = (branchId: string) => {
    dispatch(uiSetCurrentBranch(branchId));
  };

  return (
    <div className="breadcrumbs">
      {items.map((item, index) => {
        const isLastItem = index === items.length - 1;
        return (
          <div
            className={`breadcrumbs__item ${
              isLastItem ? "" : "breadcrumbs__item--clickable"
            }`}
            key={item._id}
            onClick={() => (isLastItem ? null : onBreadcrumbClick(item._id))}
          >
            {item.label}
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
