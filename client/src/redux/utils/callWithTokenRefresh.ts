import { call } from "redux-saga/effects";
import authStorage from "../../storage/Auth";
import { handleTokenRefreshError } from "../error/sagas";

export function* callWithTokenRefresh(callable: any, ...args: any) {
  try {
    //@ts-ignore
    const response = yield call(callable, ...args);
    return response;
  } catch (err) {
    try {
      const { accessToken, refreshToken } =
        yield authStorage.refreshAccessToken(
          sessionStorage.getItem("accessToken") || "",
          sessionStorage.getItem("refreshToken") || ""
        );

      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);

      //@ts-ignore
      return yield call(callable, ...args);
    } catch (error) {
      yield handleTokenRefreshError();
    }
  }
}
