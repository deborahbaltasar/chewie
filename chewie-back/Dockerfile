FROM node
WORKDIR /app

COPY . .

RUN yarn
CMD yarn sequelize db:migrate && yarn dev