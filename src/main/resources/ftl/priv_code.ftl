${a!'<#assign PrivCode = {'}
<#list menus as menu>
${a!'<#--${menu.name}-->'}
'MENU_CODE_${menu.code?upper_case?replace("-", "_")?replace(":", "_")?replace(" ", "")}': '${menu.code}',
</#list>
<#list buttons as button>
${b!'<#--${button.name}-->'}
'BTN_CODE_${button.code?upper_case?replace("-", "_")?replace(":", "_")?replace(" ", "")}': '${button.code}',
</#list>
${a!'}>'}
