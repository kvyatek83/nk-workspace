import { Component, OnInit } from '@angular/core';

export interface Cell {
  rowIndex: number;
  colIndex: number;
}

@Component({
  selector: 'nk-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  readonly colors: string[] = ['red', 'blue', 'green'];
  currColor = 0;
  matrix: number[][] = [
    [-9, -9, -9, -9, -1],
    [-1, -1, -9, -9, -9],
    [-9, -9, -9, -9, -9],
    [-9, -9, -9, -1, -9],
    [-9, -9, -1, -1, -1],
    [-9, -9, -9, -1, -9],
    [-9, -9, -9, -9, -9],
    [-1, -1, -9, -9, -9],
    [-9, -9, -1, -9, -9],
  ];
  surrounders: Cell[] = [
    { rowIndex: 0, colIndex: -1 },
    { rowIndex: -1, colIndex: -1 },
    { rowIndex: -1, colIndex: 0 },
    { rowIndex: -1, colIndex: 1 },
    { rowIndex: 0, colIndex: 1 },
    { rowIndex: 1, colIndex: 1 },
    { rowIndex: 1, colIndex: 0 },
    { rowIndex: 1, colIndex: -1 },
  ];

  constructor() {
    for (let row = 0; row < this.matrix.length; row++) {
      for (let col = 0; col < this.matrix[row].length; col++) {
        if (this.matrix[row][col] === -1) {
          this.doTheJob(row, col);
          this.nextColor();
        }
      }
    }
  }

  private doTheJob(row: number, col: number): void {
    this.matrix[row][col] = this.currColor;
    for (let index = 0; index < this.surrounders.length; index++) {
      const nearCell: Cell = {
        rowIndex: row + this.surrounders[index].rowIndex,
        colIndex: col + this.surrounders[index].colIndex,
      };
      if (this.cellIndexsValid(nearCell.rowIndex, nearCell.colIndex)) {
        if (this.matrix[nearCell.rowIndex][nearCell.colIndex] === -1) {
          this.doTheJob(nearCell.rowIndex, nearCell.colIndex);
        }
      }
    }
  }

  private nextColor(): void {
    if (this.currColor + 1 >= this.colors.length) {
      this.currColor = 0;
    } else {
      this.currColor += 1;
    }
  }

  private cellIndexsValid(row: number, col: number): boolean {
    if (
      row < 0 ||
      col < 0 ||
      row >= this.matrix.length ||
      col >= this.matrix[row].length
    ) {
      return false;
    }
    return true;
  }
}
