FROM ${CI_DEPENDENCY_PROXY_GROUP_IMAGE_PREFIX:-gitlab.com/gamanza-group-ag/dependency_proxy/containers}/node:18 as builder
RUN mkdir server
WORKDIR server
ADD package.json package-lock.json tsconfig.json tsconfig.build.json .npmrc ./
ADD src ./src/
ADD setup ./setup/
RUN npm ci
RUN npm run build

FROM ${CI_DEPENDENCY_PROXY_GROUP_IMAGE_PREFIX:-gitlab.com/gamanza-group-ag/dependency_proxy/containers}/node:18 as installer
RUN mkdir server
WORKDIR server
COPY package.json package-lock.json .npmrc ./
RUN npm ci --production

FROM ${CI_DEPENDENCY_PROXY_GROUP_IMAGE_PREFIX:-gitlab.com/gamanza-group-ag/dependency_proxy/containers}/node:18-slim as app
RUN mkdir server
WORKDIR server
COPY --from=builder /server/build ./build
COPY --from=builder /server/package.json .
COPY --from=installer /server/node_modules ./node_modules
CMD ["node", "build"]
