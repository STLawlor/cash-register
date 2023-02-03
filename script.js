const denominations = [
  ["ONE HUNDRED", 100],
  ["TWENTY", 20],
  ["TEN", 10],
  ["FIVE", 5],
  ["ONE", 1],
  ["QUARTER", 0.25],
  ["DIME", 0.1],
  ["NICKEL", 0.05],
  ["PENNY", 0.01],
];

// variable to store inputted cash in drawer amount
var cashInDrawer = [
  ["PENNY", 0],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0],
];

function cashRegister(price, cash, cid) {
  // find change needed
  let changeDue = cash - price;

  // return if no change is needed
  if (changeDue === 0) {
    return { status: "OPEN", change: [] };
  }

  //1. return if not enough payment
  if (cash < price) return { status: "INCORRECT_PAYMENT", change: [] };

  // find total in cash register
  const cidTotal = totalInRegister(cid);

  //2. return if not enough cid for change
  if (cidTotal < changeDue) return { status: "INSUFFICIENT_FUNDS", change: [] };

  //3. return if change is same cid total
  if (cidTotal === changeDue) return { status: "CLOSED", change: cid };

  // other wise find change amounts
  let change = findChange(changeDue, cid);

  if (change.length === 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  return { status: "OPEN", change: change.reverse() };
}

// Function to check the total in drawers
function totalInRegister(cash) {
  let sum = 0;
  for (let i = 0; i < cash.length; i++) {
    sum += cash[i][1];
  }

  return sum;
}

// Function to find change
function findChange(changeLeft, cid) {
  let change = [];
  let rCid = cid.reverse();

  for (let i = 0; i < denominations.length; i++) {
    if (
      changeLeft >= denominations[i][1] &&
      rCid[i][1] >= denominations[i][1]
    ) {
      let denomsNeeded =
        Math.floor(changeLeft / denominations[i][1]) * denominations[i][1];
      if (denomsNeeded <= rCid[i][1]) {
        change.push([denominations[i][0], denomsNeeded]);
        changeLeft -= denomsNeeded;
      } else {
        change.push([denominations[i][0], rCid[i][1]]);
        changeLeft -= rCid[i][1];
      }
      changeLeft = changeLeft.toFixed(2);
    }
  }

  return changeLeft > 0 ? [] : change;
}

// Query to retrieve inputted values on form submit
var input = document.getElementById(form);

document.querySelector("#form").addEventListener("submit", function (e) {
  e.preventDefault();
  let price = Number(document.querySelector("#price").value);
  let amountGiven = Number(document.querySelector("#amountGiven").value);
  cashInDrawer[8][1] = Number(document.querySelector("#hundred").value);
  cashInDrawer[7][1] = Number(document.querySelector("#twenty").value);
  cashInDrawer[6][1] = Number(document.querySelector("#ten").value);
  cashInDrawer[5][1] = Number(document.querySelector("#five").value);
  cashInDrawer[4][1] = Number(document.querySelector("#one").value);
  cashInDrawer[3][1] = Number(document.querySelector("#quarter").value);
  cashInDrawer[2][1] = Number(document.querySelector("#dime").value);
  cashInDrawer[1][1] = Number(document.querySelector("#nickel").value);
  cashInDrawer[0][1] = Number(document.querySelector("#penny").value);

  let returnObj = cashRegister(price, amountGiven, cashInDrawer);
  console.log(returnObj);

  //TODO: cycle through return element and check which values can be displayed

  /* note for Monday: maybe instead of filling in inputs on the html, we just cycle through the values
  in the object change array? */

  let changeArr = returnObj.change;
  
  // loop through array and display values

  document.getElementById("status").value = returnObj.status;

  // for (i of returnObj.change) {
  //   console.log(i[0], i[1]);
  // }
});
