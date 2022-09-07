//
// Created by Robert Villa on 5/5/20.
//

#ifndef FINALPROJECT_SORTER_H
#define FINALPROJECT_SORTER_H

#include <Box2D/Box2D.h>
#include <string>

class Sorter {
 public:
  // Static method that determines which type of box2d object is entered
  static std::string DetermineObject(b2Body* body);
};

#endif  // FINALPROJECT_SORTER_H
