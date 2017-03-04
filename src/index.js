/**
 * Created by ssehacker on 2017/3/4.
 */

import Koa from 'koa';
import Router from 'koa-router';
import views from 'koa-views';
import path from 'path';


const app = new Koa();
const router = new Router();

// response
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
  console.log(`X-Response-Time: ${ms} ms  ${ctx.method}  ${ctx.path}  ${ctx.status}`);
});

// Must be used before any router is used
console.log(path.resolve('public', 'views'));
app.use(views(path.resolve('public', 'views'), {
  map: {
    html: 'ejs'
  }
}));


router.get('/' ,async (ctx) => {
  await ctx.render('index', {
    test : 'Hello Koa2'
  });
});


app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
console.log('listening on port: 3000');