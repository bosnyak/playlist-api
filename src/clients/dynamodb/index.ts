import { DynamoDB } from 'aws-sdk';

const dynamoDbClientParams: DynamoDB.Types.ClientConfiguration = {};
if (process.env.IS_OFFLINE === 'true') {
  dynamoDbClientParams.region = 'localhost';
  dynamoDbClientParams.endpoint = 'http://localhost:8000';
}

const dynamoDbClient = new DynamoDB.DocumentClient(dynamoDbClientParams);

export default dynamoDbClient;
