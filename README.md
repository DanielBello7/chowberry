# CHOWBERRY

# RUN ADMIN
- LOG_PATH=logs/admin/
- ENV_FILE=envs/admin/.env.dev
- ENV_FILE=envs/admin/.env.dev npm run start:dev admin

# RUN AUTH
- LOG_PATH=logs/auth/
- ENV_FILE=envs/auth/.env.dev
- ENV_FILE=envs/auth/.env.dev npm run start:dev auth

# RUN CHOWBERRY
- LOG_PATH=logs/chowberry/
- ENV_FILE=envs/chowberry/.env.dev
- ENV_FILE=envs/chowberry/.env.dev npm run start:dev chowberry

# RUN FINANCE
- LOG_PATH=logs/finance/
- ENV_FILE=envs/finance/.env.dev
- ENV_FILE=envs/finance/.env.dev npm run start:dev finance

# RUN PUDDLE
- LOG_PATH=logs/puddle/
- ENV_FILE=envs/puddle/.env.dev
- ENV_FILE=envs/puddle/.env.dev npm run start:dev puddle

# RUN SUPPORT
- LOG_PATH=logs/support/
- ENV_FILE=envs/support/.env.dev
- ENV_FILE=envs/support/.env.dev npm run start:dev support

# RUN USERS
- LOG_PATH=logs/users/
- ENV_FILE=envs/users/.env.dev
- ENV_FILE=envs/users/.env.dev npm run start:dev users