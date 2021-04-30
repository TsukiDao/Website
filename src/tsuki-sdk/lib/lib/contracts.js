import BigNumber from 'bignumber.js/bignumber';
import * as Types from "./types.js";
import { SUBTRACT_GAS_LIMIT, addressMap } from './constants.js';

import ERC20Json from '../clean_build/contracts/IERC20.json';
// import UNIFactJson from './unifact2.json';
// import UNIPairJson from './uni2.json';
// import UNIRouterJson from './uniR.json';
import TsukiJson from '../clean_build/contracts/TSUKI.json'
import BNBCJson from '../clean_build/contracts/bnbc.json'
import OrchestratorJson from '../clean_build/contracts/Orchestrator.json'
import OracleJson from '../clean_build/contracts/Oracle.json'
import PolicyJson from '../clean_build/contracts/Policy.json'
import RebaserJson from '../clean_build/contracts/Rebaser.json'
import TsukiBnbLpJson from '../clean_build/contracts/UniswapPair.json'
import TsukiBnbLpPoolJson from '../clean_build/contracts/tsukibnbPool.json'
import BnbcBnbLpJson from '../clean_build/contracts/UniswapPair.json'
import BnbcBnbLpPoolJson from '../clean_build/contracts/bnbcbnbPool.json'

import TreatBnbLpJson from '../clean_build/contracts/UniswapPair.json'
import TreatBnbLpPoolJson from '../clean_build/contracts/tsukibnbPool.json'
import CakeJson from '../clean_build/contracts/cakeToken.json'
import CakePoolJson from '../clean_build/contracts/tsukibnbPool.json'
// import Community3LpJson from '../clean_build/contracts/UniswapPair.json'
// import Community3LpPoolJson from '../clean_build/contracts/tsukibnbPool.json'

import MigratorJson from "../clean_build/contracts/Migrator.json"

export class Contracts {
  constructor(
    provider,
    networkId,
    web3,
    options
  ) {
    this.web3 = web3;
    this.defaultConfirmations = options.defaultConfirmations;
    this.autoGasMultiplier = options.autoGasMultiplier || 1.5;
    this.confirmationType = options.confirmationType || Types.ConfirmationType.Confirmed;
    this.defaultGas = options.defaultGas;
    this.defaultGasPrice = options.defaultGasPrice;

    // TODO: replace with Pancakeswap contracts
    // this.uni_pair = new this.web3.eth.Contract(UNIPairJson);
    // this.uni_router = new this.web3.eth.Contract(UNIRouterJson);
    // this.uni_fact = new this.web3.eth.Contract(UNIFactJson);

    this.erc20 = new this.web3.eth.Contract(ERC20Json.abi);

    this.tsuki = new this.web3.eth.Contract(TsukiJson)
    this.bnbc = new this.web3.eth.Contract(BNBCJson)
    this.rebaser = new this.web3.eth.Contract(RebaserJson)
    this.orchestrator = new this.web3.eth.Contract(OrchestratorJson)
    this.oracle = new this.web3.eth.Contract(OracleJson)
    this.policy = new this.web3.eth.Contract(PolicyJson)
    this.tsukiBnbLp = new this.web3.eth.Contract(TsukiBnbLpJson.abi)
    this.tsukiBnbLpPool = new this.web3.eth.Contract(TsukiBnbLpPoolJson)
    this.bnbcBnbLp = new this.web3.eth.Contract(BnbcBnbLpJson.abi)
    this.bnbcBnbLpPool = new this.web3.eth.Contract(BnbcBnbLpPoolJson)
    this.tsukiPool = new this.web3.eth.Contract(TsukiBnbLpPoolJson)

    // legacy V1 pools
    this.tsukiBnbLpV1 = new this.web3.eth.Contract(TsukiBnbLpJson.abi)
    this.tsukiBnbLpV1Pool = new this.web3.eth.Contract(TsukiBnbLpPoolJson)
    this.bnbcBnbLpV1 = new this.web3.eth.Contract(BnbcBnbLpJson.abi)
    this.bnbcBnbLpV1Pool = new this.web3.eth.Contract(BnbcBnbLpPoolJson)

    this.treatBnbLp = new this.web3.eth.Contract(TreatBnbLpJson.abi)
    this.treatBnbLpPool = new this.web3.eth.Contract(TreatBnbLpPoolJson)
    this.cake = new this.web3.eth.Contract(CakeJson)
    this.cakePool = new this.web3.eth.Contract(CakePoolJson)

    this.migrator = new this.web3.eth.Contract(MigratorJson.abi);

    this.setProvider(provider, networkId);
    this.setDefaultAccount(this.web3.eth.defaultAccount);
  }


