import {ethers} from 'ethers'
import Web3 from 'web3'
import BigNumber from 'bignumber.js'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

const GAS_LIMIT = {
  STAKING: {
    DEFAULT: 200000,
    SNX: 850000,
  }
};

export const getPoolStartTime = async (poolContract) => {
  return await poolContract.methods.starttime().call()
}

export const stake = async (tsuki, pool, amount, account, onTxHash) => {
  const poolContract = pool === 'tsuki' ? tsuki.contracts.tsukiPool : pool === 'tsukiBnbLp' ? tsuki.contracts.tsukiBnbLpPool : pool === 'bnbcBnbLp' ? tsuki.contracts.bnbcBnbLpPool : null
  if(poolContract === null) {
    console.warn('pool not found:', pool)
    return false
  }

  let now = new Date().getTime() / 1000;
  // const gas = GAS_LIMIT.STAKING[tokenName.toUpperCase()] || GAS_LIMIT.STAKING.DEFAULT;
  const gas = GAS_LIMIT.STAKING.DEFAULT
  if (now >= 1597172400) {
    return poolContract.methods
      .stake((new BigNumber(amount).times(new BigNumber(10).pow(18))).toString())
      .send({ from: account, gas }, async (error, txHash) => {
        if (error) {
          onTxHash && onTxHash('')
          console.log("Staking error", error)
          return false
        }
        onTxHash && onTxHash(txHash)
        const status = await waitTransaction(tsuki.web3.eth, txHash)
        if (!status) {
          console.log("Staking transaction failed.")
          return false
        }
        return true
      })
  } else {
    alert("pool not active");
  }
}

export const unstake = async (tsuki, pool, amount, account, onTxHash) => {
  const poolContract = pool === 'tsuki' ? tsuki.contracts.tsukiPool : pool === 'tsukiBnbLp' ? tsuki.contracts.tsukiBnbLpPool : pool === 'bnbcBnbLp' ? tsuki.contracts.bnbcBnbLpPool : null
  if(poolContract === null) {
    console.warn('pool not found:', pool)
    return false
  }

  let now = new Date().getTime() / 1000;
  if (now >= 1597172400) {
    return poolContract.methods
      .withdraw((new BigNumber(amount).times(new BigNumber(10).pow(18))).toString())
      .send({ from: account, gas: 200000 }, async (error, txHash) => {
        if (error) {
          onTxHash && onTxHash('')
          console.log("Unstaking error", error)
          return false
        }
        onTxHash && onTxHash(txHash)
        const status = await waitTransaction(tsuki.web3.eth, txHash)
        if (!status) {
          console.log("Unstaking transaction failed.")
          return false
        }
        return true
      })
  } else {
    alert("pool not active");
  }
}

export const harvest = async (tsuki, pool, account, onTxHash) => {
  const poolContract = pool === 'tsuki' ? tsuki.contracts.tsukiPool : pool === 'tsukiBnbLp' ? tsuki.contracts.tsukiBnbLpPool : pool === 'bnbcBnbLp' ? tsuki.contracts.bnbcBnbLpPool : null
  if(poolContract === null) {
    console.warn('pool not found:', pool)
    return false
  }

  let now = new Date().getTime() / 1000;
  if (now >= 1597172400) {
    return poolContract.methods
      .getReward()
      .send({ from: account, gas: 200000 }, async (error, txHash) => {
        if (error) {
          onTxHash && onTxHash('')
          console.log("Harvest error", error)
          return false
        }
        onTxHash && onTxHash(txHash)
        const status = await waitTransaction(tsuki.web3.eth, txHash)
        if (!status) {
          console.log("Harvest transaction failed.")
          return false
        }
        return true
      })
  } else {
    alert("pool not active");
  }
}

