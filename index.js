"use strict"

class Sudoku {
  constructor(board_string) {
    this.clue = board_string;
    // console.log(this.clue)
    this.finalSudoku = this.clueArr(board_string)
    // console.log(this.finalSudoku);
    this.noNum = this.noNum(this.finalSudoku)
    // console.log(this.noNum);
  }
  //konversi dari txt ke array
  clueArr(clue) {
    let boxUtama = []
    let perBaris = []
    for (let item in clue) {
      perBaris.push(+clue[item])
      if (perBaris.length >= 9) {
        boxUtama.push(perBaris)
        perBaris = []
      }
    }
    return boxUtama
  }


  noNum(finalSudoku) {
    let noNum = []
    for (let i in finalSudoku) {
      for (let j in finalSudoku[i]) {
        if (finalSudoku[i][j] === 0) {
          noNum.push([+i, +j])
        }
      }
    }
    return noNum
  }

  cekKolom(finalSudoku, col, num) {
    for (let item in finalSudoku) {
      if (finalSudoku[item][col] === num) {
        return false
      }
    }
    return true
  }

  cekBaris(finalSudoku, row, num) {
    for (let item in finalSudoku[row]) {
      if (finalSudoku[row][item] === num) {
        return false
      }
    }
    return true
  }


  cekBox(finalSudoku, row, col, num) {
    let awalKolom = 0
    let awalBaris = 0
    let grid = 3

    while (row >= awalBaris + grid) {
      awalBaris += grid
    }
    while (col >= awalKolom + grid) {
      awalKolom += grid
    }

    for (let i = awalBaris; i < awalBaris + grid; i++) {
      for (let j = awalKolom; j < awalKolom + grid; j++) {
        if (finalSudoku[i][j] === num) {
          return false
        }
      }
    }
    return true
  }

  validasi(finalSudoku, row, col, num) {
    if (this.cekKolom(finalSudoku, col, num) && this.cekBaris(finalSudoku, row, num) && this.cekBox(finalSudoku, row, col, num)) {
      return true
    }
    else {
      return false
    }
  }

  solve() {
    let max = 9

    // for (let i = 0; i < this.noNum.length; i++)
    for (let i = 0; i < this.noNum.length;) {
      let col = this.noNum[i][1]
      let row = this.noNum[i][0]
      // console.log(this.noNum[i]);
      let solve = false
      let input = this.finalSudoku[row][col] + 1;

      while (solve === false && input <= max) {
        // if (validasi(this.finalSudoku, row, col, input))
        if (this.validasi(this.finalSudoku, row, col, input)) {
          solve = true
          this.finalSudoku[row][col] = input
          i++
        }

        else {
          input++
        }
      }

      if (solve === false) {
        this.finalSudoku[row][col] = 0 //jika angka bukan solusi maka reset lagi spotnya
        i--
      }
    }
    return this.board(this.finalSudoku)
    //return board()
  }

  // Returns a string representing the current state of the board
  board(finalSudoku) {
    let isiBox = ""
    let isiBaris = ""
    let barisFinalBox = 0
    let finalBox = "------------"

    console.log("Solved Board");
    console.log("============");

    for (let i in finalSudoku) {
      for (let j in finalSudoku[i]) {
        isiBox += finalSudoku[i][j]
        if (isiBaris.length >= 8) {
          isiBaris += isiBox
          isiBox = ""
        }
        if (isiBox.length === 3) {
          isiBox += "|"
          isiBaris += isiBox
          isiBox = ""
        }
      }
      finalBox += `\n${isiBaris}`
      barisFinalBox++
      isiBaris = ""
      if (barisFinalBox === 3) {
        finalBox += `\n-----------`
        barisFinalBox = 0
      }
    }

    return finalBox
  }

}
// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  // var board_string = fs.readFileSync('set-02_project-euler_50-easy-puzzles.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)
// console.log(board_string)
// console.log(board_string.length)

// Remember: this will just fill out what it can and not "guess"
//TEST node index.js
console.log(game.solve())
// console.log(game.board())