  setProvider(
    provider,
    networkId
  ) {
    this.tsuki.setProvider(provider);
    this.bnbc.setProvider(provider);
    this.rebaser.setProvider(provider);
    this.orchestrator.setProvider(provider);
    this.oracle.setProvider(provider);
    this.policy.setProvider(provider);
    this.tsukiBnbLp.setProvider(provider);
    this.tsukiBnbLpPool.setProvider(provider);
    this.bnbcBnbLp.setProvider(provider);
    this.bnbcBnbLpPool.setProvider(provider);
    this.tsukiPool.setProvider(provider);
    this.treatBnbLp.setProvider(provider);
    this.treatBnbLpPool.setProvider(provider);
    this.cake.setProvider(provider);
    this.cakePool.setProvider(provider);

    // legacy V1 pools
    this.tsukiBnbLpV1.setProvider(provider);
    this.tsukiBnbLpV1Pool.setProvider(provider);
    this.bnbcBnbLpV1.setProvider(provider);
    this.bnbcBnbLpV1Pool.setProvider(provider);

    const contracts = [
      { contract: this.migrator, json: MigratorJson },
    ]

    contracts.forEach(contract => this.setContractProvider(
        contract.contract,
        contract.json,
        provider,
        networkId,
      ),
    );

    // TODO: replace with Pancakeswap contracts
    // this.uni_fact.options.address = addressMap["uniswapFactoryV2"];
    // this.uni_router.options.address = addressMap["UNIRouter"];

    this.tsuki.options.address = addressMap["Tsuki"]
    this.bnbc.options.address = addressMap["BNBC"]
    this.tsukiBnbLp.options.address = addressMap["TsukiBnbLp"]
    this.tsukiBnbLpPool.options.address = addressMap["TsukiBnbLpPool"]
    this.bnbcBnbLp.options.address = addressMap["BnbcBnbLp"]
    this.bnbcBnbLpPool.options.address = addressMap["BnbcBnbLpPool"]
    this.tsukiPool.options.address = addressMap["TsukiPool"]
    this.treatBnbLp.options.address = addressMap["TsukiPool"]
    this.treatBnbLpPool.options.address = addressMap["TsukiPool"]
    this.cake.options.address = addressMap["TsukiPool"]
    this.cakePool.options.address = addressMap["TsukiPool"]
    this.orchestrator.options.address = addressMap["Orchestrator"]
    this.oracle.options.address = addressMap["Oracle"]
    this.policy.options.address = addressMap["Policy"]

    // legacy V1 pools
    this.tsukiBnbLpV1.options.address = addressMap["TsukiBnbLpV1"]
    this.tsukiBnbLpV1Pool.options.address = addressMap["TsukiBnbLpV1Pool"]
    this.bnbcBnbLpV1.options.address = addressMap["BnbcBnbLpV1"]
    this.bnbcBnbLpV1Pool.options.address = addressMap["BnbcBnbLpV1Pool"]

    this.pools = [
      { "tokenAddr": this.bnbc.options.address, "poolAddr": this.tsukiBnbLpPool.options.address},
      { "tokenAddr": this.bnbc.options.address, "poolAddr": this.bnbcBnbLpPool.options.address},
      { "tokenAddr": this.bnbc.options.address, "poolAddr": this.tsukiPool.options.address},
      { "tokenAddr": this.bnbc.options.address, "poolAddr": this.treatBnbLpPool.options.address},
      { "tokenAddr": this.bnbc.options.address, "poolAddr": this.cakePool.options.address},
    ]
  }

  setDefaultAccount(
    account
  ) {
    this.tsuki.options.from = account;
    this.bnbc.options.address = account;
    this.tsukiBnbLp.options.from = account;
    this.tsukiBnbLpPool.options.from = account;
    this.bnbcBnbLp.options.from = account;
    this.bnbcBnbLpPool.options.from = account;
    this.tsukiPool.options.from = account;
    this.treatBnbLp.options.from = account;
    this.treatBnbLpPool.options.from = account;
    this.cake.options.from = account;
    this.cakePool.options.from = account;
  }

