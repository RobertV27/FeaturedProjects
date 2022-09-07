//
// Created by Robert Villa on 4/21/20.
//

#ifndef FINALPROJECT_BLACK_CIRCLE_H
#define FINALPROJECT_BLACK_CIRCLE_H

#include <Box2D/Box2D.h>

class BlackCircle {
 private:
  // Variable representing the physics body
  b2Body* circle;

  // Initial radius in meters of circle
  double initial_radius = 0.25;

  // Starting y position in meters of the circle
  double y_position = 0.1;

  // Initial speed in meters per second of the circle
  double speed = 2;

  // The threshold used to determine if a circle should be removed
  double delete_threshold = initial_radius * 0.3;

  // Conversion from degrees to radians
  double degrees_to_radians = 3.14 / 180;

  // Adds random angle to the speed to create velocity vector
  void AddInitialVelocity();

 public:
  // Constructor for the circle
  BlackCircle(b2World* game_world);

  // Reduces objects radius by the specified value
  void ShrinkRadius(double reduction);

  // Determines if the object is small enough to be deleted.
  bool ShouldDelete();
};
#endif  // FINALPROJECT_BLACK_CIRCLE_H
