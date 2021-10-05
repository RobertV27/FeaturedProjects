package com.example.ultimatetictactoe;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.graphics.drawable.Drawable;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Bundle;
import android.view.Menu;
import android.view.View;
import android.widget.Button;
import android.widget.ExpandableListAdapter;
import android.widget.FrameLayout;
import android.widget.TextView;

import java.io.Serializable;
import java.util.concurrent.TimeUnit;

public class NewGameActivity extends AppCompatActivity implements Serializable {

    private Board[][] mainBoard = new Board[3][3];

    private Button[][] button = new Button[9][9];

    private boolean playerOneTurn = true;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_new_game_activity);
        this.getSupportActionBar().hide();

        Intent intent = getIntent();
        String acti = intent.getStringExtra("activity");
        if (acti.equals("main")) {
            for (int i = 0; i < 3; i++) {
                for (int j = 0; j < 3; j++) {
                    mainBoard[i][j] = new Board();
                }
            }
        }
        MediaPlayer f = MediaPlayer.create(this, R.raw.music_orlamusic);
        f.start();

        final MediaPlayer mp = MediaPlayer.create(this, R.raw.zapsplat_multimedia_button_press_plastic_click_001_36868);
        final MediaPlayer mp1 = MediaPlayer.create(this, R.raw.human_crowd_25_people_cheer_shout_yay);

        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                String x = "b" + i + "" + j;
                int y = getResources().getIdentifier(x, "id", getPackageName());
                button[i][j] = findViewById(y);
                if (i < 3 && j < 3) {
                    final int finalI = i;
                    final int finalJ = j;
                    button[i][j].setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                            mp.start();
                            int r = 0;
                            int c = 0;
                            boolean p = playerOneTurn;
                            //int[][] array = mainBoard[r][c].getBoard();
                            button[finalI][finalJ].setEnabled(false);
                            if (playerOneTurn) {
                                mainBoard[r][c].makeMove(finalI % 3, finalJ % 3, playerOneTurn);
                                playerOneTurn = false;
                                button[finalI][finalJ].setBackgroundColor(Color.RED);
                                button[finalI][finalJ].getBackground().setAlpha(254);
                            } else {
                                mainBoard[r][c].makeMove(finalI % 3, finalJ % 3, playerOneTurn);
                                playerOneTurn = true;
                                button[finalI][finalJ].setBackgroundColor(Color.BLUE);
                                button[finalI][finalJ].getBackground().setAlpha(254);
                            }
                            //mainBoard[r][c].setBoard(array);Board(array);
                            updateUI(finalI, finalJ, r, c, p);
                        }
                    });
                }
                if (i < 3 && j < 6 && j >=3) {
                    final int finalI = i;
                    final int finalJ = j;
                    button[i][j].setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                            mp.start();
                            int r = 0;
                            int c = 1;
                            boolean p = playerOneTurn;
                            //int[][] array = mainBoard[r][c].getBoard();
                            button[finalI][finalJ].setEnabled(false);
                            if (playerOneTurn) {
                                mainBoard[r][c].makeMove(finalI % 3, finalJ % 3, playerOneTurn);
                                playerOneTurn = false;
                                button[finalI][finalJ].setBackgroundColor(Color.RED);
                                button[finalI][finalJ].getBackground().setAlpha(254);
                            } else {
                                mainBoard[r][c].makeMove(finalI % 3, finalJ % 3, playerOneTurn);
                                playerOneTurn = true;
                                button[finalI][finalJ].setBackgroundColor(Color.BLUE);
                                button[finalI][finalJ].getBackground().setAlpha(254);
                            }
                            //mainBoard[r][c].setBoard(array);Board(array);
                            updateUI(finalI, finalJ, r, c, p);
                        }
                    });
                }
                if (i < 3 && j >= 6) {
                    final int finalI = i;
                    final int finalJ = j;
                    button[i][j].setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                            mp.start();
                            int r = 0;
                            int c = 2;
                            boolean p = playerOneTurn;
                            //int[][] array = mainBoard[r][c].getBoard();
                            button[finalI][finalJ].setEnabled(false);
                            if (playerOneTurn) {
                                mainBoard[r][c].makeMove(finalI % 3, finalJ % 3, playerOneTurn);
                                playerOneTurn = false;
                                button[finalI][finalJ].setBackgroundColor(Color.RED);
                                button[finalI][finalJ].getBackground().setAlpha(254);
                            } else {
                                mainBoard[r][c].makeMove(finalI % 3, finalJ % 3, playerOneTurn);
                                playerOneTurn = true;
                                button[finalI][finalJ].setBackgroundColor(Color.BLUE);
                                button[finalI][finalJ].getBackground().setAlpha(254);
                            }
                            //mainBoard[r][c].setBoard(array);Board(array);
                            updateUI(finalI, finalJ, r, c, p);
                        }
                    });
                }
                if (i < 6 && i >= 3 && j < 3) {
                    final int finalI = i;
                    final int finalJ = j;
                    button[i][j].setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                            mp.start();
                            int r = 1;
                            int c = 0;
                            boolean p = playerOneTurn;
                            //int[][] array = mainBoard[r][c].getBoard();
                            button[finalI][finalJ].setEnabled(false);
                            if (playerOneTurn) {
                                mainBoard[r][c].makeMove(finalI % 3, finalJ % 3, playerOneTurn);
                                playerOneTurn = false;
                                button[finalI][finalJ].setBackgroundColor(Color.RED);
                                button[finalI][finalJ].getBackground().setAlpha(254);
                            } else {
                                mainBoard[r][c].makeMove(finalI % 3, finalJ % 3, playerOneTurn);
                                playerOneTurn = true;
                                button[finalI][finalJ].setBackgroundColor(Color.BLUE);
                                button[finalI][finalJ].getBackground().setAlpha(254);
                            }
                            //mainBoard[r][c].setBoard(array);Board(array);
                            updateUI(finalI, finalJ, r, c, p);
                        }
                    });
                }
                if (i < 6 && i >= 3 && j < 6 && j >= 3) {
                    final int finalI = i;
                    final int finalJ = j;
                    button[i][j].setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                            mp.start();
                            int r = 1;
                            int c = 1;
                            boolean p = playerOneTurn;
                            //int[][] array = mainBoard[r][c].getBoard();
                            button[finalI][finalJ].setEnabled(false);
                            if (playerOneTurn) {
                                mainBoard[r][c].makeMove(finalI % 3, finalJ % 3, playerOneTurn);
                                playerOneTurn = false;
                                button[finalI][finalJ].setBackgroundColor(Color.RED);
                                button[finalI][finalJ].getBackground().setAlpha(254);
                            } else {
                                mainBoard[r][c].makeMove(finalI % 3, finalJ % 3, playerOneTurn);
                                playerOneTurn = true;
                                button[finalI][finalJ].setBackgroundColor(Color.BLUE);
                                button[finalI][finalJ].getBackground().setAlpha(254);
                            }
                            //mainBoard[r][c].setBoard(array);Board(array);
                            updateUI(finalI, finalJ, r, c, p);
                        }
                    });
                }
                if (i < 6 && i >= 3 && j >= 6) {
                    final int finalI = i;
                    final int finalJ = j;
                    button[i][j].setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                            mp.start();
                            int r = 1;
                            int c = 2;
                            boolean p = playerOneTurn;
                            //int[][] array = mainBoard[r][c].getBoard();
                            button[finalI][finalJ].setEnabled(false);
                            if (playerOneTurn) {
                                mainBoard[r][c].makeMove(finalI % 3, finalJ % 3, playerOneTurn);
                                playerOneTurn = false;
                                button[finalI][finalJ].setBackgroundColor(Color.RED);
                                button[finalI][finalJ].getBackground().setAlpha(254);
                            } else {
                                mainBoard[r][c].makeMove(finalI % 3, finalJ % 3, playerOneTurn);
                                playerOneTurn = true;
                                button[finalI][finalJ].setBackgroundColor(Color.BLUE);
                                button[finalI][finalJ].getBackground().setAlpha(254);
                            }
                            //mainBoard[r][c].setBoard(array);Board(array);
                            updateUI(finalI, finalJ, r, c, p);
                        }
                    });
                }
                if (i >= 6 && j < 3) {
                    final int finalI = i;
                    final int finalJ = j;
                    button[i][j].setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                            mp.start();
                            int r = 2;
                            int c = 0;
                            boolean p = playerOneTurn;
                            //int[][] array = mainBoard[r][c].getBoard();
                            button[finalI][finalJ].setEnabled(false);
                            if (playerOneTurn) {
                                mainBoard[r][c].makeMove(finalI % 3, finalJ % 3, playerOneTurn);
                                playerOneTurn = false;
                                button[finalI][finalJ].setBackgroundColor(Color.RED);
                                button[finalI][finalJ].getBackground().setAlpha(254);
                            } else {
                                mainBoard[r][c].makeMove(finalI % 3, finalJ % 3, playerOneTurn);
                                playerOneTurn = true;
                                button[finalI][finalJ].setBackgroundColor(Color.BLUE);
                                button[finalI][finalJ].getBackground().setAlpha(254);
                            }
                            //mainBoard[r][c].setBoard(array);Board(array);

                            updateUI(finalI, finalJ, r, c, p);
                        }
                    });
                }
                if (i >= 6 && j < 6 && j >= 3) {
                    final int finalI = i;
                    final int finalJ = j;
                    button[i][j].setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                            mp.start();
                            int r = 2;
                            int c = 1;
                            boolean p = playerOneTurn;
                            //int[][] array = mainBoard[r][c].getBoard();
                            button[finalI][finalJ].setEnabled(false);
                            if (playerOneTurn) {
                                mainBoard[r][c].makeMove(finalI % 3, finalJ % 3, playerOneTurn);
                                playerOneTurn = false;
                                button[finalI][finalJ].setBackgroundColor(Color.RED);
                                button[finalI][finalJ].getBackground().setAlpha(254);
                            } else {
                                mainBoard[r][c].makeMove(finalI % 3, finalJ % 3, playerOneTurn);
                                playerOneTurn = true;
                                button[finalI][finalJ].setBackgroundColor(Color.BLUE);
                                button[finalI][finalJ].getBackground().setAlpha(254);
                            }
                            //mainBoard[r][c].setBoard(array);Board(array);
                            updateUI(finalI, finalJ, r, c, p);
                        }
                    });
                }
                if (i >= 6 && j >= 6) {
                    final int finalI = i;
                    final int finalJ = j;
                    button[i][j].setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                            mp.start();
                            int r = 2;
                            int c = 2;
                            boolean p = playerOneTurn;
                            //int[][] array = mainBoard[r][c].getBoard();
                            button[finalI][finalJ].setEnabled(false);
                            if (playerOneTurn) {
                                mainBoard[r][c].makeMove(finalI % 3, finalJ % 3, playerOneTurn);
                                playerOneTurn = false;
                                button[finalI][finalJ].setBackgroundColor(Color.RED);
                                button[finalI][finalJ].getBackground().setAlpha(254);
                            } else {
                                mainBoard[r][c].makeMove(finalI % 3, finalJ % 3, playerOneTurn);
                                playerOneTurn = true;
                                button[finalI][finalJ].setBackgroundColor(Color.BLUE);
                                button[finalI][finalJ].getBackground().setAlpha(254);
                            }

                            //mainBoard[r][c].setBoard(array);Board(array);
                            updateUI(finalI, finalJ, r, c, p);
                        }
                    });
                }
            }
        }
    }

    private void updateUI(int buttonRow, int buttonColumn, int boardRow, int boardColumn,
                          boolean playerTurn) {
        TextView turn = findViewById(R.id.turn);
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                int[][] x = mainBoard[i][j].getBoard();
                if (mainBoard[i][j].checkWinner() == 1) {
                    for(int k = i * 3; k  < (i * 3) + 3; k++) {
                        for(int l = j * 3; l < (j * 3) + 3; l++) {
                            button[k][l].setText("R");
                            button[k][l].setTextColor(Color.parseColor("#8D0606"));
                        }
                    }
                    //MediaPlayer mp = MediaPlayer.create(this, R.raw.human_crowd_25_people_cheer_shout_yay);
                    //mp.start();
                } else if (mainBoard[i][j].checkWinner() == 2) {
                    for(int k = i * 3; k  < (i * 3) + 3; k++) {
                        for(int l = j * 3; l < (j * 3) + 3; l++) {
                            button[k][l].setText("B");
                            button[k][l].setTextColor(Color.parseColor("#021268"));
                        }
                    }
                    //MediaPlayer mp = MediaPlayer.create(this, R.raw.human_crowd_25_people_cheer_shout_yay);
                    //mp.start();
                }
            }
        }
        if (!playerTurn) {
            turn.setText("Red's Turn");
        } else {
            turn.setText("Blue's Turn");
        }
        if (checkWin() == 1) {
            turn.setText("CONGRATS PLAYER 1");
            MediaPlayer mp = MediaPlayer.create(this, R.raw.human_crowd_25_people_cheer_shout_yay);
            mp.start();
        }
        if (checkWin() == 2) {
            turn.setText("CONGRATS PLAYER 2");
            MediaPlayer mp = MediaPlayer.create(this, R.raw.human_crowd_25_people_cheer_shout_yay);
            mp.start();
        }
        int requiredRow = buttonRow % 3;
        int requiredColumn = buttonColumn % 3;
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if ((requiredRow * 3 <= i) && (i < (requiredRow + 1) * 3)
                        && (requiredColumn * 3 <= j) && (j < (requiredColumn + 1) * 3)) {
                    if(button[i][j].getAlpha() != 254) {
                        button[i][j].setEnabled(true);
                    }
                    button[i][j].setEnabled(true);
                    button[i][j].getBackground().setAlpha(255);
                } else {
                    button[i][j].setEnabled(false);
                    button[i][j].getBackground().setAlpha(40);
                }
            }
        }
    }
    private int checkWin() {
        if (checkDraw()) {
            return 0;
        }
        for (int i = 0; i < 3; i++) {
            if ((mainBoard[i][0].checkWinner() == 1 || mainBoard[i][0].checkWinner() == 2)
                    && (mainBoard[i][0].checkWinner() == mainBoard[i][1].checkWinner()
                    && mainBoard[i][2].checkWinner() == mainBoard[i][1].checkWinner())) {
                return mainBoard[i][0].checkWinner();
            }
            if ((mainBoard[0][i].checkWinner() == 1 || mainBoard[0][i].checkWinner() == 2)
                    && (mainBoard[0][i].checkWinner() == mainBoard[1][i].checkWinner()
                    && mainBoard[2][i].checkWinner() == mainBoard[1][i].checkWinner())) {
                return mainBoard[0][i].checkWinner();
            }
        }
        if ((mainBoard[1][1].checkWinner() == 1 || mainBoard[1][1].checkWinner() == 2)
                && (mainBoard[0][0].checkWinner() == mainBoard[1][1].checkWinner()
                && mainBoard[1][1].checkWinner() == mainBoard[2][2].checkWinner())) {
            return mainBoard[1][1].checkWinner();
        }
        if ((mainBoard[1][1].checkWinner() == 1 || mainBoard[1][1].checkWinner() == 2)
                && (mainBoard[2][0].checkWinner() == mainBoard[1][1].checkWinner()
                && mainBoard[1][1].checkWinner() == mainBoard[0][2].checkWinner())) {
            return mainBoard[1][1].checkWinner();
        }
        return 0;
    }
    private boolean checkDraw() {
        int counter = 0;
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (mainBoard[i][j].checkWinner() == 0) {
                    counter++;
                }
            }
        }
        if (counter > 0) {
            return false;
        }
        return true;
    }

}
