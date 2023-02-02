

function cashRegister(price, payment, cid) {
  const sumOfCID = totalInRegister(cid)
  const changeDue = payment - price
  if (payment < price) return { status: "INCORRECT_PAYMENT", change: [] }
  if (sumOfCID < changeDue) return { status: "INSUFFICIENT_FUNDS", change: [] }
  // need to work on the value of cid for this condition
  if (sumOfCID === changeDue) return { status: "CLOSED", change: cid }

  // need to work on the return value
  return { status: "OPEN", change: cid }
}



// Function to check the total in drawers
function totalInRegister(twoDimensionsalArr) {
  let sum = 0.0
  twoDimensionsalArr.forEach(element => {
    sum += parseFloat(element[1])
  });

  return sum.toFixed(2)
}

console.log(cashRegister(19.5, 18, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]))

console.log(cashRegister(19.5, 20, [
  ["PENNY", 0.01],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0]
]));
