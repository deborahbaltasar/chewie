FROM node:12.18.2
WORKDIR /app

COPY . .

CMD yarn && yarn sequelize db:migrate && yarn dev