package com.example.ultimatetictactoe;

import java.io.Serializable;

public class Board implements Serializable {

    private int[][] board = new int[3][3];

    public int[][] getBoard() {
        return board;
    }

    public void setBoard(int[][] x) {
        board = x;
    }
    public boolean checkDraw() {
        int counter = 0;
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (board[i][j] == 0) {
                    counter++;
                }
            }
        }
        if (counter > 0) {
            return false;
        }
        return true;
    }

    public int checkWinner() {
        for (int i = 0; i < 3; i++) {
            if ((board[i][0] == 1 || board[i][0] == 2)
                    && (board[i][0] == board[i][1] && board[i][2] == board[i][1])) {
                return board[i][0];
            }
            if ((board[0][i] == 1 || board[0][i] == 2)
                    && (board[0][i] == board[1][i] && board[2][i] == board[1][i])) {
                return board[0][i];
            }
        }
        if ((board[1][1] == 1 || board[1][1] == 2)
            && (board[0][0] == board[1][1] && board[1][1] == board[2][2])) {
            return board[1][1];
        }
        if ((board[1][1] == 1 || board[1][1] == 2)
                && (board[2][0] == board[1][1] && board[1][1] == board[0][2])) {
            return board[1][1];
        }
        return 0;
    }

    public void makeMove(int row, int column, boolean playerTurn) {
        if (playerTurn) {
            board[row][column] = 1;
        } else {
            board[row][column] = 2;
        }
    }
}
