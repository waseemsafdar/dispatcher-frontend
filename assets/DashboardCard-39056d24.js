import{g as x,f as u,s as m,r as h,i as j,_ as f,c as C,j as s,k as v,l as g,ai as i,F as y}from"./index-4b681f2b.js";import{C as S}from"./Card-3f400ddb.js";import{S as b}from"./Stack-ce345853.js";function w(t){return x("MuiCardContent",t)}u("MuiCardContent",["root"]);const R=["className","component"],M=t=>{const{classes:o}=t;return g({root:["root"]},w,o)},U=m("div",{name:"MuiCardContent",slot:"Root",overridesResolver:(t,o)=>o.root})(()=>({padding:16,"&:last-child":{paddingBottom:24}})),_=h.forwardRef(function(o,n){const e=j({props:o,name:"MuiCardContent"}),{className:c,component:r="div"}=e,d=f(e,R),a=C({},e,{component:r}),l=M(a);return s.jsx(U,C({as:r,className:v(l.root,c),ownerState:a,ref:n},d))}),p=_,B=({title:t,subtitle:o,children:n,action:e,footer:c,cardheading:r,headtitle:d,headsubtitle:a,middlecontent:l})=>s.jsxs(S,{sx:{padding:0},elevation:9,variant:void 0,children:[r?s.jsxs(p,{children:[s.jsx(i,{variant:"h5",children:d}),s.jsx(i,{variant:"subtitle2",color:"textSecondary",children:a})]}):s.jsxs(p,{sx:{p:"30px"},children:[t?s.jsxs(b,{direction:"row",spacing:2,justifyContent:"space-between",alignItems:"center",mb:3,children:[s.jsxs(y,{children:[t?s.jsx(i,{variant:"h5",children:t}):"",o?s.jsx(i,{variant:"subtitle2",color:"textSecondary",children:o}):""]}),e]}):null,n]}),l,c]});export{p as C,B as D};
