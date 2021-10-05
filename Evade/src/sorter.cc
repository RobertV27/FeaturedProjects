//
// Created by Robert Villa on 5/5/20.
//

#include "mylibrary/sorter.h"

std::string Sorter::DetermineObject(b2Body *body) {
  // Determines what type of game object the box2d body is based on properties
  // of that body.
  if (body->GetMass() == 0 && body->GetFixtureList()->GetFriction() == 0) {
    return "wall";
  }
  if (body->GetMass() == 0 && body->GetFixtureList()->GetDensity() > 0.9) {
    return "speed powerup";
  }
  if (body->GetMass() == 0 && body->GetFixtureList()->GetDensity() > 0.4) {
    return "jump powerup";
  }
  if (body->GetFixtureList()->GetRestitution() == 0) {
    return "player";
  }
  if (body->GetFixtureList()->GetRestitution() > 0.85) {
    return "obstacle";
  }
  if (body->GetFixtureList()->GetRestitution() < 0.85) {
    return "key";
  }
}