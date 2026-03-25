import { useCallback } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

type SearchStateUpdates = Record<string, string | null | undefined>;
type SearchStateOptions = {
  replace?: boolean;
  state?: Record<string, unknown>;
};

export function useHistorySearchState() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const setSearchState = useCallback(
    (updates: SearchStateUpdates, options: SearchStateOptions = {}) => {
      const nextParams = new URLSearchParams(location.search);

      Object.entries(updates).forEach(([key, value]) => {
        if (!value) {
          nextParams.delete(key);
          return;
        }

        nextParams.set(key, value);
      });

      const nextSearch = nextParams.toString();
      const normalizedSearch = nextSearch ? `?${nextSearch}` : "";

      if (normalizedSearch === location.search) {
        return;
      }

      navigate(
        {
          pathname: location.pathname,
          search: normalizedSearch,
        },
        {
          replace: options.replace ?? false,
          state: options.state,
        }
      );
    },
    [location.pathname, location.search, navigate]
  );

  return { searchParams, setSearchState };
}

export function hasManagedBackHistory(marker: string) {
  const historyState = window.history.state as { usr?: Record<string, unknown> } | null;
  return Boolean(historyState?.usr?.[marker]);
}