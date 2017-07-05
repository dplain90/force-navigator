export const bindAll = (ctx) => {
  let fns = Object.getOwnPropertyNames(Object.getPrototypeOf(ctx));
  fns.slice(1).forEach((fn) => ctx[fn] = ctx[fn].bind(ctx));
};
