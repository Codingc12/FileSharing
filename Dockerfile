# Use Node.js LTS version
FROM node:18

# Set working directory
WORKDIR /src

# Copy package files first (better for caching layers)
COPY package*.json ./

# Install dependencies
RUN npm install
# Copy all app source code
COPY . .

# Expose API port
EXPOSE 3000

# Start the app

CMD ["node","app.js"]

#CMD ["ls","src","-la"]

#CMD ["tail","-f","/dev/null"]