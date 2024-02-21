import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { singleExpDetails, updateData } from "../feature/expenseTrackerSlice";
import ToggleButton from "react-toggle-button";

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log(id, "singleTransactionId");
  const { singleData } = useSelector((state) => state.app);
  console.log(singleData, "singleData");
  const [value, setValue] = useState();
  const [obj, setObj] = useState({});

  useEffect(() => {
    setObj(singleData);
    if (singleData.international === "no") {
      setValue(false);
    } else {
      setValue(true);
    }
  }, [singleData]);

  console.log(typeof obj?.incomeOrExpObj?.value, "type");
  console.log(value, "value9999");

  useEffect(() => {
    dispatch(singleExpDetails(id));
  }, []);

  const handleChange = (e) => {
    if (Object.keys(obj.incomeOrExpObj).includes(e.target.name)) {
      setObj({
        ...obj,
        incomeOrExpObj: {
          ...obj.incomeOrExpObj,
          [e.target.name]: e.target.value,
        },
      });
    } else {
      setObj({ ...obj, [e.target.name]: e.target.value });
    }
  };

  const changeRomingStatus = () => {
    setValue(!value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      obj.international = "yes";
    } else {
      obj.international = "no";
      obj.country_name = "India";
    }
    console.log(obj, "objectSub");
    dispatch(updateData({ id, obj }));
    navigate("/");
  };

  return (
    <div
      style={{
        background: "#ADF7F3",
        width: "100%",
        height: "100%",
        backgroundAttachment: "fixed",
      }}
    >
      <h2 style={{ marginTop: "5rem" }}>Edit Transaction Details</h2>
      <br />
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              style={{ width: "23%" }}
              type="text"
              id="transaction_name"
              name="transaction_name"
              value={obj?.transaction_name}
              placeholder="Enter transaction title"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <br />
          <div>
            <input
              style={{ width: "23%" }}
              type="text"
              id="transaction_type"
              name="transaction_type"
              value={obj?.transaction_type}
              placeholder="Enter transaction type"
              onChange={(e) => handleChange(e)}
              disabled
            />
          </div>
          <br />
          <div>
            <input
              style={{ width: "23%" }}
              type="text"
              id="value"
              name="value"
              value={obj?.incomeOrExpObj?.value}
              placeholder="Enter income or expense value"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <br />
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
          <br />
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
          <div>
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
            <button
              style={{ width: "23%" }}
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
          <br />
          <div>
            <button
              style={{ width: "23%" }}
              type="button"
              class="btn btn-warning"
              onClick={() => navigate("/")}
            >
              Back to home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
