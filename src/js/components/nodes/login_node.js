import CommandNode from './command_node.js';

class LoginNode extends CommandNode {
  constructor(txt, parent, type){
    super(txt, parent);
    this.type = type;
  }

  variable() {
    this.type === 'variable';
  }

  execute(params) {


  }

  isValid(params){
    let login = new Login();
    let { errors, id, results } = login.attempt(params[1]);
    if(errors) 
  }

  findMatches(val){
    let username = [];
    this.eachChild((child) => {
      child.txt = val;
      username.push(child);
    });
    return username;
  }

  static setupTree(rootNode) {
    let LoginRoot = new LoginNode('login', rootNode, 'cmd');
    let username = new LoginNode('', LoginRoot, 'variable');
  }


}

export default LoginNode;
