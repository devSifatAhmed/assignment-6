let array = [
  "09/06/2015",
  "25/06/2015",
  "22/06/2015",
  "25/07/2015",
  "18/05/2015",
];

// Sort by date string in ascending order
array.sort(function (a, b) {
  // Convert the date strings to Date objects
  let dateA = new Date(a);
  console.log(dateA);
  let dateB = new Date(b);

  // Subtract the dates to get a value that is either negative, positive, or zero
  return dateA - dateB;
});

console.log(array);
// Outputs: [
//   '18/05/2015',
//   '09/06/2015',
//   '22/06/2015',
//   '25/06/2015',
//   '25/07/2015'
// ]
