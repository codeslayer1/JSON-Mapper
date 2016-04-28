JSON-Transform
=========

A Node package for transforming(mapping) one JSON object to another based on a specified template

## Installation

  npm install json_transform --save

## Usage

    var JSONTransform = require('json_transform');

#### Input
    var input = {
      "id": 101,
      "content": "My first npm package",
      "latitude": 28.7123,
      "longitude": 78.72346,
      "user": {
        "id": 201,
        "name": "Codeslayer",
        "interests": [
          {
            "id": 301,
            "tag_id": 401,
            "tag": "Food",
            "types": {
              "id": 501,
              "name": "Fast foods",
              "description": "Unhealthy",
              "extras": {
                "price": "high",
                "health": "low"
              },
              "contents": [
                {
                  "id": 601,
                  "name": "Pizza"
                },
                {
                  "id": 602,
                  "name": "Chicken Rice"
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
              "id": 502,
              "name": "Comedy",
              "description": "Fun to watch",
              "extras": {
                "price": "medium",
                "entertainment": "decent"
              },
              "contents": [
                {
                  "id": 603,
                  "name": "Scary Movie"
                },
                {
                  "id": 604,
                  "name": "Jumanji"
                },
                {
                  "id": 605,
                  "name": "Gravity"
                }
              ]
            },
            "createdAt": "2016-03-12T14:59:33.000Z",
            "updatedAt": "2016-03-12T14:59:33.000Z"
          }
        ]
      }
    };

#### Template
A template specifies how the input json should be transformed to the desired output json. The key value pair in template json specifies the input key to desired key name transformation(can be same if key need not be renamed). In case of nested json object/array, the desired key name is specified explicitly and the desired data specifies the template to be used for transforming inner object. The input keys not specified in the template are filtered out in the output json. 

**Update**: Starting version **0.1.4**, all keys to be included(and not to be renamed) in output json can be defined in an array named `includeTheseKeys` instead of mapping them one to one(see sample). Prior to **0.1.4**, all keys to be included in output needs to be mapped one to one. 

**Update 2**: Version **0.1.5** and above, now support mapping nested keys using **.** as identifier for nesting. Ref example. 

**Example:** In the sample below, `id` key from input transforms to `user_id` key in output json. `content` and `latitude` key need not be renamed so they are defined in `includeTheseKeys` array.  

For the nested `user` object, the desired key is `userDetails`, so in the output, the data(specified by template `desiredData`) for `user` object comes under the key `userDetails`. The `longitude` key is not specified in template, so it is omitted from the ouput json.

    var template = {
      "id": "user_id",
      "includeTheseKeys": [
        "content",
        "latitude"
      ],
      "user": {
        "desiredKey": "userDetails",
        "desiredData": {
          "id": "id",
          "name": "first_name",
          "interests": {
            "desiredKey": "interests",
            "desiredData": [
              {
                "id": "id",
                "tag": "tag",
                "types.name": "types_name",
                "types.extras.health": "extras_health",
                "types.contents[2].name": "third_content",
                "types": {
                  "desiredKey": "mappedTypes",
                  "desiredData": {
                    "id": "type_id",
                    "name": "type_name",
                    "description": "type_description",
                    "contents": {
                      "desiredKey": "mappedContents",
                      "desiredData": [
                        {
                          "id": "id",
                          "name": "name"
                        }
                      ]
                    }
                  }
                }
              }
            ]
          }
        }
      }
    };
    
#### Output  
    
    var output = JSONTransform.transform(input, template);
    ------------------------------------------------------
    {
      "success": true,
      "data": {
        "user_id": 101,
        "content": "My first npm package",
        "latitude": 28.7123,
        "userDetails": {
          "id": 201,
          "username": "Codeslayer",
          "interests": [
            {
              "id": 301,
              "tag": "Food",
              "types_name": "Fast foods",
              "extras_health": "low",
              "third_content": null,
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
              "types_name": "Comedy",
              "extras_health": null,
              "third_content": "Gravity",
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
                  },
                  {
                    "id": 605,
                    "name": "Gravity"
                  }
                ]
              }
            }
          ]
        }
      }
    }

## Release History

* **0.1.0** Initial release
* **0.1.1** Fixed blank values in array
* **0.1.2** Bug fix for array exceeding bounds
* **0.1.3** Handling for undefined keys in JSON
* **0.1.4** Added functionality to define all keys to be included in output json, in an array instead of mapping one to one
* **0.1.5** Added support for mapping nested json keys