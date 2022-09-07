//
// Created by Robert Villa on 4/24/20.
//

#ifndef FINALPROJECT_PLAYER_SQUARE_H
#define FINALPROJECT_PLAYER_SQUARE_H

#include <Box2D/Box2D.h>

class PlayerSquare {
 private:
  // Variable representing the physics body
  b2Body* square;

  // Length of a side of the square
  double side_length = 0.4;

  // Starting x position
  double x_position = 4;

  // Starting y position
  double y_position = 7;

  // Speed of the square
  double speed = 2;

  // Jump height scale of the square
  double jump_scale = 2;

  // Whether the player is touching black ball
  bool is_touching_obstacle = false;

  // Whether the player is touching the key
  bool is_touching_key = false;

  // Whether the player is touching the speed powerup
  bool is_touching_speed_powerup = false;

  // Whether the player is touching the jump powerup
  bool is_touching_jump_powerup = false;

 public:
  //Default constructor
  PlayerSquare();

  // Creates box2d object in the entered game world
  void CreatePlayer(b2World* game_world);

  // Sets x velocity
  void SetXVelocity(double x_velocity);

  // Sets y velocity
  void SetYVelocity(double y_velocity);

  // Determines whether the player is on the floor
  bool IsOnGround();

  // Changes the speed of the player
  void SetSpeed(double new_speed);

  // Changes the jump scale of the player
  void SetJumpScale(double new_scale);

  // Changes the value of the bool instance variable
  void SetIsTouchingObstacle(bool new_value);

  // Gets the value of the bool instance variable
  bool GetIsTouchingObstacle();

  // Changes the value of the bool instance variable
  void SetIsTouchingKey(bool new_value);

  // Gets the value of the bool instance variable
  bool GetIsTouchingKey();

  // Changes the value of the bool instance variable
  void SetIsTouchingSpeedPowerup(bool new_value);

  // Gets the value of the bool instance variable
  bool GetIsTouchingSpeedPowerup();

  // Changes the value of the bool instance variable
  void SetIsTouchingJumpPowerup(bool new_value);

  // Gets the value of the bool instance variable
  bool GetIsTouchingJumpPowerup();


};
#endif  // FINALPROJECT_PLAYER_SQUARE_H
