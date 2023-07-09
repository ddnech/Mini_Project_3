import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import axios from "axios";
import moment from 'moment';

export default function StoreIncome() {
  const [income, setIncome] = useState(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (start && end) {
      if (!validateDates()) return;
      fetchData();
    }
  }, [start, end]);

  const validateDates = () => {
    if (moment(end).isBefore(moment(start)) || moment(end).diff(moment(start), 'days') > 7) {
      setErrorMsg("The end date must be within 7 days of the start date and after the start date.");
      return false;
    }
    setErrorMsg("");
    return true;
  };

  const fetchData = async () => {
    setIncome(null);

    try {
      const requestBody = {
        start: start,
        end: end
      };

      const response = await axios.post("http://localhost:8000/api/user/income", requestBody, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setIncome(response.data);
    } catch (error) {
      console.error('Failed to get user income:', error);
    }
  };

  const handleStartChange = (e) => {
    setStart(e.target.value);
  };

  const handleEndChange = (e) => {
    setEnd(e.target.value);
  };

  const maxStartDate = moment().subtract(30, 'days').format('YYYY-MM-DD'); // Maximum allowed start date

  return (
    <div className="font-ysa">
      <h1 className="text-2xl font-bold text-darkgreen mb-4 text-center">Income History</h1>
      {errorMsg && <div className="text-red-500">{errorMsg}</div>}
      <div className="flex gap-3 pl-4">
        <div className="mb-4">
          <label>Start Date:</label>
          <input
            type="date"
            value={start || ""}
            min={maxStartDate}
            max={end || moment().format('YYYY-MM-DD')}
            onChange={handleStartChange}
          />
        </div>
        <div className="mb-4">
          <label>End Date:</label>
          <input
            type="date"
            value={end || ""}
            min={start || moment().subtract(30, 'days').format('YYYY-MM-DD')}
            max={moment().format('YYYY-MM-DD')}
            onChange={handleEndChange}
          />
        </div>
      </div>
      {income ? (
        <div className="border p-4 rounded shadow mb-4">
          <h3 className="text-lg font-bold text-darkgreen mb-2 pl-4">
            Income History between {moment(start).format("MMMM DD, YYYY")} and {moment(end).format("MMMM DD, YYYY")}
          </h3>
          <h4 className="font-bold">Total Income: Rp {Number(income.totalIncome).toLocaleString({ style: 'currency', currency: 'IDR' })}</h4>
          <hr />
          <h5 className="font-bold">Daily Income:</h5>
          {Object.entries(income.dailyIncome).map(([date, value], index) => (
            <div key={index} className="border p-2 rounded mb-2">
              <p>Date: {moment(date).format("MMMM DD, YYYY")}</p>
              <p>Income : Rp {Number(value).toLocaleString({ style: 'currency', currency: 'IDR' })}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="pl-4">No income history found for the selected date range.</p>
      )}
    </div>
  );
}
