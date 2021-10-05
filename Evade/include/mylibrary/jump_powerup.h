//
// Created by Robert Villa on 5/5/20.
//

#ifndef FINALPROJECT_JUMP_POWERUP_H
#define FINALPROJECT_JUMP_POWERUP_H


#include <Box2D/Box2D.h>

class JumpPowerup {
 private:
  // Variable representing the physics body
  b2Body* square;

  // Side length of the square
  double side_length = 0.1;

 public:
  // Constructor for the circle
  JumpPowerup(b2World* game_world);

  // Deletes the box2d object from the world
  void Delete();
};

#endif  // FINALPROJECT_JUMP_POWERUP_H
