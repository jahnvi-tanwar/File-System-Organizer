let fs = require("fs")
let path = require("path")

function deleteCategory(typesObj, category, extensions, typesFile){

    if(typesObj[category] != undefined){
        if(extensions.length == 0){
            delete typesObj[category]
            console.log(`Category ${category} deleted.`)
        }else{
            for(let i in extensions){
                let ind = typesObj[category].indexOf(extensions[i])
                if(ind == -1){
                    console.log(`${extensions[i]} doesn't exist.`)
                }else{
                    typesObj[category].splice(ind,1)
                    console.log(`Extension ${extensions[i]} deleted.`)
                }
            }
        }
        fs.writeFileSync(typesFile,JSON.stringify(typesObj))
    }else{
        console.log(`${category} doesn't exist`)
    }
}

function union(arr2, arr1){
    let difference = arr1.filter(v=>!arr2.includes(v))
    if(difference.length == 0) return difference;
    return arr2.concat(difference)
}

function addCategory(typesObj, category, extensions, typesFile){

    if(category == undefined){
        console.log("No category given")
        return;
    }
    // console.log(typesObj[category])
    if(typesObj[category]!=undefined){
        let existingExt = typesObj[category];
        let unionRes = union(existingExt,extensions)

        if(unionRes.length>0){
            typesObj[category] = unionRes
            fs.writeFileSync(typesFile,JSON.stringify(typesObj))

            console.log("Addition done")
            console.log(category,":",typesObj[category])
        }else{
            console.log("Requested addition already exists.")
            console.log(category,":",typesObj[category])
        }

        return;
    }

    typesObj[category] = extensions
    fs.writeFileSync(typesFile,JSON.stringify(typesObj))

    console.log("Addition done")
    console.log(category,":",typesObj[category])
}

function show_categoryFn(typesObj, categoryArr){

    if(categoryArr.length == 0){
        for(let type in typesObj){
            console.log(`${type} : ${typesObj[type]}`)
        }
    }else{
        for(let i in categoryArr){
            let category = categoryArr[i]
            if(types[category]!=undefined){
                console.log(`${category} : ${types[category]}`)
            }else{
                console.log(`${category} doesn't exist.`)
            }
        }
    }
}

module.exports = {
    deleteKey : deleteCategory,
    addKey : addCategory,
    showKey : show_categoryFn
}
