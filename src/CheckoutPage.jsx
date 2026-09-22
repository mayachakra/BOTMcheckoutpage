import { useState } from "react";
import "./CheckoutPage.css";

function CheckoutPage({ books, shippingAddress }) {
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  {/*
  Below is an example for a confirmed order:
  const [confirmation, setConfirmation] = useState({
    orderId: "12345",
    estimatedShipDate: "September 25, 2026",
  }); */}

  const orderTotal = books.reduce((total, book) => {
    return total + book.price;
  }, 0);

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    setError("");
    setConfirmation(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookIds: books.map((book) => book.id),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setConfirmation({
        orderId: data.orderId,
        estimatedShipDate: data.estimatedShipDate,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (confirmation) {
    return (
      <div className="confirmation">
        <h1>Order Confirmed!</h1>
        <p>Thank you for your order.</p>
        <p>
          <strong>Order ID:</strong> {confirmation.orderId}
        </p>
        <p>
          <strong>Estimated Ship Date:</strong>{" "}
          {confirmation.estimatedShipDate}
        </p>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <header className="checkout-header">
        <h1>Checkout</h1>
        <p>Review your order before placing it.</p>
      </header>

      <section className="checkout-section">
        <h2>Your Order</h2>

        {books.map((book) => (
          <div className="book" key={book.id}> 
            {/* Did Not Include Images */}
            <div className="book-info">
              <h3>{book.title}</h3>
              <p>by {book.author}</p>
              <p className="book-price">${book.price.toFixed(2)}</p>
            </div>
          </div>
        ))}

        <div className="total">
          <span>Total</span>
          <span>${orderTotal.toFixed(2)}</span>
        </div>
      </section>

      <section className="checkout-section shipping-address">
        <h2>Shipping Address</h2>

        <p>{shippingAddress.name}</p>
        <p>{shippingAddress.street}</p>
        <p>
          {shippingAddress.city}, {shippingAddress.state}{" "}
          {shippingAddress.zip}
        </p>
      </section>

      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}

      <button
        className="place-order-button"
        onClick={handlePlaceOrder}
        disabled={isPlacingOrder}
      >
        {isPlacingOrder ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}

export default CheckoutPage;