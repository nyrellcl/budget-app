import React from "react";
import { useState, useEffect } from "react";

function Expenses() {
  const [dailyTotal, setDailyTotal] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const [myBalance, setMyBalance] = useState<number>(0);
  const [days] = useState<string[]>([
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ]);

  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  useEffect(() => {
    getDays(year, day);
    getPercentage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDays = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  function getPercentage(): void {
    const totalDaysOfMonth = getDays(year, month);
    if (totalDaysOfMonth <= 31) {
      const totalPercentage =
        (dailyTotal * totalDaysOfMonth) / parseInt(totalDaysOfMonth.toFixed(2));
      return setPercentage(totalPercentage);
    }
  }

  function clearTotal() {
    setDailyTotal(0);
    const balance: any = document.getElementById("balance");
    if (balance.value !== "") {
      balance.value = "";
    }
  }

  return (
    <section className="expense-section">
      <article className="expense-section__container">
        <div className="expense-section__container__amount">
          <h1>My Balance</h1>
          <input
            id="balance"
            name="balance"
            type="number"
            placeholder="Enter Your Balance"
          />
          <button type="button" onClick={clearTotal}>
            Clear
          </button>
        </div>

        <div className="expense-section__container__chartCard">
          <h2>Spending in the last - 7 days</h2>
          <div className="chart">
            {days.map((day, dayIndex) => (
              <label key={dayIndex}>{day}</label>
            ))}
          </div>
          <div className="total-card">
            <div className="total-card__content">
              <h3>Total this month</h3>
              <span>{dailyTotal}</span>
            </div>
            <div className="total-card__percentage">
              <span>{percentage}</span>
              <h4>from last month</h4>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

export default Expenses;
