(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{187:function(e,t,a){"use strict";a.r(t);a(94),a(134),a(50),a(38),a(29),a(65),a(13),a(22);var r=a(0),n=a.n(r),o=a(206),i=a(225),s=(a(139),a(141),a(270)),l=a(271),c=a(230),d=a.n(c),p="#fff",u="#eee",h="#0060cb",m="#0060cb",g="#222",f="#eee",b="#222",w="#999",y="#fff",v="#fff",x="#fff",k="max-width: 400px",C="max-width: 800px";function E(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}var z=o.a.div.withConfig({displayName:"WordSelector__Container",componentId:"ot9a1w-0"})(["position:relative;ul{margin:0;padding:0;> li{display:flex;align-items:center;padding:0 8px;cursor:default;&.highlighted{background-color:",";}&.selected{color:",";background-color:",";}}}"],f,v,m),S=o.a.input.withConfig({displayName:"WordSelector__WordSelect",componentId:"ot9a1w-1"})(["display:block;border:1px solid;border-radius:3px;font-size:16px;padding:8px 14px;width:100%;cursor:pointer;@media (","){font-size:13px;padding:6px 12px;}"],k),I=o.a.label.withConfig({displayName:"WordSelector__WordIndexLabel",componentId:"ot9a1w-2"})(["position:absolute;top:-8px;left:-8px;height:16px;width:16px;font-size:10px;border-radius:3px;background-color:",";color:",";display:flex;align-items:center;justify-content:center;"],g,x),O=Object(o.a)(l.a).withConfig({displayName:"WordSelector__SelectOpenIcon",componentId:"ot9a1w-3"})(["position:absolute;top:5px;right:0;padding:4px;font-size:20px;cursor:pointer;@media (","){top:6px;font-size:13px;}"],k),_=o.a.div.withConfig({displayName:"WordSelector__OptionsContainer",componentId:"ot9a1w-4"})(["position:absolute;width:100%;z-index:1;margin-top:2px;"]),j=o.a.input.withConfig({displayName:"WordSelector__SearchInput",componentId:"ot9a1w-5"})(["display:block;outline:none;width:100%;border:1px solid ",";border-width:1px 1px 0;padding:8px;padding-left:24px;font-size:12px;"],w),R=Object(o.a)(l.c).withConfig({displayName:"WordSelector__SearchIcon",componentId:"ot9a1w-6"})(["position:absolute;top:7px;left:4px;font-size:16px;"]),L=Object(o.a)(l.b).withConfig({displayName:"WordSelector__SearchClearIcon",componentId:"ot9a1w-7"})(["position:absolute;top:5px;right:0;padding:4px;color:",";font-size:16px;cursor:pointer;"],w),N=function(e){function t(){for(var t,a=arguments.length,r=new Array(a),n=0;n<a;n++)r[n]=arguments[n];return(t=e.call.apply(e,[this].concat(r))||this).handleClick=function(){var e=t.props,a=e.word,r=e.onSelect;r&&r(a)},t.handleMouseEnter=function(){var e=t.props,a=e.index,r=e.onHighlight;r&&r(a)},t}return E(t,e),t.prototype.render=function(){var e=this.props,t=e.word,a=e.highlighted,r=e.selected,o=e.style;return n.a.createElement("li",{onMouseEnter:this.handleMouseEnter,onClick:this.handleClick,className:d()({highlighted:a,selected:r}),style:o},t)},t}(n.a.Component),W=function(e){function t(t){var a;return(a=e.call(this,t)||this).handleOutsideClick=function(e){a.state.showOptions&&!a.containerRef.current.contains(e.target)&&a.hideOptions()},a.showOptions=function(e){var t=a.props,r=t.word,n=t.wordList;a.setState({showOptions:!0,highlightedOptionIndex:r?n.indexOf(r):null},a.scrollToSelection)},a.hideOptions=function(){a.setState({showOptions:!1,highlightedOptionIndex:null,search:"",options:a.props.wordList})},a.scrollToSelection=function(){var e=a.state.options,t=a.props.word;if(a.searchRef.current.focus(),t){var r=e.indexOf(t);a.listRef.current.scrollToItem(r,"center")}},a.handleClick=function(e){a.state.showOptions?a.hideOptions():a.showOptions()},a.handleSearch=function(e){var t=e.target.value,r=a.props.wordList;a.setState({search:t,options:""===t?r:r.filter(function(e){return e.indexOf(t)>=0}).sort(function(e,a){return e.indexOf(t)-a.indexOf(t)}),highlightedOptionIndex:0})},a.handleClearSearch=function(e){e.stopPropagation(),a.setState({search:"",options:a.props.wordList},a.showOptions)},a.handleKeyDown=function(e){var t=e.key,r=e.shiftKey,n=e.target,o=a.state,i=o.options,s=o.showOptions,l=o.highlightedOptionIndex;if(s||"Enter"!==t&&"ArrowDown"!==t)if("ArrowDown"===t)null===l?a.setState({highlightedOptionIndex:0}):l<i.length-1&&(a.setState({highlightedOptionIndex:l+1}),a.listRef.current.scrollToItem(l+1));else if("ArrowUp"===t&&l>0)a.setState({highlightedOptionIndex:l-1}),a.listRef.current.scrollToItem(l-1);else if("Enter"===t){var c=i[l];c?a.handleSelect(c):(a.hideOptions(),a.selectRef.current.focus())}else"Escape"===t?(a.hideOptions(),a.selectRef.current.focus()):"Tab"===t&&(!r&&n===a.searchRef.current||r&&n===a.selectRef.current)&&a.hideOptions();else a.showOptions()},a.handleHover=function(e){a.setState({highlightedOptionIndex:e})},a.handleSelect=function(e){var t=a.props,r=t.onChange,n=t.wordList,o=t.word,i=t.index;a.setState({search:"",options:n,highlightedOptionIndex:i,showOptions:!1}),e!==o&&r&&r({word:e,index:i})},a.renderWordOption=function(e){var t=e.data,r=e.index,o=e.style,i=a.state.highlightedOptionIndex,s=a.props.word,l=t[r];return n.a.createElement(N,{style:o,word:l,index:r,selected:s===l,highlighted:r===i,onHighlight:a.handleHover,onSelect:a.handleSelect})},a.containerRef=n.a.createRef(),a.listRef=n.a.createRef(),a.selectRef=n.a.createRef(),a.searchRef=n.a.createRef(),a.state={options:t.wordList,search:"",showOptions:!1,highlightedOptionIndex:null},a}E(t,e);var a=t.prototype;return a.componentDidMount=function(){window.addEventListener("click",this.handleOutsideClick)},a.componentWillUnmount=function(){window.removeEventListener("click",this.handleOutsideClick)},a.componentDidUpdate=function(e){var t=this.props.wordList;e.wordList!==t&&this.setState({options:t})},a.render=function(){var e=this.state,t=e.options,a=e.search,r=e.showOptions,o=this.props,i=o.index,l=o.indexDisplay,c=o.word,d="word"+i;return n.a.createElement(z,{ref:this.containerRef},n.a.createElement(S,{ref:this.selectRef,type:"text",name:d,placeholder:"Word "+l,autoComplete:"off",readOnly:!0,value:c,onClick:this.handleClick,onKeyDown:this.handleKeyDown}),n.a.createElement(I,{htmlFor:d},l),n.a.createElement(O,{onClick:this.handleClick}),r?n.a.createElement(_,null,n.a.createElement(j,{ref:this.searchRef,type:"text",value:a,onChange:this.handleSearch,onKeyDown:this.handleKeyDown}),n.a.createElement(R,null),""!==a?n.a.createElement(L,{onClick:this.handleClearSearch}):null,n.a.createElement(s.a,{ref:this.listRef,itemData:t,itemCount:t.length,itemSize:26,height:250,width:"100%",innerElementType:"ul",style:{border:"1px solid",overflowX:"hidden",position:"absolute",zIndex:1,backgroundColor:p}},this.renderWordOption)):null)},t}(n.a.Component),A=a(237),q=(a(238),a(199),a(129),a(211)),D=a.n(q),B=a(248),H=a.n(B);function M(e){return function(e){if(Array.isArray(e)){for(var t=0,a=new Array(e.length);t<e.length;t++)a[t]=e[t];return a}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var T={24:256,21:224,18:192,15:160,12:128},P=[24,21,18,15,12];function F(e,t){for(void 0===e&&(e=""),void 0===t&&(t=0);e.length<t;)e="0"+e;return e}function K(e){return void 0===e&&(e=""),(e.match(/.{1,32}/g)||[]).map(function(e){return F(parseInt(e,2).toString(16),8)}).join("")}function U(e,t){void 0===e&&(e=[]),void 0===t&&(t=[]);var a=e.length,r=e.filter(function(e){return!!e}),n=r.length,o=a===n;if(n<a-1)return{isCompleted:o};var i=T[a];if(!i)throw new Error("Invalid words array. Must be one of the following lengths: "+P.join());var s=i-11*(a-1),l=11*a-i,c=Math.pow(2,s),d=r.map(function(e){return F(t.indexOf(e).toString(2),11)}).join(""),p=d.substr(0,i-s),u=d.substr(0,i);return{isCompleted:o,entropy:o?{binary:u,hex:K(u)}:{},checksum:o?{hash:D()("sha256").update(K(u)).digest("hex"),firstBits:d.substr(i-1,l),length:l}:{},validLastWords:M(new Array(c)).map(function(e,a){var r=F(Number(a).toString(2),s),n=K(p+r),o=D()("sha256").update(n,"hex").digest("hex"),i=F(parseInt(o.substr(0,2),16).toString(2),8).substr(0,l);return t[parseInt(r+i,2)]})}}function G(e,t){return void 0===e&&(e=[]),void 0===t&&(t=""),H.a.pbkdf2Sync(e.join(" "),"mnemonic"+(t||""),2048,64,"sha512").reduce(function(e,t){return e+F(t.toString(16),2)},"")}var J=a(269),V=a.n(J);function X(e){return function(e){if(Array.isArray(e)){for(var t=0,a=new Array(e.length);t<e.length;t++)a[t]=e[t];return a}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var Q=o.a.div.withConfig({displayName:"pages__Container",componentId:"sc-12lp7hz-0"})(["font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';box-sizing:border-box;div,input{box-sizing:inherit;}color:",";@media (","){font-size:13px;}"],b,k),Y=o.a.h1.withConfig({displayName:"pages__Title",componentId:"sc-12lp7hz-1"})(["font-size:24px;font-weight:bold;text-align:center;"]),Z=o.a.h2.withConfig({displayName:"pages__Header",componentId:"sc-12lp7hz-2"})(["font-size:20px;margin-bottom:4px;"]),$=o.a.span.withConfig({displayName:"pages__Subheader",componentId:"sc-12lp7hz-3"})(["font-size:16px;font-weight:normal;color:",";margin-left:8px;"],w),ee=o.a.div.withConfig({displayName:"pages__CenteredRow",componentId:"sc-12lp7hz-4"})(["display:flex;flex-wrap:wrap;align-items:center;justify-content:center;"]),te=o.a.div.withConfig({displayName:"pages__CountContainer",componentId:"sc-12lp7hz-5"})(["display:flex;border:1px solid;border-radius:4px;margin:0 10px;"]),ae=o.a.label.withConfig({displayName:"pages__RadioGroupLabel",componentId:"sc-12lp7hz-6"})(["margin:8px 0;"]),re=o.a.label.withConfig({displayName:"pages__CountLabel",componentId:"sc-12lp7hz-7"})(["padding:8px 16px;cursor:pointer;border-right:1px solid;&:hover{background-color:",";}&.selected{color:",";background-color:",";}&:first-child{border-radius:4px 0 0 4px;}&:last-child{border-right:none;border-radius:0 4px 4px 0;}"],f,v,m),ne=o.a.input.attrs(function(){return{type:"radio",name:"wordcount"}}).withConfig({displayName:"pages__CountRadio",componentId:"sc-12lp7hz-8"})(["position:absolute;opacity:0;cursor:pointer;"]),oe=o.a.button.withConfig({displayName:"pages__GenerateButton",componentId:"sc-12lp7hz-9"})(["padding:6px 20px;background-color:",";border:2px solid ",";color:",";border-radius:18px;outline:none;cursor:pointer;font-size:14px;margin:10px;&:hover{box-shadow:"," 0 0 0 2px;}transition-property:box-shadow;transition-duration:0.1s;"],h,h,y,h),ie=Object(o.a)(oe).withConfig({displayName:"pages__ResetButton",componentId:"sc-12lp7hz-10"})(["background-color:transparent;color:",";"],h),se=o.a.div.withConfig({displayName:"pages__FlexRow",componentId:"sc-12lp7hz-11"})(["display:flex;flex-wrap:wrap;margin:20px;@media (","){margin:8px;}"],k),le=o.a.div.withConfig({displayName:"pages__FlexItem",componentId:"sc-12lp7hz-12"})(["flex:0 0 16.6%;padding:8px;@media (","){flex:0 0 33.3%;}"],C),ce=o.a.div.withConfig({displayName:"pages__DetailsContainer",componentId:"sc-12lp7hz-13"})(["margin:20px;input{padding:4px;border:1px solid;border-radius:3px;margin:4px 0;}"]),de=o.a.div.withConfig({displayName:"pages__WordWithIndex",componentId:"sc-12lp7hz-14"})(["display:inline-block;border:1px solid;border-radius:3px;padding:4px;margin:4px;margin-left:0;> div > span{color:",";font-size:13px;}> div:last-child{font-size:11px;}"],w),pe=o.a.span.withConfig({displayName:"pages__DetailsLabel",componentId:"sc-12lp7hz-15"})(["display:block;font-weight:bold;font-size:12px;"]),ue=o.a.span.withConfig({displayName:"pages__LongString",componentId:"sc-12lp7hz-16"})(["display:inline-block;word-break:break-all;padding:4px;margin:4px 0;border:1px solid;border-radius:3px;background-color:",";"],u),he=function(e){var t=e.value,a=e.onChange;return n.a.createElement(ee,null,n.a.createElement(ae,null,"Length"),n.a.createElement(te,null,P.map(function(e){var r=t===e;return n.a.createElement(re,{key:"wc"+e,className:r?"selected":null},n.a.createElement(ne,{key:e,value:e,checked:r,onChange:function(){return a&&a(e)}}),n.a.createElement("span",null,e))})))},me=function(e){var t,a;function r(t){var a;return(a=e.call(this,t)||this).handleCountChange=function(e){var t=a.state,r=t.words,n=t.wordList,o=t.passphrase,i=X(new Array(e)).map(function(e,t){return r[t]}),s=!i.some(function(e){return!e});a.setState(Object.assign({wordCount:e,words:i},U(i,n),{seed:s?G(i,o):"",passphrase:s?o:""}))},a.handleGenerate=function(){var e=a.state,t=e.wordCount,r=e.wordList,n=e.passphrase,o=function(e,t){if(void 0===e&&(e=24),void 0===t&&(t=[]),0===t.length)throw new Error("Array of 2048 words is required");var a=window.crypto||window.msCrypto,r=T[e],n=11*e-r,o=r/32,i=a.getRandomValues(new Uint32Array(o)),s="",l="";i.forEach(function(e){var t=e.toString(2),a=e.toString(16);t=F(t,32),a=F(a,8),s+=t,l+=a});for(var c=D()("sha256").update(l,"hex").digest("hex"),d=F(parseInt(c.substr(0,2),16).toString(2),8).substr(0,n),p=s+d,u=[],h=0;h<e;h++){var m=p.substr(11*h,11),g=parseInt(m,2);u.push(t[g])}return u}(t,r);a.setState(Object.assign({words:o},U(o,r),{seed:G(o,n)}))},a.handleReset=function(){var e=a.state.wordCount;a.setState({words:new Array(e),isCompleted:!1,validLastWords:[],seed:"",passphrase:""})},a.handleChange=function(e){var t=e.word,r=e.index,n=a.state,o=n.wordCount,i=n.words,s=n.wordList,l=n.passphrase,c=X(new Array(o)).map(function(e,a){return a===r?t:i[a]}),d=U(c,s),p=d.validLastWords;d.isCompleted&&r!==o-1&&(c[o-1]=p[0]),a.setState(Object.assign({words:c},U(c,s),{seed:G(c,l)}))},a.handlePassphrase=function(e){a.handlePassphraseDebounce(e.target.value)},a.handlePassphraseDebounce=V()(function(e){var t=a.state.words;a.setState({seed:G(t,e),passphrase:e})},250),a.renderWordWithIndex=function(e,t){var r=a.state.wordList.indexOf(e),o=F(r.toString(2),11);return n.a.createElement(de,{key:"wi"+t},n.a.createElement("div",null,n.a.createElement("strong",null,e)," ",n.a.createElement("span",null,r)),n.a.createElement("div",null,o))},a.state={wordCount:24,words:new Array(24),wordList:A,validLastWords:[],isCompleted:!1,seed:"",passphrase:""},a}return a=e,(t=r).prototype=Object.create(a.prototype),t.prototype.constructor=t,t.__proto__=a,r.prototype.render=function(){for(var e=this.state,t=e.words,a=e.wordCount,r=e.wordList,o=e.validLastWords,s=e.entropy,l=e.checksum,c=e.seed,d=e.isCompleted,p=[],u=T[a],h=u-11*(a-1),m=u+(l||{}).length,g=0;g<a;g++){var f=g===a-1;p.push(n.a.createElement(le,{key:"word"+g},n.a.createElement(W,{index:g,indexDisplay:g+1,word:t[g]||"",wordList:f?o:r,disabled:0===o.length,onChange:this.handleChange})))}return n.a.createElement(Q,null,n.a.createElement(i.Helmet,null,n.a.createElement("title",null,"BIP39 Mnemonic Builder"),n.a.createElement("meta",{name:"description",content:"Create a custom recovery seed phrase for your bitcoin wallet."})),n.a.createElement(Y,null,"BIP39 Mnemonic Builder"),n.a.createElement(ee,null,n.a.createElement(he,{value:a,onChange:this.handleCountChange}),n.a.createElement(oe,{onClick:this.handleGenerate},"Generate Random"),n.a.createElement(ie,{onClick:this.handleReset},"Reset")),n.a.createElement(se,null,p),d?n.a.createElement(ce,null,n.a.createElement(Z,null,"Entropy - ",u," bits",n.a.createElement($,null,a-1," words × 11 bits ="," ",u-h," bits +"," ",h," extra bits ="," ",Math.pow(2,h)," valid last words")),n.a.createElement(ue,null,s.hex),n.a.createElement(Z,null,"Checksum - ",l.length," bits",n.a.createElement($,null,"First ",l.length," bits of SHA-256 hash of entropy")),n.a.createElement("div",null,n.a.createElement(pe,null,"Hash"),n.a.createElement(ue,null,l.hash)),n.a.createElement("div",null,n.a.createElement(pe,null,"First ",l.length," bits"),n.a.createElement(ue,null,l.firstBits)),n.a.createElement(Z,null,"Result - ",m," bits",n.a.createElement($,null,"Entropy + checksum = ",a," words × 11 bits = ",m,". Word / index / binary index.")),n.a.createElement("div",null,t.map(this.renderWordWithIndex)),n.a.createElement(Z,null,"Seed - 512 bits",n.a.createElement($,null,"PBKDF2 - SHA-512 / 2048 iterations")),n.a.createElement("div",null,n.a.createElement(pe,null,"Optional Passphrase"),n.a.createElement("input",{type:"text",onChange:this.handlePassphrase})),n.a.createElement(ue,null,c)):null)},r}(n.a.Component);t.default=me},237:function(e){e.exports=["abandon","ability","able","about","above","absent","absorb","abstract","absurd","abuse","access","accident","account","accuse","achieve","acid","acoustic","acquire","across","act","action","actor","actress","actual","adapt","add","addict","address","adjust","admit","adult","advance","advice","aerobic","affair","afford","afraid","again","age","agent","agree","ahead","aim","air","airport","aisle","alarm","album","alcohol","alert","alien","all","alley","allow","almost","alone","alpha","already","also","alter","always","amateur","amazing","among","amount","amused","analyst","anchor","ancient","anger","angle","angry","animal","ankle","announce","annual","another","answer","antenna","antique","anxiety","any","apart","apology","appear","apple","approve","april","arch","arctic","area","arena","argue","arm","armed","armor","army","around","arrange","arrest","arrive","arrow","art","artefact","artist","artwork","ask","aspect","assault","asset","assist","assume","asthma","athlete","atom","attack","attend","attitude","attract","auction","audit","august","aunt","author","auto","autumn","average","avocado","avoid","awake","aware","away","awesome","awful","awkward","axis","baby","bachelor","bacon","badge","bag","balance","balcony","ball","bamboo","banana","banner","bar","barely","bargain","barrel","base","basic","basket","battle","beach","bean","beauty","because","become","beef","before","begin","behave","behind","believe","below","belt","bench","benefit","best","betray","better","between","beyond","bicycle","bid","bike","bind","biology","bird","birth","bitter","black","blade","blame","blanket","blast","bleak","bless","blind","blood","blossom","blouse","blue","blur","blush","board","boat","body","boil","bomb","bone","bonus","book","boost","border","boring","borrow","boss","bottom","bounce","box","boy","bracket","brain","brand","brass","brave","bread","breeze","brick","bridge","brief","bright","bring","brisk","broccoli","broken","bronze","broom","brother","brown","brush","bubble","buddy","budget","buffalo","build","bulb","bulk","bullet","bundle","bunker","burden","burger","burst","bus","business","busy","butter","buyer","buzz","cabbage","cabin","cable","cactus","cage","cake","call","calm","camera","camp","can","canal","cancel","candy","cannon","canoe","canvas","canyon","capable","capital","captain","car","carbon","card","cargo","carpet","carry","cart","case","cash","casino","castle","casual","cat","catalog","catch","category","cattle","caught","cause","caution","cave","ceiling","celery","cement","census","century","cereal","certain","chair","chalk","champion","change","chaos","chapter","charge","chase","chat","cheap","check","cheese","chef","cherry","chest","chicken","chief","child","chimney","choice","choose","chronic","chuckle","chunk","churn","cigar","cinnamon","circle","citizen","city","civil","claim","clap","clarify","claw","clay","clean","clerk","clever","click","client","cliff","climb","clinic","clip","clock","clog","close","cloth","cloud","clown","club","clump","cluster","clutch","coach","coast","coconut","code","coffee","coil","coin","collect","color","column","combine","come","comfort","comic","common","company","concert","conduct","confirm","congress","connect","consider","control","convince","cook","cool","copper","copy","coral","core","corn","correct","cost","cotton","couch","country","couple","course","cousin","cover","coyote","crack","cradle","craft","cram","crane","crash","crater","crawl","crazy","cream","credit","creek","crew","cricket","crime","crisp","critic","crop","cross","crouch","crowd","crucial","cruel","cruise","crumble","crunch","crush","cry","crystal","cube","culture","cup","cupboard","curious","current","curtain","curve","cushion","custom","cute","cycle","dad","damage","damp","dance","danger","daring","dash","daughter","dawn","day","deal","debate","debris","decade","december","decide","decline","decorate","decrease","deer","defense","define","defy","degree","delay","deliver","demand","demise","denial","dentist","deny","depart","depend","deposit","depth","deputy","derive","describe","desert","design","desk","despair","destroy","detail","detect","develop","device","devote","diagram","dial","diamond","diary","dice","diesel","diet","differ","digital","dignity","dilemma","dinner","dinosaur","direct","dirt","disagree","discover","disease","dish","dismiss","disorder","display","distance","divert","divide","divorce","dizzy","doctor","document","dog","doll","dolphin","domain","donate","donkey","donor","door","dose","double","dove","draft","dragon","drama","drastic","draw","dream","dress","drift","drill","drink","drip","drive","drop","drum","dry","duck","dumb","dune","during","dust","dutch","duty","dwarf","dynamic","eager","eagle","early","earn","earth","easily","east","easy","echo","ecology","economy","edge","edit","educate","effort","egg","eight","either","elbow","elder","electric","elegant","element","elephant","elevator","elite","else","embark","embody","embrace","emerge","emotion","employ","empower","empty","enable","enact","end","endless","endorse","enemy","energy","enforce","engage","engine","enhance","enjoy","enlist","enough","enrich","enroll","ensure","enter","entire","entry","envelope","episode","equal","equip","era","erase","erode","erosion","error","erupt","escape","essay","essence","estate","eternal","ethics","evidence","evil","evoke","evolve","exact","example","excess","exchange","excite","exclude","excuse","execute","exercise","exhaust","exhibit","exile","exist","exit","exotic","expand","expect","expire","explain","expose","express","extend","extra","eye","eyebrow","fabric","face","faculty","fade","faint","faith","fall","false","fame","family","famous","fan","fancy","fantasy","farm","fashion","fat","fatal","father","fatigue","fault","favorite","feature","february","federal","fee","feed","feel","female","fence","festival","fetch","fever","few","fiber","fiction","field","figure","file","film","filter","final","find","fine","finger","finish","fire","firm","first","fiscal","fish","fit","fitness","fix","flag","flame","flash","flat","flavor","flee","flight","flip","float","flock","floor","flower","fluid","flush","fly","foam","focus","fog","foil","fold","follow","food","foot","force","forest","forget","fork","fortune","forum","forward","fossil","foster","found","fox","fragile","frame","frequent","fresh","friend","fringe","frog","front","frost","frown","frozen","fruit","fuel","fun","funny","furnace","fury","future","gadget","gain","galaxy","gallery","game","gap","garage","garbage","garden","garlic","garment","gas","gasp","gate","gather","gauge","gaze","general","genius","genre","gentle","genuine","gesture","ghost","giant","gift","giggle","ginger","giraffe","girl","give","glad","glance","glare","glass","glide","glimpse","globe","gloom","glory","glove","glow","glue","goat","goddess","gold","good","goose","gorilla","gospel","gossip","govern","gown","grab","grace","grain","grant","grape","grass","gravity","great","green","grid","grief","grit","grocery","group","grow","grunt","guard","guess","guide","guilt","guitar","gun","gym","habit","hair","half","hammer","hamster","hand","happy","harbor","hard","harsh","harvest","hat","have","hawk","hazard","head","health","heart","heavy","hedgehog","height","hello","helmet","help","hen","hero","hidden","high","hill","hint","hip","hire","history","hobby","hockey","hold","hole","holiday","hollow","home","honey","hood","hope","horn","horror","horse","hospital","host","hotel","hour","hover","hub","huge","human","humble","humor","hundred","hungry","hunt","hurdle","hurry","hurt","husband","hybrid","ice","icon","idea","identify","idle","ignore","ill","illegal","illness","image","imitate","immense","immune","impact","impose","improve","impulse","inch","include","income","increase","index","indicate","indoor","industry","infant","inflict","inform","inhale","inherit","initial","inject","injury","inmate","inner","innocent","input","inquiry","insane","insect","inside","inspire","install","intact","interest","into","invest","invite","involve","iron","island","isolate","issue","item","ivory","jacket","jaguar","jar","jazz","jealous","jeans","jelly","jewel","job","join","joke","journey","joy","judge","juice","jump","jungle","junior","junk","just","kangaroo","keen","keep","ketchup","key","kick","kid","kidney","kind","kingdom","kiss","kit","kitchen","kite","kitten","kiwi","knee","knife","knock","know","lab","label","labor","ladder","lady","lake","lamp","language","laptop","large","later","latin","laugh","laundry","lava","law","lawn","lawsuit","layer","lazy","leader","leaf","learn","leave","lecture","left","leg","legal","legend","leisure","lemon","lend","length","lens","leopard","lesson","letter","level","liar","liberty","library","license","life","lift","light","like","limb","limit","link","lion","liquid","list","little","live","lizard","load","loan","lobster","local","lock","logic","lonely","long","loop","lottery","loud","lounge","love","loyal","lucky","luggage","lumber","lunar","lunch","luxury","lyrics","machine","mad","magic","magnet","maid","mail","main","major","make","mammal","man","manage","mandate","mango","mansion","manual","maple","marble","march","margin","marine","market","marriage","mask","mass","master","match","material","math","matrix","matter","maximum","maze","meadow","mean","measure","meat","mechanic","medal","media","melody","melt","member","memory","mention","menu","mercy","merge","merit","merry","mesh","message","metal","method","middle","midnight","milk","million","mimic","mind","minimum","minor","minute","miracle","mirror","misery","miss","mistake","mix","mixed","mixture","mobile","model","modify","mom","moment","monitor","monkey","monster","month","moon","moral","more","morning","mosquito","mother","motion","motor","mountain","mouse","move","movie","much","muffin","mule","multiply","muscle","museum","mushroom","music","must","mutual","myself","mystery","myth","naive","name","napkin","narrow","nasty","nation","nature","near","neck","need","negative","neglect","neither","nephew","nerve","nest","net","network","neutral","never","news","next","nice","night","noble","noise","nominee","noodle","normal","north","nose","notable","note","nothing","notice","novel","now","nuclear","number","nurse","nut","oak","obey","object","oblige","obscure","observe","obtain","obvious","occur","ocean","october","odor","off","offer","office","often","oil","okay","old","olive","olympic","omit","once","one","onion","online","only","open","opera","opinion","oppose","option","orange","orbit","orchard","order","ordinary","organ","orient","original","orphan","ostrich","other","outdoor","outer","output","outside","oval","oven","over","own","owner","oxygen","oyster","ozone","pact","paddle","page","pair","palace","palm","panda","panel","panic","panther","paper","parade","parent","park","parrot","party","pass","patch","path","patient","patrol","pattern","pause","pave","payment","peace","peanut","pear","peasant","pelican","pen","penalty","pencil","people","pepper","perfect","permit","person","pet","phone","photo","phrase","physical","piano","picnic","picture","piece","pig","pigeon","pill","pilot","pink","pioneer","pipe","pistol","pitch","pizza","place","planet","plastic","plate","play","please","pledge","pluck","plug","plunge","poem","poet","point","polar","pole","police","pond","pony","pool","popular","portion","position","possible","post","potato","pottery","poverty","powder","power","practice","praise","predict","prefer","prepare","present","pretty","prevent","price","pride","primary","print","priority","prison","private","prize","problem","process","produce","profit","program","project","promote","proof","property","prosper","protect","proud","provide","public","pudding","pull","pulp","pulse","pumpkin","punch","pupil","puppy","purchase","purity","purpose","purse","push","put","puzzle","pyramid","quality","quantum","quarter","question","quick","quit","quiz","quote","rabbit","raccoon","race","rack","radar","radio","rail","rain","raise","rally","ramp","ranch","random","range","rapid","rare","rate","rather","raven","raw","razor","ready","real","reason","rebel","rebuild","recall","receive","recipe","record","recycle","reduce","reflect","reform","refuse","region","regret","regular","reject","relax","release","relief","rely","remain","remember","remind","remove","render","renew","rent","reopen","repair","repeat","replace","report","require","rescue","resemble","resist","resource","response","result","retire","retreat","return","reunion","reveal","review","reward","rhythm","rib","ribbon","rice","rich","ride","ridge","rifle","right","rigid","ring","riot","ripple","risk","ritual","rival","river","road","roast","robot","robust","rocket","romance","roof","rookie","room","rose","rotate","rough","round","route","royal","rubber","rude","rug","rule","run","runway","rural","sad","saddle","sadness","safe","sail","salad","salmon","salon","salt","salute","same","sample","sand","satisfy","satoshi","sauce","sausage","save","say","scale","scan","scare","scatter","scene","scheme","school","science","scissors","scorpion","scout","scrap","screen","script","scrub","sea","search","season","seat","second","secret","section","security","seed","seek","segment","select","sell","seminar","senior","sense","sentence","series","service","session","settle","setup","seven","shadow","shaft","shallow","share","shed","shell","sheriff","shield","shift","shine","ship","shiver","shock","shoe","shoot","shop","short","shoulder","shove","shrimp","shrug","shuffle","shy","sibling","sick","side","siege","sight","sign","silent","silk","silly","silver","similar","simple","since","sing","siren","sister","situate","six","size","skate","sketch","ski","skill","skin","skirt","skull","slab","slam","sleep","slender","slice","slide","slight","slim","slogan","slot","slow","slush","small","smart","smile","smoke","smooth","snack","snake","snap","sniff","snow","soap","soccer","social","sock","soda","soft","solar","soldier","solid","solution","solve","someone","song","soon","sorry","sort","soul","sound","soup","source","south","space","spare","spatial","spawn","speak","special","speed","spell","spend","sphere","spice","spider","spike","spin","spirit","split","spoil","sponsor","spoon","sport","spot","spray","spread","spring","spy","square","squeeze","squirrel","stable","stadium","staff","stage","stairs","stamp","stand","start","state","stay","steak","steel","stem","step","stereo","stick","still","sting","stock","stomach","stone","stool","story","stove","strategy","street","strike","strong","struggle","student","stuff","stumble","style","subject","submit","subway","success","such","sudden","suffer","sugar","suggest","suit","summer","sun","sunny","sunset","super","supply","supreme","sure","surface","surge","surprise","surround","survey","suspect","sustain","swallow","swamp","swap","swarm","swear","sweet","swift","swim","swing","switch","sword","symbol","symptom","syrup","system","table","tackle","tag","tail","talent","talk","tank","tape","target","task","taste","tattoo","taxi","teach","team","tell","ten","tenant","tennis","tent","term","test","text","thank","that","theme","then","theory","there","they","thing","this","thought","three","thrive","throw","thumb","thunder","ticket","tide","tiger","tilt","timber","time","tiny","tip","tired","tissue","title","toast","tobacco","today","toddler","toe","together","toilet","token","tomato","tomorrow","tone","tongue","tonight","tool","tooth","top","topic","topple","torch","tornado","tortoise","toss","total","tourist","toward","tower","town","toy","track","trade","traffic","tragic","train","transfer","trap","trash","travel","tray","treat","tree","trend","trial","tribe","trick","trigger","trim","trip","trophy","trouble","truck","true","truly","trumpet","trust","truth","try","tube","tuition","tumble","tuna","tunnel","turkey","turn","turtle","twelve","twenty","twice","twin","twist","two","type","typical","ugly","umbrella","unable","unaware","uncle","uncover","under","undo","unfair","unfold","unhappy","uniform","unique","unit","universe","unknown","unlock","until","unusual","unveil","update","upgrade","uphold","upon","upper","upset","urban","urge","usage","use","used","useful","useless","usual","utility","vacant","vacuum","vague","valid","valley","valve","van","vanish","vapor","various","vast","vault","vehicle","velvet","vendor","venture","venue","verb","verify","version","very","vessel","veteran","viable","vibrant","vicious","victory","video","view","village","vintage","violin","virtual","virus","visa","visit","visual","vital","vivid","vocal","voice","void","volcano","volume","vote","voyage","wage","wagon","wait","walk","wall","walnut","want","warfare","warm","warrior","wash","wasp","waste","water","wave","way","wealth","weapon","wear","weasel","weather","web","wedding","weekend","weird","welcome","west","wet","whale","what","wheat","wheel","when","where","whip","whisper","wide","width","wife","wild","will","win","window","wine","wing","wink","winner","winter","wire","wisdom","wise","wish","witness","wolf","woman","wonder","wood","wool","word","work","world","worry","worth","wrap","wreck","wrestle","wrist","write","wrong","yard","year","yellow","you","young","youth","zebra","zero","zone","zoo"]},257:function(e,t){},259:function(e,t){}}]);
//# sourceMappingURL=component---src-pages-index-js-6eb690f1ce6a1cc30e13.js.map