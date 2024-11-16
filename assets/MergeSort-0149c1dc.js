import{R as t,j as k}from"./index-74a09b62.js";import{A as K}from"./ArrowsComponent-f1ea9969.js";const Y=({difficulty:T,randomNumbers:x,countDownOver:I,setWinner:L,winner:v})=>{const[q,U]=t.useState([]),[M,E]=t.useState([]),[w,g]=t.useState([]),[o,r]=t.useState(!1),[p,c]=t.useState(0),[h,S]=t.useState(!1),C=t.useRef(v),e=t.useRef(null),[P,J]=t.useState(!1),[y,B]=t.useState(0),[F,D]=t.useState(1),H=t.useRef(y);t.useEffect(()=>{I?(r(!0),J(!0),S(!0)):(r(!1),J(!1))},[I]),t.useEffect(()=>{h&&(H.current=y,w.length===4&&(W(y),W(F)))},[y,F]);function W(l){var u,f,a,d,A,m;let i,s=Number((f=(u=e==null?void 0:e.current)==null?void 0:u.children[l])==null?void 0:f.innerHTML),n;switch(w.forEach((z,b)=>{i||z.forEach(N=>{var $,j;n=Number((j=($=e==null?void 0:e.current)==null?void 0:$.children[N])==null?void 0:j.innerHTML),n===s&&(i=b)})}),i){case 0:(a=e==null?void 0:e.current)==null||a.children[l].classList.add("squaresColor1");break;case 1:(d=e==null?void 0:e.current)==null||d.children[l].classList.add("squaresColor2");break;case 2:(A=e==null?void 0:e.current)==null||A.children[l].classList.add("squaresColor3");break;case 3:(m=e==null?void 0:e.current)==null||m.children[l].classList.add("squaresColor4");break}}t.useEffect(()=>{w.length>0&&w.forEach((l,i)=>{l.forEach(s=>{var n,u,f,a;switch(i){case 0:(n=e==null?void 0:e.current)==null||n.children[s].classList.add("squaresColor1");break;case 1:(u=e==null?void 0:e.current)==null||u.children[s].classList.add("squaresColor2");break;case 2:(f=e==null?void 0:e.current)==null||f.children[s].classList.add("squaresColor3");break;case 3:(a=e==null?void 0:e.current)==null||a.children[s].classList.add("squaresColor4");break}})})},[w]),t.useEffect(()=>{if(P){const l=setInterval(()=>{(H.current>=32||v==="user")&&(clearInterval(l),r(!1)),H.current>20&&r(!1),B(i=>i+2),D(i=>i+2)},p/1.3)}},[P]),t.useEffect(()=>{if(T)switch(T){case"Easy":c(2500);break;case"Intermediate":c(1e3);break;case"Hard":c(500);break;case"Impossible":c(100);break}},[T]),t.useEffect(()=>{U([...x]),E([...x])},[x]),t.useEffect(()=>{M.length>8},[M]),t.useEffect(()=>{if(h&&q.length>0){const l=s=>{let n=Array.from(s),u=n.length,f=new Array(u),a=1,d=0;const A=setInterval(()=>{if(C.current==="user"){r(!1),S(!1),clearInterval(A);return}if(a>=u){r(!1),setTimeout(()=>{C.current!=="user"&&L("computer"),S(!1),clearInterval(A)},p*2);return}if(d>=u){let O=n;n=f,f=O,a*=2,d=0;return}let b=d,N=Math.min(b+a,u),$=N,j=Math.min(N+a,u);i(b,N,$,j,n,f),E(O=>[...O,...f.slice(b,j)]),G(b,j),d+=2*a},p);return C.current=v,n},i=(s,n,u,f,a,d)=>{let A=s;for(;s<u&&n<f;)a[s]<=a[n]?d[A++]=a[s++]:d[A++]=a[n++];for(;s<u;)d[A++]=a[s++];for(;n<f;)d[A++]=a[n++];for(let m=s;m<n;m++)a[m]=d[m]};l(q)}},[h,v]);function G(l,i){g(s=>s.length<4?[...s,[l+8,i+7]]:s)}return k.jsxs("div",{className:"mergeSort",children:[k.jsx("div",{ref:e,className:"valuesToSortContainer",children:M.map((l,i)=>k.jsx("div",{className:`valueToSort valueToSort${i}`,children:l},`${l} ${i}`))}),o&&k.jsx(K,{firstArrowPos:y,secondArrowPos:F,valuesRef:e,xOffset:20,yOffset:1})]})},Z=({randomNumbers:T,setWinner:x})=>{const[I,L]=t.useState([]),[v,q]=t.useState([]),[U,M]=t.useState([]),E=t.useRef(null);t.useEffect(()=>{L(T),q([" "," "," "," "," "," "," "," "]);let o=[...T];M(o.sort((r,p)=>r-p))},[T]),t.useEffect(()=>{v.length>0&&JSON.stringify(v)===JSON.stringify(U)&&x("user")},[v]);function w(o,r){var c,h;let p;for(let S=0;S<v.length;S++)if(String(v[S])===" "){p=S;break}q(S=>{let C=[...S];return C[p]=o,[...C]}),L(S=>{let C=[...S];return C[r]=" ",[...C]}),(h=(c=E==null?void 0:E.current)==null?void 0:c.children[r])==null||h.classList.add("valueClicked")}function g(o,r){let p;for(let c=0;c<I.length;c++)if(String(I[c])===" "){p=c;break}L(c=>{let h=[...c];return h[p]=o,[...h]}),q(c=>{let h=[...c];return h[r]=" ",[...h]})}return k.jsxs("div",{className:"mergeSortUser",children:[k.jsx("div",{className:"userAttemptContainer",children:v.map((o,r)=>k.jsx("div",{className:"userAttempt",onClick:()=>g(o,r),children:o},`attempt${r}`))}),k.jsx("div",{ref:E,className:"valuesToSortUserContainer",children:I.map((o,r)=>k.jsx("div",{className:"valueToSortMerge",onClick:()=>w(o,r),children:o},`user${o} ${r}`))})]})};export{Y as MergeSort,Z as MergeSortUser};