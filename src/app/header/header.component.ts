import { Component, OnInit } from '@angular/core';
import { WalletService } from '../wallet.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public route: ActivatedRoute, public wallet: WalletService) { }

  ngOnInit(): void {
  }

  connectWallet() {
    this.wallet.connect(() => {}, () => {}, false);
  }

}
