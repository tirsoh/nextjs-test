const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const fillTemplate = require('es6-dynamic-template')
const CWD = process.cwd()
const componentsDirectory = path.resolve(CWD, 'components')
const templatesDirectory = path.resolve(__dirname, 'templates')
const templates = fs.readdirSync(templatesDirectory)

inquirer
  .prompt([{
    name: 'component',
    type: 'input',
    message: `Please provide a unique name for your new component using hyphens to separate words.\ne.g. my-new-component\n`,
    validate: function (input) {
      const componentNameRegex = new RegExp(/^[a-z\-]+$/)
      const componentNameValid = componentNameRegex.test(input)
      if (!componentNameValid) {
        return `A component name can only contain lowercase letters and dashes. You entered: ${input}`
      }
      const components = fs.readdirSync(componentsDirectory)
      const componentNameExists = components.includes(input)
      if (componentNameExists) {
        return `A component with the name ${input} already exists.`
      } else {
        return true
      }
    }
  }])
  .then(answers => {
    const componentClass = answers
      .component
      .split('-')
      .map(part => `${part.charAt(0).toUpperCase()}${part.substr(1)}`)
      .join('')
    fs.mkdirSync(`${componentsDirectory}/${answers.component}`)
    templates.forEach(template => {
      const templatePath = path.resolve(templatesDirectory, template)
      const templateString = fs.readFileSync(templatePath)
      const filledTemplate = fillTemplate(templateString, { ...answers, componentClass })
      const filePath = path.resolve(componentsDirectory, answers.component, template)
      fs.writeFileSync(filePath, filledTemplate)
    })
    console.log(
      'Created component',
      `\x1b[32m${componentClass}\x1b[0m`,
      'in',
      `\x1b[32mcomponents/${answers.component}\x1b[0m`
    )
  })