#!/usr/bin/env node

let fs = require("fs")
let path = require("path")

let categoryModObj = require("./commands/categoryFunctions")
let helpModObj = require("./commands/help")
let org_deOrgModObj = require("./commands/organise_deorganise")
let treeModObj = require("./commands/tree")

// console.log(__dirname)

let typesFile = path.join(__dirname,"types.json")
let typesRaw = fs.readFileSync(typesFile)
let types = JSON.parse(typesRaw)

let orgFolderName = "organised_files"
let programName = "fileOrg"
let commandLineArgs = process.argv.slice(2)

let command = commandLineArgs[0]

switch(command)
{
    case "help":
        helpModObj.helpKey(programName);
        break;
    case "tree":
        treeModObj.treeKey(commandLineArgs[1]);
        break;
    case "organize":
        org_deOrgModObj.organizeKey(commandLineArgs[1],orgFolderName,types);
        break;
    case "undo_organize":
        org_deOrgModObj.undo_organizeKey(commandLineArgs[1],orgFolderName)
        break;
    case "show_category":
        categoryModObj.showKey(types, commandLineArgs.slice(1))
        break;
    case "add":
        categoryModObj.addKey(types,commandLineArgs[1],commandLineArgs.slice(2),typesFile)
        break;
    case "delete":
        categoryModObj.deleteKey(types,commandLineArgs[1],commandLineArgs.slice(2),typesFile)
        break;
    default:
        console.log("Invalid command")
        break;
}