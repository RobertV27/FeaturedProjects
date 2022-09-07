// Copyright (c) 2020 CS126SP20. All rights reserved.

#define CATCH_CONFIG_MAIN

#include <catch2/catch.hpp>

#include <Box2D/Box2D.h>
#include <mylibrary/black_circle.h>
#include <mylibrary/green_circle.h>
#include <mylibrary/boundary.h>
#include <mylibrary/player_square.h>
#include <mylibrary/sorter.h>
#include <mylibrary/speed_powerup.h>
#include <mylibrary/jump_powerup.h>

// Testing boundary walls
TEST_CASE("Boundary Walls Created", "[boundary]") {
  auto* game_world = new b2World(b2Vec2(0, 0));
  Boundary::CreateBoundary(game_world);
  b2Body* object_body = game_world->GetBodyList();
  // Counts number of objects in the game world
  int object_count = 0;
  while(object_body) {
   object_body = object_body->GetNext();
    object_count++;
  }
  REQUIRE(object_count == 3);
}

// Testing sorting method
TEST_CASE("Sorting Box2D Objects", "[sorter]") {
  auto* game_world = new b2World(b2Vec2(0, 0));
  SECTION("Sorting Boundary") {
    Boundary::CreateBoundary(game_world);
    b2Body* object_body = game_world->GetBodyList();
    REQUIRE(Sorter::DetermineObject(object_body) == "wall");
  }
  SECTION("Sorting Player") {
    PlayerSquare new_player;
    new_player.CreatePlayer(game_world);
    b2Body* object_body = game_world->GetBodyList();
    REQUIRE(Sorter::DetermineObject(object_body) == "player");
  }
  SECTION("Sorting Obstacle") {
    BlackCircle ball(game_world);
    b2Body* object_body = game_world->GetBodyList();
    REQUIRE(Sorter::DetermineObject(object_body) == "obstacle");
  }
  SECTION("Sorting Key") {
    GreenCircle ball(game_world);
    b2Body* object_body = game_world->GetBodyList();
    REQUIRE(Sorter::DetermineObject(object_body) == "key");
  }
  SECTION("Sorting Jump Powerup") {
    JumpPowerup powerup(game_world);
    b2Body* object_body = game_world->GetBodyList();
    REQUIRE(Sorter::DetermineObject(object_body) == "jump powerup");
  }
  SECTION("Sorting Speed Powerup") {
    SpeedPowerup powerup(game_world);
    b2Body* object_body = game_world->GetBodyList();
    REQUIRE(Sorter::DetermineObject(object_body) == "speed powerup");
  }
}

// Testing player
TEST_CASE("Player Created", "[player]") {
  auto* game_world = new b2World(b2Vec2(0, 0));
  PlayerSquare new_player;
  new_player.CreatePlayer(game_world);
  b2Body* object_body = game_world->GetBodyList();
  int object_count = 0;
  while(object_body) {
    object_body = object_body->GetNext();
    object_count++;
  }
  REQUIRE(object_count == 1);
}

