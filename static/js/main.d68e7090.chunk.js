(this["webpackJsonpogg-toe-puss"]=this["webpackJsonpogg-toe-puss"]||[]).push([[0],{12:function(e,t,n){},30:function(e,t,n){},31:function(e,t,n){"use strict";n.r(t);var r,a=n(1),i=n.n(a),c=n(17),o=n.n(c),s=(n(12),n(4)),u=n(0),l=i.a.createContext({showHex:!1,setShowHex:function(){}}),d=function(){return Object(a.useContext)(l)},h=function(e){var t=e.children,n=Object(a.useState)(!1),r=Object(s.a)(n,2),i={showHex:r[0],setShowHex:r[1]};return Object(u.jsx)(l.Provider,{value:i,children:t})},b=n(10),g=n.n(b),f=n(13),j=n(7),m=n(2),p=n.n(m),O=function(e){var t,n=p.a.sumBy(e,(function(e){return e.byteLength})),r=new Uint8Array(n),a=0,i=Object(j.a)(e);try{for(i.s();!(t=i.n()).done;){var c=t.value;r.set(new Uint8Array(c),a),a+=c.byteLength}}catch(o){i.e(o)}finally{i.f()}return r.buffer},S=n(5),w=n(6),y=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return Array.from(new Uint8Array(e)).map(x).join(t?" ":"")},x=function(e){return("0"+e.toString(16)).slice(-2)},v=function(){function e(t){var n=this;Object(S.a)(this,e),this.dataWindow=t,this.getSegmentSize=function(e){return n.dataWindow.getByte(27+e)},this.getSegment=function(e){return n.segments[e]}}return Object(w.a)(e,[{key:"capturePattern",get:function(){return(new TextDecoder).decode(this.dataWindow.getArrayBufferSlice(0,4))}},{key:"version",get:function(){return this.dataWindow.getByte(4)}},{key:"headerType",get:function(){return this.dataWindow.getByte(5)}},{key:"containsContinuedPacket",get:function(){return!!(1&this.headerType)}},{key:"isFirstPage",get:function(){return!!(2&this.headerType)}},{key:"isLastPage",get:function(){return!!(4&this.headerType)}},{key:"granulePosition",get:function(){return this.dataWindow.getBigInt64(6)}},{key:"bitstreamSerialNumber",get:function(){return y(this.dataWindow.getArrayBufferSlice(14,4))}},{key:"pageSequenceNumber",get:function(){return this.dataWindow.getInt32(18)}},{key:"crcChecksum",get:function(){return y(this.dataWindow.getArrayBufferSlice(22,4))}},{key:"numberOfPageSegments",get:function(){return this.dataWindow.getByte(26)}},{key:"segmentSizes",get:function(){return p.a.range(this.numberOfPageSegments).map(this.getSegmentSize)}},{key:"segments",get:function(){for(var e=this.headerSize,t=[],n=0;n<this.numberOfPageSegments;n++){var r=this.getSegmentSize(n),a=this.dataWindow.getArrayBufferSlice(e,r);t.push(a),e+=r}return t}},{key:"headerSize",get:function(){return 27+this.numberOfPageSegments}},{key:"pageSize",get:function(){return this.headerSize+p.a.sum(this.segmentSizes)}}]),e}(),k=function e(t){var n=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;Object(S.a)(this,e),this.bytes=void 0,this.dataView=void 0,this.offset=void 0,this.getByte=function(e){return n.bytes[e+n.offset]},this.getBigInt64=function(e){return n.dataView.getBigInt64(e+n.offset,!0)},this.getInt16=function(e){return n.dataView.getInt16(e+n.offset,!0)},this.getInt32=function(e){return n.dataView.getInt32(e+n.offset,!0)},this.getUint32=function(e){return n.dataView.getUint32(e+n.offset,!0)},this.getUint16=function(e){return n.dataView.getUint16(e+n.offset,!0)},this.getUint8=function(e){return n.dataView.getUint8(e+n.offset)},this.getArrayBufferSlice=function(e,t){return n.bytes.slice(n.offset+e,n.offset+e+t).buffer},this.getArrayBuffer=function(){return n.bytes.buffer},this.slide=function(t){return new e(n.bytes.buffer,n.offset+t)},this.bytes=new Uint8Array(t),this.dataView=new DataView(t),this.offset=r},B=[79,112,117,115,72,101,97,100],N=[128,116,104,101,111,114,97],P=[1,118,111,114,98,105,115],C=[102,105,115,104,101,97,100,0],F=function(e,t){return p.a.isEqual(function(e,t){return Array.from(new Uint8Array(e.slice(0,Math.min(t,e.byteLength))))}(e,t.length),t)},_=function(e){if(0!==e.packets.length){var t=e.packets[0];return F(t,B)?"opus":F(t,N)?"theora":F(t,P)?"vorbis":F(t,C)?"ogg-skeleton":void 0}},A=n(14),L=n(19),E=function(e){var t=e.onDrop,n=Object(a.useCallback)((function(e){return t(e[0])}),[t]),r=Object(L.a)({onDropAccepted:n,accept:["audio/ogg","video/ogg","application/ogg","audio/opus"]}),i=r.getRootProps,c=r.getInputProps;return Object(u.jsxs)("div",Object(A.a)(Object(A.a)({className:"dropzone"},i()),{},{children:[Object(u.jsx)("input",Object(A.a)({},c())),"Click here or drop an Ogg file to upload"]}))},I=n(8),T=n(16),W=n.n(T);!function(e){e.SINGLE="SINGLE",e.MULTIPLE="MULTIPLE"}(r||(r={}));var R,M,G,U,H=function(e){return{type:r.SINGLE,label:e}},D=function(e){return{type:r.MULTIPLE,labels:e}},z=function(e){var t=e.dataWindow,n=e.rows;return Object(u.jsx)("table",{className:"byte-table",children:Object(u.jsx)("tbody",{children:n.map((function(e,n){var r=4*n,a=r+p.a.sumBy(e.cells,(function(e){return e.width}))-1,i=p.a.range(r,a+1).map((function(e){return x(t.getByte(e))}));return Object(u.jsx)(V,{rowSpec:e,startByte:r,endByte:a,hex:i},"byte-table-row-".concat(n))}))})})},V=function(e){var t=e.startByte,n=e.endByte,a=e.rowSpec,i=e.hex,c=d().showHex,o=a.cells,s=function(e,t){return i[p.a.sumBy(p.a.take(o,e),(function(e){return e.width}))+t]};return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsxs)("tr",{children:[Object(u.jsxs)("th",{className:"byte-table__byte-header-cell",rowSpan:c?3:2,children:[t,"-",n]}),o.map((function(e,t){var n;return Object(u.jsx)("td",{className:"byte-table__header-cell byte-table__cell-style-".concat(e.colour," byte-table__border-right"),colSpan:e.width,children:null!==(n=e.header)&&void 0!==n?n:Object(u.jsx)(u.Fragment,{children:"\xa0"})},"byte-table-header-row-".concat(t))}))]}),c&&Object(u.jsx)("tr",{children:o.map((function(e,t){return p.a.range(e.width).map((function(n){return Object(u.jsx)("td",{className:W()("byte-table__hex-cell","byte-table__cell-style-".concat(e.colour),{"byte-table__border-right":n===e.width-1}),children:s(t,n)},"byte-table-hex-row-".concat(t,"-").concat(n))}))}))}),Object(u.jsx)("tr",{className:"byte-table-row3",children:o.map((function(e,t){var n,a,i;return(null===(n=e.interpretation)||void 0===n?void 0:n.type)===r.MULTIPLE?e.interpretation.labels.map((function(n,r){return Object(u.jsx)("td",{className:W()("byte-table__interpretation-cell","byte-table__cell-style-".concat(e.colour),{"byte-table__border-right":r===e.width-1}),children:n},"byte-table-interpretation-".concat(t,"-").concat(r))})):Object(u.jsx)("td",{className:"byte-table__interpretation-cell byte-table__cell-style-".concat(e.colour," byte-table__border-right"),colSpan:e.width,children:null!==(a=null===(i=e.interpretation)||void 0===i?void 0:i.label)&&void 0!==a?a:Object(u.jsx)(u.Fragment,{children:"\xa0"})},"byte-table-interpretation-".concat(t))}))})]})},Y=function(e){var t=[];return e.containsContinuedPacket&&t.push("Contains continued packet"),e.isFirstPage&&t.push("First page"),e.isLastPage&&t.push("Last page"),t.join(", ")},q=function(e){var t=e.page,n=[{cells:[{width:4,colour:1,header:"Capture Pattern",interpretation:D(p.a.range(4).map((function(e){return t.capturePattern[e]})))}]},{cells:[{width:1,colour:2,header:"Version",interpretation:H(t.version.toString())},{width:1,colour:3,header:"Header Type",interpretation:H(Y(t))},{width:2,colour:4}]},{cells:[{width:4,colour:4,header:"Granule Position",interpretation:H(t.granulePosition.toString())}]},{cells:[{width:2,colour:4},{width:2,colour:5,header:"Bitstream Serial Number",interpretation:H(t.bitstreamSerialNumber)}]},{cells:[{width:2,colour:5},{width:2,colour:6,header:"Page Sequence Number",interpretation:H(t.pageSequenceNumber.toString())}]},{cells:[{width:2,colour:6},{width:2,colour:7,header:"CRC Checksum",interpretation:H(t.crcChecksum)}]},{cells:[{width:2,colour:7},{width:1,colour:8,header:"Page Segments",interpretation:H(t.numberOfPageSegments.toString())}].concat(Object(I.a)(0===t.numberOfPageSegments?[]:[{width:1,colour:9,header:"Segment 1 Size",interpretation:H(t.getSegmentSize(0).toString())}]))}].concat(Object(I.a)(K(t)));return Object(u.jsx)(z,{dataWindow:t.dataWindow,rows:n})},K=function(e){return p.a.chunk(p.a.range(1,e.numberOfPageSegments),4).map((function(t){return{cells:t.map((function(t){return{width:1,colour:9,header:"Segment ".concat(t+1," size"),interpretation:H(e.getSegmentSize(t).toString())}}))}}))},Z=function(e){return!(e.byteLength<8)&&"OpusTags"===(new TextDecoder).decode(e.slice(0,8))},J=function(){function e(t){Object(S.a)(this,e),this.dataWindow=t}return Object(w.a)(e,[{key:"magicSignature",get:function(){return(new TextDecoder).decode(this.dataWindow.getArrayBufferSlice(0,8))}},{key:"vendorStringLength",get:function(){return this.dataWindow.getUint32(8)}},{key:"vendorString",get:function(){return(new TextDecoder).decode(this.dataWindow.getArrayBufferSlice(12,this.vendorStringLength))}},{key:"userCommentListLength",get:function(){return this.dataWindow.getUint32(12+this.vendorStringLength)}}]),e}(),Q=function(e){return!(e.byteLength<8)&&"OpusHead"===(new TextDecoder).decode(e.slice(0,8))},X=function(){function e(t){Object(S.a)(this,e),this.dataWindow=t}return Object(w.a)(e,[{key:"magicSignature",get:function(){return(new TextDecoder).decode(this.dataWindow.getArrayBufferSlice(0,8))}},{key:"version",get:function(){return this.dataWindow.getUint8(8)}},{key:"channelCount",get:function(){return this.dataWindow.getUint8(9)}},{key:"preSkip",get:function(){return this.dataWindow.getUint16(10)}},{key:"inputSampleRate",get:function(){return this.dataWindow.getUint32(12)}},{key:"outputGain",get:function(){return this.dataWindow.getInt16(16)}},{key:"channelMappingFamily",get:function(){return this.dataWindow.getUint8(18)}}]),e}(),$=function(e){var t=e.header,n=[{cells:[{width:4,colour:1,header:"Magic Signature",interpretation:D(p.a.range(4).map((function(e){return t.magicSignature[e]})))}]},{cells:[{width:4,colour:1,interpretation:D(p.a.range(4,8).map((function(e){return t.magicSignature[e]})))}]}].concat(Object(I.a)(function(e,t){var n,r=[],a=[],i=function(){return p.a.sumBy(a,(function(e){return e.width}))},c=Object(j.a)(e);try{var o=function(){var e=n.value,c=t-i();if(e.width<=c)a.push(e),i()===t&&(r.push({cells:[].concat(a)}),a.length=0);else{var o={colour:e.colour,width:c,header:e.header,interpretation:e.interpretation};a.push(o),r.push({cells:[].concat(a)}),a.length=0;var s=e.width-o.width,u=Math.floor(s/t),l=p.a.range(u).map((function(n){return{cells:[{colour:e.colour,width:t}]}}));r.push.apply(r,Object(I.a)(l));var d=s%t;if(d>0){var h={colour:e.colour,width:d};a.push(h)}}};for(c.s();!(n=c.n()).done;)o()}catch(s){c.e(s)}finally{c.f()}return a.length>0&&(r.push({cells:[].concat(a)}),a.length=0),r}([{width:4,colour:2,header:"Vendor String Length",interpretation:H(t.vendorStringLength.toString())},{width:t.vendorString.length,colour:3,header:"Vendor String",interpretation:H(t.vendorString)},{width:4,colour:4,header:"User Comment List Length",interpretation:H(t.userCommentListLength.toString())}],4)));return Object(u.jsx)(z,{dataWindow:t.dataWindow,rows:n})},ee=function(e){var t=e.header,n=[{cells:[{width:4,colour:1,header:"Magic Signature",interpretation:D(p.a.range(4).map((function(e){return t.magicSignature[e]})))}]},{cells:[{width:4,colour:1,interpretation:D(p.a.range(4,8).map((function(e){return t.magicSignature[e]})))}]},{cells:[{width:1,colour:2,header:"Version",interpretation:H(t.version.toString())},{width:1,colour:3,header:"Channel Count",interpretation:H(t.channelCount.toString())},{width:2,colour:4,header:"Pre-skip",interpretation:H(t.preSkip.toString())}]},{cells:[{width:4,colour:5,header:"Input Sample Rate",interpretation:H(t.inputSampleRate.toString())}]},{cells:[{width:2,colour:6,header:"Output Gain",interpretation:H(t.outputGain.toString())},{width:1,colour:7,header:"Mapping Family",interpretation:H(t.channelMappingFamily.toString())}]}];return Object(u.jsx)(z,{dataWindow:t.dataWindow,rows:n})},te=function(e){var t=e.opusToc;return Object(u.jsxs)("ul",{children:[Object(u.jsxs)("li",{children:["Mode: ",t.mode]}),Object(u.jsxs)("li",{children:["Bandwidth: ",t.bandwidth]}),Object(u.jsxs)("li",{children:["Frame size: ",t.frameMs,"ms"]}),Object(u.jsx)("li",{children:t.stereo}),Object(u.jsxs)("li",{children:["Frame Count: ",t.frameCount]})]})},ne=function(e){var t=e.opusFrameCountByte;return Object(u.jsxs)("ul",{children:[Object(u.jsx)("li",{children:t.vbr}),Object(u.jsx)("li",{children:t.padding}),Object(u.jsxs)("li",{children:["Frame Count: ",t.frameCount]})]})};!function(e){e.SILK="SILK-only",e.HYBRID="Hybrid",e.CELT="CELT-only"}(R||(R={})),function(e){e.NB="NB",e.MB="<B>",e.WB="WB",e.SWB="SWB",e.FB="FB"}(M||(M={})),function(e){e.MONO="Mono",e.STEREO="Stereo"}(G||(G={})),function(e){e.ONE_FRAME="1 frame",e.TWO_FRAMES_SAME_SIZE="2 frames, equal size",e.TWO_FRAMES_DIFF_SIZE="2 frames, different sizes",e.ARBITRARY_FRAMES="Arbitrary number of frames"}(U||(U={}));var re,ae;!function(e){e.CBR="Constant Bit Rate",e.VBR="Variable Bit Rate"}(re||(re={})),function(e){e.NO_PADDING="No Padding",e.OPUS_PADDING="Opus Padding"}(ae||(ae={}));var ie,ce=function(e){var t=e.packet,n=d().showHex,r=t.toc;return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("h4",{children:"TOC Byte"}),Object(u.jsx)("a",{className:"rfc-link",href:"https://datatracker.ietf.org/doc/html/rfc6716#section-3.1",children:"RFC 6716 - 3.1. The TOC Byte"}),Object(u.jsx)(te,{opusToc:r}),r.frameCount===U.ARBITRARY_FRAMES&&Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("h4",{children:"Frame Count Byte"}),Object(u.jsx)("a",{className:"rfc-link",href:"https://datatracker.ietf.org/doc/html/rfc6716#section-3.2.5",children:"RFC 6716 - 3.2.5. Code 3: A Signaled Number of Frames in the Packet"}),Object(u.jsx)(ne,{opusFrameCountByte:t.frameCount})]}),n&&Object(u.jsx)("div",{className:"raw-hex",children:y(t.dataWindow.getArrayBuffer(),!0)})]})},oe=function(){function e(t){Object(S.a)(this,e),this.dataWindow=t}return Object(w.a)(e,[{key:"toc",get:function(){return function(e){var t,n,r,a,i=e>>3&31,c=e>>2&1?G.STEREO:G.MONO,o=3&e;switch(!0){case i>=0&&i<=3:t=R.SILK,n=M.NB,r=[10,20,40,60][i%4];break;case i>=4&&i<=7:t=R.SILK,n=M.MB,r=[10,20,40,60][i%4];break;case i>=8&&i<=11:t=R.SILK,n=M.WB,r=[10,20,40,60][i%4];break;case i>=12&&i<=13:t=R.HYBRID,n=M.SWB,r=[10,20][i%2];break;case i>=14&&i<=15:t=R.HYBRID,n=M.FB,r=[10,20][i%2];break;case i>=16&&i<=19:t=R.CELT,n=M.NB,r=[2.5,5,10,20][i%4];break;case i>=20&&i<=23:t=R.CELT,n=M.WB,r=[2.5,5,10,20][i%4];break;case i>=24&&i<=27:t=R.CELT,n=M.SWB,r=[2.5,5,10,20][i%4];break;case i>=28&&i<=31:t=R.CELT,n=M.FB,r=[2.5,5,10,20][i%4];break;default:throw new Error("Invalid configuration.")}switch(o){case 0:a=U.ONE_FRAME;break;case 1:a=U.TWO_FRAMES_SAME_SIZE;break;case 2:a=U.TWO_FRAMES_DIFF_SIZE;break;case 3:a=U.ARBITRARY_FRAMES;break;default:throw new Error("Invalid frame count code.")}return{mode:t,bandwidth:n,frameMs:r,stereo:c,frameCount:a}}(this.dataWindow.getByte(0))}},{key:"frameCount",get:function(){return{vbr:128&(e=this.dataWindow.getByte(1))?re.VBR:re.CBR,padding:64&e?ae.OPUS_PADDING:ae.NO_PADDING,frameCount:63&e};var e}}]),e}(),se=function(e){return!Q(e)&&!Z(e)},ue=function(e){var t=e.packets,n=e.isOpus,r=d().showHex;return Object(u.jsx)(u.Fragment,{children:t.map((function(e,t){return Object(u.jsxs)(i.a.Fragment,{children:[se(e)&&n&&Object(u.jsxs)(u.Fragment,{children:[Object(u.jsxs)("h3",{children:["Packet ",t+1," (",e.byteLength," bytes) - Opus Packet"]}),Object(u.jsx)(ce,{packet:new oe(new k(e))})]}),se(e)&&!n&&Object(u.jsxs)(u.Fragment,{children:[Object(u.jsxs)("h3",{children:["Packet ",t+1," (",e.byteLength," bytes)"]}),r&&Object(u.jsx)("div",{className:"raw-hex",children:y(e,!0)},"packet-hex-".concat(t))]}),Q(e)&&Object(u.jsxs)(u.Fragment,{children:[Object(u.jsxs)("h3",{children:["Packet ",t+1," (",e.byteLength," bytes) - Ogg Opus Identification Header"]}),Object(u.jsx)("p",{children:Object(u.jsx)("a",{className:"rfc-link",href:"https://datatracker.ietf.org/doc/html/rfc7845#section-5.1",children:"RFC 7845 - 5.1. Identification Header"})}),Object(u.jsx)(ee,{header:new X(new k(e))}),Object(u.jsx)("p",{})]}),Z(e)&&Object(u.jsxs)(u.Fragment,{children:[Object(u.jsxs)("h3",{children:["Packet ",t+1," (",e.byteLength," bytes) - Ogg Opus Comment Header"]}),Object(u.jsx)("p",{children:Object(u.jsx)("a",{className:"rfc-link",href:"https://datatracker.ietf.org/doc/html/rfc7845#section-5.2",children:"RFC 7845 - 5.2. Comment Header"})}),Object(u.jsx)($,{header:new J(new k(e))}),Object(u.jsx)("p",{})]})]},"packet-".concat(t))}))})},le=function(e){var t,n,r=e.oggPages,i=e.opusBitstreamSerialNumbers,c=d().showHex,o=Object(a.useState)(0),l=Object(s.a)(o,2),h=l[0],b=l[1],g=Object(a.useState)(r),f=Object(s.a)(g,2),m=f[0],S=f[1];m!==r&&(S(r),b(0));var w=h<r.length?r[h]:void 0,x=void 0===w?[]:function(e){var t,n=[],r=[],a=!0,i=Object(j.a)(e.segments);try{for(i.s();!(t=i.n()).done;){var c=t.value;if(r.push(c),c.byteLength<255){var o=O(r);e.containsContinuedPacket&&a||n.push(o),r.length=0,a=!1}}}catch(s){i.e(s)}finally{i.f()}return n}(w);return Object(u.jsxs)("div",{className:"ogg-pages-tab",children:[Object(u.jsxs)("h1",{children:["Ogg Page ",h+1," / ",r.length," (",null!==(t=null===w||void 0===w?void 0:w.pageSize)&&void 0!==t?t:0," bytes)"]}),Object(u.jsx)("button",{onClick:function(){return b(h-1)},disabled:0===h,children:"Previous"}),Object(u.jsx)("button",{onClick:function(){return b(h+1)},disabled:h>=(null!==(n=null===r||void 0===r?void 0:r.length)&&void 0!==n?n:0)-1,children:"Next"}),Object(u.jsx)("h2",{children:"Ogg Page Header"}),w&&Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("p",{children:Object(u.jsx)("a",{className:"rfc-link",href:"https://datatracker.ietf.org/doc/html/rfc3533#section-6",children:"RFC 3533 - 6. The Ogg page format"})}),Object(u.jsx)(q,{page:w}),Object(u.jsx)("h2",{children:"Ogg Packets"}),Object(u.jsx)(ue,{packets:x,isOpus:i.includes(w.bitstreamSerialNumber)}),Object(u.jsx)("h2",{children:"Segments"}),p.a.range(0,w.numberOfPageSegments).map((function(e){return Object(u.jsx)(de,{number:e+1,size:w.getSegmentSize(e),hex:c?y(w.getSegment(e),!0):void 0},"segment-".concat(e))}))]})]})},de=function(e){var t=e.number,n=e.size,r=e.hex;return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsxs)("h3",{children:["Segment ",t," (",n," bytes)"]}),r&&Object(u.jsx)("div",{className:"raw-hex",children:r})]})},he=function(e){var t=e.streams,n=e.opusBitstreamSerialNumbers,r=Object(a.useState)(t),i=Object(s.a)(r,2),c=i[0],o=i[1],l=Object(a.useState)(t[0].serialNumber),d=Object(s.a)(l,2),h=d[0],b=d[1];c!==t&&(o(t),b(t[0].serialNumber));var g=t.find((function(e){return e.serialNumber===h}));return void 0===g?Object(u.jsx)(u.Fragment,{}):Object(u.jsxs)("div",{children:[Object(u.jsx)("h1",{children:"Logical Bitstreams"}),t.map((function(e){return Object(u.jsxs)("div",{children:[Object(u.jsx)("input",{type:"radio",id:e.serialNumber,name:e.serialNumber,value:e.serialNumber,checked:e.serialNumber===h,onChange:function(){return b(e.serialNumber)}}),Object(u.jsxs)("label",{htmlFor:e.serialNumber,children:[Object(u.jsx)("span",{className:"bitstream-serial-number-radio-label",children:e.serialNumber})," -"," ",_(e)," - ",e.packets.length," packets -"," ",p.a.sumBy(e.packets,(function(e){return e.byteLength}))," bytes"]})]},e.serialNumber)})),Object(u.jsx)("h2",{children:"Ogg Packets"}),Object(u.jsx)(ue,{packets:g.packets,isOpus:n.includes(g.serialNumber)})]})},be=function(){var e=Object(f.a)(g.a.mark((function e(t){var n,r;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t);case 2:return n=e.sent,e.next=5,n.blob();case 5:return r=e.sent,e.next=8,r.arrayBuffer();case 8:return e.abrupt("return",e.sent);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ge=function(e){return e.packets.some((function(e){return Q(e)}))},fe="".concat("/ogg-toe-puss","/example_0.opus");!function(e){e.OGG_PAGES="OGG_PAGES",e.BITSTREAMS="BITSTREAMS"}(ie||(ie={}));var je=function(){var e=Object(a.useState)([]),t=Object(s.a)(e,2),n=t[0],r=t[1],i=Object(a.useState)([]),c=Object(s.a)(i,2),o=c[0],l=c[1],h=Object(a.useState)([]),b=Object(s.a)(h,2),m=b[0],p=b[1],S=Object(a.useState)(ie.OGG_PAGES),w=Object(s.a)(S,2),y=w[0],x=w[1],B=d(),N=B.showHex,P=B.setShowHex,C=function(e){var t=function(e){for(var t=new k(e),n=new v(t),r=[n];!n.isLastPage;)t=t.slide(n.pageSize),n=new v(t),r.push(n);return r}(e),n=function(e){var t,n=new Map,r=[],a=Object(j.a)(e);try{for(a.s();!(t=a.n()).done;){var i=t.value;i.isFirstPage&&n.set(i.bitstreamSerialNumber,{packets:[],segmentsSoFar:[]});var c=n.get(i.bitstreamSerialNumber);if(void 0===c)throw Error("Unexpected page for bitstream with serial number ".concat(i.bitstreamSerialNumber));var o,u=Object(j.a)(i.segments);try{for(u.s();!(o=u.n()).done;){var l=o.value;if(c.segmentsSoFar.push(l),l.byteLength<255){var d=O(c.segmentsSoFar);c.packets.push(d),c.segmentsSoFar.length=0}}}catch(p){u.e(p)}finally{u.f()}i.isLastPage&&(r.push({serialNumber:i.bitstreamSerialNumber,packets:c.packets}),n.delete(i.bitstreamSerialNumber))}}catch(p){a.e(p)}finally{a.f()}var h,b=Object(j.a)(n);try{for(b.s();!(h=b.n()).done;){var g=Object(s.a)(h.value,2),f=g[0],m=g[1];r.push({serialNumber:f,packets:m.packets})}}catch(p){b.e(p)}finally{b.f()}return r}(t),a=n.filter(ge).map((function(e){return e.serialNumber}));r(t),l(n),p(a)};return Object(a.useEffect)((function(){be(fe).then(C)}),[]),Object(u.jsxs)("div",{className:"app",children:[Object(u.jsx)("button",{onClick:function(){return x(ie.OGG_PAGES)},disabled:y===ie.OGG_PAGES,children:"Ogg Pages"}),Object(u.jsx)("button",{onClick:function(){return x(ie.BITSTREAMS)},disabled:y===ie.BITSTREAMS,children:"Logical Bitstreams"}),Object(u.jsxs)("div",{className:"show-hex-checkbox",children:[Object(u.jsx)("label",{htmlFor:"showHex",children:"Show Hex"}),Object(u.jsx)("input",{id:"showHex",onChange:function(){return P(!N)},checked:N,type:"checkbox"})]}),Object(u.jsx)(E,{onDrop:function(){var e=Object(f.a)(g.a.mark((function e(t){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=C,e.next=3,t.arrayBuffer();case 3:return e.t1=e.sent,e.abrupt("return",(0,e.t0)(e.t1));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}),y===ie.OGG_PAGES&&Object(u.jsx)(le,{oggPages:n,opusBitstreamSerialNumbers:m}),y===ie.BITSTREAMS&&Object(u.jsx)(he,{streams:o,opusBitstreamSerialNumbers:m})]})},me=function(){return Object(u.jsx)(h,{children:Object(u.jsx)(je,{})})};n(30);o.a.render(Object(u.jsx)(i.a.StrictMode,{children:Object(u.jsx)(me,{})}),document.getElementById("root"))}},[[31,1,2]]]);
//# sourceMappingURL=main.d68e7090.chunk.js.map