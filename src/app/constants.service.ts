import { Injectable } from '@angular/core';
import BigNumber from 'bignumber.js';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  PRECISION = 1e18;
  YFB_ADDRESS = '0x89ee58af4871b474c30001982c3d7439c933c838';
  STAKER_ADDRESS = '0xC5802bCf619301Bdc6B1B9EDA4B6fd26e63339aF';

  mapGem(amount: BigNumber, isStaked: boolean) {
    let id = 1;
    let ext = ".gif";
    let folder = "/assets";
    if (! isStaked) {
      ext = ".png";
      folder = "/assets/dead"
    }
    if (amount.isGreaterThan(new BigNumber(1))) {
      id = 2;
    }
    if (amount.isGreaterThan(new BigNumber(10))) {
      id = 3;
    }
    if (amount.isGreaterThan(new BigNumber(100))) {
      id = 4;
    }
    if (amount.isGreaterThan(new BigNumber(1000))) {
      id = 5;
    }
    return "https://raw.githubusercontent.com/owenshen24/gems/master" + folder + "/gem-" + id + ext;
  }
}