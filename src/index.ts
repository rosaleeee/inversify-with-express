import 'reflect-metadata';
import * as express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import container from './config/ioc.container';
import './controller/home.controller';

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
});

const app = server.build();

app.listen(4000, () => {
  console.log('✅ Listening on: http://localhost:4000');
});
