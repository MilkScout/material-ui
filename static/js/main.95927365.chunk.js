(this["webpackJsonpmilkscout-demo"]=this["webpackJsonpmilkscout-demo"]||[]).push([[0],{38:function(e,a,t){e.exports=t(49)},48:function(e,a,t){},49:function(e,a,t){"use strict";t.r(a);var n=t(0),l=t.n(n),r=t(7),s=t.n(r),c=t(33),m=t(83),o=t(17),i=(t(48),0),d=function(){var e=Object(n.useState)(1234567.89),a=Object(c.a)(e,2),t=a[0],r=a[1];return Object(n.useEffect)((function(){i+=1})),l.a.createElement("div",{className:"App"},l.a.createElement("img",{src:"https://assets.milkscout.eu/logo/logo.svg",className:"Logo",alt:"logo milkscout"}),l.a.createElement("div",{className:"Container"},l.a.createElement("div",null,"Current value: ","undefined"===typeof t?"undefined":t)),l.a.createElement("div",{className:"Container"},l.a.createElement("div",null,"Render amount: ",i)),l.a.createElement("div",{className:"Container"},l.a.createElement("div",{className:"Text"},"Default NumberField with end adroment"),l.a.createElement(o.a,{className:"Numberfield",value:t,InputProps:{endAdornment:l.a.createElement(m.a,{position:"end"},"kg")},onChange:function(e){return r(e)}})),l.a.createElement("div",{className:"Container"},l.a.createElement("div",{className:"Text"},"NumberField different decimal and thousand character"),l.a.createElement(o.a,{className:"Numberfield",value:t,decimalCharacter:",",thousandCharacter:".",InputProps:{endAdornment:l.a.createElement(m.a,{position:"end"},"kg")},onChange:function(e){return r(e)}})),l.a.createElement("div",{className:"Container"},l.a.createElement("div",{className:"Text"},"NumberField with showArrow only (desktop)"),l.a.createElement(o.a,{className:"Numberfield",value:t,showArrow:!0,InputProps:{endAdornment:l.a.createElement(m.a,{position:"end"},"kg")},onChange:r})),l.a.createElement("div",{className:"Container"},l.a.createElement("div",{className:"Text"},"NumberField step 0.1 "),l.a.createElement(o.a,{className:"Numberfield",value:t,showArrow:!0,step:.1,InputProps:{endAdornment:l.a.createElement(m.a,{position:"end"},"kg")},onChange:r})),l.a.createElement("div",{className:"Container"},l.a.createElement("div",{className:"Text"},"NumberField label"),l.a.createElement(o.a,{label:"MilkScout",className:"Numberfield",value:t,showArrow:!0,step:100,InputProps:{endAdornment:l.a.createElement(m.a,{position:"end"},"\u20ac")},onChange:r})))};s.a.render(l.a.createElement(n.Suspense,{fallback:null},l.a.createElement(d,null)),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.95927365.chunk.js.map