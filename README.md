JSON-Transform
=========

A Node package for transforming(mapping) one JSON object to another based on a specified template

## Installation

  npm install json_transform --save

## Usage

    var JSONTransform = require('json_transform');

#### Input
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

#### Template
A template specifies how the input json should be transformed to the desired output json. The key value pair in template json specifies the input key to desired key name transformation(can be same if key need not be renamed). In case of nested json object/array, the desired key name is specified explicitly and the desired data specifies the template to be used for transforming inner object. The input keys not specified in the template are filtered out in the output json.

**Example:** In the sample below, `id` key from input transforms to `user_id` key in output json. `content` key is not renamed since both input and output key name are same. For the nested `user` object, the desired key is `userDetails`, so in the output, the data(specified by template `desiredData`) for `user` object comes under the key `userDetails`. The `longitude` key is not specified in template, so it is omitted from the ouput json.

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
    
#### Output  
    
    var output = JSONTransform.transform(input, template);
    ------------------------------------------------------
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
* 0.1.1 Fixed blank values in array
* 0.1.2 Bug fix for array exceeding bounds
