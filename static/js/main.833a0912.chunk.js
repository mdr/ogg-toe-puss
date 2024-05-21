(this["webpackJsonpogg-opus-viz"]=this["webpackJsonpogg-opus-viz"]||[]).push([[0],{12:function(e,t,n){},30:function(e,t,n){},31:function(e,t,n){"use strict";n.r(t);var r,i=n(1),a=n.n(i),c=n(17),o=n.n(c),s=n(13),u=n(4),l=n(11),h=n.n(l),d=n(15),g=n(5),b=n(9),f=n(2),p=n.n(f),j=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return Array.from(new Uint8Array(e)).map(m).join(t?" ":"")},m=function(e){return("0"+e.toString(16)).slice(-2)},w=function(){function e(t){var n=this;Object(g.a)(this,e),this.dataWindow=t,this.getSegmentSize=function(e){return n.dataWindow.getByte(27+e)},this.getSegment=function(e){return n.segments[e]}}return Object(b.a)(e,[{key:"capturePattern",get:function(){return(new TextDecoder).decode(this.dataWindow.getArrayBufferSlice(0,4))}},{key:"version",get:function(){return this.dataWindow.getByte(4)}},{key:"headerType",get:function(){return this.dataWindow.getByte(5)}},{key:"containsContinuedPacket",get:function(){return!!(1&this.headerType)}},{key:"isFirstPage",get:function(){return!!(2&this.headerType)}},{key:"isLastPage",get:function(){return!!(4&this.headerType)}},{key:"granulePosition",get:function(){return this.dataWindow.getBigInt64(6)}},{key:"bitstreamSerialNumber",get:function(){return j(this.dataWindow.getArrayBufferSlice(14,4))}},{key:"pageSequenceNumber",get:function(){return this.dataWindow.getInt32(18)}},{key:"crcChecksum",get:function(){return j(this.dataWindow.getArrayBufferSlice(22,4))}},{key:"numberOfPageSegments",get:function(){return this.dataWindow.getByte(26)}},{key:"segmentSizes",get:function(){return p.a.range(this.numberOfPageSegments).map(this.getSegmentSize)}},{key:"segments",get:function(){for(var e=this.headerSize,t=[],n=0;n<this.numberOfPageSegments;n++){var r=this.getSegmentSize(n),i=this.dataWindow.getArrayBufferSlice(e,r);t.push(i),e+=r}return t}},{key:"headerSize",get:function(){return 27+this.numberOfPageSegments}},{key:"pageSize",get:function(){return this.headerSize+p.a.sum(this.segmentSizes)}}]),e}(),O=function e(t){var n=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;Object(g.a)(this,e),this.bytes=void 0,this.dataView=void 0,this.offset=void 0,this.getByte=function(e){return n.bytes[e+n.offset]},this.getBigInt64=function(e){return n.dataView.getBigInt64(e+n.offset,!0)},this.getInt16=function(e){return n.dataView.getInt16(e+n.offset,!0)},this.getInt32=function(e){return n.dataView.getInt32(e+n.offset,!0)},this.getUint32=function(e){return n.dataView.getUint32(e+n.offset,!0)},this.getUint16=function(e){return n.dataView.getUint16(e+n.offset,!0)},this.getUint8=function(e){return n.dataView.getUint8(e+n.offset)},this.getArrayBufferSlice=function(e,t){return n.bytes.slice(n.offset+e,n.offset+e+t).buffer},this.slide=function(t){return new e(n.bytes.buffer,n.offset+t)},this.bytes=new Uint8Array(t),this.dataView=new DataView(t),this.offset=r},y=[79,112,117,115,72,101,97,100],S=[128,116,104,101,111,114,97],x=[1,118,111,114,98,105,115],v=[102,105,115,104,101,97,100,0],k=function(e,t){return p.a.isEqual(function(e,t){return Array.from(new Uint8Array(e.slice(0,Math.min(t,e.byteLength))))}(e,t.length),t)},P=function(e){if(0!==e.packets.length){var t=e.packets[0];return k(t,y)?"opus":k(t,S)?"theora":k(t,x)?"vorbis":k(t,v)?"ogg-skeleton":void 0}},N=n(6),L=function(e){var t,n=new Uint8Array(p.a.sumBy(e,(function(e){return e.byteLength}))),r=0,i=Object(N.a)(e);try{for(i.s();!(t=i.n()).done;){var a=t.value;n.set(new Uint8Array(a),r),r+=a.byteLength}}catch(c){i.e(c)}finally{i.f()}return n.buffer},B=n(19),H=(n(12),n(7)),_=n(16),C=n.n(_);!function(e){e.SINGLE="SINGLE",e.MULTIPLE="MULTIPLE"}(r||(r={}));var W,A=function(e){return{type:r.SINGLE,label:e}},F=function(e){return{type:r.MULTIPLE,labels:e}},T=n(0),I=function(e){var t=e.dataWindow,n=e.showHex,r=e.rows;return Object(T.jsx)("table",{className:"byte-table",children:Object(T.jsx)("tbody",{children:r.map((function(e,r){var i=4*r,a=i+p.a.sumBy(e.cells,(function(e){return e.width}))-1,c=p.a.range(i,a+1).map((function(e){return m(t.getByte(e))}));return Object(T.jsx)(G,{showHex:n,rowSpec:e,startByte:i,endByte:a,hex:c},"byte-table-row-".concat(r))}))})})},G=function(e){var t=e.startByte,n=e.endByte,i=e.showHex,a=e.rowSpec,c=e.hex,o=a.cells,s=function(e,t){return c[p.a.sumBy(p.a.take(o,e),(function(e){return e.width}))+t]};return Object(T.jsxs)(T.Fragment,{children:[Object(T.jsxs)("tr",{children:[Object(T.jsxs)("th",{className:"byte-table__byte-header-cell",rowSpan:i?3:2,children:[t,"-",n]}),o.map((function(e,t){var n;return Object(T.jsx)("td",{className:"byte-table__header-cell byte-table__cell-style-".concat(e.colour," byte-table__border-right"),colSpan:e.width,children:null!==(n=e.header)&&void 0!==n?n:Object(T.jsx)(T.Fragment,{children:"\xa0"})},"byte-table-header-row-".concat(t))}))]}),i&&Object(T.jsx)("tr",{children:o.map((function(e,t){return p.a.range(e.width).map((function(n){return Object(T.jsx)("td",{className:C()("byte-table__hex-cell","byte-table__cell-style-".concat(e.colour),{"byte-table__border-right":n===e.width-1}),children:s(t,n)},"byte-table-hex-row-".concat(t,"-").concat(n))}))}))}),Object(T.jsx)("tr",{className:"byte-table-row3",children:o.map((function(e,t){var n,i,a;return(null===(n=e.interpretation)||void 0===n?void 0:n.type)===r.MULTIPLE?e.interpretation.labels.map((function(n,r){return Object(T.jsx)("td",{className:C()("byte-table__interpretation-cell","byte-table__cell-style-".concat(e.colour),{"byte-table__border-right":r===e.width-1}),children:n},"byte-table-interpretation-".concat(t,"-").concat(r))})):Object(T.jsx)("td",{className:"byte-table__interpretation-cell byte-table__cell-style-".concat(e.colour," byte-table__border-right"),colSpan:e.width,children:null!==(i=null===(a=e.interpretation)||void 0===a?void 0:a.label)&&void 0!==i?i:Object(T.jsx)(T.Fragment,{children:"\xa0"})},"byte-table-interpretation-".concat(t))}))})]})},E=function(e){var t=[];return e.containsContinuedPacket&&t.push("Contains continued packet"),e.isFirstPage&&t.push("First page"),e.isLastPage&&t.push("Last page"),t.join(", ")},U=function(e){var t=e.page,n=e.showHex,r=[{cells:[{width:4,colour:1,header:"Capture Pattern",interpretation:F(p.a.range(4).map((function(e){return t.capturePattern[e]})))}]},{cells:[{width:1,colour:2,header:"Version",interpretation:A(t.version.toString())},{width:1,colour:3,header:"Header Type",interpretation:A(E(t))},{width:2,colour:4}]},{cells:[{width:4,colour:4,header:"Granule Position",interpretation:A(t.granulePosition.toString())}]},{cells:[{width:2,colour:4},{width:2,colour:5,header:"Bitstream Serial Number",interpretation:A(t.bitstreamSerialNumber)}]},{cells:[{width:2,colour:5},{width:2,colour:6,header:"Page Sequence Number",interpretation:A(t.pageSequenceNumber.toString())}]},{cells:[{width:2,colour:6},{width:2,colour:7,header:"CRC Checksum",interpretation:A(t.crcChecksum)}]},{cells:[{width:2,colour:7},{width:1,colour:8,header:"Page Segments",interpretation:A(t.numberOfPageSegments.toString())}].concat(Object(H.a)(0===t.numberOfPageSegments?[]:[{width:1,colour:9,header:"Segment 1 Size",interpretation:A(t.getSegmentSize(0).toString())}]))}].concat(Object(H.a)(z(t)));return Object(T.jsx)(I,{dataWindow:t.dataWindow,showHex:n,rows:r})},z=function(e){return p.a.chunk(p.a.range(1,e.numberOfPageSegments),4).map((function(t){return{cells:t.map((function(t){return{width:1,colour:9,header:"Segment ".concat(t+1," size"),interpretation:A(e.getSegmentSize(t).toString())}}))}}))},M=a.a.createContext({showHex:!1,setShowHex:function(){}}),R=function(){return Object(i.useContext)(M)},V=function(e){var t=e.children,n=Object(i.useState)(!1),r=Object(u.a)(n,2),a=r[0],c=r[1];return Object(T.jsx)(M.Provider,{value:{showHex:a,setShowHex:c},children:t})},D=function(e){return!(e.byteLength<8)&&"OpusTags"===(new TextDecoder).decode(e.slice(0,8))},q=function(){function e(t){Object(g.a)(this,e),this.dataWindow=t}return Object(b.a)(e,[{key:"magicSignature",get:function(){return(new TextDecoder).decode(this.dataWindow.getArrayBufferSlice(0,8))}},{key:"vendorStringLength",get:function(){return this.dataWindow.getUint32(8)}},{key:"vendorString",get:function(){return(new TextDecoder).decode(this.dataWindow.getArrayBufferSlice(12,this.vendorStringLength))}},{key:"userCommentListLength",get:function(){return this.dataWindow.getUint32(12+this.vendorStringLength)}}]),e}(),J=function(e){return!(e.byteLength<8)&&"OpusHead"===(new TextDecoder).decode(e.slice(0,8))},K=function(){function e(t){Object(g.a)(this,e),this.dataWindow=t}return Object(b.a)(e,[{key:"magicSignature",get:function(){return(new TextDecoder).decode(this.dataWindow.getArrayBufferSlice(0,8))}},{key:"version",get:function(){return this.dataWindow.getUint8(8)}},{key:"channelCount",get:function(){return this.dataWindow.getUint8(9)}},{key:"preSkip",get:function(){return this.dataWindow.getUint16(10)}},{key:"inputSampleRate",get:function(){return this.dataWindow.getUint32(12)}},{key:"outputGain",get:function(){return this.dataWindow.getInt16(16)}},{key:"channelMappingFamily",get:function(){return this.dataWindow.getUint8(18)}}]),e}(),Q=function(e){var t=e.header,n=e.showHex,r=[{cells:[{width:4,colour:1,header:"Magic Signature",interpretation:F(p.a.range(4).map((function(e){return t.magicSignature[e]})))}]},{cells:[{width:4,colour:1,interpretation:F(p.a.range(4,8).map((function(e){return t.magicSignature[e]})))}]}].concat(Object(H.a)(function(e,t){var n,r=[],i=[],a=function(){return p.a.sumBy(i,(function(e){return e.width}))},c=Object(N.a)(e);try{var o=function(){var e=n.value,c=t-a();if(e.width<=c)i.push(e),a()===t&&(r.push({cells:[].concat(i)}),i.length=0);else{var o={colour:e.colour,width:c,header:e.header,interpretation:e.interpretation};i.push(o),r.push({cells:[].concat(i)}),i.length=0;var s=e.width-o.width,u=Math.floor(s/t),l=p.a.range(u).map((function(n){return{cells:[{colour:e.colour,width:t}]}}));r.push.apply(r,Object(H.a)(l));var h=s%t;if(h>0){var d={colour:e.colour,width:h};i.push(d)}}};for(c.s();!(n=c.n()).done;)o()}catch(s){c.e(s)}finally{c.f()}return i.length>0&&(r.push({cells:[].concat(i)}),i.length=0),r}([{width:4,colour:2,header:"Vendor String Length",interpretation:A(t.vendorStringLength.toString())},{width:t.vendorString.length,colour:3,header:"Vendor String",interpretation:A(t.vendorString)},{width:4,colour:4,header:"User Comment List Length",interpretation:A(t.userCommentListLength.toString())}],4)));return Object(T.jsx)(I,{dataWindow:t.dataWindow,showHex:n,rows:r})},X=function(e){var t=e.header,n=e.showHex,r=[{cells:[{width:4,colour:1,header:"Magic Signature",interpretation:F(p.a.range(4).map((function(e){return t.magicSignature[e]})))}]},{cells:[{width:4,colour:1,interpretation:F(p.a.range(4,8).map((function(e){return t.magicSignature[e]})))}]},{cells:[{width:1,colour:2,header:"Version",interpretation:A(t.version.toString())},{width:1,colour:3,header:"Channel Count",interpretation:A(t.channelCount.toString())},{width:2,colour:4,header:"Pre-skip",interpretation:A(t.preSkip.toString())}]},{cells:[{width:4,colour:5,header:"Input Sample Rate",interpretation:A(t.inputSampleRate.toString())}]},{cells:[{width:2,colour:6,header:"Output Gain",interpretation:A(t.outputGain.toString())},{width:1,colour:7,header:"Mapping Family",interpretation:A(t.channelMappingFamily.toString())}]}];return Object(T.jsx)(I,{dataWindow:t.dataWindow,showHex:n,rows:r})},Y=function(e){return!J(e)&&!D(e)},Z=function(e){var t=e.packets,n=e.showHex;return Object(T.jsx)(T.Fragment,{children:t.map((function(e,t){return Object(T.jsxs)(a.a.Fragment,{children:[Y(e)&&Object(T.jsxs)(T.Fragment,{children:[Object(T.jsxs)("h3",{children:["Packet ",t+1," (",e.byteLength," bytes)"]}),n&&Object(T.jsx)("div",{className:"raw-hex",children:j(e,!0)},"packet-hex-".concat(t))]}),J(e)&&Object(T.jsxs)(T.Fragment,{children:[Object(T.jsxs)("h3",{children:["Packet ",t+1," (",e.byteLength," bytes) - Ogg Opus Identification Header"]}),Object(T.jsx)("p",{children:Object(T.jsx)("a",{className:"rfc-link",href:"https://datatracker.ietf.org/doc/html/rfc7845#section-5.1",children:"RFC 7845 - 5.1. Identification Header"})}),Object(T.jsx)(X,{header:new K(new O(e)),showHex:n}),Object(T.jsx)("p",{})]}),D(e)&&Object(T.jsxs)(T.Fragment,{children:[Object(T.jsxs)("h3",{children:["Packet ",t+1," (",e.byteLength," bytes) - Ogg Opus Comment Header"]}),Object(T.jsx)("p",{children:Object(T.jsx)("a",{className:"rfc-link",href:"https://datatracker.ietf.org/doc/html/rfc7845#section-5.2",children:"RFC 7845 - 5.2. Comment Header"})}),Object(T.jsx)(Q,{header:new q(new O(e)),showHex:n}),Object(T.jsx)("p",{})]})]},"packet-".concat(t))}))})},$=function(e){var t,n,r=e.oggPages,a=R().showHex,c=Object(i.useState)(0),o=Object(u.a)(c,2),s=o[0],l=o[1];Object(i.useEffect)((function(){return l(0)}),[r]);var h=s<r.length?r[s]:void 0,d=void 0===h?[]:function(e){var t,n=[],r=[],i=!0,a=Object(N.a)(e.segments);try{for(a.s();!(t=a.n()).done;){var c=t.value;if(r.push(c),c.byteLength<255){var o=L(r);e.containsContinuedPacket&&i||n.push(o),r.length=0,i=!1}}}catch(s){a.e(s)}finally{a.f()}return n}(h);return Object(T.jsxs)("div",{className:"ogg-pages-tab",children:[Object(T.jsxs)("h1",{children:["Ogg Page ",s+1," / ",r.length," (",null!==(t=null===h||void 0===h?void 0:h.pageSize)&&void 0!==t?t:0," bytes)"]}),Object(T.jsx)("button",{onClick:function(){return l(s-1)},disabled:0===s,children:"Previous"}),Object(T.jsx)("button",{onClick:function(){return l(s+1)},disabled:s>=(null!==(n=null===r||void 0===r?void 0:r.length)&&void 0!==n?n:0)-1,children:"Next"}),Object(T.jsx)("h2",{children:"Ogg Page Header"}),h&&Object(T.jsxs)(T.Fragment,{children:[Object(T.jsx)("p",{children:Object(T.jsx)("a",{className:"rfc-link",href:"https://datatracker.ietf.org/doc/html/rfc3533#section-6",children:"RFC 3533 - 6. The Ogg page format"})}),Object(T.jsx)(U,{page:h,showHex:a}),Object(T.jsx)("h2",{children:"Ogg Packets"}),Object(T.jsx)(Z,{packets:d,showHex:a}),Object(T.jsx)("h2",{children:"Segments"}),p.a.range(0,h.numberOfPageSegments).map((function(e){return Object(T.jsx)(ee,{number:e+1,size:h.getSegmentSize(e),hex:a?j(h.getSegment(e),!0):void 0},"segment-".concat(e))}))]})]})},ee=function(e){var t=e.number,n=e.size,r=e.hex;return Object(T.jsxs)(T.Fragment,{children:[Object(T.jsxs)("h3",{children:["Segment ",t," (",n," bytes)"]}),r&&Object(T.jsx)("div",{className:"raw-hex",children:r})]})},te=function(e){var t=e.streams,n=R().showHex,r=Object(i.useState)(t[0].serialNumber),a=Object(u.a)(r,2),c=a[0],o=a[1];Object(i.useEffect)((function(){return o(t[0].serialNumber)}),[t]);var s=t.find((function(e){return e.serialNumber===c}));return void 0===s?Object(T.jsx)(T.Fragment,{}):Object(T.jsxs)("div",{children:[Object(T.jsx)("h1",{children:"Logical Bitstreams"}),t.map((function(e){return Object(T.jsxs)("div",{children:[Object(T.jsx)("input",{type:"radio",id:e.serialNumber,name:e.serialNumber,value:e.serialNumber,checked:e.serialNumber===c,onChange:function(){return o(e.serialNumber)}}),Object(T.jsxs)("label",{htmlFor:e.serialNumber,children:[Object(T.jsx)("span",{className:"bitstream-serial-number-radio-label",children:e.serialNumber})," -"," ",P(e)," - ",e.packets.length," packets -"," ",p.a.sumBy(e.packets,(function(e){return e.byteLength}))," bytes"]})]},e.serialNumber)})),Object(T.jsx)("h2",{children:"Ogg Packets"}),Object(T.jsx)(Z,{packets:s.packets,showHex:n})]})},ne="".concat("","/example_0.opus");!function(e){e.OGG_PAGES="OGG_PAGES",e.BITSTREAMS="BITSTREAMS"}(W||(W={}));var re=function(){var e=Object(d.a)(h.a.mark((function e(t){var n,r;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t);case 2:return n=e.sent,e.next=5,n.blob();case 5:return r=e.sent,e.next=8,r.arrayBuffer();case 8:return e.abrupt("return",e.sent);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ie=function(){return Object(T.jsx)(V,{children:Object(T.jsx)(ae,{})})},ae=function(){var e=Object(i.useState)(),t=Object(u.a)(e,2),n=t[0],r=t[1],a=Object(i.useState)([]),c=Object(u.a)(a,2),o=c[0],s=c[1],l=Object(i.useState)(W.OGG_PAGES),g=Object(u.a)(l,2),b=g[0],f=g[1],p=R(),j=p.showHex,m=p.setShowHex,y=function(e){var t=function(e){for(var t=new O(e),n=new w(t),r=[n];!n.isLastPage;)t=t.slide(n.pageSize),n=new w(t),r.push(n);return r}(e),n=function(e){var t,n=new Map,r=[],i=Object(N.a)(e);try{for(i.s();!(t=i.n()).done;){var a=t.value;a.isFirstPage&&n.set(a.bitstreamSerialNumber,{packets:[],segmentsSoFar:[]});var c=n.get(a.bitstreamSerialNumber);if(void 0===c)throw Error("Unexpected page for bitstream with serial number ".concat(a.bitstreamSerialNumber));var o,s=Object(N.a)(a.segments);try{for(s.s();!(o=s.n()).done;){var l=o.value;if(c.segmentsSoFar.push(l),l.byteLength<255){var h=L(c.segmentsSoFar);c.packets.push(h),c.segmentsSoFar.length=0}}}catch(j){s.e(j)}finally{s.f()}a.isLastPage&&(r.push({serialNumber:a.bitstreamSerialNumber,packets:c.packets}),n.delete(a.bitstreamSerialNumber))}}catch(j){i.e(j)}finally{i.f()}var d,g=Object(N.a)(n);try{for(g.s();!(d=g.n()).done;){var b=Object(u.a)(d.value,2),f=b[0],p=b[1];r.push({serialNumber:f,packets:p.packets})}}catch(j){g.e(j)}finally{g.f()}return r}(t);r(t),s(n)};return Object(i.useEffect)((function(){re(ne).then(y)}),[]),Object(T.jsxs)("div",{className:"app",children:[Object(T.jsx)("button",{onClick:function(){return f(W.OGG_PAGES)},disabled:b===W.OGG_PAGES,children:"Ogg Pages"}),Object(T.jsx)("button",{onClick:function(){return f(W.BITSTREAMS)},disabled:b===W.BITSTREAMS,children:"Logical Bitstreams"}),Object(T.jsxs)("div",{className:"show-hex-checkbox",children:[Object(T.jsx)("label",{htmlFor:"showHex",children:"Show Hex"}),Object(T.jsx)("input",{id:"showHex",onChange:function(){return m(!j)},checked:j,type:"checkbox"})]}),Object(T.jsx)(ce,{onDrop:function(){var e=Object(d.a)(h.a.mark((function e(t){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=y,e.next=3,t.arrayBuffer();case 3:return e.t1=e.sent,e.abrupt("return",(0,e.t0)(e.t1));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}),b===W.OGG_PAGES&&Object(T.jsx)($,{oggPages:null!==n&&void 0!==n?n:[]}),b===W.BITSTREAMS&&Object(T.jsx)(te,{streams:o})]})},ce=function(e){var t=e.onDrop,n=Object(i.useCallback)((function(e){return t(e[0])}),[t]),r=Object(B.a)({onDropAccepted:n,accept:["audio/ogg","video/ogg","application/ogg","audio/opus"]}),a=r.getRootProps,c=r.getInputProps;return Object(T.jsxs)("div",Object(s.a)(Object(s.a)({className:"dropzone"},a()),{},{children:[Object(T.jsx)("input",Object(s.a)({},c())),"Click here or drop an Ogg file to upload"]}))};n(30);o.a.render(Object(T.jsx)(a.a.StrictMode,{children:Object(T.jsx)(ie,{})}),document.getElementById("root"))}},[[31,1,2]]]);
//# sourceMappingURL=main.833a0912.chunk.js.map