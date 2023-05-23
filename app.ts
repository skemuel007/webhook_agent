import express, { Request, Response } from 'express';

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

app.post('/withdrawal', (req: Request, res: Response) => {
  try {
    const body: WithdrawalApprovalRequest = req.body;

    // Access the sender's IP address
    const ipAddress = req.ip;

    // You can access the request body values here
    const event = body.event;
    const status = body.status;
    const environment = body.environment;
    const data = body.data;

    // Process the data or perform any necessary operations

    // Send a response
    res.status(200).json({ message: 'Withdrawal approval request received', ipAddress });
  } catch (error) {
    // Handle any errors that occurred during processing
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});