FROM node:10 AS build-env
ARG NODE_ENV

RUN apt update
RUN apt install -y rsync
RUN npm install -g yarn

ENV SV_FRONTEND_DIR "/opt/frontend"
ADD "./" "$SV_FRONTEND_DIR/"
WORKDIR "$SV_FRONTEND_DIR"
RUN yarn install --production=false
RUN yarn build

# for webapp
# ENV SV_WEBAPP_DIR "/opt/webapp"
# ADD "./webapp/" "$SV_WEBAPP_DIR/"
# WORKDIR "$SV_WEBAPP_DIR"
# RUN if [ "$NODE_ENV" != "development" ]; then \
#     yarn install --production=false && \
#     yarn build && \
#     rsync -avh "./dist/" "$SV_FRONTEND_DIR/public/"; \
# fi

# --------------------------------------------------------------

FROM node:10-alpine
ENV SV_FRONTEND_DIR "/opt/frontend"
COPY --from=build-env "$SV_FRONTEND_DIR" "$SV_FRONTEND_DIR"
CMD [ "node", "/opt/frontend/dist/main.bundle.js" ]
