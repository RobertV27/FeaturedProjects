//
// Created by Robert Villa on 4/21/20.
//

#include "mylibrary/black_circle.h"
#include <iostream>

BlackCircle::BlackCircle(b2World* game_world) {
  b2BodyDef body_def;
  //http://www.cplusplus.com/forum/beginner/102036/
  // Creates a random double from 1 to 7
  double x_position =  1 + ((double)rand() / RAND_MAX) * (7 - 1);

  // Defines physics body as dynamic with random x position
  body_def.position.Set(x_position, y_position);
  body_def.type = b2_dynamicBody;
  circle = game_world->CreateBody(&body_def);

  // Creates a shape and connects it to the physics body
  b2CircleShape shape;
  shape.m_p.Set(0,0);
  shape.m_radius = initial_radius;
  b2FixtureDef fixture_def;
  fixture_def.shape = &shape;
  fixture_def.density = 1;
  // "Bouncyness" of the ball
  fixture_def.restitution = 0.9;
  circle->CreateFixture(&fixture_def);
  circle->SetLinearDamping(0);
  AddInitialVelocity();
  circle->SetUserData(this);
}

void BlackCircle::ShrinkRadius(double reduction) {
  circle->GetFixtureList()->GetShape()->m_radius -= reduction;
}

bool BlackCircle::ShouldDelete() {
  // Deletes object if it is to small and returns true
  if (circle->GetFixtureList()->GetShape()->m_radius < delete_threshold) {
    circle->GetWorld()->DestroyBody(circle);
    return true;
  }
  return false;
}

void BlackCircle::AddInitialVelocity() {
  // Calculates random angle to launch the ball at from -60 to 60 degrees
  double velocity_angle = rand() % 121 - 60;

  // Builds unit vector from that angle
  double x_velocity = sin(velocity_angle * degrees_to_radians);
  double y_velocity = sqrt(1 - pow(x_velocity, 2));

  // Creates final vector by multiplying the speed
  b2Vec2 velocity(x_velocity * speed, y_velocity * speed);
  circle->SetLinearVelocity(velocity);
}


