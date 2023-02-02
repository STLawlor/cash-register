function cashRegister(price, cash, cid) {
  // find change needed
  let changeTotal = cash - price;

  //1. declare object and return if not enough payment
  let obj = { status: 'INCORRECT_PAYMENT', change: []};
  if (cash < price) { return obj };

  // find total in cash register 
  let cidTotal = 0;
  for (let i = 0; i < cid.length; i++) {
    cidTotal += cid[i][1];
  }

  cidTotal = cidTotal.toFixed(2);

  //2. return if not enough cid for change

  if (changeTotal > cidTotal) {
    obj.status = 'INSUFFICIENT_FUNDS';
    return obj;
  }

  //return if change needed is same as total as cid
  if (changeTotal === cidTotal) {
    obj.status = 'CLOSED';
    obj.change = cid;
    return obj;
  }


  //translate cid array to amounts 
  let amountArr = [];

  for (let i = 0; i < cid.length; i++) {
    amountArr.push(cid[i][1] / amounts[cid[i][0]]);

  }

  console.log(amountArr);


  //otherwise return change


 

  //also need to check if exact change can't be given

}

// Example function call
cashRegister(19.5, 20, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100], 
]);

const amounts = {
  'PENNY': 0.01,
  'NICKEL': 0.05,
  'DIME': 0.1,
  'QUARTER': 0.25,
  'ONE': 1,
  'FIVE': 5,
  'TEN': 10,
  'TWENTY': 20,
  'ONE HUNDRED': 100
}


