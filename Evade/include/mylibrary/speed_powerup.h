//
// Created by Robert Villa on 5/5/20.
//

#ifndef FINALPROJECT_SPEED_POWERUP_H
#define FINALPROJECT_SPEED_POWERUP_H

#include <Box2D/Box2D.h>

class SpeedPowerup {
 private:
  // Variable representing the physics body
  b2Body* rectangle;

  // The side length of the square
  double side_length = 0.1;
 public:
  // Constructor for the circle
  SpeedPowerup(b2World* game_world);

  // Deletes the box2d object from the world
  void Delete();
};

#endif  // FINALPROJECT_SPEED_POWERUP_H
