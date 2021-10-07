var PieSocket;(()=>{var e={13:(e,t,n)=>{"use strict";n.d(t,{default:()=>c});class s{constructor(e){this.options=e}log(...e){this.options.consoleLogs&&console.log(...e)}warn(...e){this.options.consoleLogs&&console.warn(...e)}error(...e){this.options.consoleLogs&&console.error(...e)}}class o{constructor(e,t,n=!0){this.events={},n&&this.init(e,t)}init(e,t){this.endpoint=e,this.identity=t,this.connection=this.connect(),this.shouldReconnect=!1,this.logger=new s(t)}connect(){var e=new WebSocket(this.endpoint);return e.onmessage=this.onMessage.bind(this),e.onopen=this.onOpen.bind(this),e.onerror=this.onError.bind(this),e.onclose=this.onClose.bind(this),e}on(e,t){this.events[e]=t}send(e){return this.connection.send(e)}onMessage(e){this.logger.log("Channel message:",e);try{var t=JSON.parse(e.data);t.error&&t.error.length&&(this.shouldReconnect=!1)}catch(e){console.error(e)}this.events.message&&this.events.message.bind(this)(e)}onOpen(e){this.logger.log("Channel connected:",e),this.shouldReconnect=!0,this.events.open&&this.events.open.bind(this)(e)}onError(e){this.logger.error("Channel error:",e),this.connection.close(),this.events.error&&this.events.error.bind(this)(e)}onClose(e){this.logger.warn("Channel closed:",e),this.reconnect(),this.events.close&&this.events.close.bind(this)(e)}reconnect(){this.shouldReconnect&&(this.logger.log("Reconnecting"),this.connect())}}class i{constructor(e,t="InvalidAuthException"){this.message="Auth endpoint did not return a valid JWT Token, please see: https://www.piesocket.com/docs/3.0/authentication",this.name=t}}const r={version:3,clusterId:"demo",apiKey:"oCdCMcMPQpbvNjUIzqtvF1d2X2okWpDQj4AwARJuAgtjhzKxVEjQU6IdCjwm",consoleLogs:!1,notifySelf:0,jwt:null,presence:0,authEndpoint:"/broadcasting/auth",authHeaders:{},forceAuth:!1,userId:null};class c{constructor(e){e=e||{},this.options={...r,...e},this.connections={},this.logger=new s(this.options)}subscribe(e){var t=this.getEndpoint(e);if(this.connections[e])return this.logger.log("Returning existing channel",e),this.connections[e];this.logger.log("Creating new channel",e);var n=new o(null,null,!1);return t.then((t=>{n.init(t,{channelId:e,...this.options})})),this.connections[e]=n,n}unsubscribe(e){return!!this.connections[e]&&(this.connections[e].shouldReconnect=!1,this.connections[e].connection.close(),delete this.connections[e],!0)}getConnections(){return this.connections}async getAuthToken(e){return new Promise(((t,n)=>{var s=new FormData;s.append("channel_name",e);var o=new XMLHttpRequest;o.withCredentials=!0,o.addEventListener("readystatechange",(function(){if(4===this.readyState)try{const e=JSON.parse(this.responseText);t(e)}catch(e){n(new i("Could not fetch auth token","AuthEndpointResponseError"))}})),o.addEventListener("error",(()=>{n(new i("Could not fetch auth token","AuthEndpointError"))})),o.open("POST",this.options.authEndpoint),Object.keys(this.options.authHeaders).forEach((e=>{o.setRequestHeader(e,this.options.authHeaders[e])})),o.send(s)}))}isGuarded(e){return!!this.options.forceAuth||(""+e).startsWith("private-")}async getEndpoint(e){let t=this.options.userId,n=`wss://${this.options.clusterId}.piesocket.com/v${this.options.version}/${e}?api_key=${this.options.apiKey}&notify_self=${this.options.notifySelf}&source=jssdk&v=1.2.3&presence=${this.options.presence}`;if(this.options.jwt)n=n+"&jwt="+this.options.jwt;else if(this.isGuarded(e)){const s=await this.getAuthToken(e);if(s.channel_data)if("string"==typeof s.channel_data)try{const e=JSON.parse(s.channel_data);e.user_id&&(t=e.user_id)}catch(e){}else"object"==typeof s.channel_data&&s.channel_data.user_id&&(t=s.channel_data.user_id);n=n+"&jwt="+s.auth}return t&&(n=n+"&user="+t),n}}},138:(e,t,n)=>{e.exports=n(13).default}},t={};function n(s){var o=t[s];if(void 0!==o)return o.exports;var i=t[s]={exports:{}};return e[s](i,i.exports,n),i.exports}n.d=(e,t)=>{for(var s in t)n.o(t,s)&&!n.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var s=n(138);PieSocket=s})();