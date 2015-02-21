/* jslint node: true */
"use strict";

module.exports = Jailer;
function Jailer(locks){
	locks = locks || {};
	for(var i=0,k=Object.keys(locks),l=k.length;i<l;i++){
		this[k[i]]=locks[k[i]];
	}
}
	Jailer.prototype.check = function(action,keys){
		var locks = this[action];
		if(!locks){return true;} // Unlocked action.

		// Avoid errors.
		if(!Array.isArray(locks)){locks = (typeof locks === 'string')?[locks]:[];}
		if(!Array.isArray(keys)){keys = (typeof keys === 'string')?[keys]:[];}

		var lock,grant;
		for(var i=0,l=locks.length;i<l;i++){ // OR...
			lock = locks[i].split(' ');
			grant = true;
			for(var i2=0,l2=lock.length;i2<l2;i2++){ // AND...
				if(keys.indexOf(lock[i2]) === -1){
					grant = false;
				}
			}
			if(grant){
				return true;
			}
		}
		return false;
	};




/* ------------------------------ *

var jailer = new Jailer({
	remove: ['admin'],
	// Action:'remove', only: ['admin'].
	edit: ['editor owner','admin','publisher'],
	// Action:'edit', only: ['admin'] or ['publisher'] or ['editor' and 'owner']
	view: ['editor','admin','publisher','guest privileged']
	// Action:'view', only ['editor'] or ['admin'] or ['publisher'] or ['guest' and 'privileged']
});

console.log(jailer.check('remove',['guest'])); // nop
console.log(jailer.check('remove',['owner'])); // nop
console.log(jailer.check('remove',['admin'])); // yes!

console.log(jailer.check('edit',['editor','guest'])); // nop
console.log(jailer.check('edit',['publisher','manager'])); // yes!
console.log(jailer.check('edit',['editor','owner'])); // yes!

console.log(jailer.check('view',['guest'])); // nop
console.log(jailer.check('view',['anonymous'])); // nop
console.log(jailer.check('view',['editor','owner'])); // yes!
console.log(jailer.check('view',['guest','privileged','VIP'])); // yes!


/* ------------------------------ */