test:
	./node_modules/.bin/mocha --reporter spec

bench:
	npm install ttl-lru-cache
	npm install lru-cache
	node benckmark/bench.js 

.PHONY: test bench
