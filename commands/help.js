function helpFn(programName){
    console.log(`
${programName} help                          lists all the commands
${programName} tree                          displays tree structure of folder
${programName} organize                      organize folder files in different categories
${programName} delete <category> <extension> delete a category or an extension in that category
${programName} show_category <category>      display existing category(/categories)
${programName} add <category> <extension>    add new category or an extension
${programName} undo_organize                 moves files in organised folder back to source folder
    `)
}

module.exports = {
    helpKey : helpFn
}