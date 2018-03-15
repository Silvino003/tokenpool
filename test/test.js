
var INFURA_ROPSTEN_URL = 'https://ropsten.infura.io/gmXEVo5luMPUGPqg6mhy';

const poolConfig = require('../pool.config').config;
var accountConfig = require('../test.account.config').account;


var tokenInterface = require('../lib/token-interface')
var peerInterface = require('../lib/peer-interface')
var redisInterface = require('../lib/redis-interface')
var web3utils =  require('web3-utils');
var Web3 = require('web3')
var web3 = new Web3()

var assert = require('assert');
describe('Peer Interface', function() {


  describe('Estimate Share Hashrate', function() {
    it('should return a good hashrate', function() {


      assert.equal(peerInterface.getEstimatedShareHashrate(50,30000), 2516582400) ;



    });
  });

  describe('Estimate Miner Hashrate', function() {
   it('should return a good hashrate', async function() {

     var test_mode = true;
     web3.setProvider(INFURA_ROPSTEN_URL);


     redisInterface.init(  accountConfig, poolConfig , tokenInterface ,test_mode)

     peerInterface.init(web3,accountConfig,poolConfig,redisInterface,tokenInterface,test_mode)

     var testMinerAddress = "0x00000000000000000000000000000000";
     var testMinerData = {varDiff:205 };

     var newVarDiff = await peerInterface.getUpdatedVarDiffForMiner(testMinerData,testMinerAddress)

     assert.equal(newVarDiff, 205) ;


   });
 });

  describe('Estimate Total Hashrate', function() {
   //await this.redisInterface.dropList('total_pool_hashrate')
 });

});
