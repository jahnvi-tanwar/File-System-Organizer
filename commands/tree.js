let fs = require("fs")
let path = require("path")

function treeFn(dirPath){
    if(dirPath==undefined){
        dirPath = process.cwd()
    }
    if(fs.existsSync(dirPath)){
        if(fs.lstatSync(dirPath).isDirectory() == true){
            treeHelper(dirPath,"")
        }else{
            console.log("Given path is not a directory")
        }
    }else{
        console.log("Given path is invalid.")
    }
}

function treeHelper(pathName, indent){

    let pathType = fs.lstatSync(pathName) 
    let baseName = path.basename(pathName)

    if(pathType.isDirectory() == true){
        console.log(indent,'└──',baseName)
        let files = fs.readdirSync(pathName)
        for(let i in files){
            treeHelper(path.join(pathName,files[i]), indent+"\t")
        }
    }else{
        console.log(indent,'├──',baseName)
    }
}

module.exports = {
    treeKey : treeFn
}