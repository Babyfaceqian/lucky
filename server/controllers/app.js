import { getJSON, getFilePath } from '../helper';
import fs from 'fs';
import JsonFormat from 'json-format';
exports.upload = async (ctx, next) => {
  let template = ctx.request.body.template;
  let templateStr = JsonFormat(template);
  fs.writeFile(getFilePath('template'), templateStr, 'utf8', (err) => {
    if (err) throw err;
    console.log('done');
  });
  let nameList = ctx.request.body.nameList;
  let nameListStr = JsonFormat(nameList);
  fs.writeFile(getFilePath('nameList'), nameListStr, 'utf8', (err) => {
    if (err) throw err;
    console.log('done');
  });
  if (ctx.request.body.initial) {
    fs.writeFile(getFilePath('template.bak'), templateStr, 'utf8', (err) => {
      if (err) throw err;
      console.log('done');
    });
    fs.writeFile(getFilePath('nameList.bak'), nameListStr, 'utf8', (err) => {
      if (err) throw err;
      console.log('done');
    });
    let html = {};
    html.templateHtml = ctx.request.body.templateHtml;
    html.nameListHtml = ctx.request.body.nameListHtml;
    let htmlStr = JsonFormat(html);
    fs.writeFile(getFilePath('html'), htmlStr, 'utf8', (err) => {
      if (err) throw err;
      console.log('done');
    });
  }
  ctx.body = {
    success: true
  }
  return next;
}

exports.getTemplate = async (ctx, next) => {
  ctx.body = {
    success: true,
    data: getJSON('template')
  }
  return next;
}
exports.getNameList = async (ctx, next) => {
  ctx.body = {
    success: true,
    data: getJSON('nameList')
  }
  return next;
}

exports.reset = async (ctx, next) => {
  let template = getJSON('template.bak');
  let nameList = getJSON('nameList.bak');
  let templateStr = JsonFormat(template);
  fs.writeFile(getFilePath('template'), templateStr, 'utf8', (err) => {
    if (err) throw err;
    console.log('done');
  });
  let nameListStr = JsonFormat(nameList);
  fs.writeFile(getFilePath('nameList'), nameListStr, 'utf8', (err) => {
    if (err) throw err;
    console.log('done');
  });
  ctx.body = {
    success: true
  }
  return next;
}

exports.getHtml = async (ctx, next) => {
  ctx.body = {
    success: true,
    data: getJSON('html')
  }
  return next;
}