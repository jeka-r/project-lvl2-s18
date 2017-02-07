install: install-deps

run:
	npm run babel-node -- src/bin/gendiff.js src/before.json src/after.json

run-h:
	npm run babel-node -- src/bin/gendiff.js -h

run--help:
	npm run babel-node -- src/bin/gendiff.js --help

install-deps:
	yarn

build:
	rm -rf dist
	npm run build

test:
	npm test

lint:
	npm run eslint -- src test

publish:
	npm publish

.PHONY: test
