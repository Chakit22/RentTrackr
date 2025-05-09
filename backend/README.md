# Create the main project directory

mkdir backend
cd backend

# Initialize npm package

npm init -y

# Install core dependencies

npm install express cors nodemon

# Install development dependencies (-D same as --save-dev)

npm install -D typescript eslint ts-node @types/node @types/express @types/cors @eslint/js typescript typescript-eslint

# Initialize TypeScript configuration (creates tsconfig.json file)

npx tsc --init

# Create folder structure (Creates a basic folder structure with empty folders)

mkdir -p src/{controllers,services,models,routes,middleware,utils,config,types,tests}

# Create essential files

touch src/index.ts
touch .env .env.example
touch .gitignore

# Add "dev" inside scripts

"dev": "nodemon src/index.ts"
