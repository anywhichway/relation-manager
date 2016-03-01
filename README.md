# relation-manager

Automatic relationship management for JavaScript objects.

Relationships are defined as first class objects, e.g. ParentChild(parent,child).

Subsequent to relation definition, modifications to either party in a relation force updates on the other. For example, parent.children.add(child) automatically ensures child.parents.includes(parent) is true. And, child.parents.delete(parent) automatically ensures parent.children.includes(child) is false.

Many-to-many, one-to-many, many-to-one, and one-to-one relationships are supported. When a relationship is of type "many", a specific cardinality can be enforced, e.g. 2. 

A shorthand notation supports symmetric relationships like Brother. Additionally, symmetric relationships are automatically created, e.g. defining ParentChild automatically defines ChildParent.

Objects participating in relationships can be automatically instanceof checked and relationships can be inherited down the JavaScript prototype tree.

# Installation

npm install relation-manager

The index.js and package.json files are compatible with https://github.com/anywhichway/node-require so that relation-manager can be served directly to the browser from the node-modules/relation-manager directory when using node Express.

Browser code can also be found in the browser directory at https://github.com/anywhichway/relation-manager.

# Usage

Here are some example relation definitions:

```
Relation.define(window,
	{class: Person, relation:"parent", property:"parents", cardinality:Infinity, unique:true},
	{class: Person, relation:"child", property:"children", cardinality:Infinity, unique:true});
Relation.define(window,
	{class: Person, property:"husband", cardinality:1},
	{class: Person, property:"wife", cardinality:1});
Relation.define(window,
	{class: Person, relation:"brothers", property:"brothers", cardinality:Infinity, unique:true});
Relation.define(window,
	{class: Person, relation:"owner", property:"owner", cardinality:1},
	{relation:"property",property:"properties",cardinality:Infinity,unique:true});
```

More detailed documentation will be available in v0.0.4.

# Building & Testing

Building & testing is conducted using Travis, Mocha, Chai, and Istanbul.

# Notes

This package requires a full Proxy implementation. The Proxy implementation for Chrome looks like it will be in v50.X, which is currently in beta. The package will not work in Node.js
until the most recent v8 engine is added to Node.js.

# Updates (reverse chronological order)

2016-03-02 v0.0.4 Added unit tests, more class validation, usage documentation.

2016-03-01 v0.0.3 Initial public release.