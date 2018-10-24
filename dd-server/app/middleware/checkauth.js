module.exports = options => {
  return async function checkauth(ctx, next) {
    console.log('middleware [checkauth]');
    if (ctx.userId === 0) {
      await next();
    } else {
      const url = ctx.request.method.toLowerCase() + ctx.request.url;
      const urls = await ctx.service.acl.getUserAclUrls();
      let access = false;
      for (let i = 0; i < urls.length; i++) {
        if (url.indexOf(urls[i]) !== -1) {
          access = true;
          break;
        }
      }
      if (ctx.request.method.toLowerCase() == 'get' || access) {
        await next();
      } else {
        ctx.status = 403;
        ctx.fail('访问受限');
      }
    }
  };
};
