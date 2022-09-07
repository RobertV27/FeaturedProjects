//
// Created by Robert Villa on 4/21/20.
//

#include <mylibrary/boundary.h>

void Boundary::AddWall(b2World* game_world, double x_position,
                       double y_position, double width, double height) {
  // Defines physics body as static with given position
  b2BodyDef body_def;
  body_def.position.Set(x_position, y_position);
  body_def.type = b2_staticBody;
  b2Body* rectangle = game_world->CreateBody(&body_def);

  // Creates a shape to attach to the physics body
  b2PolygonShape shape;
  shape.SetAsBox(width / 2, height / 2);
  b2FixtureDef fixture_def;
  fixture_def.shape = &shape;
  fixture_def.density = 1;
  // 0 friction Prevents horizontal velocity of balls from decreasing
  fixture_def.friction = 0;
  rectangle->CreateFixture(&fixture_def);
  rectangle->SetUserData(nullptr);
}

void Boundary::CreateBoundary(b2World* game_world) {
  // Adds floor
  AddWall(game_world, screen_size / 2, screen_size - offset,
      long_length, short_length);

  // Adds walls
  AddWall(game_world, offset, screen_size / 2, short_length,
      long_length + short_length);
  AddWall(game_world, screen_size - offset, screen_size / 2,
      short_length, long_length + short_length);
}
