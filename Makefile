install: install-deps

runall: runjson runyml runini

runjson:
	npm run babel-node -- src/bin/gendiff.js __tests__/sampleFiles/before.json __tests__/sampleFiles/after.json

runyml:
		npm run babel-node -- src/bin/gendiff.js __tests__/sampleFiles/before.yml __tests__/sampleFiles/after.yml

runini:
		npm run babel-node -- src/bin/gendiff.js __tests__/sampleFiles/before.ini __tests__/sampleFiles/after.ini

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
