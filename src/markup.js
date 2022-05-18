// функция `setTimeout` вызывается => функция \`setTimeout\` вызывается
export function replaceSelection(content) {
  return content.replace(/`.+?`/g, function (v1, v2) {
    return `\\${v2}\\`;
  });
}

// функция _setTimeout_ вызывается => функция *setTimeout* вызывается
export function replaceItalic(content) {
  return content.replace(/_.+?_/g, function (v1, v2) {
    return `_${v2}_`;
  });
}

// не <i>инициализируются</i>. Доступ к ним => не _инициализируются_. Доступ к ним
export function replaceItalicTag(content) {
  return content.replace(/<i>(.+?)<\/i>/g, function (v1, v2) {
    return `_${v2}_`;
  });
}

// функция **setTimeout** вызывается => функция **setTimeout** вызывается
export function replaceBold(content) {
  return content.replace(/\*\*.+?\*\*/g, function (v1, v2) {
    return `**${v2}**`;
  });
}

/*

```javascript
console.log(info);
```

\`\`\` js
console.log(info);
\`\`\`

 */
export function replaceCode(content) {
  return content.replace(/```javascript((.|\n)+?)```/g, function (v1, v2) {
    return `\`\`\` js${v2}\`\`\``;
  });
}

/*
<img src="https://i.imgur.com/NSnDZmU.png" width="200">
![Image](https://i.imgur.com/NSnDZmU.png)
 */
export function replaceImage(content) {
  return content;
}

/*
[пост в блоге](https://www.theavocoder.com/complete-javascript/2018/12/21/by-value-vs-by-reference)
[пост в блоге](https://www.theavocoder.com/complete-javascript/2018/12/21/by-value-vs-by-reference)
 */
export function replaceLink(content) {
  return content;
}
