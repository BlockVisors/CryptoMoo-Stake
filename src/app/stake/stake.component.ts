import { Component, OnInit } from '@angular/core';
import { WalletService } from '../wallet.service';
import { ContractService } from '../contract.service';
import { ConstantsService } from '../constants.service';
import BigNumber from 'bignumber.js';

@Component({
  selector: 'app-stake',
  templateUrl: './stake.component.html',
  styleUrls: ['./stake.component.css']
})
export class StakeComponent implements OnInit {

  yfbBalance: BigNumber;
  yfbStaked: BigNumber;
  stakeDuration: BigNumber;
  img: string;
  stakeAmount: string;
  hasMinted: boolean;

  constructor(public wallet: WalletService, public contract: ContractService, public constants: ConstantsService) {
    this.resetData();
  }

  ngOnInit(): void {
    if (this.wallet.connected) {
      this.loadData();
    }
    this.wallet.connectedEvent.subscribe(() => {
      this.loadData();
    });
    this.wallet.errorEvent.subscribe(() => {
      this.resetData();
    });
  }

  async loadData() {
    this.yfbBalance = new BigNumber(await this.contract.YFB.methods.balanceOf(this.wallet.userAddress).call()).div(this.constants.PRECISION);
    const stakeRecord = await this.contract.STAKER.methods.stakeRecords(this.wallet.userAddress).call();
    this.yfbStaked = new BigNumber(stakeRecord["amount"]).div(this.constants.PRECISION);
    if (! this.yfbStaked.isZero()) {
      const startBlock = new BigNumber(stakeRecord["startBlock"]);
      const currBlock = new BigNumber(await this.wallet.web3.eth.getBlockNumber());
      this.stakeDuration = currBlock.minus(startBlock);
      this.hasMinted = stakeRecord["hasMinted"];
      this.img = this.constants.mapGem(new BigNumber(stakeRecord["amount"]).div(this.constants.PRECISION), true);
    }
  }

  resetData() {
    this.yfbBalance = new BigNumber(0);
    this.yfbStaked = new BigNumber(0);
    this.stakeDuration = new BigNumber(0);
    this.stakeAmount = '0';
    this.hasMinted = true;
    this.img = "./assets/gem-blank.png";
  }

  stake() {
    if (!this.stakeAmount) {
      this.stakeAmount = '0';
    }
    const formattedStakeAmount = new BigNumber(this.stakeAmount).times(this.constants.PRECISION).integerValue().toFixed();
    const func = this.contract.STAKER.methods.addStake(formattedStakeAmount);
    this.wallet.sendTxWithToken(func, this.contract.YFB, this.constants.STAKER_ADDRESS, formattedStakeAmount,
      200000, () => { }, () => {
        this.loadData();
      }, () => { });
  }

  mine() {
    const func = this.contract.STAKER.methods.mintReward();
    this.wallet.sendTx(func, () => { }, () => {}, () => { });
  }

  withdraw() {
    const func = this.contract.STAKER.methods.removeStake();
    this.wallet.sendTx(func, () => { }, () => {}, () => { });
  }
}
