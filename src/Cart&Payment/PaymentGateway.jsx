import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  Button,
  Box,
  Typography,
  Container,
  Grid,
  Card,
  TextField,
} from "@mui/material";
const stripePromise = loadStripe("your_stripe_public_key");

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    // TODO: Handle the result of the payment
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: "15vh",
          marginBottom: 10,
          width: "100%",
          // display: "flex",
          justifyContent: "center",
          bgcolor: "#2e333986",
          p: 3,
          borderRadius: "10px",
        }}
      >
        <Typography
          variant="h4"
          color={"primary"}
          fontFamily={"monospace"}
          style={{ justifyContent: "center", display: "flex" }}
        >
          Payment Gateway
        </Typography>
        <br />
        <Typography
          variant="h6"
          gutterBottom
          color={"white"}
          style={{
            justifyContent: "center",
            display: "flex",
            fontFamily: "Monospace",
          }}
        >
          Enter your card details to proceed with the payment.
        </Typography>
        <Card
          sx={{
            p: 3,
            mt: 3,
            border: "2px solid #488de9",
            borderRadius: "5px",
            backgroundColor: "#eaeceedc",
          }}
        >
          <form
            onSubmit={handleSubmit}
            sx={{
              width: "100%",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth label="Cardholder Name" />
              </Grid>
              <Grid item xs={12}>
                <CardElement />
                <br />
                <Typography variant="subtitle2" color="initial" fontFamily={"sans-serif"}>
                  *Powered by Stripe
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!stripe}
                  fullWidth
                >
                  Pay
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Box>
    </Container>
  );
}

function PaymentGateway() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default PaymentGateway;
