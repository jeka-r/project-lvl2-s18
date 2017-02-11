install: install-deps

runall: runjson runrjson runyml runryml runini runrjini runrjsonf

runrjsonf:
			npm run babel-node -- src/bin/gendiff.js --format plain __tests__/samplefiles/before-recur.json __tests__/samplefiles/after-recur.json

runjson:
	npm run babel-node -- src/bin/gendiff.js __tests__/samplefiles/before.json __tests__/samplefiles/after.json

runrjson:
		npm run babel-node -- src/bin/gendiff.js __tests__/samplefiles/before-recur.json __tests__/samplefiles/after-recur.json

runyml:
		npm run babel-node -- src/bin/gendiff.js __tests__/samplefiles/before.yml __tests__/samplefiles/after.yml

runryml:
		npm run babel-node -- src/bin/gendiff.js __tests__/samplefiles/before-recur.yml __tests__/samplefiles/after-recur.yml

runini:
		npm run babel-node -- src/bin/gendiff.js __tests__/samplefiles/before.ini __tests__/samplefiles/after.ini

runrjini:
		npm run babel-node -- src/bin/gendiff.js __tests__/samplefiles/before-recur.ini __tests__/samplefiles/after-recur.ini

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

wtest:
	npm test -- --watch

lint:
	npm run eslint -- src test

publish:
	npm publish

.PHONY: test
