export const bindAll = (functions) => {
  for (let i = 0; i < functions.length; i++) {
    let fnName = functions[i];
    this[fnName] = this[fnName].bind(this);
  }
};
