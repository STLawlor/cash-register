let cashInDrawer = [
  ["ONE HUNDRED", 100],
  ["TWENTY", 60],
  ["TEN", 50],
  ["FIVE", 40],
  ["ONE", 20],
  ["QUARTER", 5],
  ["DIME", 1],
  ["NICKEL", 1],
  ["PENNY", 1]
];

// Set form input values to cashInDrawer amounts
function setFormValues() {
  document.querySelector("#hundred").value = cashInDrawer[0][1];
  document.querySelector("#twenty").value = cashInDrawer[1][1];
  document.querySelector("#ten").value = cashInDrawer[2][1];
  document.querySelector("#five").value = cashInDrawer[3][1];
  document.querySelector("#one").value = cashInDrawer[4][1];
  document.querySelector("#quarter").value = cashInDrawer[5][1];
  document.querySelector("#dime").value = cashInDrawer[6][1];
  document.querySelector("#nickel").value = cashInDrawer[7][1];
  document.querySelector("#penny").value = cashInDrawer[8][1];
}

setFormValues();

// Retreive cashInDrawer amounts if inputs are changed
document.querySelector("#form").addEventListener("change", () => {
  cashInDrawer[0][1] = Number(document.querySelector("#hundred").value);
  cashInDrawer[1][1] = Number(document.querySelector("#twenty").value);
  cashInDrawer[2][1] = Number(document.querySelector("#ten").value);
  cashInDrawer[3][1] = Number(document.querySelector("#five").value);
  cashInDrawer[4][1] = Number(document.querySelector("#one").value);
  cashInDrawer[5][1] = Number(document.querySelector("#quarter").value);
  cashInDrawer[6][1] = Number(document.querySelector("#dime").value);
  cashInDrawer[7][1] = Number(document.querySelector("#nickel").value);
  cashInDrawer[8][1] = Number(document.querySelector("#penny").value);
});

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
  if (cidTotal < changeDue)
    return { status: "INSUFFICIENT_FUNDS", change: [] };

  //3. return if change is same cid total
  if (cidTotal === changeDue) return { status: "CLOSED", change: cid };

  // other wise find change amounts
  let change = findChange(changeDue, cid);

  if (change.length === 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  return { status: "OPEN", change: change };
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
function findChange(changeNeeded, cid) {
  let change = [];
  let changeLeft = changeNeeded.toFixed(2);

  for (let i = 0; i < denominations.length; i++) {
    if (
      changeLeft >= denominations[i][1] &&
      cid[i][1] >= denominations[i][1]
    ) {
      let denomsNeeded =
        Math.floor(changeLeft / denominations[i][1]) * denominations[i][1];
      if (denomsNeeded <= cid[i][1]) {
        change.push([denominations[i][0], denomsNeeded]);
        changeLeft -= denomsNeeded;
        cashInDrawer[i][1] -= denomsNeeded;
        if (i > 4) { cashInDrawer[i][1] = cashInDrawer[i][1].toFixed(2); }  
      } else {
        change.push([denominations[i][0], cid[i][1]]);
        changeLeft -= cid[i][1];
        cashInDrawer[i][1] = 0;
      }
      changeLeft = changeLeft.toFixed(2);
    }
  }

  setFormValues();

  return changeLeft > 0 ? [] : change;
}

// Query to retrieve inputted values on form submit
document.querySelector("#form").addEventListener("submit", function (e) {
  e.preventDefault();
  let price = Number(document.querySelector("#price").value);
  let amountGiven = Number(document.querySelector("#amountGiven").value);

  let returnObj = cashRegister(price, amountGiven, cashInDrawer);
  document.querySelector("#status").value = returnObj.status;

  // display returned obj in list
  let changeList = document.querySelector("#changeList");

  // clear list before remaking
  while (changeList.hasChildNodes()) {
    changeList.removeChild(changeList.firstChild);
  }

  // display each change amount from change array
  let changeArr = returnObj.change;

  for (let i = 0; i < changeArr.length; i++) {
    let listItem = document.createElement("li");
    let changeAmount = document.createTextNode(
      `${changeArr[i][0]}: ${changeArr[i][1]}`
    );
    listItem.appendChild(changeAmount);

    changeList.appendChild(listItem);
  }
});
