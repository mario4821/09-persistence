'use strict';

const logger = require('../lib/logger');
const Dragon = require('../model/dragon');
const storage = require('../lib/storage');
const response = require('../lib/response');

module.exports = function routeDragon(router) {
  router.post('/api/v1/dragon', (req, res) => {
    logger.log(logger.INFO, 'ROUTE-DRAGON: POST /api/v1/dragon');

    try {
      const newDragon = new Dragon(req.body.title, req.body.content);
      storage.create('Dragon', newDragon)
        .then((dragon) => {
          response.sendJSON(res, 201, dragon);
          return undefined;
        });
    } catch (err) {
      logger.log(logger.ERROR, `ROUTE-DRAGON: There was a bad request ${err}`);
      response.sendText(res, 400, err.message);
      return undefined;
    }
    return undefined;
  });

  router.get('/api/v1/dragon', (req, res) => {
    if (req.url.query.id) {
    storage.fetchOne('Dragon', req.url.query.id)
      .then((item) => {
        response.sendJSON(res, 200, item);
      })
      .catch((err) => {
        logger.log(logger.ERROR, JSON.stringify(err));
        response.sendText(res, 404, 'No Id - Id Required');
      });
    } else {
      storage.fetchAll('Dragon', req.body)
        .then((item) => {
          response.sendJSON(res, 200, item);
        })
        .catch((err) => {
          logger.log(logger.ERROR, err, JSON.stringify(err));
          response.sendText(res, 404, 'Resource not found');
        });
      }
  });
  
  router.delete('/api/dragon', (req, res) => {
    storage.delete('Dragon', req,url.query.id)
    .then(() => {
      response.sendText(res, 204, 'The dragon has been deleted');
      return undefined;
    })
     .catch ((err) => {
 logger.log(logger.ERROR, JSON.stringify(err));
 response.sendText(res, 404, 'Resource not found');
 return undefined;
     });
     return undefined;
    });
  };