export const redeem = async (tsuki, pool, account, onTxHash) => {
  const poolContract = pool === 'tsuki' ? tsuki.contracts.tsukiPool : pool === 'tsukiBnbLp' ? tsuki.contracts.tsukiBnbLpPool : pool === 'bnbcBnbLp' ? tsuki.contracts.bnbcBnbLpPool : null
  if(poolContract === null) {
    console.warn('pool not found:', pool)
    return false
  }
  let now = new Date().getTime() / 1000;
  if (now >= 1597172400) {
    return poolContract.methods
      .exit()
      .send({ from: account, gas: 400000 }, async (error, txHash) => {
        if (error) {
          onTxHash && onTxHash('')
          console.log("Redeem error", error)
          return false
        }
        onTxHash && onTxHash(txHash)
        const status = await waitTransaction(tsuki.web3.eth, txHash)
        if (!status) {
          console.log("Redeem transaction failed.")
          return false
        }
        return true
      })
  } else {
    alert("pool not active");
  }
}

export const approve = async (tokenContract, poolContract, account) => {
  return tokenContract.methods
    .approve(poolContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account, gas: 80000 })
}

export const getPoolContracts = async (tsuki) => {
  const pools = Object.keys(tsuki.contracts)
    .filter(c => c.indexOf('_pool') !== -1)
    .reduce((acc, cur) => {
      const newAcc = { ...acc }
      newAcc[cur] = tsuki.contracts[cur]
      return newAcc
    }, {})
  return pools
}

export const getEarned = async (tsuki, pool, account) => {
  // TODO: which contract has this?
  // const scalingFactor = new BigNumber(await tsuki.contracts.tsukiV3.methods.tsukisScalingFactor().call())
  const scalingFactor = new BigNumber("1000000000000000000")
  const earned = new BigNumber(await pool.methods.earned(account).call())
  return earned.multipliedBy(scalingFactor.dividedBy(new BigNumber(10).pow(18)))
}

export const getStaked = async (tsuki, pool, account) => {
  return tsuki.toBigN(await pool.methods.balanceOf(account).call())
}

export const getCurrentPrice = async (tsuki) => {
  return new BigNumber(
    await tsuki.contracts.oracle.methods.getCurrentTWAP().call()
  )
}

export const getTargetPrice = async (tsuki) => {
  return tsuki.toBigN(1).toFixed(2);
}

export const rebase = async (account, tsuki) => {
  try {
    return await tsuki.contracts.orchestrator.methods.rebase().send({from: account})
  } catch (error) {
    console.error(error)
  }
}

export const getTotalSupply = async (tsuki) => {
  return tsuki && (await tsuki.contracts.bnbc.methods.totalSupply().call())
}

export const getStats = async (tsuki) => {
  const curPrice = await getCurrentPrice(tsuki)
  const targetPrice = await getTargetPrice(tsuki)
  const totalSupply = await getTotalSupply(tsuki)
  return {
    curPrice,
    targetPrice,
    totalSupply,
  }
}

export const vote = async (tsuki, account) => {
  return tsuki.contracts.gov.methods.castVote(0, true).send({ from: account })
}

export const delegate = async (tsuki, account) => {
  return tsuki.contracts.tsuki.methods.delegate("0x683A78bA1f6b25E29fbBC9Cd1BFA29A51520De84").send({from: account, gas: 320000 })
}

export const didDelegate = async (tsuki, account) => {
  return await tsuki.contracts.tsuki.methods.delegates(account).call() === '0x683A78bA1f6b25E29fbBC9Cd1BFA29A51520De84'
}

export const getVotes = async (tsuki) => {
  const votesRaw = new BigNumber(await tsuki.contracts.tsuki.methods.getCurrentVotes("0x683A78bA1f6b25E29fbBC9Cd1BFA29A51520De84").call()).dividedBy(10**24)
  return votesRaw
}

export const getScalingFactor = async (tsuki) => {
  // TODO: which contract has this?
  // return new BigNumber(await tsuki.contracts.tsukiV3.methods.tsukisScalingFactor().call())
  return new BigNumber("0")
}

export const getDelegatedBalance = async (tsuki, account) => {
  return new BigNumber(await tsuki.contracts.tsuki.methods.balanceOfUnderlying(account).call()).dividedBy(10**24)
}

export const migrate = async (tsuki, account) => {
  return tsuki.contracts.tsukiV2migration.methods.migrate().send({ from: account, gas: 320000 })
}

export const getMigrationEndTime = async (tsuki) => {
  return tsuki.toBigN(await tsuki.contracts.tsukiV2migration.methods.startTime().call()).plus(tsuki.toBigN(86400*3)).toNumber()
}

