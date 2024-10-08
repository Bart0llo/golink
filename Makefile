# Variables
FRONTEND_DIR = frontend
BACKEND_DIR = backend
DOCKER_IMAGE_NAME_FRONTEND = golink-web
DOCKER_IMAGE_NAME_BACKEND = golink-server
VERSION := $(shell jq -r .version ./package.json)

# Commands
NPM = pnpm
CONCURRENTLY = concurrently
PRISMA = npx prisma

# Targets
.PHONY: help dev prisma-generate prisma-migrate clean build-frontend build-backend

# Default target
help:

# Show help
help:
	@echo "Usage: make [target] [RUN=frontend|backend]"
	@echo "Targets:"
	@echo "  help              - Show this help message"
	@echo "  dev               - Run frontend and backend development environments"
	@echo "                     - Use RUN=frontend to run only frontend"
	@echo "                     - Use RUN=backend to run only backend"
	@echo "  prisma-generate   - Generate Prisma client"
	@echo "  prisma-migrate    - Run Prisma migrations"
	@echo "  clean             - Clean node_modules in both frontend and backend"
	@echo "  build-frontend    - Build Docker image for frontend"
	@echo "  build-backend     - Build Docker image for backend"
	@echo "  push-frontend     - Push Docker image for frontend"
	@echo "  push-backend      - Push Docker image for backend"

# Run development environment
dev:
ifeq ($(RUN),frontend)
	$(MAKE) dev-frontend
else ifeq ($(RUN),backend)
	$(MAKE) dev-backend
else
	$(MAKE) dev-concurrent
endif

# Run frontend development environment
dev-frontend:
	cd $(FRONTEND_DIR) && $(NPM) install && $(NPM) run dev

# Run backend development environment
dev-backend:
	cd $(BACKEND_DIR) && $(NPM) install && $(NPM) run dev

# Run frontend and backend concurrently (requires 'concurrently' package)
dev-concurrent:
	cd $(FRONTEND_DIR) && $(NPM) install && cd ..
	cd $(BACKEND_DIR) && $(NPM) install && cd ..
	$(CONCURRENTLY) "cd $(FRONTEND_DIR) && $(NPM) run dev" "cd $(BACKEND_DIR) && $(NPM) run dev"

# Generate Prisma client
prisma-generate:
	cd $(BACKEND_DIR) && $(PRISMA) generate

# Run Prisma migrations
prisma-migrate:
	cd $(BACKEND_DIR) && $(PRISMA) migrate deploy

# Clean node_modules in both frontend and backend
clean:
	cd $(FRONTEND_DIR) && rm -rf node_modules
	cd $(BACKEND_DIR) && rm -rf node_modules

# Build Docker image for frontend
build-frontend:
	cd $(FRONTEND_DIR) && \
	sudo docker build -t ghcr.io/bart0llo/$(DOCKER_IMAGE_NAME_FRONTEND):v$(VERSION) . && \
	sudo docker tag ghcr.io/bart0llo/$(DOCKER_IMAGE_NAME_FRONTEND):v$(VERSION) ghcr.io/bart0llo/$(DOCKER_IMAGE_NAME_FRONTEND):latest

# Build Docker image for backend
build-backend:
	cd $(BACKEND_DIR) && \
	sudo docker build -t ghcr.io/bart0llo/$(DOCKER_IMAGE_NAME_BACKEND):v$(VERSION) . && \
	sudo docker tag ghcr.io/bart0llo/$(DOCKER_IMAGE_NAME_BACKEND):v$(VERSION) ghcr.io/bart0llo/$(DOCKER_IMAGE_NAME_BACKEND):latest

# Push frontend image to the registry
push-frontend:
	sudo docker push ghcr.io/bart0llo/$(DOCKER_IMAGE_NAME_FRONTEND):v$(VERSION) && \
	sudo docker push ghcr.io/bart0llo/$(DOCKER_IMAGE_NAME_FRONTEND):latest

# Push backend image to the registry
push-backend:
	sudo docker push ghcr.io/bart0llo/$(DOCKER_IMAGE_NAME_BACKEND):v$(VERSION) && \
	sudo docker push ghcr.io/bart0llo/$(DOCKER_IMAGE_NAME_BACKEND):latest
