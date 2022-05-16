import React, { useRef, useEffect,useState } from "react";
import { Card, Container, Form, Table , Row} from "react-bootstrap";
//This paypal function has three payment methods 1). paypal payment 2). paypal master card payment 3. google payment method
export default function Paypal() {
  const paypal = useRef();

  useEffect(() => {
//intrigate paypal
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Cool looking table",
                amount: {
                  currency_code: "USD",
                  value: "total",
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();

        //   history.push({
        //   //If paypal payment success then redirect to the succes page
        //     pathname:`/OrderSuccess`,
        //     state:{
 
        //   });

        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, [4]);

  return (
    <Container className={"pt-3"}>
    <Card className={"p-4 mb-4"}>
                      <Form> 
                      <Form.Group>
                      <div   ref={paypal} />
                      </Form.Group>
                    </Form>     
      </Card>
      </Container>
    )
}