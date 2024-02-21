import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ToggleButton from "react-toggle-button";
import {
  allExpenseData,
  deleteExpData,
  filter,
  postData,
} from "../feature/expenseTrackerSlice";

const Home = () => {
  const navigate = useNavigate();
  // const [api, setApi] = useState(false);
  const dispatch = useDispatch();
  const [value, setValue] = useState(false);
  const [obj, setObj] = useState({
    transaction_name: "",
    transaction_type: "income",
    incomeOrExpObj: {
      name: "",
      value: "",
    },
    date: "",
    international: "no",
    country_name: "",
  });

  const [newObj, setNewObj] = useState({});

  console.log(newObj, "newObj");

  console.log(obj.transaction_type, "type999");

  const { allTransactionData, loading, filterUsers, isFilter } = useSelector(
    (state) => state.app
  );
  console.log(allTransactionData, "allTransactionData");
  console.log(isFilter, "isFilter");
  console.log(filterUsers, "filterUsers");

  const allIncome = allTransactionData.filter(
    (data) => data.transaction_type === "income"
  );
  console.log(allIncome, "allIncome");
  const allExpense = allTransactionData.filter(
    (data) => data.transaction_type === "expense"
  );
  console.log(allExpense, "allExpense");

  const initialValue = 0;
  const totalIncomeValue = allIncome.reduce(
    (accumulator, currentValue) =>
      Number(accumulator) + Number(currentValue?.incomeOrExpObj?.value),
    initialValue
  );
  console.log(totalIncomeValue, "totalIncomeValue");
  const totalExpenseValue = allExpense.reduce(
    (accumulator, currentValue) =>
      Number(accumulator) + Number(currentValue?.incomeOrExpObj?.value),
    initialValue
  );
  console.log(totalExpenseValue, "totalExpenseValue");

  useEffect(() => {
    dispatch(allExpenseData());
  }, []);

  const handleChange = (e) => {
    setObj({ ...obj, [e.target.name]: e.target.value });
  };

  const radioChangeHandler = (e) => {
    if (e.target.type === "radio") {
      setObj({ ...obj, transaction_type: e.target.value });
    } else {
      setObj({
        ...obj,
        incomeOrExpObj: {
          ...obj.incomeOrExpObj,
          [e.target.name]: e.target.value,
        },
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(value, "value");

    if (value) {
      obj.international = "yes";
    } else {
      obj.international = "no";
      obj.country_name = "India";
    }
    // console.log(obj, "obj000");

    dispatch(postData(obj));

    setObj({
      ...obj,
      transaction_name: "",
      transaction_type: "income",
      incomeOrExpObj: {
        name: "",
        value: "",
      },
      date: "",
      international: "no",
      country_name: "",
    });
  };

  const changeRomingStatus = () => {
    setValue(!value);
  };

  const deleteHandler = (id) => {
    dispatch(deleteExpData(id));
  };

  const filterHandler = (e) => {
    newObj[e.target.name] = e.target.value;
    dispatch(filter(newObj));
  };

  const allTransaction = isFilter ? filterUsers : allTransactionData;

  return (
    <>
      <div className="p-3 mb-2 bg-info text-dark">
        <h2>Expense Tracker</h2>
        <h4>Your Balance</h4>
        <h1>{totalIncomeValue - totalExpenseValue}</h1>
      </div>
      <br />

      <form
        className="p-3 mb-2 bg-secondary text-white"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div>
          <b>
            <label for="new_trancstn">Add new transaction</label>
          </b>
          <br />

          <input
            type="text"
            id="transaction_name"
            name="transaction_name"
            placeholder="Enter transaction title"
            value={obj.transaction_name}
            onChange={(e) => handleChange(e)}
          />
          <br />
        </div>
        <br />
        <div>
          <b>
            <label>Type:</label>
          </b>{" "}
          <input
            type="radio"
            id="transaction_type"
            name="transaction_type"
            value="income"
            checked={obj.transaction_type === "income"}
            onChange={(e) => radioChangeHandler(e)}
          />{" "}
          <label for="transaction_type">Income</label>{" "}
          <input
            type="radio"
            id="transaction_type"
            name="transaction_type"
            value="expense"
            checked={obj.transaction_type === "expense"}
            onChange={(e) => radioChangeHandler(e)}
          />{" "}
          <label for="transaction_type">Expense</label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter name"
            value={obj?.incomeOrExpObj?.name}
            onChange={(e) => radioChangeHandler(e)}
          />{" "}
          <input
            type="text"
            id="value"
            name="value"
            placeholder="Enter value"
            value={obj?.incomeOrExpObj?.value}
            onChange={(e) => radioChangeHandler(e)}
          />
          <br></br>
        </div>
        <br />
        <div>
          <div
            style={{
              display: "flex",
              textAlign: "center",
              justifyContent: "space-evenly",
              width: "14%",
              marginLeft: "43%",
            }}
          >
            <label>International ?</label>
            <ToggleButton value={value} onToggle={() => changeRomingStatus()} />
          </div>
          {value && (
            <div>
              <input
                type="text"
                id="country_name"
                name="country_name"
                placeholder="Enter country name"
                value={obj?.country_name}
                onChange={(e) => handleChange(e)}
              />
            </div>
          )}
        </div>
        <br />
        <div>
          <input
            type="date"
            id="date"
            name="date"
            value={obj?.date}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <br />
        <div>
          <button className="btn btn-info" type="submit">
            Submit
          </button>
        </div>
      </form>
      <br />

      <div className="p-3 mb-2 bg-light text-dark">
        <h3 style={{ color: "red" }}>
          <u>Your Transaction</u>
        </h3>
        <br />
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <div>
            <label>
              <b>Filter by date:</b>
            </label>{" "}
            <input
              type="date"
              id="startDate"
              name="startDate"
              onChange={(e) => filterHandler(e)}
            />{" "}
            <label>
              <b>To</b>
            </label>{" "}
            <input
              type="date"
              id="endDate"
              name="endDate"
              onChange={(e) => filterHandler(e)}
            />
          </div>
          <br />
          <div>
            <label htmlFor="transaction_type">
              <b>Filter by transaction type:</b>
            </label>{" "}
            <select
              name="transaction_type"
              id="transaction_type"
              onChange={(e) => filterHandler(e)}
            >
              <option value="">select transaction type</option>
              <option value="income">income</option>
              <option value="expense">expense</option>
            </select>
          </div>
          <br />
          <div>
            <label>
              <b>Filter by country:</b>
            </label>{" "}
            <select
              name="country_name"
              id="country_name"
              onChange={(e) => filterHandler(e)}
            >
              <option value="">select country</option>
              <option value="India">India</option>
              <option value="UK">UK</option>
              <option value="England">England</option>
              <option value="Spain">Spain</option>
              <option value="Australia">Australia</option>
            </select>
          </div>
        </div>
        <br />
        <br />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Transaction title</th>
              <th scope="col">Transaction type</th>
              <th scope="col">Transaction amount</th>
              <th scope="col">Country name</th>
              <th scope="col">Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {allTransaction.length > 0 ? (
              allTransaction.map((transactionData, index) => {
                console.log(transactionData, "llk");
                return (
                  <tr key={index}>
                    <td scope="row">{transactionData?.transaction_name}</td>
                    <td>{transactionData?.transaction_type}</td>
                    <td>Rs. {transactionData?.incomeOrExpObj?.value}</td>
                    <td>{transactionData?.country_name}</td>
                    <td>{transactionData?.date}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => deleteHandler(transactionData.id)}
                      >
                        Delete
                      </button>
                      <span style={{ marginLeft: "20px" }}></span>
                      <button
                        className="btn btn-warning"
                        onClick={() =>
                          navigate(`/update/${transactionData?.id}`)
                        }
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6}>No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
