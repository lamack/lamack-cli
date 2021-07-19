#!/usr/bin/env node
// linux或macOs下 需要 chmod 755 cli.js

//脚手架工作流程
//1. 通过命令行交互询问用户问题
//2. 根据用户回答生成文件  使用inquirer模块
//3. 用ejs模板引擎渲染
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')
const inquirer = require('inquirer')

inquirer.prompt([
    {
        type:'input',
        name:'name',
        message:'Project name?'
    }
])
.then( anwsers=>{
    // console.log(anwsers)
    const tempDir = path.join(__dirname,'templates')
    const destDir = process.cwd()
    fs.readdir(tempDir,(err,files)=>{
        if(err) throw err
        files.forEach(filename=>{
            ejs.renderFile(path.join(tempDir, filename), anwsers, (err, result)=>{
                if(err) throw err
                fs.writeFileSync(path.join(destDir,filename), result)
            })
        })
    })
})