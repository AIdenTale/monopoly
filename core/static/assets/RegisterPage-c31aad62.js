import{r as c,j as e,H as d,L as m,a as r}from"./index-7972196a.js";const u=()=>{const s=c.useRef(),t=n=>{n.preventDefault();const a=encodeURIComponent(s.current.email.value),i=encodeURIComponent(s.current.password.value),o=encodeURIComponent(s.current.username.value);r.defaults.headers.post["Access-Control-Allow-Origin"]="*",r.defaults.headers.post["Access-Control-Allow-Headers"]="Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept, access-control-allow-headers",r.post("http://127.0.0.1:8000/v1/register/",{email:a,password:i,username:o}).then(l=>{l.data.status=="success"&&window.location.replace(window.origin)})};return e.jsxs("div",{className:"register__block",children:[e.jsx(d,{}),e.jsxs("div",{className:"register__form__block",children:[e.jsx("div",{className:"register__title",children:e.jsx("p",{children:"регистрация"})}),e.jsxs("form",{ref:s,className:"register__form",children:[e.jsxs("div",{className:"register__form__input",children:[e.jsx("label",{children:"Электронная почта"}),e.jsx("input",{name:"email"})]}),e.jsxs("div",{className:"register__form__input",children:[e.jsx("label",{children:"Пароль"}),e.jsx("input",{name:"password",type:"password"})]}),e.jsxs("div",{className:"register__form__input",children:[e.jsx("label",{children:"Повторите пароль"}),e.jsx("input",{})]}),e.jsxs("div",{className:"register__form__input",children:[e.jsx("label",{children:"Никнейм"}),e.jsx("input",{name:"username"})]}),e.jsx("div",{className:"register__form__button",children:e.jsx("button",{onClick:t,children:"Зарегистрироваться"})}),e.jsx(m,{to:"/login",className:"register__form__link",children:"Вход"})]})]})]})};export{u as default};
