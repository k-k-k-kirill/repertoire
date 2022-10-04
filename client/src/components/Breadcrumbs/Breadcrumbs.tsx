import React from "react";
import { Breadcrumb } from "../../views/OpeningEditor/types";

interface BreadcrumbsProps {
  items: Breadcrumb[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <div>
      {items.map((item) => (
        <div key={item._id}>{item.label}</div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
