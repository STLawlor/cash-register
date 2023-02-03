function cashRegister(price, cash, cid) {
  // find change needed
  let changeDue = cash - price;
  //changeDue = changeDue.toFixed(2);
  
  // return if no change is needed
  if (changeDue === 0) { return { status: "OPEN", change: [] } };

  //1. return if not enough payment
  if (cash < price) return { status: "INCORRECT_PAYMENT", change: [] };

  // find total in cash register 
  const cidTotal = totalInRegister(cid);

  //2. return if not enough cid for change
  if (cidTotal < changeDue) return { status: "INSUFFICIENT_FUNDS1", change: [] };

  //3. return if change is same cid total
  if (cidTotal === changeDue) return { status: "CLOSED", change: cid };

  // other wise find change amounts
  let change = findChange(changeDue, cid);
  
  if (change.length === 0) { return { status: "INSUFFICIENT_FUNDS2", change: [] } };

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

// Function to find change needed
function findChange(changeDue, cid) {
  let changeLeft = changeDue;
  let change = [];

  if (changeLeft >= 100 && cid[8][1] >= 100) {
    let hundreds = Math.floor(changeLeft / 100) * 100;
    if (hundreds <= cid[8][1]) {
      change.push(['ONE HUNDRED', hundreds]);
      changeLeft -= hundreds;
    } else {
      change.push(['ONE HUNDRED', cid[8][1]]);
      changeLeft -= cid[8][1];
    }
    changeLeft = changeLeft.toFixed(2);
  }

  if (changeLeft >= 20 && cid[7][1] >= 20) {
    let twenties = Math.floor(changeLeft / 20) * 20;
    if (twenties <= cid[7][1]) {
      change.push(['TWENTY', twenties]);
      changeLeft -= twenties;
    } else {
      change.push(['TWENTY', cid[7][1]]);
      changeLeft -= cid[7][1];
    }
    changeLeft = changeLeft.toFixed(2);
  }

  if (changeLeft >= 10 && cid[6][1] >= 10) {
    let tens = Math.floor(changeLeft / 10) * 10;
    if (tens <= cid[6][1]) {
      change.push(['TEN', tens]);
      changeLeft -= tens;
    } else {
      change.push(['TEN', cid[6][1]]);
      changeLeft -= cid[6][1];
    }
    changeLeft = changeLeft.toFixed(2);
  }

  if (changeLeft >= 5 && cid[5][1] >= 5) {
    let fives = Math.floor(changeLeft / 5) * 5;
    if (fives <= cid[5][1]) {
      change.push(['FIVE', fives]);
      changeLeft -= fives;
    } else {
      change.push(['FIVE', cid[5][1]]);
      changeLeft -= cid[5][1];
    }
    changeLeft = changeLeft.toFixed(2);
  }

  if (changeLeft >= 1 && cid[4][1] >= 1) {
    let ones = Math.floor(changeLeft / 1) * 1;
    if (ones <= cid[4][1]) {
      change.push(['ONE', ones]);
      changeLeft -= ones;
    } else {
      change.push(['ONE', cid[4][1]]);
      changeLeft -= cid[4][1];
    }
    changeLeft = changeLeft.toFixed(2);
  }

  if (changeLeft >= 0.25 && cid[3][1] >= 0.25) {
    let quarters = Math.floor(changeLeft / 0.25) * 0.25;
    if (quarters <= cid[3][1]) {
      change.push(['QUARTER', quarters]);
      changeLeft -= quarters;
    } else {
      change.push(['QUARTER', cid[3][1]]);
      changeLeft -= cid[3][1];
    }
    changeLeft = changeLeft.toFixed(2);
  }

  if (changeLeft >= 0.1 && cid[2][1] >= 0.1) {
    let dimes = Math.floor(changeLeft / 0.1) * 0.1;
    if (dimes <= cid[2][1]) {
      change.push(['DIME', dimes]);
      changeLeft -= dimes;
    } else {
      change.push(['DIME', cid[2][1]]);
      changeLeft -= cid[2][1];
    }
    changeLeft = changeLeft.toFixed(2);
  }

  if (changeLeft >= 0.05 && cid[1][1] >= 0.05) {
    let nickels = Math.floor(changeLeft / 0.05) * 0.05;
    if (nickels <= cid[1][1]) {
      change.push(['NICKEL', nickels]);
      changeLeft -= nickels;
    } else {
      change.push(['NICKEL', cid[1][1]]);
      changeLeft -= cid[1][1];
    }
    changeLeft = changeLeft.toFixed(2);
  }

  if (changeLeft >= 0.01 && cid[0][1] >= 0.01) {
    let pennies = Math.floor(changeLeft / 0.01) * 0.01;
    if (pennies <= cid[0][1]) {
      change.push(['PENNY', pennies]);
      changeLeft -= pennies;
    } else {
      change.push(['PENNY', cid[0][1]]);
      changeLeft -= cid[0][1];
    }
    changeLeft = changeLeft.toFixed(2);
  }

  return changeLeft > 0 ? [] : change;
}

console.log(cashRegister(19.5, 20, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]));

// Case 4b => {status: "OPEN", change: [same as coding rooms]} - correct 
// CASE 4a => {status: "OPEN", change: [["QUARTER", 0.5]]}); - correct
// CASE 3 => {status: "CLOSED", cid} - correct
// CASE 2b => {status: "INSUFFICIENT_FUNDS", change: []}); - correct
// CASE 2a => {status: "INSUFFICIENT_FUNDS", change: []}) - correct
// CASE 1 => {status: "INCORRECT_PAYMENT", change: []} - correct
