import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postDataAPI } from "../utils/fetchData";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { getErrorMessage } from "../utils/errorMessage";

const PremiumSuccess = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const location = useLocation();
  const [status, setStatus] = useState("Confirming payment...");

  useEffect(() => {
    const sessionId = new URLSearchParams(location.search).get("session_id");
    if (!sessionId) {
      setStatus("Missing Stripe session id.");
      return;
    }

    const confirm = async () => {
      try {
        const res = await postDataAPI("premium/confirm", { sessionId }, auth.token);
        dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: res.data.user } });
        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
        setStatus(res.data.msg);
      } catch (err) {
        const message = getErrorMessage(err);
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: message } });
        setStatus(message);
      }
    };

    confirm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  return (
    <main className="premium_page">
      <section className="premium_card">
        <p>Payment Status</p>
        <h1>{status}</h1>
        <Link to="/premium" className="auth_link">Premium page</Link>
        <Link to="/" className="auth_link ml-3">Back home</Link>
      </section>
    </main>
  );
};

export default PremiumSuccess;
