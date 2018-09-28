 hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var myDiagonal = [];
      var diagonalIndex = minorDiagonalColumnIndexAtFirstRow;
      var n = this.get('n');

      if (diagonalIndex < Math.ceil((2 * n - 1) / 2)) {
        for (let i = 0; i < diagonalIndex + 1; i++) {
          pushedItem = this.get(0 + i)[diagonalIndex + i]; 
          myDiagonal.push(pushedItem);
        }
      } else {
        for (let i = 0; i < n + (n - diagonalIndex) - 1; i++) { // loop for a different amount of time. when diagonal index is 6, we currently loop three times.
          pushedItem = this.get(diagonalIndex - (n - 1) + i)[n - 1 - i]; 
          myDiagonal.push(pushedItem);
        }
      }
      return myDiagonal.filter(num => num !== 0).length > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var numDiagonals = 2 * this.get('n') - 1;
      var bool = false;
      for (var i = 0; i < numDiagonals; i++) {
        this.hasMinorDiagonalConflictAt(i) ?
          bool = true :
          null;
      }
      return bool;
    }



hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      console.log(majorDiagonalColumnIndexAtFirstRow)
      let n = this.get('n');
      let diagonalIndex = majorDiagonalColumnIndexAtFirstRow;
      let myDiagonal = [];
      let pushedItem;
      if (diagonalIndex < Math.ceil((2 * n - 1) / 2)) {
        for (let i = 0; i < diagonalIndex + 1; i++) {
          pushedItem = this.get(n - (n - i))[i]; 
          myDiagonal.push(pushedItem);
        }
      } else {
        for (let i = 0; i < n + (n - diagonalIndex) - 1; i++) { // loop for a different amount of time. when diagonal index is 6, we currently loop three times.
          pushedItem = this.get(0 + i)[i + diagonalIndex - n + 1]; 
          myDiagonal.push(pushedItem);
        }
      }
      
      return myDiagonal.filter(num => num !== 0).length > 1;
    },


 hasAnyMajorDiagonalConflicts: function() {
      var numDiagonals = 2 * this.get('n') - 1;
      var bool = false;
      for (var i = 0; i < numDiagonals; i++) {
        this.hasMajorDiagonalConflictAt(i) ?
          bool = true :
          null;
      }
      return bool;
    },