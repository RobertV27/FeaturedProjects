//
// Created by Robert Villa on 5/5/20.
//

#include "mylibrary/jump_powerup.h"

JumpPowerup::JumpPowerup(b2World* game_world) {
  // Creates a random double from 1 to 7
  double x_position =  1 + ((double)rand() / RAND_MAX) * (7 - 1);

// Creates a random double from 5.5 to 7
  double y_position =  5.5 + ((double)rand() / RAND_MAX) * (7 - 5.5);

// Defines physics body as static with given position
  b2BodyDef body_def;
  body_def.position.Set(x_position, y_position);
  square = game_world->CreateBody(&body_def);

// Creates a shape to attach to the physics body
  b2PolygonShape shape;
  shape.SetAsBox(side_length, side_length);
  b2FixtureDef fixture_def;
  fixture_def.shape = &shape;
  fixture_def.density = 0.5;
  // Sensors allow physical objects to pass through them
  fixture_def.isSensor = true;
  square->CreateFixture(&fixture_def);
  square->SetUserData(this);
}

void JumpPowerup::Delete() {
  square->GetWorld()->DestroyBody(square);
}
