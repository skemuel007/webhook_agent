import express, { Request, Response } from 'express';
import Config from './utils/environment_config';
import morganMiddleware from "./middlewares/morgan";
import loggingMiddleware from './middlewares/loggingMiddleware';
import logger from './logger/logger';

const app = express();
app.use(express.json());

interface WithdrawalApprovalRequest {
  event: string;
  status: string;
  environment: string;
  data: {
    amount: number;
    customerId: number;
    reference: string;
    transactionDate: string;
  };
}

app.use(loggingMiddleware);
app.use(morganMiddleware);

app.get('/', (req: Request, res: Response) => {
  return res.json({
    'data': 'Welcome'
  });
});

app.post('/webhook', (req: Request, res: Response) => {
  try {
    const body: WithdrawalApprovalRequest = req.body;

    // Access the sender's IP address
    const ipAddress = req.ip;
    logger.info(req);
    logger.info(ipAddress);

    // You can access the request body values here
    const event = body.event;
    const status = body.status;
    const environment = body.environment;
    const data = body.data;

    // Process the data or perform any necessary operations

    // Send a response
    return res.status(200).json({ message: 'Withdrawal approval request received', ipAddress });
    // res.status(500).json({ error: 'Internal server error' });

  } catch (error) {
    // Handle any errors that occurred during processing
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/hook/failure', (req: Request, res: Response) => {
  try {
    const body: WithdrawalApprovalRequest = req.body;

    // Access the sender's IP address
    const ipAddress = req.ip;
    logger.info(req);
    logger.info(ipAddress);

    // You can access the request body values here
    const event = body.event;
    const status = body.status;
    const environment = body.environment;
    const data = body.data;

    // Process the data or perform any necessary operations

    // Send a response
    // return res.status(200).json({ message: 'Withdrawal approval request received', ipAddress });
    res.status(500).json({ error: 'Internal server error' });

  } catch (error) {
    // Handle any errors that occurred during processing
    return res.status(500).json({ error: 'Internal server error' });
  }
});

const port = Config.port || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});