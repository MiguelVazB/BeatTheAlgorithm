import{R as t,j as e}from"./index-74a09b62.js";import{A as k}from"./ArrowsComponent-f1ea9969.js";const L=({difficulty:o,randomNumbers:i,countDownOver:v,setWinner:j,winner:f})=>{const[B,c]=t.useState([]),[h,x]=t.useState([]),[g,s]=t.useState(!1),[r,d]=t.useState(""),[N,E]=t.useState(!1),[S,y]=t.useState([]),V=t.useRef(f),n=t.useRef(null),[C,P]=t.useState(0),[I,T]=t.useState(1);return t.useEffect(()=>{c(i),x(i)},[i]),t.useEffect(()=>{v?(s(!0),E(!0)):s(!1)},[v]),t.useEffect(()=>{if(N){let a=0,l=0,m,u;switch(o){case"Easy":u=500;break;case"Intermediate":u=200;break;case"Hard":u=100;break;case"Impossible":u=10;break}let b=[...B];m=setInterval(()=>{if(V.current==="user"&&(s(!1),clearInterval(m)),a<i.length)if(l<i.length-1){P(l),T(l+1);let p=Number(b[l]),w=Number(b[l+1]);if(p>w){let A=[];A.push(l),A.push(l+1),y(A),d(p);let D=p;b[l]=w,b[l+1]=D,x([...b])}else d("");l++}else a++,l=0;else s(!1),clearInterval(m),E(!1),j("computer")},u),V.current=f}},[N,f]),t.useEffect(()=>{var a,l;if(S.length>0){let m=S[0],u=S[1],b=n.current.children[m].getBoundingClientRect(),p=n.current.children[u].getBoundingClientRect().x-b.x;(a=n==null?void 0:n.current)==null||a.children[m].animate([{transform:`translateX(${p}px)`}],{duration:o==="Easy"?300:100,timingFunction:"ease-in-out"}),(l=n==null?void 0:n.current)==null||l.children[u].animate([{transform:`translateX(${-1*p}px)`}],{duration:o==="Easy"?300:100,timingFunction:"ease-in-out"})}},[S]),e.jsxs("div",{className:"bubbleSort",children:[e.jsx("div",{ref:n,className:"algorithm",children:h.map((a,l)=>e.jsxs("div",{className:"valueToSort valueToSortComputer",children:[e.jsx("p",{children:a}),e.jsx("div",{className:"bubbleDot"}),e.jsx("div",{className:"smallBubbleDot bubbleDot"})]},`${a} ${l}`))}),g&&e.jsx(k,{firstArrowPos:C,secondArrowPos:I,valuesRef:n}),e.jsxs("div",{className:"temporaryBubble",children:[e.jsx("p",{children:"Temporary bubble:"}),e.jsxs("div",{className:"tempBubble",children:[e.jsx("p",{className:"tempBubbleValue",children:r}),e.jsx("div",{className:"bubbleDot"}),e.jsx("div",{className:"smallBubbleDot bubbleDot"})]}),e.jsx("div",{className:"sortedValues",children:h.map((a,l)=>e.jsx("div",{children:a},`${a} ${l}`))})]})]})},F=({randomNumbers:o,setWinner:i})=>{const[v,j]=t.useState([]),[f,B]=t.useState([]),[c,h]=t.useState([]);t.useEffect(()=>{j(o);let s=[...o];B(s.sort((r,d)=>r-d))},[o]),t.useEffect(()=>{c.length>0&&c.length===o.length&&JSON.stringify(c)==JSON.stringify(f)&&i("user")},[c]);async function x(s){let r=document.getElementsByClassName("userBubbles");r[s].classList.add("bubblePopAnimate"),r[s].style.pointerEvents="none",h(d=>[...d,Number(r[s].children[0].innerHTML)])}function g(){h([]);let s=document.getElementsByClassName("userBubbles");for(let r=0;r<s.length;r++)s[r].classList.remove("bubblePopAnimate"),s[r].style.pointerEvents="auto"}return e.jsxs("div",{className:"bubbleSortUser",children:[e.jsx("div",{className:"userCLickableBubbles",children:v.map((s,r)=>e.jsxs("div",{className:"valueToSort userBubbles",onClick:()=>x(r),children:[e.jsx("p",{children:s}),e.jsx("div",{className:"bubbleDot"}),e.jsx("div",{className:"smallBubbleDot bubbleDot"})]},`${s} ${r}`))}),e.jsx("div",{className:"userAttempt",children:c.map((s,r)=>e.jsx("div",{children:s},r))}),e.jsx("div",{className:"buttonWrapper",children:e.jsx("button",{className:"resetBtn",onClick:g,children:"Reset"})})]})};export{L as BubbleSort,F as BubbleSortUser};
