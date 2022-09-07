//
// Created by Robert Villa on 4/24/20.
//

#include "mylibrary/player_square.h"

PlayerSquare::PlayerSquare() {}

void PlayerSquare::CreatePlayer(b2World* game_world) {
  // Defines physics body as static with given position
  b2BodyDef body_def;
  body_def.position.Set(x_position, y_position);
  body_def.type = b2_dynamicBody;
  body_def.userData = this;
  square = game_world->CreateBody(&body_def);

  // Creates a shape to attach to the physics body
  b2PolygonShape shape;
  shape.SetAsBox(side_length / 2, side_length / 2);
  b2FixtureDef fixture_def;
  fixture_def.shape = &shape;
  fixture_def.density = 1;
  fixture_def.restitution = 0;
  fixture_def.friction = 0;
  square->CreateFixture(&fixture_def);
  // Increased gravity scale to make it easier to dodge the balls
  square->SetGravityScale(2);
  square->SetUserData(this);
}
void PlayerSquare::SetXVelocity(double x_velocity) {
  b2Vec2 velocity(x_velocity * speed, square->GetLinearVelocity().y);
  square->SetLinearVelocity(velocity);
}

void PlayerSquare::SetYVelocity(double y_velocity) {
  b2Vec2 velocity(square->GetLinearVelocity().x, y_velocity * jump_scale);
  square->SetLinearVelocity(velocity);
}

void PlayerSquare::SetSpeed(double new_speed) {
  speed = new_speed;
}

void PlayerSquare::SetJumpScale(double new_scale) {
  jump_scale = new_scale;
}

bool PlayerSquare::IsOnGround() {
  // If the object is below 7m it is touching the ground
  return square->GetWorldCenter().y > 7;
}

bool PlayerSquare::GetIsTouchingObstacle() {
  return is_touching_obstacle;
}

void PlayerSquare::SetIsTouchingObstacle(bool new_value) {
  is_touching_obstacle = new_value;
}

bool PlayerSquare::GetIsTouchingKey() {
  return is_touching_key;
}
void PlayerSquare::SetIsTouchingKey(bool new_value) {
  is_touching_key = new_value;
}

bool PlayerSquare::GetIsTouchingSpeedPowerup() {
  return is_touching_speed_powerup;
}

void PlayerSquare::SetIsTouchingSpeedPowerup(bool new_value) {
  is_touching_speed_powerup = new_value;
}

bool PlayerSquare::GetIsTouchingJumpPowerup() {
  return is_touching_jump_powerup;
}

void PlayerSquare::SetIsTouchingJumpPowerup(bool new_value) {
  is_touching_jump_powerup = new_value;
}


