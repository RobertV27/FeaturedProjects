// Copyright (c) 2020 [Your Name]. All rights reserved.

#include "my_app.h"

#include <cinder/Font.h>
#include <cinder/Text.h>
#include <cinder/Vector.h>
#include <cinder/gl/draw.h>
#include <cinder/gl/gl.h>
#include <cinder/app/App.h>
#include <Box2D/Box2D.h>

#include <fstream>

namespace myapp {

using cinder::app::KeyEvent;

// Text used for the game
const char kNormalFont[] = "Arial";

// The contact listener used to detect collisions
MyContactListener* myContactListenerInstance = new MyContactListener();

MyApp::MyApp() {
}

void MyApp::setup() {
  // Sets up physics game world
  game_world = new b2World(b2Vec2(0, kGravityValue));
  game_world->SetContactListener(myContactListenerInstance);

  // Creates boundaries and player
  Boundary::CreateBoundary(game_world);
  player.CreatePlayer(game_world);
  game_start_time = std::chrono::system_clock::now();
}

void MyApp::update() {
  // Stops updating if the game is over
  if (is_game_over) {
    return;
  }

  // Ends the game if the player is touching an obstacle
  if (player.GetIsTouchingObstacle()) {
    is_game_over = true;
    return;
  }

  // Updates physics engine
  game_world->Step(kFps, 8, 3);

  // Updates the radius and deletes circles that are below size threshold
  for (BlackCircle circle : black_circles) {
    circle.ShrinkRadius(kRadiusReduction);
    if (circle.ShouldDelete()) {
      black_circles.pop_back();
    }
  }

  // Deletes green circle if touching player
    if (player.GetIsTouchingKey()) {
      green_circles.at(0).Delete();
      green_circles.pop_back();
      player.SetIsTouchingKey(false);
    }

  // Deletes speed powerup when touching player
  const auto time = std::chrono::system_clock::now();
    if(player.GetIsTouchingSpeedPowerup()) {
      speed_powerups.at(0).Delete();
      speed_powerups.pop_back();
      player.SetIsTouchingSpeedPowerup(false);
      player.SetSpeed(4);
      time_collected_powerup = time;
    }

  // Deletes jump powerup when touching player
  if(player.GetIsTouchingJumpPowerup()) {
    jump_powerups.at(0).Delete();
    jump_powerups.pop_back();
    player.SetIsTouchingJumpPowerup(false);
    player.SetJumpScale(1.5);
    time_collected_powerup = time;
  }

  // Spawns in a new black ball based on delay
  if (time - last_black_ball_spawn
  >= std::chrono::duration<double>(black_spawn_delay)) {
    BlackCircle new_black_circle(game_world);
    black_circles.insert(black_circles.begin(), new_black_circle);
    last_black_ball_spawn = time;
  }

  // Spawns in new green balls based on delay
  if (time - last_green_ball_spawn
  >= std::chrono::duration<double>(kGreenSpawnDelay)) {
    GreenCircle new_green_circle(game_world);
    green_circles.insert(green_circles.begin(), new_green_circle);
    last_green_ball_spawn = time;
  }

  // Spawns in new powerup based on delay
  if (time - last_powerup_spawn
  >= std::chrono::duration<double>(kPowerupSpawntime)) {
    // Random number, either 0 or 1, used to chose which powerup spwns
    int random_value = rand() % 2;
    if (random_value == 0) {
      JumpPowerup new_jump(game_world);
      jump_powerups.insert(jump_powerups.begin(), new_jump);
    } else {
      SpeedPowerup new_speed(game_world);
      speed_powerups.insert(speed_powerups.begin(), new_speed);
    }
    last_powerup_spawn = time;
  }

  // If the green circles are not collected in time the game ends
  if (time - last_green_ball_spawn
  >= std::chrono::duration<double>(kGreenCollectionTime)
      && !green_circles.empty()) {
    is_game_over = true;
    return;
  }

  // Deletes powerups from game world after a certain amount of time
  if (time - last_powerup_spawn >= std::chrono::duration<double>(kPowerupTime)) {
    if (!speed_powerups.empty()) {
      speed_powerups.at(0).Delete();
      speed_powerups.pop_back();
    } else if (!jump_powerups.empty()) {
      jump_powerups.at(0).Delete();
      jump_powerups.pop_back();
    }
  }

  // Removes powerup effect after specified time
  if (time - time_collected_powerup
  >= std::chrono::duration<double>(kPowerupTime)) {
    player.SetSpeed(2);
    player.SetJumpScale(1);
  }

  // Reduces spawn delay of black balls
  if (black_spawn_delay > kMinimumSpawnDelay) {
    black_spawn_delay -= kSpawnDelayReduction;
  }
}

void MyApp::draw() {
  cinder::gl::clear(cinder::Color::white());

  // Draws the final game screen if the game is over
  if (is_game_over) {
    DrawGameOver();
    return;
  }

  // Loops through all objects in the game
  b2Body* object_body = game_world->GetBodyList();
  while(object_body) {

    // If object is player, draw blue square
    if (Sorter::DetermineObject(object_body) == "player") {
      auto* temp_polygon =
          (b2PolygonShape*)object_body->GetFixtureList()->GetShape();
      // Calculates side length using opposite vertices
      double side_length = temp_polygon->GetVertex(1).x
          - temp_polygon->GetVertex(3).x;
      DrawSquare(side_length, object_body->GetWorldCenter(),
          cinder::ColorA(0,0,1));
    }

    // If object is obstacle, draw black circle
    if (Sorter::DetermineObject(object_body) == "obstacle") {
      auto* temp_circle =
          (b2CircleShape*)object_body->GetFixtureList()->GetShape();
      DrawCircle(temp_circle->m_radius, object_body->GetWorldCenter(),
          cinder::Color::black());
    }

    // If object is key, draw green circle and print time remaining to collect it
    if (Sorter::DetermineObject(object_body) == "key") {
      auto* temp_circle =
          (b2CircleShape*)object_body->GetFixtureList()->GetShape();
      DrawCircle(temp_circle->m_radius, object_body->GetWorldCenter(),
          cinder::ColorA(0, 1, 0));
      // Prints time remaining to collect key
      const cinder::vec2 center = {object_body->GetWorldCenter().x*kM2p,
                                   object_body->GetWorldCenter().y*kM2p};
      const int elapsed_time = std::chrono::duration_cast<std::chrono::seconds>
          (std::chrono::system_clock::now() - last_green_ball_spawn).count();
      std::string to_print =
          std::to_string((int) kGreenCollectionTime - elapsed_time);
      PrintText(to_print, {25, 25}, center,
          cinder::Color::black(), 20);
    }

    // If object is speed powerup, draw pink square
    if (Sorter::DetermineObject(object_body) == "speed powerup") {
      auto* temp_polygon =
          (b2PolygonShape*)object_body->GetFixtureList()->GetShape();
      // Calculates side length using opposite vertices
      double side_length = temp_polygon->GetVertex(1).x
                           - temp_polygon->GetVertex(3).x;
      DrawSquare(side_length, object_body->GetWorldCenter(),
          cinder::ColorA(1,0,1));
    }

    // If object is speed powerup, draw light blue square
    if (Sorter::DetermineObject(object_body) == "jump powerup") {
      auto* temp_polygon =
          (b2PolygonShape*)object_body->GetFixtureList()->GetShape();
      // Calculates side length using opposite vertices
      double side_length = temp_polygon->GetVertex(1).x
                           - temp_polygon->GetVertex(3).x;
      DrawSquare(side_length, object_body->GetWorldCenter(),
          cinder::ColorA(0,1,1));
    }

    // If object is a wall, pass dimensions and center to DrawStaticRectangle()
    if (Sorter::DetermineObject(object_body) == "wall") {
      auto* temp_polygon =
          (b2PolygonShape*)object_body->GetFixtureList()->GetShape();
      // Calculates width and height using opposite vertices
      double width = temp_polygon->GetVertex(1).x
          - temp_polygon->GetVertex(3).x;
      double height = temp_polygon->GetVertex(1).y
                     - temp_polygon->GetVertex(3).y;
      DrawStaticRectangle(width, height, object_body->GetWorldCenter());
    }
    object_body = object_body->GetNext();
  }

  // Prints the current score on the game screen
  std::string current_score = "Score: ";
  score = std::chrono::duration_cast<std::chrono::milliseconds>
      (std::chrono::system_clock::now() - game_start_time).count() / 10;
  current_score += std::to_string(score);
  const cinder::ivec2 size = {400, 50};
  const cinder::vec2 loc = {400, 50};
  PrintText(current_score, size, loc, cinder::Color::black(), 30);
}

void MyApp::DrawCircle(double radius, const b2Vec2& center,
    cinder::ColorT<float> color) const {
  cinder::gl::color(color);
  // Using meter to pixel conversion
  cinder::gl::drawSolidCircle(cinder::vec2(center.x*kM2p,
      center.y*kM2p),radius*kM2p);
}

void MyApp::DrawStaticRectangle(double w, double h, const b2Vec2& center) const {
  cinder::gl::color(cinder::Color::black());
  // Using meter to pixel conversion
  cinder::gl::drawSolidRect(cinder::Rectf((center.x + w/2)*kM2p,
                                          (center.y + h/2)*kM2p,
                                          (center.x - w/2)*kM2p,
                                          (center.y - h/2)*kM2p));
}

void MyApp::DrawSquare(double length, const b2Vec2& center,
    cinder::ColorT<float> color) const {
  cinder::gl::color(color);
  // Using meter to pixel conversion
  cinder::gl::drawSolidRect(cinder::Rectf((center.x + length/2)*kM2p,
                                          (center.y + length/2)*kM2p,
                                          (center.x - length/2)*kM2p,
                                          (center.y - length/2)*kM2p));
}

void MyApp::DrawGameOver() {
  const cinder::ivec2 size = {400, 50};
  const cinder::vec2 loc = {400, 400};
  PrintText("Game Over", size, loc, cinder::Color::black(), 30);
}

// Method copied and slightly modified from snake project
void MyApp::PrintText(const std::string& text, const cinder::ivec2& size,
               const cinder::vec2& loc, cinder::ColorT<float> color, double font_size) {
  cinder::gl::color(color);
  auto box = cinder::TextBox()
      .alignment(cinder::TextBox::CENTER)
      .font(cinder::Font(kNormalFont, font_size))
      .size(size)
      .color(color)
      .backgroundColor(cinder::ColorA(0, 1, 0, 0))
      .text(text);
  const auto box_size = box.getSize();
  const cinder::vec2 locp = {loc.x - box_size.x / 2, loc.y - box_size.y / 2};
  const auto surface = box.render();
  const auto texture = cinder::gl::Texture::create(surface);
  cinder::gl::draw(texture, locp);
}

void MyApp::keyDown(KeyEvent event) {
  switch (event.getCode()) {
    // Player jumps when space is pressed
    case KeyEvent::KEY_SPACE: {
      if (player.IsOnGround()) {
        player.SetYVelocity(-4);
      }
      break;
    }
    // Moves left when left key is pressed
    case KeyEvent::KEY_LEFT: {
      player.SetXVelocity(-1);
      break;
    }
    // Moves right when the right key is pressed
    case KeyEvent::KEY_RIGHT: {
      player.SetXVelocity(1);
      break;
    }
  }
}
}  // namespace myapp
