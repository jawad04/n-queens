/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = undefined;
  var myArr = [];
  var myRow = [];
  for (var i = 0; i < n; i++) {
    myRow = []; 
    for (var j = 0; j < n; j++) {
      if (j === i) {
        myRow.push(1);
      } else {
        myRow.push(0);
      }
    }
    myArr.push(myRow);
  }
  solution = new Board(myArr);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return myArr;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  if(n === 1) {
    return 1;
  } else {
    return n * this.countNRooksSolutions(n-1)
  }
  // if (n <= 2) {
  //   return n;
  // }
  // var solutionsArr = [];
  // var poppedRow = undefined;
  // var initialSolution = this.findNRooksSolution(n);
  // solutionsArr.push(initialSolution);
  // for (var i = 0; i < n - 1; i++) {
  // debugger;
  //   poppedRow = initialSolution.pop();
  //   initialSolution.unshift(poppedRow);
  //   solutionsArr.push(initialSolution);
  // }
  // for (var i = 0; i < n; i++) {
  //   initialSolution[i].reverse();
  // }
  // for (var i = 0; i < n; i++) {
  //   poppedRow = initialSolution.pop();
  //   initialSolution.unshift(poppedRow);
  //   solutionsArr.push(initialSolution);
  // }
  // var solutionCount = solutionsArr.length; //fixme


  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
