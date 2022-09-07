//
// Created by Robert Villa on 5/4/20.
//

#ifndef FINALPROJECT_GREEN_CIRCLE_H
#define FINALPROJECT_GREEN_CIRCLE_H

#include <Box2D/Box2D.h>

class GreenCircle {
 private:
  // Variable representing the physics body
  b2Body* circle;

  // Initial radius in meters of circle
  double initial_radius = 0.15;

  // Starting y position in meters of the circle
  double y_position = 0.1;

  // Initial speed in meters per second of the circle
  double speed = 3;

  // Conversion from degrees to radians
  double degrees_to_radians = 3.14 / 180;

  // Adds random angle to the speed to create velocity vector
  void AddInitialVelocity();

 public:
  // Constructor for the circle
  GreenCircle(b2World* game_world);

  // Deletes object
  void Delete();

};

#endif  // FINALPROJECT_GREEN_CIRCLE_H
