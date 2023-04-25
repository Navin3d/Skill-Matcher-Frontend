import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getIsLoggedInStatus } from "../store/auth/auth.selectors";
import { loadAccount } from "../store/account/account.actions";
import { getAccountData } from "../store/account/account.selectors";
import { localStorageService } from "../services";

export const allowedRoutes = ["/signup", "/signin"];

export default function PrivateRoutes({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedInStatus());
  const accountData = useSelector(getAccountData());
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      if (!allowedRoutes.includes(router.pathname)) {
        router.push("/signin");
        return;
      }
    } else {
      dispatch(loadAccount());
      const accountRole = localStorageService.getAccountRole();
      if (allowedRoutes.includes(router.pathname)) {
        if (accountRole === "Candidate") {
          router.push("/cabinet");
        }
        return;
      } else {
        if (accountRole === "Candidate") {
          router.push("/cabinet");
        }
      }
    }
    setIsReady(true);
  }, [router.asPath, isLoggedIn]);

  if (isLoggedIn) {
    return !allowedRoutes.includes(router.pathname) && isReady && children;
  } else {
    return allowedRoutes.includes(router.pathname) && isReady && children;
  }
}
