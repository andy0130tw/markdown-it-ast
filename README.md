# Markdown-It AST Generator

Generate AST from tokens parsed from markdown-it to be more efficient on searching and rewriting tokens.

## Usage

```js
var markdownIt    = require('markdown-it');
var markdownItAST = require('markdown-it-ast');

var tokens = markdownIt.parse('#123\n##456');
markdownItAST.makeAST(tokens);
```

## Structure
`makeAST` returns a tree. Each token pair (open, close) are stored in `openNode` and `closeNode`, respectively. `nodeType` is derived from the opening token. Descendants are stored in `children`, can be either a node on AST **or an inline node**.

# License
This project was [licensed under MIT]((https://github.com/andy0130tw/markdown-it-ast/LICENSE).