  async callContractFunction(
    method,
    options
  ) {
    const { confirmations, confirmationType, autoGasMultiplier, ...txOptions } = options;

    if (!this.blockGasLimit) {
      await this.setGasLimit();
    }

    if (!txOptions.gasPrice && this.defaultGasPrice) {
      txOptions.gasPrice = this.defaultGasPrice;
    }

    if (confirmationType === Types.ConfirmationType.Simulate || !options.gas) {
      let gasEstimate;
      if (this.defaultGas && confirmationType !== Types.ConfirmationType.Simulate) {
        txOptions.gas = this.defaultGas;
      } else {
        try {
          console.log("estimating gas");
          gasEstimate = await method.estimateGas(txOptions);
        } catch (error) {
          const data = method.encodeABI();
          const { from, value } = options;
          const to = method._parent._address;
          error.transactionData = { from, value, data, to };
          throw error;
        }

        const multiplier = autoGasMultiplier || this.autoGasMultiplier;
        const totalGas = Math.floor(gasEstimate * multiplier);
        txOptions.gas = totalGas < this.blockGasLimit ? totalGas : this.blockGasLimit;
      }

      if (confirmationType === Types.ConfirmationType.Simulate) {
        let g = txOptions.gas;
        return { gasEstimate, g };
      }
    }

    if (txOptions.value) {
      txOptions.value = new BigNumber(txOptions.value).toFixed(0);
    } else {
      txOptions.value = '0';
    }

    const promi = method.send(txOptions);

    const OUTCOMES = {
      INITIAL: 0,
      RESOLVED: 1,
      REJECTED: 2,
    };

    let hashOutcome = OUTCOMES.INITIAL;
    let confirmationOutcome = OUTCOMES.INITIAL;

    const t = confirmationType !== undefined ? confirmationType : this.confirmationType;

    if (!Object.values(Types.ConfirmationType).includes(t)) {
      throw new Error(`Invalid confirmation type: ${t}`);
    }

    let hashPromise;
    let confirmationPromise;

    if (t === Types.ConfirmationType.Hash || t === Types.ConfirmationType.Both) {
      hashPromise = new Promise(
        (resolve, reject) => {
          promi.on('error', (error) => {
            if (hashOutcome === OUTCOMES.INITIAL) {
              hashOutcome = OUTCOMES.REJECTED;
              reject(error);
              const anyPromi = promi ;
              anyPromi.off();
            }
          });

          promi.on('transactionHash', (txHash) => {
            if (hashOutcome === OUTCOMES.INITIAL) {
              hashOutcome = OUTCOMES.RESOLVED;
              resolve(txHash);
              if (t !== Types.ConfirmationType.Both) {
                const anyPromi = promi ;
                anyPromi.off();
              }
            }
          });
        },
      );
    }

    if (t === Types.ConfirmationType.Confirmed || t === Types.ConfirmationType.Both) {
      confirmationPromise = new Promise(
        (resolve, reject) => {
          promi.on('error', (error) => {
            if (
              (t === Types.ConfirmationType.Confirmed || hashOutcome === OUTCOMES.RESOLVED)
              && confirmationOutcome === OUTCOMES.INITIAL
            ) {
              confirmationOutcome = OUTCOMES.REJECTED;
              reject(error);
              const anyPromi = promi ;
              anyPromi.off();
            }
          });

          const desiredConf = confirmations || this.defaultConfirmations;
          if (desiredConf) {
            promi.on('confirmation', (confNumber, receipt) => {
              if (confNumber >= desiredConf) {
                if (confirmationOutcome === OUTCOMES.INITIAL) {
                  confirmationOutcome = OUTCOMES.RESOLVED;
                  resolve(receipt);
                  const anyPromi = promi ;
                  anyPromi.off();
                }
              }
            });
          } else {
            promi.on('receipt', (receipt) => {
              confirmationOutcome = OUTCOMES.RESOLVED;
              resolve(receipt);
              const anyPromi = promi ;
              anyPromi.off();
            });
          }
        },
      );
    }

    if (t === Types.ConfirmationType.Hash) {
      const transactionHash = await hashPromise;
      if (this.notifier) {
          this.notifier.hash(transactionHash)
      }
      return { transactionHash };
    }

    if (t === Types.ConfirmationType.Confirmed) {
      return confirmationPromise;
    }

    const transactionHash = await hashPromise;
    if (this.notifier) {
        this.notifier.hash(transactionHash)
    }
    return {
      transactionHash,
      confirmation: confirmationPromise,
    };
  }

  async callConstantContractFunction(
    method,
    options
  ) {
    const m2 = method;
    const { blockNumber, ...txOptions } = options;
    return m2.call(txOptions, blockNumber);
  }

  async setGasLimit() {
    const block = await this.web3.eth.getBlock('latest');
    this.blockGasLimit = block.gasLimit - SUBTRACT_GAS_LIMIT;
  }

  setContractProvider(
    contract,
    contractJson,
    provider,
    networkId,
  ){
    contract.setProvider(provider);
    try {
      contract.options.address = contractJson.networks[networkId]
        && contractJson.networks[networkId].address;
    } catch (error) {
      // console.log(error)
    }
  }
}
