function markdownItAST(tokens) {
    function genTreeNode(node) {
        return {
            nodeType: node && node.type.replace('_open', ''),
            openNode: node,
            closeNode: null,
            children: []
        };
    }

    // dummy root node
    var rootNode = genTreeNode(null);
    var curr = rootNode;
    var stack = [];
    tokens.forEach(function(tok, idx) {
        var tmp;
        if (tok.nesting == 1) {
            tmp = genTreeNode(tok);
            curr.children.push(tmp);
            stack.push(curr);
            curr = tmp;
        } else if (tok.nesting == -1) {
            curr.closeNode = tok;
            if(!stack.length) throw new Error('AST stack underflow.');
            tmp = stack.pop();
            // TODO: check whether the close node corresponds to the one it opens
            // curr = stack[stack.length - 1];
            curr = tmp;
        } else if (tok.nesting == 0) {
            curr.children.push(tok);
        } else {
            throw new ValueError('Invalid nesting level found in token index ' + idx + '.');
        }
    });

    if (stack.length != 0)
        throw new Error('Unbalanced block open/close tokens.');

    return rootNode.children;
}

module.exports = {
    makeAST: markdownItAST
};
