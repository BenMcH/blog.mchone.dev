# base node image
FROM node:16-bullseye-slim as base

# set for base and all layer that inherit from it
ENV NODE_ENV production

# Install all node_modules, including dev dependencies
FROM base as deps

WORKDIR /blog

ADD package.json package-lock.json ./
RUN npm install --production=false

# Setup production node_modules
FROM base as production-deps

WORKDIR /blog

COPY --from=deps /blog/node_modules /blog/node_modules
ADD package.json package-lock.json ./
RUN npm prune --production

# Build the app
FROM base as build

WORKDIR /blog

COPY --from=deps /blog/node_modules /blog/node_modules

ADD . .
RUN npm run postinstall
RUN npm run build

# Finally, build the production image with minimal footprint
FROM base

WORKDIR /blog

COPY --from=production-deps /blog/node_modules /blog/node_modules
COPY --from=build /blog/node_modules/.prisma /blog/node_modules/.prisma

COPY --from=build /blog/build /blog/build
COPY --from=build /blog/public /blog/public
ADD . .

CMD ["npm", "start"]
