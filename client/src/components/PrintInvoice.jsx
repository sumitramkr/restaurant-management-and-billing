import React from "react";
import "./PrintInvoice.css";

const PrintInvoice = ({ authenticated }) => {
  const handleClick = (e) => {
    e.preventDefault();
    window.print();
  };

  const billMetaData = [
    {
      bill_no: 1672168842965,
      date: "12-12-2012",
      table_no: 2,
      bill_type: "Offline",
      payment_mode: "Debit Card",
      CGST: 9,
      SGST: 9,
      initial_amount: 100.55,
      discount: 10.55,
      discount_amount: 10.55,
      discounted_amount: 90.55,
      tax_amount: 15.55,
      final_amount: 115.55,
    },
    {
      food_name: "Bit Coin",
      quantity: 5,
      rate: 999.99,
      amount: 9999.99,
      quantity_type: "full_quantity",
    },
    {
      food_name: "Litti Chokha",
      quantity: 5,
      rate: 999.99,
      amount: 9999.99,
      quantity_type: "full_quantity",
    },
    {
      food_name: "Litti Chokha",
      quantity: 5,
      rate: 999.99,
      amount: 9999.99,
      quantity_type: "full_quantity",
    },
    {
      food_name: "Litti Chokha",
      quantity: 5,
      rate: 999.99,
      amount: 9999.99,
      quantity_type: "full_quantity",
    },
    {
      food_name: "Litti Chokha",
      quantity: 5,
      rate: 999.99,
      amount: 9999.99,
      quantity_type: "full_quantity",
    },
    {
      food_name: "Litti Chokha",
      quantity: 5,
      rate: 999.99,
      amount: 9999.99,
      quantity_type: "full_quantity",
    },
    {
      food_name: "Litti Chokha",
      quantity: 5,
      rate: 999.99,
      amount: 9999.99,
      quantity_type: "full_quantity",
    },
    {
      food_name: "Litti Chokha",
      quantity: 5,
      rate: 999.99,
      amount: 9999.99,
      quantity_type: "full_quantity",
    },
    {
      food_name: "Litti Chokha",
      quantity: 5,
      rate: 999.99,
      amount: 9999.99,
      quantity_type: "full_quantity",
    },
    {
      food_name: "Litti Chokha",
      quantity: 5,
      rate: 999.99,
      amount: 9999.99,
      quantity_type: "full_quantity",
    },
    {
      food_name: "Litti Chokha",
      quantity: 5,
      rate: 999.99,
      amount: 9999.99,
      quantity_type: "full_quantity",
    },
    {
      food_name: "Litti Chokha",
      quantity: 5,
      rate: 999.99,
      amount: 9999.99,
      quantity_type: "full_quantity",
    },
    {
      food_name: "Litti Chokha",
      quantity: 5,
      rate: 999.99,
      amount: 9999.99,
      quantity_type: "full_quantity",
    },
    {
      food_name: "Litti Chokha",
      quantity: 5,
      rate: 999.99,
      amount: 9999.99,
      quantity_type: "full_quantity",
    },
    {
      food_name: "Litti Chokha",
      quantity: 5,
      rate: 999.99,
      amount: 9999.99,
      quantity_type: "full_quantity",
    },
  ];
  const style = {
    fontSize: "7.6px",
    fontFamily: "Helvetica",
  };
  return (
    <div style={style}>
      <div className="ticket">
        <p className="centered">
          <strong>KALIKA DHABA</strong>
          <br></br>IGNOU Road,<br></br>Neb Sarai, New Delhi, 110068
        </p>
        <div className="row">
          <div className="column">
            <p style={{ fontSize: "7px" }} align="left">
              Order#{billMetaData[0].bill_no}
            </p>
          </div>
          <div className="column">
            <p style={{ fontSize: "7px" }} align="right">
              Date: {billMetaData[0].date}
            </p>
          </div>
        </div>

        <table>
          <thead>
            <tr className="title">
              <th className="description" align="left">Item(s)</th>
              <th className="quantity">Qnty</th>
              <th className="price">Rate ₹</th>
              <th className="price">Amt ₹</th>
            </tr>
          </thead>
          <tbody>
            {billMetaData.slice(1).map((it, i) => (
              <tr key={i}>
                <td className="description" align="left">
                  {it.quantity_type === "half_quantity"
                    ? it.food_name + "(H)"
                    : it.food_name + "(F)"}
                </td>
                <td className="quantity">{it.quantity}</td>
                <td className="price">{it.rate}</td>
                <td className="price">{it.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <div className="row">
            <div className="column">
              <p
                style={{ fontSize: "7.6px", marginLeft: "2px" }}
                align="left"
              >
                Subtotal:
              </p>
            </div>
            <div className="column">
              <p style={{ fontSize: "7.6px" }} align="right">
                ₹ {billMetaData[0].initial_amount}
              </p>
            </div>
          </div>

          {billMetaData[0].discount_amount && (
            <div className="row">
              <div className="column">
                <p
                  style={{ fontSize: "7.6px", marginLeft: "2px" }}
                  align="left"
                >
                  (-) Discount:
                </p>
              </div>
              <div className="column">
                <p style={{ fontSize: "7.6px" }} align="right">
                  ₹ {billMetaData[0].discount_amount}
                </p>
              </div>
            </div>
          )}

          {billMetaData[0].discount_amount && (
            <div className="row">
              <div className="column">
                <p
                  style={{ fontSize: "7.6px", marginLeft: "2px" }}
                  align="left"
                >
                  <strong>Discounted Total:</strong>
                </p>
              </div>
              <div className="column">
                <p style={{ fontSize: "7.6px" }} align="right">
                  <strong>₹ {billMetaData[0].discounted_amount}</strong>
                </p>
              </div>
            </div>
          )}

          <div className="row">
            <div className="column">
              <p
                style={{ fontSize: "7.6px", marginLeft: "2px" }}
                align="left"
              >
                CGST@ {billMetaData[0].CGST}%
              </p>
              <p
                style={{ fontSize: "7.6px", marginLeft: "2px" }}
                align="left"
              >
                SGST@ {billMetaData[0].SGST}%
              </p>
            </div>
            <div className="column">
              <p style={{ fontSize: "7.6px" }} align="right">
                ₹ {(billMetaData[0].tax_amount / 2).toFixed(2)}
              </p>
              <p style={{ fontSize: "7.6px" }} align="right">
                ₹ {(billMetaData[0].tax_amount / 2).toFixed(2)}
              </p>
            </div>
          </div>

          <hr></hr>

          <div className="row">
            <div className="column">
              <p style={{ fontSize: "9px", marginLeft: "2px" }} align="left">
                <strong>Total:</strong>
              </p>
            </div>
            <div className="column">
              <p style={{ fontSize: "9px" }} align="right">
                <strong>₹ {billMetaData[0].final_amount}</strong>
              </p>
            </div>
          </div>

          <hr></hr>

          <div className="row">
            <div>
              <p
                style={{ fontSize: "5.5px", marginBottom: "8px" }}
                align="right"
              >
                Payment Mode: {billMetaData[0].payment_mode}
              </p>
            </div>
          </div>
        </div>

        <p className="centered">
          <strong>At Your Service. Thanks ^_^</strong>
        </p>
      </div>
      <button id="btnPrint" className="hidden-print" onClick={handleClick}>
        Print
      </button>
    </div>
  );
};

export default PrintInvoice;
