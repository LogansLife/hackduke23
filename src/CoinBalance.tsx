const CoinBalanceSchema = {
  name: 'CoinBalance',
  primaryKey: 'id',
  properties: {
    id: {type: 'int', default: 0}, // Always 0 for a singleton schema
    coins: 'int',
  },
};

export default CoinBalanceSchema;
