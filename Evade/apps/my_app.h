// Copyright (c) 2020 CS126SP20. All rights reserved.

#ifndef FINALPROJECT_APPS_MYAPP_H_
#define FINALPROJECT_APPS_MYAPP_H_

#include <Box2D/Box2D.h>
#include <cinder/app/App.h>
#include <mylibrary/black_circle.h>
#include <mylibrary/green_circle.h>
#include <mylibrary/boundary.h>
#include <mylibrary/player_square.h>
#include <mylibrary/sorter.h>
#include <mylibrary/speed_powerup.h>
#include <mylibrary/jump_powerup.h>
#include <iostream>

#include <vector>

namespace myapp {

class MyApp : public cinder::app::App {
 private:
  // Value of the gravity in the physics engine
  const double kGravityValue = 2;

  // Frames per second of the game
  const double kFps = 1.0/30.0;

  // Meters to pixels conversion factor
  const double kM2p = 100;

  // Radius reduction value every update
  const double kRadiusReduction = 0.0005;

  // Spawn delay of green balls in seconds
  const double kGreenSpawnDelay = 10;

  // How fast you need to collect the green balls
  const double kGreenCollectionTime = 7;

  // How frequently powerups spawn
  const double kPowerupSpawntime = 15;

  // powerup time length
  const double kPowerupTime = 7;

  // The reduction of the spawn delay value every update
  const double kSpawnDelayReduction = 0.0005;

  // The minimum spawn delay
  const double kMinimumSpawnDelay = 1;

  // Spawn delay of black balls in seconds
  double black_spawn_delay = 3;

  // Whether the game is over
  bool is_game_over = false;

  // The players score
  int score;

  // The object the player controls in the game
  PlayerSquare player;

  // Time value of the last black ball spawn
  std::chrono::time_point<std::chrono::system_clock> last_black_ball_spawn;

  // Time value of the last green ball spawn
  std::chrono::time_point<std::chrono::system_clock> last_green_ball_spawn;

  // Time value of the last powerup spawn
  std::chrono::time_point<std::chrono::system_clock> last_powerup_spawn;

  // Time value of the last powerup collected
  std::chrono::time_point<std::chrono::system_clock> time_collected_powerup;

  // A list of all the black circle objects in the game
  std::vector<BlackCircle> black_circles;

  // A list of all the green circle objects in the game
  std::vector<GreenCircle> green_circles;

  // A list of all the speed_powerups in the game
  std::vector<SpeedPowerup> speed_powerups;

  // A list of all the jump_powerups in the game
  std::vector<JumpPowerup> jump_powerups;

  // Game start time
  std::chrono::time_point<std::chrono::system_clock> game_start_time;

  // Draws a circle on the screen given the radius and center
  void DrawCircle(double radius, const b2Vec2& center,
      cinder::ColorT<float> color) const;

  // Draws a rectangle on the screen given its dimensions and center
  void DrawStaticRectangle(double w, double h, const b2Vec2& center) const;

  // Draws a rectangle on the screen given its dimensions and center
  void DrawSquare(double length, const b2Vec2& center,
      cinder::ColorT<float> color) const;

  // Prints text onto the game screen
  void PrintText(const std::string& text, const cinder::ivec2& size,
      const cinder::vec2& loc, cinder::ColorT<float> color, double font_size);

  // Draws ending game screen
  void DrawGameOver();

 public:
  // The variable representing the game in the physics engine
  b2World* game_world;

  // Default constructor
  MyApp();

  // Setup before the game starts
  void setup() override;

  // Uodates the game accordingly
  void update() override;

  // Draws the objects onto the screen
  void draw() override;

  // Adjusts game based on user inputs
  void keyDown(cinder::app::KeyEvent) override;
};

// Class representing a contact listener
class MyContactListener : public b2ContactListener {
  // Need to override contact function to end game when player hits an obstacle
  void BeginContact(b2Contact* contact) override {
    b2Body* body_a = contact->GetFixtureA()->GetBody();
    b2Body* body_b = contact->GetFixtureB()->GetBody();
    // Checks if the objects making contact are the player and an obstacle
    if (Sorter::DetermineObject(body_a) == "player"
        && Sorter::DetermineObject(body_b) == "obstacle") {
      ((PlayerSquare*)body_a->GetUserData())
          ->SetIsTouchingObstacle(true);
    }
    // Checks if the objects making contact are player and key
    if (Sorter::DetermineObject(body_a) == "player"
        && Sorter::DetermineObject(body_b) == "key") {
      ((PlayerSquare*)body_a->GetUserData())->SetIsTouchingKey(true);
    }
    // Checks if the objects making contact are player and speed powerup
    if (Sorter::DetermineObject(body_a) == "player"
        && Sorter::DetermineObject(body_b) == "speed powerup") {
      ((PlayerSquare*)body_a->GetUserData())
          ->SetIsTouchingSpeedPowerup(true);
    }
    // Checks if the objects making contact are player and jump powerup
    if (Sorter::DetermineObject(body_a) == "player"
        && Sorter::DetermineObject(body_b) == "jump powerup") {
      ((PlayerSquare*)body_a->GetUserData())->
          SetIsTouchingJumpPowerup(true);
    }
  }
};
}  // namespace myapp
#endif  // FINALPROJECT_APPS_MYAPP_H_
