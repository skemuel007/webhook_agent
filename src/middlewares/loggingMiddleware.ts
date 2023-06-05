import { Request, NextFunction, Response } from 'express';
import logger from '../logger/logger';

export default async (req: Request, res: Response, next: NextFunction) => {
  const { method, url, query, body } = req;

  res.on('finish', () => {
    const { statusCode } = res;

    logger.info({
      message: 'Request completed',
      method,
      url,
      query,
      body,
      statusCode,
    });
  });

  next();
};
