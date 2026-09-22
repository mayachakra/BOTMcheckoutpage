import CheckoutPage from "./CheckoutPage";

function App() {
  const books = [
    {
      id: "1",
      title: "The Only One Left",
      author: "Riley Sager",
      price: 12.99
    },
    {
      id: "2",
      title: "Normal People",
      author: "Sally Rooney",
      price: 10.99
    },
    {
      id: "3",
      title: "Little Women",
      author: "Louisa May Alcott",
      price: 11.99
    },
    {
      id: "4",
      title: "Just Kids",
      author: "Patti Smith",
      price: 12.99
    },
  ];

  const shippingAddress = {
    name: "Billy Joel",
    street: "123 Main Street",
    city: "New York",
    state: "NY",
    zip: "10001",
  };

  return (
    <CheckoutPage
      books={books}
      shippingAddress={shippingAddress}
    />
  );
}

export default App;