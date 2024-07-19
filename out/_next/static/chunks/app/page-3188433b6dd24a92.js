(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{1348:function(e,t,i){Promise.resolve().then(i.bind(i,1969))},1969:function(e,t,i){"use strict";i.r(t);var s=i(7437),a=i(2265),n=i(7449),l=i.n(n),r=i(5614),c=i(6706),o=i(8184),h=i(6780),d=i(690);i(8621),t.default=()=>{let[e,t]=(0,a.useState)(null),[i,n]=(0,a.useState)(""),[m,x]=(0,a.useState)(!1),[p,g]=(0,a.useState)(300),[j,b]=(0,a.useState)(null),[f,v]=(0,a.useState)(""),[N,C]=(0,a.useState)(""),[y,k]=(0,a.useState)("inches"),w=(0,a.useCallback)(e=>{let i=new Image;i.onload=function(){let e=this.width,i=this.height,s=(e/i).toFixed(2),a=(e*i/1e6).toFixed(2);t({width:e,height:i,aspectRatio:s,megapixels:a,suitable:parseFloat(a)>=6})},i.src=URL.createObjectURL(e),n(i.src)},[]),P=(0,a.useMemo)(()=>{let t,i,s,a,n;if(!e)return null;if(null!==j){if("custom"===j){if(t=parseFloat(f),i=parseFloat(N),isNaN(t)||isNaN(i))return null;"cm"===y&&(t/=2.54,i/=2.54)}else{if(!u[j])return null;t=u[j].width,i=u[j].height}s=a=Math.min(e.width/t,e.height/i)}else s=p,t=e.width/s,i=e.height/s,a=Math.min(e.width/t,e.height/i);let l=2.54*t,r=2.54*i;n=s>=300?"Excellent":s>=200?"Good":s>=150?"Fair":"Poor";let c=Math.min(100,Math.round(s/300*100));return{dpi:s.toFixed(0),maxDpi:a.toFixed(0),quality:n,qualityScore:c,width:t.toFixed(2),height:i.toFixed(2),widthCm:l.toFixed(2),heightCm:r.toFixed(2)}},[e,p,j,f,N,y]),D=(0,a.useCallback)(e=>{e&&e.type.startsWith("image/")?w(e):alert("Please upload a valid image file.")},[w]),F=(0,a.useCallback)(e=>{e.preventDefault(),e.stopPropagation(),x(!0)},[]),I=(0,a.useCallback)(e=>{e.preventDefault(),e.stopPropagation(),x(!1)},[]),S=(0,a.useCallback)(e=>{e.preventDefault(),e.stopPropagation()},[]),M=(0,a.useCallback)(e=>{e.preventDefault(),e.stopPropagation(),x(!1);let t=e.dataTransfer.files[0];t&&D(t)},[D]),q=(0,a.useCallback)(()=>{t(null),n(""),g(300),b(null),v(""),C(""),k("inches"),x(!1);let e=document.getElementById("fileInput");e&&(e.value="")},[]);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(l(),{children:[(0,s.jsx)("title",{children:"Poster Print Checker"}),(0,s.jsx)("meta",{name:"description",content:"Check if your image is suitable for poster printing."}),(0,s.jsx)("meta",{property:"og:title",content:"Poster Print Checker"}),(0,s.jsx)("meta",{property:"og:description",content:"Check if your image is suitable for poster printing."}),(0,s.jsx)("meta",{property:"og:image",content:"/path/to/your/image.jpg"}),(0,s.jsx)("meta",{name:"robots",content:"index, follow"}),(0,s.jsx)("link",{rel:"canonical",href:"https://yourwebsite.com"})]}),(0,s.jsxs)(r.q,{children:[(0,s.jsx)("meta",{charSet:"utf-8"}),(0,s.jsx)("title",{children:"Poster Print Checker"}),(0,s.jsx)("meta",{name:"description",content:"Check if your image is suitable for poster printing."}),(0,s.jsx)("meta",{property:"og:title",content:"Poster Print Checker"}),(0,s.jsx)("meta",{property:"og:description",content:"Check if your image is suitable for poster printing."}),(0,s.jsx)("meta",{property:"og:image",content:"/path/to/your/image.jpg"}),(0,s.jsx)("meta",{name:"robots",content:"index, follow"}),(0,s.jsx)("link",{rel:"canonical",href:"https://yourwebsite.com"})]}),(0,s.jsxs)("div",{className:"container",children:[(0,s.jsxs)("div",{className:"header",children:[(0,s.jsx)("h1",{children:"Poster Print Checker"}),(0,s.jsxs)("button",{onClick:q,className:"btn outline sm",children:[(0,s.jsx)(c.Z,{className:"icon"})," Reset"]})]}),(0,s.jsx)("p",{children:"Upload an image to check if it's suitable for poster printing."}),(0,s.jsxs)("div",{className:"dropzone ".concat(m?"dragging":""),onDragEnter:F,onDragLeave:I,onDragOver:S,onDrop:M,children:[(0,s.jsx)("input",{type:"file",accept:"image/*",onChange:e=>e.target.files&&e.target.files[0]&&D(e.target.files[0]),className:"hidden",id:"fileInput"}),(0,s.jsxs)("label",{htmlFor:"fileInput",className:"dropzone-label",children:[(0,s.jsx)(o.Z,{className:"icon"}),(0,s.jsx)("p",{children:"Drag and drop an image here, or click to select a file"})]})]}),i&&(0,s.jsxs)("div",{className:"preview",children:[(0,s.jsx)("h2",{children:"Image Preview"}),(0,s.jsx)("img",{src:i,alt:"Preview",className:"preview-image"})]}),e&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{className:"result ".concat(e.suitable?"suitable":"not-suitable"),children:(0,s.jsxs)("div",{className:"result-content",children:[(0,s.jsx)(h.Z,{className:"icon ".concat(e.suitable?"suitable-icon":"not-suitable-icon")}),(0,s.jsx)("p",{children:e.suitable?"This image is suitable for poster printing!":"This image might not be suitable for large poster prints. Consider using a higher resolution image."})]})}),(0,s.jsxs)("div",{className:"analysis",children:[(0,s.jsx)("h2",{children:"Image Analysis"}),(0,s.jsxs)("p",{children:["Dimensions: ",e.width,"x",e.height," pixels"]}),(0,s.jsxs)("p",{children:["Aspect Ratio: ",e.aspectRatio]}),(0,s.jsxs)("p",{children:["Megapixels: ",e.megapixels]}),(0,s.jsx)("h3",{children:"Poster Print Calculator"}),(0,s.jsxs)("div",{className:"dpi-buttons",children:[(0,s.jsxs)("label",{className:"flex items-center",children:["DPI:",(0,s.jsxs)("div",{className:"tooltip",children:[(0,s.jsx)("div",{className:"tooltip-trigger",children:(0,s.jsx)(d.Z,{className:"icon"})}),(0,s.jsx)("div",{className:"tooltip-content",children:(0,s.jsx)("p",{children:"DPI (Dots Per Inch) affects print quality. Higher DPI generally means better quality."})})]})]}),[150,300,600].map(e=>(0,s.jsxs)("button",{className:"btn xs ".concat(p===e&&null===j?"default":"outline"),onClick:()=>{g(e),b(null)},children:[(0,s.jsx)("div",{children:e}),(0,s.jsx)("div",{children:150===e?"(Standard)":300===e?"(High)":"(Ultra-High)"})]},e)),P&&(0,s.jsxs)("button",{className:"btn xs ".concat(null!==j?"default":"outline"),onClick:()=>{b(null===j?0:j),g(parseInt(P.maxDpi))},children:[(0,s.jsx)("div",{children:P.maxDpi}),(0,s.jsx)("div",{children:P.maxDpi?"(Max)":"Max DPI"})]})]}),(0,s.jsxs)("div",{className:"size-buttons",children:[(0,s.jsx)("label",{children:"Select Poster Size:"}),(0,s.jsxs)("div",{className:"size-grid",children:[u.map((e,t)=>(0,s.jsx)("button",{className:"btn xs ".concat(j===t?"default":"outline"),onClick:()=>b(t),children:(0,s.jsxs)("span",{className:"text-left",children:[e.width,'" x ',e.height,'" (',e.widthCm," cm x ",e.heightCm," cm)"]})},e.name)),(0,s.jsx)("button",{className:"btn xs ".concat("custom"===j?"default":"outline"),onClick:()=>b("custom"),children:"Custom"})]})]}),"custom"===j&&(0,s.jsxs)("div",{className:"custom-size",children:[(0,s.jsxs)("div",{className:"custom-size-inputs",children:[(0,s.jsx)("div",{children:(0,s.jsx)("input",{type:"number",value:f,onChange:e=>v(e.target.value),placeholder:"Width",className:"input"})}),(0,s.jsx)("div",{children:(0,s.jsx)("input",{type:"number",value:N,onChange:e=>C(e.target.value),placeholder:"Height",className:"input"})})]}),(0,s.jsxs)("div",{className:"unit-buttons",children:[(0,s.jsx)("button",{className:"btn sm ".concat("inches"===y?"default":"outline"),onClick:()=>k("inches"),children:"Inches"}),(0,s.jsx)("button",{className:"btn sm ".concat("cm"===y?"default":"outline"),onClick:()=>k("cm"),children:"Centimeters"})]})]}),P&&(0,s.jsxs)("div",{className:"analysis-results",children:[(0,s.jsx)("h4",{children:"Analysis Results:"}),(0,s.jsxs)("p",{children:["Print Size: ",P.width,'" x ',P.height,'" (',P.widthCm," cm x ",P.heightCm," cm)"]}),(0,s.jsxs)("p",{children:["Effective DPI: ",P.dpi]}),(0,s.jsxs)("div",{className:"quality-bar",children:[(0,s.jsx)("label",{children:"Print Quality:"}),(0,s.jsx)("div",{className:"quality-bar-container",children:(0,s.jsx)("div",{className:"quality-bar-fill",style:{width:"".concat(P.qualityScore,"%")}})}),(0,s.jsxs)("span",{children:[P.quality," (",P.qualityScore,"%)"]})]})]})]})]})]})]})};let u=[{name:'18" x 24"',width:18,height:24},{name:'24" x 36"',width:24,height:36},{name:'27" x 40"',width:27,height:40},{name:'30" x 40"',width:30,height:40},{name:'36" x 48"',width:36,height:48}].map(e=>({...e,widthCm:Math.round(2.54*e.width),heightCm:Math.round(2.54*e.height)}))},8621:function(){}},function(e){e.O(0,[377,430,971,23,744],function(){return e(e.s=1348)}),_N_E=e.O()}]);