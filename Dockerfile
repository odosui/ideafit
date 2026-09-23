# syntax=docker/dockerfile:1
# Production image: docker build -t ideafit . && docker run -p 80:80 -v ideafit:/rails/storage ideafit

ARG RUBY_VERSION=3.4.7
ARG NODE_VERSION=24

FROM docker.io/library/node:${NODE_VERSION}-slim AS node

FROM docker.io/library/ruby:${RUBY_VERSION}-slim AS base
WORKDIR /rails
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y libjemalloc2 && \
    rm -rf /var/lib/apt/lists/*
ENV RAILS_ENV=production \
    BUNDLE_DEPLOYMENT=1 \
    BUNDLE_PATH=/usr/local/bundle \
    BUNDLE_WITHOUT=development:test \
    LD_PRELOAD=libjemalloc.so.2 \
    SOLID_QUEUE_IN_PUMA=true

FROM base AS build
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential libyaml-dev && \
    rm -rf /var/lib/apt/lists/*
COPY --from=node /usr/local/bin/node /usr/local/bin/node
COPY --from=node /usr/local/lib/node_modules/npm /usr/local/lib/node_modules/npm
RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm && \
    ln -s /usr/local/lib/node_modules/npm/bin/npx-cli.js /usr/local/bin/npx

COPY Gemfile Gemfile.lock ./
RUN bundle install && rm -rf ~/.bundle "${BUNDLE_PATH}"/ruby/*/cache

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN SECRET_KEY_BASE_DUMMY=1 bin/rails assets:precompile && \
    npm run build:embed && \
    rm -rf node_modules

FROM base
RUN useradd rails --uid 1000 --create-home
USER rails
COPY --from=build "${BUNDLE_PATH}" "${BUNDLE_PATH}"
COPY --from=build --chown=rails:rails /rails /rails

ENTRYPOINT ["bin/docker-entrypoint"]
EXPOSE 80
CMD ["bin/thrust", "bin/rails", "server"]
