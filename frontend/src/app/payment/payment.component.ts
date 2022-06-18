import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
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

    this.username = JSON.parse(localStorage.getItem("user")).username;
    this.invoke_stripe();
    this.payment();

    
    if (localStorage.getItem("user_payed") == "true")
      this.user_payed = true;
    else this.user_payed = false;
  }


  monthly_fee: number;
  username: string;
  user_payed: boolean = true;


  payment() {
    this.service.get_monthly_fee().subscribe((data: any) => {


      console.log(data);
      this.monthly_fee = data["monthly_fee"];

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
            console.log(data["data"] + " = " + "success");
            if (data["data"] === "success") {
              this.service.update_subscription(this.username).subscribe((data: any) => {

                if (data["msg"] === "ok") {
                  // Promise p = async (this.notificationService.alert("Uspesno produzena clanarina, hvala !"));
                  
                  this.user_payed = true;
                  localStorage.setItem("user_payed", JSON.stringify(this.user_payed));


                  this.notificationService.alert("Uspesno produzena clanarina, hvala !")
                }
                else {
                  this.notificationService.alert("Internal error from server side");
                  this.router.navigate(['/user']);
                }

                setTimeout(() => {

                  this.router.navigate(['/user']);

                }, 1500);

              });
            }
            else {
              this.notificationService.alert("Niste uspesno platili karticom")
            }



          });

        }
      });

      paymentHandler.open({
        name: "Placanje",
        description: "Uplata mesecne clanarine",
        amount: this.monthly_fee * 100
      })

    });
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
    // const paymentHandler = (<any>window).StripeCheckout.configure({
    //   key: 'pk_test_51KpTkCKC9d8RyJ0E2l8VGCG5JJg2RtBDDUFyFS0NBQNLu3I47cg0MSCODuxNwEnjuGGVlEazilmshjzRb7oIftTK00onUGPqeN',
    //   locale: 'auto',
    //   currency: "eur",
    //   // token koji ce biti vracen sa klijentske strane
    //   token: (stripeToken: any) => {
    //     console.log("stripeToken");
    //     console.log(stripeToken);

    //     this.service.pay(stripeToken).subscribe((data: any) => {


    //       console.log(data);



    //     });

    //   }
    // });

    // paymentHandler.open({
    //   name: "Placanje",
    //   description: "Uplata mesecne clanarine",
    //   amount: this.monthly_fee * 100
    // })
  }

}
