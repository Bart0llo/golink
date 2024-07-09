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
.PHONY: help dev prisma-generate prisma-migrate clean build-frontend

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
	cd $(FRONTEND_DIR) && sudo docker build -t $(DOCKER_IMAGE_NAME_FRONTEND):v$(VERSION) .