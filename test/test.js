//http://unitjs.com/guide/quickstart.html
var test = require('unit.js');
var Jailer = require("../index.js");


describe("Clase Jailer ",function(){ 
  describe("Creation",function(){ 
    it("Creation with normal params",function(){     

      var jailer = new Jailer({
        remove: ['admin'],
        // Action:'remove', only: ['admin'].
        edit: ['editor owner','admin','publisher'],
        // Action:'edit', only: ['admin'] or ['publisher'] or ['editor' and 'owner']
        view: ['editor','admin','publisher','guest privileged']
        // Action:'view', only ['editor'] or ['admin'] or ['publisher'] or ['guest' and 'privileged']
      });     

      test
        .value(jailer)
          .isType('object')
        .value(jailer.remove)
          .is(['admin'])
        .value(jailer.edit)
          .is(['editor owner','admin','publisher'])
        .value(jailer.view)
          .is(['editor','admin','publisher','guest privileged'])
        
     })

   it("Creation with no normal params",function(){     

      var jailer = new Jailer({
        remove: ['/////'],
        edit: ['+++**/&%','kd34=00as','¿?$·6"(ªº'],
        view: ['¡¡¡09=)"/·%·/$','203485029834()/&)(·/&$%509823409582309485','234987529834','¡¡¡09=)"/·%·/$ privileged']
      });

      test
        .value(jailer)
          .isType('object')
        .value(jailer.remove)
          .is( ['/////'])
        .value(jailer.edit)
          .is(['+++**/&%','kd34=00as','¿?$·6"(ªº'])
        .value(jailer.view)
          .is(['¡¡¡09=)"/·%·/$','203485029834()/&)(·/&$%509823409582309485','234987529834','¡¡¡09=)"/·%·/$ privileged'])
    })
  })


  describe("Checking",function(){ 
     it("Checking with normal values",function(){ 
      var jailer = new Jailer({
          remove: ['admin'],
          edit: ['editor owner','admin','publisher'],
          view: ['editor','admin','publisher','guest privileged']
        });

      test
        .value(jailer.check('remove',['admin']))
          .is(true)
        .value(jailer.check('remove',['owner']))
          .is(false)
        .value(jailer.check('remove',['']))
          .is(false)
        .value(jailer.check('remove',['guest']))
          .is(false)
        .value(jailer.check('other',[''])) 
          .is(true)
        .value(jailer.check('other',['other'])) 
          .is(true)
        .value(jailer.check('',[''])) 
          .is(true)
    })

    it("Checking with normal params",function(){ 
      var jailer = new Jailer({
          remove: ['admin'],
          edit: ['editor owner','admin','publisher'],
          view: ['editor','admin','publisher','guest privileged']
        });

      test
        .value(jailer.check('edit',['admin']))
          .is(true)
        .value(jailer.check('edit',['ADMIN']))
          .is(false)
        .value(jailer.check('edit',['admIn']))
          .is(false)

        .value(jailer.check('view',['guest', 'privileged']))
          .is(true)
        .value(jailer.check('edit',['editor','admin']))
          .is(true)

        .value(jailer.check('view',['guest','other']))
          .is(false)
        .value(jailer.check('edit',['meInventoElPermiso']))
          .is(false)
        .value(jailer.check('edit',['editor']))
          .is(false)    
    })
  })
});