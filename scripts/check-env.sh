#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

while [[ ! -d "apps" ]]; do
    cd ..
done

MONOREPO_DIR=$(pwd)
TEMPLATES_DIR="$MONOREPO_DIR/templates"
APPS_DIR="$MONOREPO_DIR/apps"

check_env_files() {
    for app_dir in "$APPS_DIR"/*; do
        if [ -d "$app_dir" ]; then
            app=$(basename "$app_dir")
            env_file="$app_dir/.env"
            template_file="$TEMPLATES_DIR/${app}.env"
            
            if [ -f "$template_file" ]; then
                if [ -f "$env_file" ]; then
                    template_vars=$(grep -oE '^\w+' "$template_file")
                    while IFS= read -r line || [ -n "$line" ]; do
                        if [[ "$line" =~ ^[[:space:]]*# ]]; then
                            continue
                        fi
                        if [[ ! "$line" =~ ^[[:space:]]*([^[:space:]#]+)[[:space:]]*=[[:space:]]*([^[:space:]#]+)[[:space:]]*$ ]]; then
                            echo -e "${RED}No value in file $env_file${NC}"
                            return 1
                        fi
                    done < "$env_file"

                    for var in $template_vars; do
                        if ! grep -q "^$var=" "$env_file"; then
                            echo -e "${RED}No variable $var in the file $env_file${NC}"
                            return 1
                        fi
                    done
                else
                    cp "$template_file" "$env_file"
                    echo -e "${GREEN}A .env file has been created for the application $app based on the template.${NC}"
                fi
            else
                echo -e "${YELLOW}There is no template for the application $app,skipping .env file checking${NC}"
            fi
        fi
    done
    return 0
}

if check_env_files; then
    echo -e "${GREEN}All env files contain values ​​that match the templates or missing templates have been omitted.${NC}"
else
    echo -e "${RED}Some env files do not contain all values ​​that match the templates.${NC}"
fi