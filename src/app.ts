import * as Koa from "koa";
import * as cors from "@koa/cors";
import * as bodyParser from "koa-bodyparser";
import * as logger from "koa-logger";
import * as koaJson from "koa-json";

import * as mongoose from "mongoose";

import * as dotenv from "dotenv";

import router from "routes";

import { setGlobalOptions } from "@typegoose/typegoose";
setGlobalOptions({
  globalOptions: {
    useNewEnum: true,
  },
});

const app = new Koa();

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL ?? "", {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((): void => console.log("MongoDB connected"))
  .catch((err: Error): void => console.log("Failed to connect MongoDB: ", err));

app.proxy = true;
app
  .use(cors())
  .use(bodyParser()) //라우팅 보다 먼저 나와야 정상 적용이 됨
  .use(koaJson())
  .use(logger())
  .use(router.routes())
  .use(router.allowedMethods());

export default app;