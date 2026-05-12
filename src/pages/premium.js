import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDataAPI, postDataAPI } from "../utils/fetchData";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { MESS_TYPES } from "../redux/actions/messageAction";
import { getErrorMessage } from "../utils/errorMessage";

const Premium = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const messageAdmin = async () => {
    try {
      const res = await getDataAPI("premium/admin-contact", auth.token);
      const admin = { ...res.data.admin, text: "", media: [] };
      dispatch({ type: MESS_TYPES.ADD_USER, payload: admin });
      navigate(`/message/${admin._id}`);
    } catch (err) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { error: getErrorMessage(err) } });
    }
  };

  const buyPremium = async () => {
    setLoading(true);
    try {
      const res = await postDataAPI("premium/checkout", {}, auth.token);
      window.location.href = res.data.url;
    } catch (err) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { error: getErrorMessage(err) } });
      setLoading(false);
    }
  };

  return (
    <main className="premium_page">
      <section className="premium_card">
        <p>Premium Learning AI</p>
        <h1>Unlock manual-reviewed AI learning support</h1>
        <div className="premium_price">$20</div>
        <ul>
          <li>Stripe test checkout payment</li>
          <li>Admin manually reviews paid accounts</li>
          <li>Approved accounts get Premium AI comments on new posts</li>
          <li>AI prompt is restricted to learning and study support</li>
        </ul>
        <div className="premium_actions">
          <button onClick={buyPremium} disabled={loading}>
            {loading ? "Redirecting..." : "Pay with Stripe Test"}
          </button>
          <button type="button" onClick={messageAdmin}>
            Message Admin
          </button>
        </div>

        <div className="premium_upcoming">
          <p>Upcoming</p>
          <div>
            <span>AI study planner</span>
            <span>Live quiz rooms</span>
            <span>Skill roadmap</span>
            <span>Voice tutor chat</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Premium;
