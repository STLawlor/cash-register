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
  if (changeDue === 0) { return { status: "OPEN", change: [] } };

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
  
  if (change.length === 0) { return { status: "INSUFFICIENT_FUNDS", change: [] } };

  return { status: "OPEN", change: change.reverse() };
}


// Function to check the total in drawers
function totalInRegister(cid) {
  let sum = 0
  for (let i = 0; i < cid.length; i++) {
    sum += cid[i][1]
  }

  return sum
}

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


