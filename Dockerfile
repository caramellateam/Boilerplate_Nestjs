FROM node:16-alpine as builder

# RUN cd /lib && ln -s /lib64/* /lib && ln -s libnsl.so.2 /usr/lib/libnsl.so.1 && ln -s libc.so /usr/lib/libresolv.so.2

RUN npm install -g npm@8.1.3

ENV NODE_ENV build
RUN mkdir /app && chown -R node:node /app
WORKDIR /app
COPY . /app
RUN chown -R node:node /app

USER node
RUN npm install yarn @nestjs/cli \
    && yarn install \
    && yarn build

# ---

FROM node:16-alpine

ENV NODE_ENV production
# ENV TNS_ADMIN /app/secrets/
# ENV LD_LIBRARY_PATH=/lib

RUN apk --no-cache add libaio libnsl libc6-compat curl
RUN cd /tmp && \
  curl -o instantclient-basiclite.zip https://download.oracle.com/otn_software/linux/instantclient/instantclient-basiclite-linuxx64.zip -SL && \
  unzip instantclient-basiclite.zip && \
  mv instantclient*/ /usr/lib/instantclient && \
  rm instantclient-basiclite.zip && \
  ln -s /usr/lib/instantclient/libclntsh.so.21.1 /usr/lib/libclntsh.so && \
  ln -s /usr/lib/instantclient/libocci.so.21.1 /usr/lib/libocci.so && \
  ln -s /usr/lib/instantclient/libociicus.so /usr/lib/libociicus.so && \
  ln -s /usr/lib/instantclient/libnnz21.so /usr/lib/libnnz21.so && \
  ln -s /usr/lib/libnsl.so.2 /usr/lib/libnsl.so.1 && \
  ln -s /lib/libc.so.6 /usr/lib/libresolv.so.2 && \
  ln -s /lib64/ld-linux-x86-64.so.2 /usr/lib/ld-linux-x86-64.so.2

ENV ORACLE_BASE /usr/lib/instantclient
ENV LD_LIBRARY_PATH /usr/lib/instantclient
ENV TNS_ADMIN /usr/lib/instantclient/network/admin
ENV ORACLE_HOME /usr/lib/instantclient
RUN apk --no-cache add libaio libnsl libc6-compat curl
RUN mkdir -p /usr/lib/instantclient/network/admin && chown -R node:node /usr/lib/instantclient/network/admin

# RUN wget https://download.oracle.com/otn_software/linux/instantclient/214000/instantclient-basic-linux.x64-21.4.0.0.0dbru.zip && \
#     unzip instantclient-basic-linux.x64-21.4.0.0.0dbru.zip && \
#     cp -r instantclient_21_4/* /lib && \
#     rm -rf instantclient-basic-linux.x64-21.4.0.0.0dbru.zip && \
#     apk add libaio && \
#     apk add libaio libnsl libc6-compat && \
#     cd /lib && \
#     # Linking ld-linux-x86-64.so.2 to the lib/ location (Update accordingly)
#     ln -s /lib64/* /lib && \
#     ln -s libnsl.so.2 /usr/lib/libnsl.so.1 && \
#     ln -s libnsl.so.2 /lib/libnsl.so.1 && \
#     ln -s libc.so /lib/libresolv.so.2

USER node
WORKDIR /app

COPY --from=builder /app/package*.json /app/
COPY --from=builder /app/node_modules/ /app/node_modules/
COPY --from=builder /app/dist/ /app/dist/
COPY --from=builder /app/bin/ /app/bin/

COPY --from=builder /app/secrets /app/secrets
RUN cp /app/secrets/* /usr/lib/instantclient/network/admin/

ENTRYPOINT APP_VERSION=$(/app/bin/get_version_script.sh) node dist/main.js
