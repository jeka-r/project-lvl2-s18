project-lvl1-s18 is my second training project to train me as Back-end JavaScript programmer in Hexlet educational centre (https://ru.hexlet.io/pages/about)

[![Build Status](https://travis-ci.org/jeka-r/project-lvl2-s18.svg?branch=master)](https://travis-ci.org/jeka-r/project-lvl2-s18)

[![Code Climate](https://codeclimate.com/github/jeka-r/project-lvl2-s18/badges/gpa.svg)](https://codeclimate.com/github/jeka-r/project-lvl2-s18)
[![Test Coverage](https://codeclimate.com/github/jeka-r/project-lvl2-s18/badges/coverage.svg)](https://codeclimate.com/github/jeka-r/project-lvl2-s18/coverage)
[![Issue Count](https://codeclimate.com/github/jeka-r/project-lvl2-s18/badges/issue_count.svg)](https://codeclimate.com/github/jeka-r/project-lvl2-s18)


Project contains calculator of differences between configuration files ( available formats json, ymal, ini).

install
> $ sudo npm install -g project-lvl2-s18

usage
> gendiff [options] first_config second_config

help
> gendiff --help

currently available three output formats (default, plain, json)

default format
> gendiff first_config second_config

result will be like
```
{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}
```

plain format
> gendiff -f plain first_config second_config

result will be like
```
Property 'common.setting2' was removed
Property 'common.setting6' was removed
Property 'common.setting4' was added with value: blah blah
Property 'common.setting5' was added with complex value
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed
Property 'group3' was added with complex value
```
json format
> gendiff -f json first_config second_config

result will be like
```
[
  {
    "status": "unchanged",
    "key": "host",
    "newValue": null,
    "oldValue": "hexlet.io",
    "children": []
  },
  {
    "status": "updated",
    "key": "timeout",
    "newValue": "20",
    "oldValue": "50",
    "children": []
  },
  {
    "status": "removed",
    "key": "proxy",
    "newValue": null,
    "oldValue": "123.234.53.22",
    "children": []
  },
  {
    "status": "added",
    "key": "verbose",
    "newValue": true,
    "oldValue": null,
    "children": []
  }
]
```
