import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../services/general.service';
import { NotificationService } from '../services/notification.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private router: Router, private service: GeneralService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.invoke_stripe();
  }


  invoke_stripe() {
    if (!window.document.getElementById('stripe-script')) {
      // dodavanje skripte
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({

          key: 'pk_test_51KpTkCKC9d8RyJ0E2l8VGCG5JJg2RtBDDUFyFS0NBQNLu3I47cg0MSCODuxNwEnjuGGVlEazilmshjzRb7oIftTK00onUGPqeN',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
          },
          currency: "eur",
        });
      };

      window.document.body.appendChild(script);
    }
  }

  paymentHandler: any = null;
  make_payment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51KpTkCKC9d8RyJ0E2l8VGCG5JJg2RtBDDUFyFS0NBQNLu3I47cg0MSCODuxNwEnjuGGVlEazilmshjzRb7oIftTK00onUGPqeN',
      locale: 'auto',
      currency: "eur",
      // token koji ce biti vracen sa klijentske strane
      token: (stripeToken: any) => {
        console.log("stripeToken");
        console.log(stripeToken);

        this.service.pay(stripeToken).subscribe((data: any) => {


          console.log(data);
  
      
  
        });

      }
    });

    paymentHandler.open({
      name: "Placanje",
      description: "Uplata mesecne clanarine",
      amount: amount * 100
    })
  }

}
