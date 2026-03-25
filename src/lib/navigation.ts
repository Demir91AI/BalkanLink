import type { NavigateFunction } from "react-router-dom";

export function navigateBackOrHome(navigate: NavigateFunction) {
  if (window.history.length > 1) {
    navigate(-1);
    return;
  }

  navigate("/");
}