TEST_CASE("Player Movement", "[player]") {
  auto* game_world = new b2World(b2Vec2(0, 0));
  PlayerSquare new_player;
  new_player.CreatePlayer(game_world);
  Boundary::CreateBoundary(game_world);

  SECTION("Positive X Velocity") {
    b2Body* object_body = game_world->GetBodyList();
    new_player.SetXVelocity(1);
    while(object_body) {
      if (Sorter::DetermineObject(object_body) == "player") {
        REQUIRE(object_body->GetLinearVelocity().x == 2);
      }
      object_body = object_body->GetNext();
    }
  }
  SECTION("Negative X Velocity") {
    b2Body* object_body = game_world->GetBodyList();
    new_player.SetXVelocity(-1);
    while(object_body) {
      if (Sorter::DetermineObject(object_body) == "player") {
        REQUIRE(object_body->GetLinearVelocity().x == -2);
      }
      object_body = object_body->GetNext();
    }
  }
  SECTION("Speed Change") {
    b2Body* object_body = game_world->GetBodyList();
    new_player.SetSpeed(5);
    new_player.SetXVelocity(1);
    while(object_body) {
      if (Sorter::DetermineObject(object_body) == "player") {
        REQUIRE(object_body->GetLinearVelocity().x == 5);
      }
      object_body = object_body->GetNext();
    }
  }
  SECTION("Negative Y Velocity") {
    b2Body* object_body = game_world->GetBodyList();
    new_player.SetYVelocity(-1);
    while(object_body) {
      if (Sorter::DetermineObject(object_body) == "player") {
        REQUIRE(object_body->GetLinearVelocity().y == -2);
      }
      object_body = object_body->GetNext();
    }
  }
  SECTION("Player Jump Scale") {
    b2Body* object_body = game_world->GetBodyList();
    new_player.SetJumpScale(5);
    new_player.SetYVelocity(-1);
    while(object_body) {
      if (Sorter::DetermineObject(object_body) == "player") {
        REQUIRE(object_body->GetLinearVelocity().y == -5);
      }
      object_body = object_body->GetNext();
    }
  }
}

// Testing  obstacle
TEST_CASE("Obstacle Created", "[obstacle]") {
  auto* game_world = new b2World(b2Vec2(0, 0));
  BlackCircle obstacle(game_world);
  b2Body* object_body = game_world->GetBodyList();
  int object_count = 0;
  while(object_body) {
    object_body = object_body->GetNext();
    object_count++;
  }
  REQUIRE(object_count == 1);
}

TEST_CASE("Shrink Obstacle Radius", "[obstacle]") {
  auto* game_world = new b2World(b2Vec2(0, 0));
  BlackCircle obstacle(game_world);
  auto* circle = (b2CircleShape*)game_world->GetBodyList()
      ->GetFixtureList()->GetShape();
  REQUIRE(circle->m_radius == 0.25);
  obstacle.ShrinkRadius(0.01);
  REQUIRE(circle->m_radius < 0.25);

  SECTION("Should Delete Obstacle") {
    obstacle.ShrinkRadius(0.2);
    REQUIRE(obstacle.ShouldDelete());
  }
}

// Testing key
TEST_CASE("Key Created", "[key]") {
  auto* game_world = new b2World(b2Vec2(0, 0));
  GreenCircle key(game_world);
  b2Body* object_body = game_world->GetBodyList();
  int object_count = 0;
  while(object_body) {
    object_body = object_body->GetNext();
    object_count++;
  }
  REQUIRE(object_count == 1);

  SECTION("Key Deleted") {
    key.Delete();
    REQUIRE(game_world->GetBodyList() == nullptr);
  }
}

// Testing powerupss
TEST_CASE("Jump Powerup Created", "[powerup]") {
  auto* game_world = new b2World(b2Vec2(0, 0));
  JumpPowerup powerup(game_world);
  b2Body* object_body = game_world->GetBodyList();
  int object_count = 0;
  while(object_body) {
    object_body = object_body->GetNext();
    object_count++;
  }
  REQUIRE(object_count == 1);

  SECTION("Jump Powerup Deleted") {
    powerup.Delete();
    REQUIRE(game_world->GetBodyList() == nullptr);
  }
}

TEST_CASE("Speed Powerup Created", "[powerup]") {
  auto* game_world = new b2World(b2Vec2(0, 0));
  SpeedPowerup powerup(game_world);
  b2Body* object_body = game_world->GetBodyList();
  int object_count = 0;
  while(object_body) {
    object_body = object_body->GetNext();
    object_count++;
  }
  REQUIRE(object_count == 1);

  SECTION("Speed Powerup Deleted") {
    powerup.Delete();
    REQUIRE(game_world->GetBodyList() == nullptr);
  }
}

