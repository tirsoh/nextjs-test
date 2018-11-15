const escapeRegExp = require('lodash.escaperegexp')

const markedInstance = require('marked')
const renderer = new markedInstance.Renderer()
const lexer = new markedInstance.Lexer()

const hljs = require('highlight.js/lib/highlight')
const ruby = require('highlight.js/lib/languages/ruby')
const shell = require('highlight.js/lib/languages/shell')
hljs.registerLanguage('hcl', ruby)
hljs.registerLanguage('sentinel', ruby)
hljs.registerLanguage('sh', shell)

const alertMap = {
  '=&gt;': 'success',
  '-&gt;': 'info',
  '~&gt;': 'warning',
  '!&gt;': 'danger'
}

let __anchors = []

const getAnchorLink = str => {
  if (!__anchors) {
    __anchors = []
  }

  const name = str
    .toLowerCase()
    .trim()
    .replace(/<\/?[^>]*>/g, '') // Strip links
    .replace(/\W+/g, '-') // Whitespace to -
    .replace(/^-/g, '') // No leading -
    .replace(/-+/g, '-') // Collapse --

  __anchors.push(name)
  const occurrenceCount = __anchors.filter(x => x == name).length
  if (occurrenceCount > 1) {
    return `${name}-${occurrenceCount - 1}`
  }

  return name
}

const addAlerts = str => {
  const md = new RegExp(
    `^<p>(${Object.keys(alertMap)
      .map(k => escapeRegExp(k))
      .join('|')})`
  ).exec(str)

  if (!md) {
    return str
  }

  const [, key] = md
  const className = alertMap[key]
  str = str.replace(new RegExp(`${escapeRegExp(key)}\\s+?`, 'g'), '')

  return String(
    `<div class="alert alert-${className}" role="alert">\n` +
      `${str}` +
      `</div>\n`
  )
}

const recursiveRender = str => markedInstance(str)

const unindent = str => {
  const indents = /^[ \t]+/g.exec(str)
  if (!indents) {
    return str
  }

  const shortestIndent = indents.reduce((a, b) =>
    a.length <= b.length ? a : b
  )
  return str.replace(new RegExp(`^${shortestIndent}`, 'g'), '')
}

renderer.heading = (title, level) => {
  const anchor = getAnchorLink(title)
  return String(
    `<h${level} id="${anchor}">\n` +
      `  <a name="${anchor}" class="anchor" href="#${anchor}">&raquo;</a>\n` +
      `  ${title}\n` +
      `</h${level}>\n`
  )
}

renderer.html = html => {
  html = unindent(html)
  const md = /<([\s\S]+?)>([\s\S]*)<(\/[\s\S]+?)>/.exec(html)
  if (!md) {
    return html
  }

  const [, openTag, content, closeTag] = md
  return `<${openTag}>\n${recursiveRender(content)}<${closeTag}>`
}

renderer.listitem = text => {
  const md = /^(?:<p>)?(<code>(.+?)<\/code>)/.exec(text)
  const linked = /^(<p>)?<a(.+?)>(.+?)<\/a>\s*?[-:]?/.test(text)

  if (md && !linked) {
    const [, container, name] = md
    const anchor = getAnchorLink(name)

    const replace = `<a name="${anchor}" /><a href="#${anchor}">${container}</a>`
    text = text.replace(container, replace)
  }

  return `<li>${text}</li>\n`
}

renderer.paragraph = text => addAlerts(`<p>${text.trim()}</p>\n`)

renderer.code = (code, lang) =>
  String(
    `<div class="highlight">\n` +
      `  <pre class="highlight${lang ? ` ${lang.toLowerCase()}` : ''}"><code>${
        hljs.highlightAuto(code, [lang ? lang.toLowerCase() : null]).value
      }</code></pre>\n` +
      `</div>\n`
  )

markedInstance.setOptions({
  renderer,
  tables: true,
  xhtml: true
})

// this will make the HTML parsing rule honor a single line break
// as a section break, as opposed to the default 2 line-break min

lexer.rules.html = new RegExp(
  markedInstance.Lexer.rules.html.source.replace(/\\n\{2,\}/g, '\n{1,}'),
  markedInstance.Lexer.rules.flags
)
markedInstance.Lexer = lexer

module.exports = renderer
