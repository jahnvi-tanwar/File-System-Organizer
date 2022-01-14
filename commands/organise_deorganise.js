let fs = require("fs")
let path = require("path")

function organizeFn(dirPath, orgFolderName, types){
    if(dirPath==undefined){
        dirPath = process.cwd()
    }
    if(fs.existsSync(dirPath)){
        let orgFolderPath = path.join(dirPath,orgFolderName)
        if(fs.lstatSync(dirPath).isDirectory() == true){
            console.log(orgFolderPath)
            if(fs.existsSync(orgFolderPath) == false){
                fs.mkdirSync(orgFolderPath)
            }
            organizeHelper(dirPath,orgFolderPath, types)
        }else{
            console.log("Given path is not a directory")
        }
    }else{
        console.log("Given path is invalid.")
    }
}

function organizeHelper(srcFolder, destFolder, types){
    let files = fs.readdirSync(srcFolder)
    for(let i in files){
        let fileName = files[i]
        let filePath = path.join(srcFolder,fileName)

        if(fs.lstatSync(filePath).isFile() == true){
            let category = findCategory(filePath, types)
            let categoryFolder = path.join(destFolder,category)
            moveFile(categoryFolder, filePath)
        }
    }
}

function findCategory(filePath, types){
    let ext = path.extname(filePath).slice(1)
    //console.log(ext)
    for(let type in types){
        let categoryArr = types[type]
        if(categoryArr.includes(ext)){
            return type
        }
    }
    return "other"
}

function moveFile(destFolder, srcfilePath){
    if(fs.existsSync(destFolder) == false){
        fs.mkdirSync(destFolder)
        //console.log(srcFolder,destFolder,filePath)
    }
    let srcFileName = path.basename(srcfilePath)
    let destFilePath = path.join(destFolder,srcFileName)

    fs.copyFileSync(srcfilePath,destFilePath)
    fs.unlinkSync(srcfilePath)

    // console.log(srcfilePath,destFilePath)
    console.log(srcFileName +" ----> "+path.basename(destFolder))
}

function undo_organizeFn(srcDir, orgFolder){

    if(srcDir==undefined){
        srcDir = process.cwd()
        return;
    }else if(fs.existsSync(srcDir)){
        let orgFolderPath = path.join(srcDir,orgFolder)

        if(fs.existsSync(orgFolderPath)==false){
            console.log("organised folder doesn't exist.")
            return;
        }

        let categoryFolders = fs.readdirSync(orgFolderPath)

        for(let i in categoryFolders){
            let categoryFolderPath = path.join(orgFolderPath,categoryFolders[i])
            let allFiles = fs.readdirSync(categoryFolderPath)
            for(let i in allFiles){
                let filePath = path.join(categoryFolderPath, allFiles[i])
                moveFile(srcDir,filePath)
            }
            fs.rmdirSync(categoryFolderPath)
        }
        fs.rmdirSync(orgFolderPath)
        
    }else{
        console.log("Given path is invalid.")
    }

}

module.exports = {
    organizeKey : organizeFn,
    undo_organizeKey : undo_organizeFn
}