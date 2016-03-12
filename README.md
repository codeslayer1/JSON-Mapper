JSON-Transform
=========

A Node package for transforming(mapping) one JSON object to another based on a specified template

## Installation

  npm install json-transform --save

## Usage

    var JSONTransform = require('json-transform');
    var input = {
      "id" : 101,
      "content" : "My first npm package",
      "latitude" : 28.7123,
      "longitude" : 78.72346,
      "user" : {
        "id" : 201,
        "name" : "Codeslayer",
        "interests": [
          {
            "id": 301,
            "tag_id": 401,
            "tag": "Food",
            "types": {
              "id" : 501,
              "name": "Fast foods",
              "description": "Unhealthy",
              "contents": [
                {
                  "id" : 601,
                  "name" : "Pizza"
                },
                {
                  "id" : 602,
                  "name" : "Chicken Rice"
                }
              ]
            },
            "createdAt": "2016-03-12T14:59:33.000Z",
            "updatedAt": "2016-03-12T14:59:33.000Z"
          },
          {
            "id": 302,
            "tag_id": 402,
            "tag": "Movie",
            "types": {
              "id" : 502,
              "name": "Comedy",
              "description": "Fun to watch",
              "contents": [
                {
                  "id" : 603,
                  "name" : "Scary Movie"
                },
                {
                  "id" : 604,
                  "name" : "Jumanji"
                }
              ]
            },
            "createdAt": "2016-03-12T14:59:33.000Z",
            "updatedAt": "2016-03-12T14:59:33.000Z"
          }
        ]
      }
    };
    
    var template = {
      "id" : "user_id",
      "content" : "content",
      "latitude" : "latitude",
      "user" : {
        "desiredKey": "userDetails",
        "desiredData": {
          "id": "id",
          "name": "first_name",
          "interests": {
            "desiredKey": "interests",
            "desiredData": [{
                "id": "id",
                "tag": "tag",
                "types": {
                  "desiredKey": "mappedTypes",
                  "desiredData": {
                    "id" : "type_id",
                    "name": "type_name",
                    "description": "type_description",
                    "contents": {
                      "desiredKey": "mappedContents",
                      "desiredData": [{
                          "id" : "id",
                          "name" : "name"
                        }]
                    }
                  }
                }
              }]
          }
        }
      }
    };

    var result = JSONTransform.transform(input, template);
    
##### Result  
    {
      "user_id": 101,
      "content": "My first npm package",
      "latitude": 28.7123,
      "userDetails": {
        "id": 201,
        "first_name": "Codeslayer",
        "interests": [
          {
            "id": 301,
            "tag": "Food",
            "mappedTypes": {
              "type_id": 501,
              "type_name": "Fast foods",
              "type_description": "Unhealthy",
              "mappedContents": [
                {
                  "id": 601,
                  "name": "Pizza"
                },
                {
                  "id": 602,
                  "name": "Chicken Rice"
                }
              ]
            }
          },
          {
            "id": 302,
            "tag": "Movie",
            "mappedTypes": {
              "type_id": 502,
              "type_name": "Comedy",
              "type_description": "Fun to watch",
              "mappedContents": [
                {
                  "id": 603,
                  "name": "Scary Movie"
                },
                {
                  "id": 604,
                  "name": "Jumanji"
                }
              ]
            }
          }
        ]
      }
    }

## Release History

* 0.1.0 Initial release