/**
 * Echo Component - the XMPP Hello World
 **/
var xmpp = require('../node_modules/node-xmpp');
var argv = process.argv;

var cl = new xmpp.Component(
  { 
    jid:  "exp.otokar.looc2011.eu",
    password: "password",
    host: "localhost",
    port: "5347"
  });

  cl.on('online', function() {
    console.log("online");
});

cl.on('stanza', function(stanza) {
  console.log("; received stanza from " + stanza.from);

  // parse iq gets for me
  if (stanza.is('iq') && stanza.attrs.type == 'get' && stanza.attrs.to == cl.jid) {

    // query : info
    var query = stanza.getChild('query', 'http://jabber.org/protocol/disco#info');
    if (typeof query !== 'undefined' && query.attrs) {
      console.log(";    stanza is iq get disco#info");
      var result = new xmpp.Element('iq', {
        type: 'result', 
        from: cl.jid, 
        to: stanza.from, 
        id:stanza.id
      }).
        c('query').attr('xmlns', 'http://jabber.org/protocol/disco#info').
        c('feature').attr('var', 'http://jabber.org/protocol/address').up();

        cl.send(result);
    }

  }
});

cl.on('error', function(e) {
  console.error(e);
});
