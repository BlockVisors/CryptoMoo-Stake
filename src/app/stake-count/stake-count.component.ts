import { Component, OnInit } from '@angular/core';
import { WalletService } from '../wallet.service';
import { ContractService } from '../contract.service';
import { ConstantsService } from '../constants.service';
import BigNumber from 'bignumber.js';

@Component({
  selector: 'app-stake-count',
  templateUrl: './stake-count.component.html',
  styleUrls: ['./stake-count.component.css']
})
export class StakeCountComponent implements OnInit {
  yfbBalance: BigNumber;

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
    this.yfbBalance = new BigNumber(await this.contract.STAKER.methods.totalStaked.call().call()).div(this.constants.PRECISION);
  }

  resetData() {
    this.yfbBalance = new BigNumber(0);
  }
}