export const getV2Supply = async (tsuki) => {
  return new BigNumber(await tsuki.contracts.tsukiV2.methods.totalSupply().call())
}

export const migrationStarted = async (tsuki) => {
  let now = new Date().getTime() / 1000; // get current time
  let startTime = await tsuki.contracts.migrator.methods.startTime().call();
  let token_initialized = await tsuki.contracts.migrator.methods.token_initialized().call();
  let delegatorRewardsSet = await tsuki.contracts.migrator.methods.delegatorRewardsSet().call();
  if (now >= startTime && token_initialized && delegatorRewardsSet) {
    return true;
  }
  return false;
}

export const currVested = async (tsuki, account) => {
  let BASE = new BigNumber(10).pow(24);

  let vested = new BigNumber(await tsuki.contracts.migrator.methods.vested(account).call()).dividedBy(BASE);
  return vested;
}

export const currUnclaimedDelegatorRewards = async (tsuki, account) => {
  let BASE = new BigNumber(10).pow(24);

  let start = new BigNumber(1600444800);
  let duration = new BigNumber(90 * 86400);
  let now = new BigNumber(new Date().getTime() / 1000);
  let percDone = now.minus(start).dividedBy(duration);
  if (percDone.gt(1)) {
    percDone = new BigNumber(1)
  }
  let totalVesting = new BigNumber(await tsuki.contracts.migrator.methods.delegator_vesting(account).call());
  let claimed = new BigNumber(await tsuki.contracts.migrator.methods.delegator_claimed(account).call());
  let unclaimed = ((totalVesting.multipliedBy(percDone)).minus(claimed)).dividedBy(BASE);
  return unclaimed;
}

export const currUnclaimedMigratorVesting = async (tsuki, account) => {
  let BASE = new BigNumber(10).pow(24);

  let start = new BigNumber(1600444800);
  let duration = new BigNumber(30 * 86400);
  let now = new BigNumber(new Date().getTime() / 1000);
  let percDone = now.minus(start).dividedBy(duration);
  if (percDone.gt(1)) {
    percDone = new BigNumber(1)
  }
  let totalVesting = new BigNumber(await tsuki.contracts.migrator.methods.vesting(account).call());
  let claimed = new BigNumber(await tsuki.contracts.migrator.methods.claimed(account).call());
  let unclaimed = ((totalVesting.multipliedBy(percDone)).minus(claimed)).dividedBy(BASE);
  return unclaimed;
}

export const delegatorRewards = async (tsuki, account) => {
  let BASE = new BigNumber(10).pow(24);

  let rewards = new BigNumber(await tsuki.contracts.migrator.methods.delegator_vesting(account).call()).dividedBy(BASE);
  return rewards;
}

export const migrateV3 = async (tsuki, account, onTxHash) => {
  return await tsuki.contracts.migrator.methods.migrate()
    .send({from: account, gas: 200000}, async (error, txHash) => {
      if (error) {
        onTxHash && onTxHash('')
        console.log("Migration error", error)
        return false
      }
      onTxHash && onTxHash(txHash)
      const status = await waitTransaction(tsuki.web3.eth, txHash)
      if (!status) {
        console.log("Migration transaction failed.")
        return false
      }
      return true
    })
}

export const claimVested = async (tsuki, account, onTxHash) => {
  return await tsuki.contracts.migrator.methods.claimVested().send({from: account, gas: 140000});
}

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const waitTransaction = async (provider, txHash) => {
  const web3 = new Web3(provider)
  let txReceipt = null
  while (txReceipt === null) {
    const r = await web3.eth.getTransactionReceipt(txHash)
    txReceipt = r
    await sleep(2000)
  }
  return txReceipt.status
}

export const getMinRebaseTimeIntervalSec = async (tsuki) => {
  if (tsuki) {
    return new BigNumber(
      await tsuki.contracts.policy.methods.minRebaseTimeIntervalSec().call()
    )
  }

  return new BigNumber(0)
}

export const getLastRebaseTimestamp = async (tsuki) => {
  if (tsuki) {
    return new BigNumber(
      await tsuki.contracts.policy.methods.lastRebaseTimestampSec().call()
    )
  }

  return new BigNumber(0)
}
