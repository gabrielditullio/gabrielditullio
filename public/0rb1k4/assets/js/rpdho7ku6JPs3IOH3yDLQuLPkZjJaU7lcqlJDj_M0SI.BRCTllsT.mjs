import{t as e}from"./rolldown-runtime.xflRBAG9.mjs";async function t(e,t,i){let a=r[e],o=a?await a(t,i):void 0,s={bodyEnd:[],bodyStart:[],headEnd:[],headStart:[]};for(let t of n){if(t.pageIds&&!t.pageIds.has(e))continue;let n=t.code(o);n&&s[t.placement].push({...t,code:n})}return s}var n,r,i,a;e((()=>{n=[{code:e=>`<!-- Google Tag Manager -->\r
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\r
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\r
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\r
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\r
})(window,document,'script','dataLayer','GTM-562D9JCH');<\/script>\r
<!-- End Google Tag Manager -->`,id:`legacy-headStart`,loadMode:`always`,name:`GTM`,pageIds:new Set([`S8rEbYcUc`,`AINLuIbH4`,`nbihfIC0B`,`GHe6WHAyB`,`gLlNMSJx5`,`NRMeUEAM2`,`FtTf559gd`]),placement:`headStart`},{code:e=>`<!-- Google Tag Manager (noscript) -->\r
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-562D9JCH"\r
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>\r
<!-- End Google Tag Manager (noscript) -->`,id:`legacy-bodyStart`,loadMode:`always`,name:`GTM`,pageIds:new Set([`S8rEbYcUc`,`AINLuIbH4`,`nbihfIC0B`,`GHe6WHAyB`,`gLlNMSJx5`,`NRMeUEAM2`,`FtTf559gd`]),placement:`bodyEnd`},{code:e=>`<script src="https://cdn1.zouti.com.br/scripts/params/persistence.min.js"><\/script>`,id:`nyzKVwrud`,loadMode:`once`,name:`SCK Zouti - Ingressos`,pageIds:new Set([`NRMeUEAM2`,`S8rEbYcUc`,`FtTf559gd`,`nbihfIC0B`]),placement:`headStart`},{code:e=>`<script src="//code.jivosite.com/widget/elC803feWO" async><\/script>`,id:`legacy-headEnd-FChXg82Df`,loadMode:`once`,name:`Jivo`,pageIds:new Set([`S8rEbYcUc`,`oouzybrIh`]),placement:`bodyEnd`},{code:e=>`<script src="https://imagine.orbyka.com/dist/progressbar/main.js?v=4" type="text/javascript"><\/script>\r
<script>\r
   const params = [\r
        {\r
            projeto: 'rise',\r
            bar_element: 'Barra de Progresso',\r
            text_element: 'Texto Progresso - Percentual',\r
            maximo: 30\r
        }\r
    ]\r
<\/script>`,id:`gfG2xxbhv`,loadMode:`always`,name:`Barra de progresso - p1`,pageIds:new Set([`S8rEbYcUc`,`NRMeUEAM2`,`FtTf559gd`,`fmjEIqsf8`]),placement:`bodyEnd`},{code:e=>`<script>\r
    window.setInterval(() => {\r
        params.forEach(config => fetchData(config));\r
    }, 3000);\r
    document.addEventListener('DOMContentLoaded', () => {\r
        params.forEach(config => fetchData(config));\r
    });\r
<\/script>`,id:`qh6Qun_u4`,loadMode:`always`,name:`Barra de progresso - p2`,pageIds:new Set([`S8rEbYcUc`,`NRMeUEAM2`,`FtTf559gd`,`fmjEIqsf8`]),placement:`bodyEnd`},{code:e=>`<meta name="robots" content="noindex">\r
<meta name="googlebot" content="noindex">`,id:`legacy-headStart-FOi8IdesO`,loadMode:`once`,name:`Bloquear indexação`,pageIds:new Set([`FOi8IdesO`,`N2GQStzRg`,`swdfRAXXc`,`oouzybrIh`,`gLlNMSJx5`]),placement:`headStart`},{code:e=>`<!-- 1. Acelera DNS/TCP para o host do script -->\r
<link rel="preconnect" href="https://gistcdn.githack.com" crossorigin>\r
<link rel="dns-prefetch" href="https://gistcdn.githack.com">\r
<!-- 2. Preload para baixar o .js assim que possível -->\r
<link rel="preload" as="script"\r
      href="https://orbyka.com/public_assets/FormFramer.js">\r
<!-- 3. (Opcional) CSS mínimo inline para overlay, evita FOUC -->\r
<style>\r
  .fc-loading-overlay {\r
    display: none;\r
    position: absolute;\r
    inset: 0;\r
    justify-content: center;\r
    align-items: center;\r
    background-color: rgba(0,0,0,0.7);\r
  }\r
</style>\r
<!-- 4. Defina a configuração ANTES de carregar o script -->\r
<script>\r
  window.FormCreatorConfig = {\r
    form: {\r
      post: true,\r
      form_id: '17',\r
      action_url:  'https://orbyka76006.activehosted.com/proc.php',\r
      success_url: 'https://orbyka76006.activehosted.com/proc.php',\r
      error_url:   'https://orbyka76006.activehosted.com/proc.php'\r
    },\r
    fieldMapping: {\r
      utm_source:   'field[1]',\r
      utm_medium:   'field[5]',\r
      utm_campaign: 'field[2]',\r
      utm_content:  'field[4]',\r
      utm_term:     'field[3]'\r
    },\r
    pages: [\r
      [\r
        { label: 'E-mail',         type: 'email', id: 'email', required: true, placeholder: 'Seu melhor email' },\r
        { label: 'WhatsApp',       type: 'phone', id: 'phone', required: true, default: '+55' }\r
      ]\r
    ],\r
    buttonText: {\r
      prev:   'Voltar',\r
      next:   'Próximo',\r
      submit: 'FAZER INSCRIÇÃO'\r
    },\r
    styles: {\r
      formClass:           'form-main',\r
      wrapperClass:        'form-wrapper',\r
      pageWrapperClass:    'form-page',\r
      fieldGroupClass:     'field-group',\r
      labelClass:          'fc-label',\r
      phoneWrapperClass:   'fc-phone-wrapper',\r
      selectClass:         'fc-ddi-select',\r
      fieldClass:          'fc-field',\r
      navWrapperClass:     'form-navigation',\r
      prevButtonClass:     'btn-voltar',\r
      nextButtonClass:     'btn-proximo',\r
      submitButtonClass:   'btn-enviar'\r
    },\r
    overlay: {\r
      className:    'fc-loading-overlay',\r
      styles:       { backgroundColor: 'rgba(0,0,0,0.7)' },\r
      displayStyle: 'flex'\r
    },\r
    timeParamName: 'fill_start_time'\r
  };\r
<\/script>\r
<!-- 5. Carregue o FormCreatorStrict.js com defer -->\r
<script\r
  defer\r
  src="https://orbyka.com/public_assets/FormFramer.js?v=1.4.60">\r
<\/script>`,id:`legacy-headEnd-GHe6WHAyB`,loadMode:`once`,name:`Forms - p1`,pageIds:new Set([`GHe6WHAyB`]),placement:`headEnd`},{code:e=>`<style>\r
    *:focus{\r
    outline:none;\r
    }\r
\r
  .fc-field {\r
        background-color: rgba(0,0,0,0.7) !important;\r
        color: #ffffff;\r
        backdrop-filter:blur(12px);\r
        border:1px #ffffff solid;\r
  }\r
    .fc-field:focus {\r
        border:1px #D61200 solid;\r
  }\r
</style>\r
\r
<style>\r
       .btn-enviar {\r
    background-color: #D61200\r
  }\r
  </style>`,id:`legacy-bodyEnd-GHe6WHAyB`,loadMode:`once`,name:`Forms - p2`,pageIds:new Set([`GHe6WHAyB`]),placement:`bodyEnd`},{code:e=>`<!-- 1. Acelera DNS/TCP para o host do script -->\r
<link rel="preconnect" href="https://gistcdn.githack.com" crossorigin>\r
<link rel="dns-prefetch" href="https://gistcdn.githack.com">\r
<!-- 2. Preload para baixar o .js assim que possível -->\r
<link rel="preload" as="script"\r
      href="https://orbyka.com/public_assets/FormFramerClean.js">\r
<!-- 3. (Opcional) CSS mínimo inline para overlay, evita FOUC -->\r
<style>\r
  .fc-loading-overlay {\r
    display: none;\r
    position: absolute;\r
    inset: 0;\r
    justify-content: center;\r
    align-items: center;\r
    background-color: rgba(0,0,0,0.7);\r
  }\r
</style>\r
<!-- 4. Defina a configuração ANTES de carregar o script -->\r
<script>\r
  window.FormCreatorConfig = {\r
    form: {\r
      post: true,\r
      form_id: '23',\r
      action_url:  'https://orbyka76006.activehosted.com/proc.php',\r
      success_url: 'https://orbyka76006.activehosted.com/proc.php',\r
      error_url:   'https://orbyka76006.activehosted.com/proc.php'\r
    },\r
    fieldMapping: {\r
      utm_source:   'field[1]',\r
      utm_medium:   'field[5]',\r
      utm_campaign: 'field[2]',\r
      utm_content:  'field[4]',\r
      utm_term:     'field[3]'\r
    },\r
    pages: [\r
      [\r
        { label: 'E-mail',         type: 'email', id: 'email', required: true, placeholder: 'Seu melhor email' },\r
        { label: 'WhatsApp',       type: 'phone', id: 'phone', required: true, default: '+55' }\r
      ]\r
    ],\r
    buttonText: {\r
      prev:   'Voltar',\r
      next:   'Próximo',\r
      submit: 'IR PARA O CHECKOUT'\r
    },\r
    styles: {\r
      formClass:           'form-main',\r
      wrapperClass:        'form-wrapper',\r
      pageWrapperClass:    'form-page',\r
      fieldGroupClass:     'field-group',\r
      labelClass:          'fc-label',\r
      phoneWrapperClass:   'fc-phone-wrapper',\r
      selectClass:         'fc-ddi-select',\r
      fieldClass:          'fc-field',\r
      navWrapperClass:     'form-navigation',\r
      prevButtonClass:     'btn-voltar',\r
      nextButtonClass:     'btn-proximo',\r
      submitButtonClass:   'btn-enviar'\r
    },\r
    overlay: {\r
      className:    'fc-loading-overlay',\r
      styles:       { backgroundColor: 'rgba(0,0,0,0.7)' },\r
      displayStyle: 'flex'\r
    },\r
    timeParamName: 'fill_start_time'\r
  };\r
<\/script>\r
<!-- 5. Carregue o FormCreatorStrict.js com defer -->\r
<script\r
  defer\r
  src="https://orbyka.com/public_assets/FormFramer.js?v=1.4.60">\r
<\/script>`,id:`IHxitZIiv`,loadMode:`always`,name:`Forms -  p1`,pageIds:new Set([`d3z0x2mOy`]),placement:`headEnd`},{code:e=>`<link href="https://imagine.orbyka.com/forms/form.css.rise?v=2" type="text/css" rel="stylesheet">`,id:`w7GOK36D5`,loadMode:`always`,name:`Forms - p2`,pageIds:new Set([`d3z0x2mOy`]),placement:`bodyEnd`},{code:e=>`<script type="text/javascript">\r
    (function(c,l,a,r,i,t,y){\r
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};\r
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;\r
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);\r
    })(window, document, "clarity", "script", "pbx9cf9jrl");\r
<\/script>`,id:`XesjAdMBX`,loadMode:`always`,name:`Clarity`,placement:`bodyEnd`}],r={},i={bodyEnd:[`legacy-bodyStart`,`legacy-headEnd-FChXg82Df`,`gfG2xxbhv`,`qh6Qun_u4`,`legacy-bodyEnd-GHe6WHAyB`,`w7GOK36D5`,`XesjAdMBX`],bodyStart:[],headEnd:[`legacy-headEnd-GHe6WHAyB`,`IHxitZIiv`,`MApAXcFjD`],headStart:[`legacy-headStart`,`nyzKVwrud`,`legacy-headStart-FOi8IdesO`]},a={exports:{snippetsSorting:{type:`variable`,annotations:{framerContractVersion:`1`}},getSnippets:{type:`function`,annotations:{framerContractVersion:`1`}},__FramerMetadata__:{type:`variable`}}}}))();export{a as __FramerMetadata__,t as getSnippets,i as snippetsSorting};
//# sourceMappingURL=rpdho7ku6JPs3IOH3yDLQuLPkZjJaU7lcqlJDj_M0SI.BRCTllsT.mjs.map