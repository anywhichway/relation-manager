var expect, Relation;
if(typeof(window)==="undefined") {
	expect = require("chai").expect;
	Relation = require('../index.js');
}

function Person(name) {
	this.name = name;
}
var p1,p2,p3,p4,p5;


describe("Relation ", function() {
	it("should support relation creation", function() {
		Relation.define(window,{class: Person, relation:"parent", property:"parents", cardinality:Infinity, unique:true, enumerable:true},{class: Person, relation:"child", property:"children", cardinality:Infinity, unique:true});
		Relation.define(window,{class: Person, property:"husband", cardinality:1, enumerable:true},{class: Person, property:"wife", cardinality:1});
		Relation.define(window,{class: Person, relation:"brothers", property:"brothers", cardinality:Infinity, unique:true});
		Relation.define(window,{class: Object, relation:"owner", property:"owner", cardinality:1, enumerable:true},{relation:"property",property:"properties",cardinality:Infinity,unique:true});
		p1 = new Person("Simon");
		p2 = new Person("Tyler");
		p3 = new Person("Zane");
		p4 = new Person("Lauren");
		p5 = new Person("Juliana");
		expect(ParentChild).to.be.instanceof(Function);
	});
	it("should support many to many", function() {
		var r = new ParentChild(p1,p2);
		expect(r).to.be.instanceof(Relation);
		expect(r.parent).to.equal(p1);
		expect(r.child).to.equal(p2);
		expect(p1.children.includes(p2)).to.be.true;
		expect(p2.parents.includes(p1)).to.be.true;
		p2.parents.delete(p1);
		expect(p1.children.includes(p2)).to.be.false;
	});
	it("should support one to one", function() {
		var r = new HusbandWife(p1,p5);
		expect(r).to.be.instanceof(Relation);
		expect(r.husband).to.equal(p1);
		expect(r.wife).to.equal(p5);
		expect(p1.wife).to.equal(p5);
		expect(p5.husband).to.equal(p1);
		p1.wife = null;
		expect(p5.husband).to.equal(null);
	});
	it("should support inheritance", function() {
		var o = new Object();
		p1.properties.add(o);
		expect(o.owner).to.equal(p1);
	});
	it("Relation should support class checking ", function() {
		var result;
		try {
			var r = new HusbandWife(p1,{});
		} catch(e) {
			result = e;
		}
		expect(result).to.be.instanceof(TypeError);
	});
	it("property should support class checking ", function() {
		var result;
		try {
			var r = p1.wife = {};
		} catch(e) {
			result = e;
		}
		expect(result).to.be.instanceof(TypeError);
	});
});






