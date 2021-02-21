FROM node

RUN git --version

RUN git clone https://github.com/asalcedod/services-api.git /backend

WORKDIR /backend

RUN cd /backend

RUN npm i