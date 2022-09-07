//
// Created by Robert Villa on 4/21/20.
//

#ifndef FINALPROJECT_BOUNDARY_H
#define FINALPROJECT_BOUNDARY_H

#include <Box2D/Box2D.h>

class Boundary {
 private:
  // The length of the short side of the rectangle in meters
  constexpr static double short_length = 0.5;

  //The length of the long side of the rectangle in meters
  constexpr static double long_length = 7.5;

  // The total size of the screen in meters
  constexpr static double screen_size = 8;

  // The walls offset from the side of the screen in meters
  constexpr static double offset = 0.5;

  // Creates a single wall from coordinates and dimension
  static void AddWall (b2World* game_world, double x_position,
                       double y_position, double width, double height);
 public:
  // Adds walls to specified locations to create games boundary
  static void CreateBoundary(b2World* game_world);
};

#endif  // FINALPROJECT_BOUNDARY_H
