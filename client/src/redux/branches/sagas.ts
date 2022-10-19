import {
  UiAction,
  SagaAction,
  UiFetchOpeningsAction,
  UiAddBranchAction,
  UiModifyBranchAction,
  SagaFetchOpeningsAction,
  UiSetCurrentBranchAction,
  UiFetchByParentIdAction,
  SagaFetchBranchesAction,
  SagaFetchByIdAction,
  UiDeleteBranchAction,
} from "./actions";
import {
  sagaFetchOpenings,
  sagaFetchOpeningsComplete,
  sagaSetCurrentBranch,
  sagaFetchByParentIdComplete,
  sagaFetchBranchesComplete,
  sagaAddBranchComplete,
  sagaFetchByIdComplete,
  sagaFetchById,
  sagaModifyBranchComplete,
  sagaClearChildBranches,
  getBranchById,
  sagaFetchByParentId,
} from "./slice";
import { uiSetNotification } from "../notification/slice";
import { take, put, select } from "redux-saga/effects";
import branchStorage from "../../storage/Branch";
import { Branch, ModifyActions } from "../../types/types";
import { callWithTokenRefresh } from "../utils/callWithTokenRefresh";

function* openingSaga() {
  while (true) {
    const action:
      | UiFetchOpeningsAction
      | UiAddBranchAction
      | UiModifyBranchAction = yield take([
      UiAction.FetchOpenings,
      UiAction.AddBranch,
      UiAction.ModifyBranch,
      SagaAction.FetchOpenings,
    ]);

    if (action.type === UiAction.FetchOpenings) {
      yield put(sagaFetchOpenings());
    } else if (action.type === UiAction.AddBranch) {
      try {
        const branch: Branch = yield callWithTokenRefresh(
          branchStorage.add,
          action.payload
        );

        if (branch && branch._id) {
          yield put(sagaAddBranchComplete(branch));
          yield put(sagaSetCurrentBranch(branch._id));
        }
      } catch (err) {
        yield put(uiSetNotification("Failed to save opening progress!"));
      }
    }
  }
}

function* watchFetchById() {
  while (true) {
    const action: SagaFetchByIdAction = yield take(SagaAction.FetchById);

    if (action.type === SagaAction.FetchById) {
      try {
        const branch: Branch = yield callWithTokenRefresh(
          branchStorage.getById,
          action.payload
        );
        yield put(sagaFetchByIdComplete(branch));
      } catch (err) {
        yield put(uiSetNotification("Failed to fetch branch."));
      }
    }
  }
}

function* watchFetchBranches() {
  while (true) {
    const action: SagaFetchBranchesAction = yield take(
      SagaAction.FetchBranches
    );

    if (action.type === SagaAction.FetchBranches) {
      try {
        const branches: Branch[] = yield callWithTokenRefresh(
          branchStorage.getAll
        );
        yield put(sagaFetchBranchesComplete(branches));
      } catch (err) {
        yield put(uiSetNotification("Failed to fetch branches"));
      }
    }
  }
}

function* watchFetchOpenings() {
  while (true) {
    const action: SagaFetchOpeningsAction = yield take(
      SagaAction.FetchOpenings
    );

    if (action.type === SagaAction.FetchOpenings) {
      const openings: Branch[] = yield callWithTokenRefresh(
        branchStorage.getOpenings
      );
      if (openings) {
        yield put(sagaFetchOpeningsComplete(openings));
      }
    }
  }
}

function* watchSetCurrentBranch() {
  while (true) {
    const action: UiSetCurrentBranchAction = yield take(UiAction.SetCurrent);

    if (action.type === UiAction.SetCurrent) {
      if (action.payload) {
        yield put(sagaSetCurrentBranch(action.payload));
      }
    }
  }
}

function* watchModifyBranch() {
  while (true) {
    const action: UiModifyBranchAction = yield take(UiAction.ModifyBranch);

    if (action.type === UiAction.ModifyBranch) {
      const modifiedBranch: Branch = yield callWithTokenRefresh(
        branchStorage.modify,
        action.payload
      );

      yield put(sagaModifyBranchComplete(modifiedBranch));

      if (
        action.payload.actionType === ModifyActions.UndoMove &&
        modifiedBranch._id
      ) {
        yield put(sagaClearChildBranches(modifiedBranch._id));
      }
    }
  }
}

function* watchFetchByParentId() {
  while (true) {
    const action: UiFetchByParentIdAction = yield take([
      UiAction.FetchByParentId,
      SagaAction.FetchByParentId,
    ]);

    if (
      action.type === UiAction.FetchByParentId ||
      action.type === SagaAction.FetchByParentId
    ) {
      const branches: Branch[] = yield callWithTokenRefresh(
        branchStorage.getByParentId,
        action.payload.parentId
      );

      yield put(sagaFetchById(action.payload.parentId));
      yield put(sagaClearChildBranches(action.payload.parentId));
      yield put(sagaFetchByParentIdComplete({ branches }));
    }
  }
}

function* watchDeleteBranch() {
  while (true) {
    const action: UiDeleteBranchAction = yield take(UiAction.DeleteBranch);

    if (action.type === UiAction.DeleteBranch) {
      yield callWithTokenRefresh(branchStorage.delete, action.payload);
      const branch: Branch = yield select((state) =>
        getBranchById(state, action.payload)
      );

      if (branch && !branch?.parent) {
        yield put(sagaFetchOpenings());
      } else {
        if (branch && branch?.parent) {
          yield put(sagaFetchByParentId({ parentId: branch?.parent }));
        }
      }
    }
  }
}

const branchSagas = [
  openingSaga,
  watchFetchOpenings,
  watchSetCurrentBranch,
  watchModifyBranch,
  watchFetchByParentId,
  watchFetchBranches,
  watchFetchById,
  watchDeleteBranch,
];

export default branchSagas;
