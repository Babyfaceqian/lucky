'use strict'

import Router from 'koa-router'
import App from '../controllers/app'
module.exports = function () {
  var router = new Router({
    // prefix: '/api'
  })
  router.post('/upload', App.upload);
  router.get('/getTemplate', App.getTemplate);
  router.get('/getNameList', App.getNameList);
  router.get('/getHtml', App.getHtml);
  router.get('/reset', App.reset);
  return router
}