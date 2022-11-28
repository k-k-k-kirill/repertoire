import { Branch, Breadcrumb } from "../types/types";

export const getUpdatedBreadcrumbs = (
  currentBreadcrumbs: Breadcrumb[],
  selectedBranch: Branch
): Breadcrumb[] => {
  let currentBreadcrumbsCopy: Breadcrumb[] = [...currentBreadcrumbs];
  let newBreadcrumbs: Breadcrumb[] = [];

  const currentBranchBreadcrumbIndex = currentBreadcrumbsCopy.findIndex(
    (breadcrumb) => {
      return breadcrumb._id === selectedBranch._id;
    }
  );

  if (currentBranchBreadcrumbIndex >= 0) {
    newBreadcrumbs = currentBreadcrumbsCopy.slice(
      0,
      currentBranchBreadcrumbIndex + 1
    );
  } else {
    if (selectedBranch?._id) {
      newBreadcrumbs = currentBreadcrumbsCopy;

      newBreadcrumbs.push({
        _id: selectedBranch?._id,
        label: selectedBranch.title,
      });
    }
  }

  return newBreadcrumbs;
};
