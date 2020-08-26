FROM node:12.18.2
WORKDIR /app

COPY . .

RUN yarn
CMD yarn sequelize db:migrate && yarn dev