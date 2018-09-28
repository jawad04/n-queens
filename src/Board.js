// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },

    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      return this.get(rowIndex).filter(num => num !== 0).length > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var bool = false;
      for (var i = 0; i < this.rows().length; i++) {
        this.hasRowConflictAt(i) ?
          bool = true :
          null;
      }
      return bool;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var myArr = [];
      for (var i = 0; i < this.rows().length; i++) {
      //debugger;
        myArr.push(this.get(i)[colIndex]);
      }
      return myArr.filter(num => num !== 0).length > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var bool = false;
      for (let i = 0; i < this.rows().length; i++) {
        this.hasColConflictAt(i) ?
          bool = true :
          null;
      }
      return bool;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      let n = this.get('n');
      let diagonalIndex = majorDiagonalColumnIndexAtFirstRow;
      let myDiagonal = [];
      let pushedItem;
      if (diagonalIndex < Math.ceil((2 * n - 1) / 2)) {
        for (let i = 0; i < diagonalIndex + 1; i++) {
          pushedItem = this.get(n - 1 - diagonalIndex + i)[i]; 
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

          /*
            i     | this.get(n - (n - i))           | evaluates to          | =>
------------------------------------------------------------------------------------------
            0     | this.get(4 - (4 - 0))           | this.get(4 - 4) // 0  | this.get(0) |
            1     | this.get(4 - (4 - 1))           | this.get(4 - 3) // 1  | this.get(1) |
            2     | this.get(4 - (4 - 2))           | this.get(4 - 2) // 2  | this.get(2) |
            3     | this.get(4 - (4 - 3))           | this.get(4 - 1) // 3  | this.get(3) |



Pattern B:
diagonalIndex === 4
           i     | this.get(0 + i)[i + diagonalIndex - n + 1]              | evaluates to         | value 
------------------------------------------------------------------------------------------
            0     | this.get(0 + i)[0 + 4 - 4 + 1]                         | this.get(0)[1] // 0  | 
            1     | this.get(0 + i)[1 + 4 - 4 + 1]                         | this.get(1)[2] // 1  | 
            2     | this.get(0 + i)[2 + 4 - 4 + 1]                         | this.get(2)[3] // 2  | 


diagonalIndex === 5
           i      | this.get(0 + i)[i + diagonalIndex - n + 1]    | evaluates to         | value 
------------------------------------------------------------------------------------------
            0     | this.get(0 + i)[0 + 5 - 4 + 1]    | this.get(0)[2] // 0  | 
            1     | this.get(0 + i)[1 + 5 - 4 + 1]    | this.get(1)[3] // 1  | 
      

*/
      
      
      /* 
  
        number of diagonals always equals 2n - 1; except for 0.
        
        PATTERN A: 
        for whatever diagonal we're looking for, the first element is always
        the same column as starting point (c0) and is in the row
        that is equal to r[diagonalIndex] - 1; 
        
        We can always find the next bit in a diagonal by looking at the point
        on the matrix whose coordinates are equal to 
        (the previous value of c + 1)(the previous value of row + 1)
        
        We know we've reached the end of a diagonal when there are no more
        columns to traverse, or when the c coordinate would exeed n.

        star is the diagonal number
        
        EXCEPT WHEN  star > n, then:

        PATTERN B: 
        the coordinates of first element of the starth (some arbitrary) 
        diagonal is always c(star - n)r0

        stop after we've added a bit to a diagonal whose coordinates are
        cn-1r0
        

        pattern a {
      
          do stuff
        
          if (nSubC === -1 && nSubR === -1) {
            start doing patter b
          }
        }
      
      pattern b {
      
        do stuff

        if( something happens ) {
          stop
        }
      }

      */

    // test if any major diagonals on this board contain conflicts
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



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var myDiagonal = [];
      var diagonalIndex = minorDiagonalColumnIndexAtFirstRow;
      var n = this.get('n');

      if (diagonalIndex < Math.ceil((2 * n - 1) / 2)) {
        for (let i = 0; i < diagonalIndex + 1; i++) {
          pushedItem = this.get(0 + i)[diagonalIndex - i]; 
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
      let bool = false;
      for (var i = 0; i < numDiagonals; i++) {
        this.hasMinorDiagonalConflictAt(i) ?
          bool = true :
          null;
      }
      return bool;
      //return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
