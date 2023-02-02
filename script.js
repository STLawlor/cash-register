const denominations = 
[
  ["ONE HUNDRED", 100], 
  ["TWENTY", 20],
  ["TEN", 10],
  ["FIVE", 5],
  ["ONE", 1],
  ["QUARTER", 0.25],
  ["DIME", 0.1],
  ["NICKEL", 0.05],
  ["PENNY", 0.01],
]

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

function cashRegister(price, cash, cid) {
  // find change needed
  const changeDue = cash - price;

  //1.return if not enough payment
  if (cash < price) return { status: "INCORRECT_PAYMENT", change: [] };


  // find total in cash register 
  const cidTotal = totalInRegister(cid);

  //2. return if not enough cid for change
  if (cidTotal < changeDue) return { status: "INSUFFICIENT_FUNDS", change: [] };


  //return if change is same as total as cid
  if (cidTotal === changeDue) return { status: "CLOSED", change: cid };


  //translate cid array to amounts 
  let amountArr = [];

  for (let i = 0; i < cid.length; i++) {
    amountArr.push(cid[i][1] / amounts[cid[i][0]]);

  }

  //   const denominations = 
  // [
  //   ["ONE HUNDRED", 100], 
  // ]
  // becomes 
  // const denominations = 
  // [
  //   ["ONE HUNDRED", 100, total in cid, notes/coins in cid,?], 
  // ]

  // console.log(amountArr);

  // Iterate through denominations and check if change is possible...

  let temp = changeDue;
  let cashiersHand = {};

  for (let i = 0; i < denominations.length; i++) {
    console.log(denominations[i]);
    while (temp >= denominations[i][1]) {
      for (let i = 0; i < cid.length; i++) {
        if (denominations[i][0] === cid[i][0]) {

        }
      }
    }
    if (temp === 0) {
      break;
    }
  }


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


/********************************Mohammad Hussain *****************************/

// ADDED INTO MAIN FUNCTION
// function cashRegister(price, payment, cid) {
//   // const sumOfCID = totalInRegister(cid)

//   // const changeDue = payment - price

//   // if (payment < price) return { status: "INCORRECT_PAYMENT", change: [] }

//   // if (sumOfCID < changeDue) return { status: "INSUFFICIENT_FUNDS", change: [] }

//   // need to work on the value of cid for this condition
//   // if (sumOfCID === changeDue) return { status: "CLOSED", change: cid }

//   // need to work on the return value
//   return { status: "OPEN", change: cid }
// }



// Function to check the total in drawers
function totalInRegister(twoDimensionsalArr) {
  let sum = 0.0
  twoDimensionsalArr.forEach(element => {
    sum += parseFloat(element[1])
  });

  return sum.toFixed(2)
}

/********************************Mohammad Hussain *****************************/
