FROM node:18-slim

# Install Chrome dependencies and TypeScript
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Set up environment
WORKDIR /app
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy application files
COPY . .

# Build the application
RUN npm run build

# Create directories for screenshots
RUN mkdir -p screenshots/baseline screenshots/current screenshots/diff

# Start Vite preview server and run tests
CMD npm run preview & sleep 2 && npm run test:visual