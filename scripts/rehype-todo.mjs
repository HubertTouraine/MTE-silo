// Plugin rehype : entoure chaque « [À COMPLÉTER …] » écrit dans le Markdown d'un <mark class="todo">
const RE = /\[À COMPLÉTER[^\]]*\]/g;
export default function rehypeTodo() {
  const walk = (node) => {
    if (!node.children) return;
    const out = [];
    for (const child of node.children) {
      if (child.type === 'text' && RE.test(child.value)) {
        RE.lastIndex = 0;
        let last = 0;
        for (const m of child.value.matchAll(RE)) {
          if (m.index > last) out.push({ type: 'text', value: child.value.slice(last, m.index) });
          out.push({ type: 'element', tagName: 'mark', properties: { className: ['todo'] }, children: [{ type: 'text', value: m[0] }] });
          last = m.index + m[0].length;
        }
        if (last < child.value.length) out.push({ type: 'text', value: child.value.slice(last) });
      } else {
        walk(child);
        out.push(child);
      }
    }
    node.children = out;
  };
  return (tree) => walk(tree);
}
