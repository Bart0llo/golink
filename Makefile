## ------------
## Setup
## ------------

.DEFAULT_GOAL := help
.PHONY: help
help:
	@echo "\033[1;34musage: make [target]\033[0m"
	@echo
	@echo "\033[1;36mtargets:\033[0m"
	@awk '/^[a-zA-Z_-]+:/ {split($$0, targets, ":"); print "\033[1;32m" targets[1] "\033[0m"}' Makefile
	

## ------------
## Install
## ------------

.PHONY: install
install:
	pnpm install

## ------------
## Check env
## ------------

.PHONY: check-env
check-env:
	npm run check:env

## ------------
## Build
## ------------

.PHONY: build
build:
	npm run build

## ------------
## Start 
## ------------

.PHONY: start
start:
	pm2 start ecosystem.config.js

## ------------
## Stop
## ------------

.PHONY: stop
stop:
	pm2 delete all