const e_bf = document.getElementById("bf");
const e_c = document.getElementById("c");
const btn_transpile = document.getElementById("transpile");

function bf2c(bf, t='\t') {
    return `#include <stdio.h>\nunsigned char c[30000] = {0};\nunsigned char *p = c + 14999;\n\nint main(void) {\n${bf
    .replace(/[^+\-<>.,[\]]/g, '')
    .replace(/\++|-+|<+|>+|[.,[\]]/g, m => m[0]=='+' ? t+`${(l=m.length)>1?`(*p)+=${l}`:'++*p'};\n` : m[0]=='-'?t+`${(l=m.length)>1?`(*p)-=${l}`:'--*p'};\n` : m[0]=='<'?t+`${(l=m.length)>1?`p-=${l}`:'p--'};\n` : m[0]=='>'?t+`${(l=m.length)>1?`p+=${l}`:'p++'};\n` : m=='.'?t+"putchar(*p);\n" : m==','?t+"*p = getchar();\n" : m=='['?t+"while(*p) {"+(t+='\t')+'\n' : (t=t.substr(1))+"}\n")}}`;
}

btn_transpile.addEventListener('click', function() {
    e_c.value = bf2c(e_bf.value);
});